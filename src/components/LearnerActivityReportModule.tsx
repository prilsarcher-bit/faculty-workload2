import React, { useState } from 'react';
import {
  LearnerActivityReport,
  FacultyProfile,
  ClassScheduleItem,
  CourseSyllabus,
} from '../types';
import { OFFICIAL_ISU_LOGO, OFFICIAL_SUBJECTS_LIST } from '../data/sampleData';
import {
  CalendarDays,
  Sparkles,
  RefreshCw,
  Copy,
  Download,
  Printer,
  Code2,
  FileText,
  AlertCircle,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Layers,
  Monitor,
  Video,
  ExternalLink,
  FileCheck,
} from 'lucide-react';
import {
  learningActivityReportToMarkdown,
  downloadJsonFile,
  downloadMarkdownFile,
  copyToClipboard,
  printDocument,
} from '../utils/exportUtils';
import { exportLARToWord } from '../utils/wordExport';
import { sanitizeUniversalExclusions } from '../utils/sanitizer';

interface LearnerActivityReportModuleProps {
  facultyProfile: FacultyProfile;
  schedule: ClassScheduleItem[];
  syllabi: CourseSyllabus[];
  activeSyllabusId: string;
  larReports: LearnerActivityReport[];
  setLarReports: React.Dispatch<React.SetStateAction<LearnerActivityReport[]>>;
}

export const LearnerActivityReportModule: React.FC<LearnerActivityReportModuleProps> = ({
  facultyProfile,
  schedule,
  syllabi,
  activeSyllabusId,
  larReports,
  setLarReports,
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);
  const [viewFormat, setViewFormat] = useState<'official-lar' | 'json' | 'markdown'>('official-lar');

  // Default WFH date: Friday, 24/07/2026 or 31/07/2026
  const [wfhDate, setWfhDate] = useState<string>('2026-07-31');
  const [modality, setModality] = useState<'Synchronous (WFH)' | 'Asynchronous (WFH)' | 'Face to Face'>('Synchronous (WFH)');
  const [weekNumber, setWeekNumber] = useState<number>(2);
  const [rawFacultyNotes, setRawFacultyNotes] = useState<string>(
    'Discussed and Demonstrated Excel as Data Analytics Tool, Understanding the MS Excel Interface, Creating and Saving Workbooks, Working with Worksheets and Data Entry Formulas and Functions.'
  );

  // Compute day of week from date
  const computeDayOfWeek = (dateStr: string): string => {
    try {
      const parts = dateStr.split('-');
      if (parts.length === 3) {
        const d = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
        return d.toLocaleDateString('en-US', { weekday: 'long' });
      }
    } catch (e) {}
    return 'Friday';
  };

  const dayOfWeek = computeDayOfWeek(wfhDate);

  // Filter classes scheduled for this day
  const classesForDay = schedule.filter(
    (item) => item.dayOfWeek.toLowerCase() === dayOfWeek.toLowerCase()
  );

  // Active syllabus context for the selected week
  const activeSyllabus = syllabi.find((s) => s.id === activeSyllabusId) || syllabi[0];
  const syllabusWeekData = activeSyllabus?.coursePlan?.find((w) => w.weekNumber === weekNumber);

  const activeReport = larReports[0] || null;

  const handleGenerateLAR = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setErrorMsg(null);

    try {
      const response = await fetch('/api/generate/learning-activity-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          wfhDate,
          dayOfWeek,
          facultyProfile,
          modality,
          semesterWeekNumber: weekNumber,
          scheduledClasses: classesForDay.length > 0 ? classesForDay : [
            {
              courseCode: 'MA INST 4',
              courseTitle: 'Data Science Analytics',
              section: 'BSMA 3A',
              time: '08:00 AM - 11:00 AM',
              creditUnits: 3,
              roomOrPlatform: 'Online LMS (Google Classroom / Zoom)',
            },
            {
              courseCode: 'ELS INST 3',
              courseTitle: 'Data Science Analytics',
              section: 'BA-ELS 3 (Track 2)',
              time: '01:00 PM - 02:00 PM',
              creditUnits: 1,
              roomOrPlatform: 'Online LMS (Google Classroom / Zoom)',
            },
            {
              courseCode: 'ELS INST 3',
              courseTitle: 'Data Science Analytics',
              section: 'BA-ELS 3 (Track 2)',
              time: '02:00 PM - 05:00 PM',
              creditUnits: 3,
              roomOrPlatform: 'Online LMS (Google Classroom / Zoom)',
            },
          ],
          syllabusContext: {
            courseCode: activeSyllabus?.headerInfo.courseCode || 'Data Science Analytics',
            courseTitle: activeSyllabus?.headerInfo.courseTitle || 'Data Science Analytics',
            weekNumber,
            topic: syllabusWeekData?.topic || 'Overview of Data, Data Science Analytics, and Tools (MS Excel)',
            lilos: syllabusWeekData?.lilos || [
              'Understand MS Excel interface and data entry principles.',
              'Apply basic analytical formulas and data formatting.',
            ],
            plannedATs: syllabusWeekData?.ats || ['Hands-on Laboratory Exercise'],
          },
          rawFacultyNotes,
        }),
      });

      const result = await response.json();
      if (!result.success || !result.data) {
        throw new Error(result.error || 'Failed to generate Learner Activity Report.');
      }

      const generatedLAR: LearnerActivityReport = {
        ...result.data,
        id: `lar-${Date.now()}`,
        createdAt: new Date().toISOString(),
      };

      const sanitized = sanitizeUniversalExclusions(generatedLAR);
      setLarReports((prev) => [sanitized, ...prev]);
      setViewFormat('official-lar');
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Error generating Learner Activity Report.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyMarkdown = () => {
    if (!activeReport) return;
    const md = learningActivityReportToMarkdown(activeReport);
    copyToClipboard(md).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    });
  };

  return (
    <div className="space-y-8">
      {/* Title Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src={OFFICIAL_ISU_LOGO}
              alt="University Logo"
              className="w-12 h-12 object-contain rounded-full shadow-xs shrink-0"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 text-[11px] font-bold bg-amber-100 text-amber-800 rounded">
                  MODULE 3
                </span>
                <h2 className="text-xl font-bold text-slate-900">
                  Learner's Activity Report (LAR) — WFH Contextual Engine
                </h2>
              </div>
              <p className="text-sm text-slate-600 mt-0.5">
                Maps exact institutional format (<strong>ISUCYN-AA-LAR-046</strong>) for 
                <strong> APRIL JOY G. LUNG-AYAN, LPT</strong>, pulling the official 
                List of Subjects and generating syllabus-aligned Topics & Accomplishments.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: WFH Date Input & Cross-Reference Generator */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2 mb-4 pb-2 border-b border-slate-100">
              <CalendarDays className="w-4 h-4 text-emerald-600" />
              WFH Date & Schedule Mapping
            </h3>

            {errorMsg && (
              <div className="mb-4 p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleGenerateLAR} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">
                    WFH Date
                  </label>
                  <input
                    type="date"
                    value={wfhDate}
                    onChange={(e) => setWfhDate(e.target.value)}
                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded-md font-mono"
                    required
                  />
                  <span className="text-[11px] text-slate-500 font-semibold block mt-0.5">
                    Day: <span className="text-emerald-700 font-bold">{dayOfWeek}</span>
                  </span>
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">
                    Semester Week
                  </label>
                  <select
                    value={weekNumber}
                    onChange={(e) => setWeekNumber(Number(e.target.value))}
                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded-md bg-white"
                  >
                    {Array.from({ length: 18 }, (_, i) => i + 1).map((w) => (
                      <option key={w} value={w}>
                        Week {w} {w === 2 ? '(Excel Tools)' : w === 9 ? '(Midterm)' : ''}
                      </option>
                    ))}
                  </select>
                  <span className="text-[11px] text-slate-500 block mt-0.5">
                    Syllabus Week
                  </span>
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">
                  Delivery Modality
                </label>
                <select
                  value={modality}
                  onChange={(e) => setModality(e.target.value as any)}
                  className="w-full px-2.5 py-1.5 border border-slate-300 rounded-md bg-white"
                >
                  <option value="Synchronous (WFH)">Synchronous (WFH)</option>
                  <option value="Asynchronous (WFH)">Asynchronous (WFH)</option>
                  <option value="Face to Face">Face to Face</option>
                </select>
              </div>

              {/* Inspector of Friday Classes */}
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 space-y-2">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                  <span>Schedule on {dayOfWeek}</span>
                  <span className="text-emerald-700 font-semibold">
                    {classesForDay.length} Sessions
                  </span>
                </div>

                <div className="space-y-1">
                  {classesForDay.map((c) => (
                    <div
                      key={c.id}
                      className="text-[11px] p-2 rounded bg-white border border-slate-200 space-y-0.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-800">{c.courseCode} ({c.section})</span>
                        <span className="font-mono text-[10px] text-emerald-800">{c.startTime}-{c.endTime}</span>
                      </div>
                      <div className="text-[10px] text-slate-500">{c.courseTitle}</div>
                    </div>
                  ))}
                </div>

                {syllabusWeekData && (
                  <div className="border-t border-slate-200 pt-2 text-[11px]">
                    <span className="block font-bold text-slate-600 mb-0.5">
                      Target Syllabus Module (Week {weekNumber}):
                    </span>
                    <p className="text-slate-800 font-medium bg-emerald-50/70 p-1.5 rounded border border-emerald-200">
                      {syllabusWeekData.topic}
                    </p>
                  </div>
                )}
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">
                  Raw Accomplishment Notes (Optional)
                </label>
                <textarea
                  rows={4}
                  value={rawFacultyNotes}
                  onChange={(e) => setRawFacultyNotes(e.target.value)}
                  placeholder="Key activities conducted on WFH day..."
                  className="w-full px-2.5 py-1.5 border border-slate-300 rounded-md text-xs leading-relaxed"
                />
              </div>

              <button
                type="submit"
                disabled={isGenerating}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white font-medium rounded-lg transition text-xs shadow-sm cursor-pointer"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Cross-referencing & Generating LAR...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Generate Official WFH Activity Report</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Exact Institutional LAR Form (ISUCYN-AA-LAR-046) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white border border-slate-300 rounded-xl shadow-md overflow-hidden">
            {/* Top Toolbar */}
            <div className="p-4 bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs text-amber-400 font-mono font-semibold">
                  ISUCYN-AA-LAR-046 • Revision:0
                </span>
                <h3 className="text-base font-bold text-white">
                  LEARNING ACTIVITY REPORT
                </h3>
                <p className="text-xs text-slate-400">
                  {facultyProfile.name} • CCSICT • Total FTE: 31
                </p>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={handleCopyMarkdown}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 transition cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                  {copySuccess ? 'Copied!' : 'Copy MD'}
                </button>
                <button
                  onClick={() =>
                    downloadMarkdownFile(
                      `LAR_${activeReport?.header.wfhDate || 'report'}.md`,
                      learningActivityReportToMarkdown(activeReport!)
                    )
                  }
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 transition cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>.MD</span>
                </button>
                <button
                  onClick={() =>
                    downloadJsonFile(
                      `LAR_${activeReport?.header.wfhDate || 'report'}.json`,
                      activeReport
                    )
                  }
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 transition cursor-pointer"
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>JSON</span>
                </button>
                {activeReport && (
                  <button
                    onClick={() => exportLARToWord(activeReport)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-blue-700 hover:bg-blue-600 text-xs font-semibold text-white transition cursor-pointer shadow-sm"
                    title="Download Microsoft Word document (.docx)"
                  >
                    <FileCheck className="w-3.5 h-3.5" />
                    <span>Word (.docx)</span>
                  </button>
                )}
                <button
                  onClick={() => printDocument('printable-lar-content', `LAR_${activeReport?.header.wfhDate || 'report'}`)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-emerald-700 hover:bg-emerald-600 text-xs font-semibold text-white transition cursor-pointer shadow-sm"
                  title="Print / Save as PDF"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print PDF</span>
                </button>
              </div>
            </div>

            {/* View Mode Toggle */}
            <div className="border-b border-slate-200 bg-slate-50 px-4 flex space-x-2 text-xs">
              <button
                onClick={() => setViewFormat('official-lar')}
                className={`py-2 px-3 font-medium border-b-2 cursor-pointer transition flex items-center gap-1.5 ${
                  viewFormat === 'official-lar'
                    ? 'border-emerald-600 text-emerald-700 font-bold'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                Official Document Layout (ISUCYN-AA-LAR-046)
              </button>
              <button
                onClick={() => setViewFormat('json')}
                className={`py-2 px-3 font-medium border-b-2 cursor-pointer transition flex items-center gap-1.5 ${
                  viewFormat === 'json'
                    ? 'border-emerald-600 text-emerald-700 font-bold'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                <Code2 className="w-3.5 h-3.5" />
                Structured JSON View
              </button>
            </div>

            {/* LAR Document Content */}
            <div id="printable-lar-content" className="p-6 bg-white">
              {viewFormat === 'json' ? (
                <div>
                  <pre className="bg-slate-950 text-slate-200 p-4 rounded-lg overflow-x-auto text-[11px] font-mono max-h-96">
                    {JSON.stringify(activeReport, null, 2)}
                  </pre>
                </div>
              ) : activeReport ? (
                <div className="space-y-6 text-slate-900 print-area font-sans text-xs sm:text-sm">
                  {/* Institutional Header with Logo (Strictly no forbidden header text) */}
                  <div className="border-b-2 border-slate-800 pb-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={OFFICIAL_ISU_LOGO}
                        alt="Isabela State University Seal"
                        className="w-16 h-16 object-contain rounded-full shadow-xs"
                      />
                      <div>
                        <h3 className="font-extrabold text-sm sm:text-base text-emerald-900 tracking-wider">
                          ISABELA STATE UNIVERSITY
                        </h3>
                        <p className="text-xs font-bold text-slate-700 uppercase">
                          Cauayan Campus • Cauayan City
                        </p>
                        <p className="text-[11px] text-slate-500 italic">
                          San Fermin, Cauayan City, Isabela
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="font-bold text-xs bg-emerald-50 text-emerald-800 border border-emerald-300 px-2 py-0.5 rounded">
                        CCSICT
                      </span>
                      <p className="text-[10px] text-slate-400 mt-1 font-mono">
                        Doc Ref: ISUCYN-AA-LAR-046
                      </p>
                    </div>
                  </div>

                  {/* Title & Academic Term */}
                  <div className="text-center space-y-1">
                    <h2 className="text-base sm:text-lg font-black tracking-wide text-slate-900 uppercase">
                      LEARNING ACTIVITY REPORT
                    </h2>
                    <p className="text-xs font-bold text-slate-700">
                      1st SEMESTER A.Y. 2026-2027
                    </p>
                  </div>

                  {/* Faculty Meta Table (Exact from april_LAR-2026_f16c6624.pdf) */}
                  <div className="border border-slate-400 overflow-hidden text-xs">
                    <table className="min-w-full divide-y divide-slate-400 text-center">
                      <thead className="bg-slate-100 font-bold text-slate-800">
                        <tr className="divide-x divide-slate-400">
                          <th className="py-1.5 px-2">Name of Faculty</th>
                          <th className="py-1.5 px-2">Rank</th>
                          <th className="py-1.5 px-2">Designation, if applicable</th>
                          <th className="py-1.5 px-2">Status (TL/ VSL)</th>
                          <th className="py-1.5 px-2">Total FTE</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white font-medium divide-y divide-slate-400">
                        <tr className="divide-x divide-slate-400">
                          <td className="py-1.5 px-2 font-bold text-slate-900 uppercase">
                            {facultyProfile.name.replace(/,.*$/, '')}
                          </td>
                          <td className="py-1.5 px-2 uppercase">{facultyProfile.rank}</td>
                          <td className="py-1.5 px-2">CCSICT</td>
                          <td className="py-1.5 px-2">-</td>
                          <td className="py-1.5 px-2 font-bold text-emerald-800">31</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* List of Subjects Table (Exact from PDF) */}
                  <div>
                    <h4 className="font-bold text-xs uppercase tracking-wider text-slate-800 mb-1">
                      List of Subjects & Teaching Schedules
                    </h4>
                    <div className="border border-slate-400 overflow-x-auto text-xs">
                      <table className="min-w-full divide-y divide-slate-400">
                        <thead className="bg-slate-100 font-bold text-slate-800">
                          <tr className="divide-x divide-slate-400">
                            <th className="py-1.5 px-2 text-left w-24">Course No.</th>
                            <th className="py-1.5 px-2 text-left">Course Title</th>
                            <th className="py-1.5 px-2 text-center w-16">Units</th>
                            <th className="py-1.5 px-2 text-left">Schedule</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-slate-300">
                          {OFFICIAL_SUBJECTS_LIST.map((subj, i) => (
                            <tr key={i} className="divide-x divide-slate-300 hover:bg-slate-50">
                              <td className="py-1 px-2 font-bold font-mono text-slate-900">
                                {subj.courseNo}
                              </td>
                              <td className="py-1 px-2 text-slate-800 font-medium">
                                {subj.courseTitle}
                              </td>
                              <td className="py-1 px-2 text-center font-bold text-slate-800">
                                {i === 0 ? '31' : ''}
                              </td>
                              <td className="py-1 px-2 font-mono text-[11px] text-slate-700">
                                {subj.schedule}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Daily Activity Table for WFH Date (Exact columns from reference PDF) */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-bold text-xs uppercase tracking-wider text-slate-800">
                        Daily Accomplishment Record (WFH)
                      </h4>
                      <span className="text-[11px] font-semibold text-emerald-800">
                        Date: {activeReport.header.wfhDate} ({activeReport.header.dayOfWeek})
                      </span>
                    </div>

                    <div className="border border-slate-400 overflow-x-auto text-xs">
                      <table className="min-w-full divide-y divide-slate-400">
                        <thead className="bg-slate-100 font-bold text-slate-800 text-center">
                          <tr className="divide-x divide-slate-400">
                            <th className="py-2 px-2 w-24">DATE</th>
                            <th className="py-2 px-2 w-32">SCHEDULE</th>
                            <th className="py-2 px-3 text-left">TOPIC(S) COVERED</th>
                            <th className="py-2 px-3 text-left">ACCOMPLISHMENT(S)</th>
                            <th className="py-2 px-2 w-16">NO. OF HOURS</th>
                            <th className="py-2 px-2 w-28">MODALITY</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-slate-400 align-top">
                          {activeReport.classesReported.map((cls, idx) => (
                            <tr key={idx} className="divide-x divide-slate-400">
                              {/* Date cell rendered on first row */}
                              {idx === 0 ? (
                                <td
                                  rowSpan={activeReport.classesReported.length}
                                  className="py-2 px-2 font-mono font-bold text-center text-slate-800 bg-slate-50/50"
                                >
                                  {activeReport.header.wfhDate}
                                </td>
                              ) : null}

                              {/* Schedule */}
                              <td className="py-2 px-2 font-mono text-[11px] font-medium text-slate-800">
                                <div>{cls.timeSchedule}</div>
                                <div className="text-[10px] text-slate-500 font-sans mt-0.5">
                                  {cls.courseCode} ({cls.section})
                                </div>
                              </td>

                              {/* Topic Covered (Syllabus Aligned) */}
                              <td className="py-2 px-3 text-slate-900">
                                <span className="font-bold block text-xs text-slate-900">
                                  {cls.topicCovered}
                                </span>
                              </td>

                              {/* Accomplishment(s) */}
                              <td className="py-2 px-3 text-slate-800 space-y-1">
                                {cls.accomplishments.map((acc, aIdx) => (
                                  <div key={aIdx} className="leading-snug">
                                    {acc.startsWith('-') || acc.startsWith('•') ? acc : `• ${acc}`}
                                  </div>
                                ))}
                              </td>

                              {/* No. of Hours */}
                              <td className="py-2 px-2 text-center font-bold font-mono text-slate-900">
                                {cls.timeSchedule.includes('1:00pm-2:00pm') || cls.timeSchedule.includes('1:00 PM') && cls.timeSchedule.includes('2:00 PM')
                                  ? 1
                                  : 3}
                              </td>

                              {/* Modality */}
                              {idx === 0 ? (
                                <td
                                  rowSpan={activeReport.classesReported.length}
                                  className="py-2 px-2 text-center text-slate-800 font-medium text-xs bg-slate-50/50"
                                >
                                  {activeReport.header.modality}
                                </td>
                              ) : null}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Signatories Block (Exact as in Reference PDF) */}
                  <div className="pt-6">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center text-xs">
                      <div>
                        <span className="block text-[11px] text-slate-500 mb-5">Prepared by:</span>
                        <div className="border-b border-slate-800 pb-1 font-bold text-slate-900 uppercase">
                          {facultyProfile.name}
                        </div>
                        <span className="text-[11px] text-slate-600 block mt-0.5">Faculty</span>
                      </div>

                      <div>
                        <span className="block text-[11px] text-slate-500 mb-5">Noted by:</span>
                        <div className="border-b border-slate-800 pb-1 font-bold text-slate-900 uppercase">
                          {facultyProfile.departmentChair}
                        </div>
                        <span className="text-[11px] text-slate-600 block mt-0.5">Program Chair</span>
                      </div>

                      <div>
                        <span className="block text-[11px] text-slate-500 mb-5">Approved:</span>
                        <div className="border-b border-slate-800 pb-1 font-bold text-slate-900 uppercase">
                          {facultyProfile.collegeDean}
                        </div>
                        <span className="text-[11px] text-slate-600 block mt-0.5">Dean</span>
                      </div>
                    </div>
                  </div>

                  {/* Official Footer (Exact from Reference PDF) */}
                  <div className="border-t border-slate-300 pt-3 mt-4 flex flex-col sm:flex-row items-center justify-between text-[10px] text-slate-500 font-mono">
                    <div>
                      <span>ISUCYN-AA-LAR-046</span>
                      <span className="mx-2">|</span>
                      <span>Revision:0 – March 10, 2026</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-700 uppercase">Office of Academic Affairs</span>
                      <span>•</span>
                      <span>https://isucauayan.edu.ph/</span>
                      <span>•</span>
                      <span>ara.cauayan@isu.edu.ph</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-slate-400">
                  <p>No report loaded. Click generate to create one.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
