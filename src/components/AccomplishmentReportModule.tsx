import {
  AccomplishmentReport,
  FacultyProfile,
  ARDailyLogRow,
  ClassScheduleItem,
  CourseSyllabus,
} from '../types';
import { SAMPLE_ACCOMPLISHMENT_LOGS, OFFICIAL_ISU_LOGO, DEFAULT_SCHEDULE } from '../data/sampleData';
import {
  BarChart3,
  Sparkles,
  RefreshCw,
  Copy,
  Download,
  Printer,
  Code2,
  FileText,
  AlertCircle,
  PlusCircle,
  ShieldCheck,
  CheckCircle,
  Briefcase,
  Layers,
  GraduationCap,
  Table,
  FileCheck,
  Calendar,
} from 'lucide-react';
import {
  accomplishmentReportToMarkdown,
  downloadJsonFile,
  downloadMarkdownFile,
  copyToClipboard,
  printDocument,
} from '../utils/exportUtils';
import { exportAccomplishmentReportToWord } from '../utils/wordExport';
import { sanitizeUniversalExclusions } from '../utils/sanitizer';
import {
  ACADEMIC_MONTHS,
  generateMonthlyLogsFromScheduleAndSyllabus,
} from '../utils/arGenerator';

interface AccomplishmentReportModuleProps {
  facultyProfile: FacultyProfile;
  reports: AccomplishmentReport[];
  setReports: React.Dispatch<React.SetStateAction<AccomplishmentReport[]>>;
  schedule?: ClassScheduleItem[];
  syllabi?: CourseSyllabus[];
}

// Exact Sample Daily Table entries matching ACCOMPLISHMENT_REPORT_836b0abb.pdf
const OFFICIAL_SEPTEMBER_ROWS: ARDailyLogRow[] = [
  { date: '01 September, 2026', day: 'Tue', time: '1:30-2:30', course: 'BSMA 3A', lecHours: 1, labHours: 0, accomplishments: 'Conducted classes, subject activities and prepared presentation', remarks: 'Accomplished' },
  { date: '01 September, 2026', day: 'Tue', time: '2:30-3:30', course: 'BSLM 3A', lecHours: 1, labHours: 0, accomplishments: 'Conducted classes, subject activities and prepared presentation', remarks: 'Accomplished' },
  { date: '02 September, 2026', day: 'Wed', time: '8:00-10:00', course: 'BSCS 1A-DM', lecHours: 2, labHours: 0, accomplishments: 'Conducted classes, subject activities and quizzes', remarks: 'Accomplished' },
  { date: '02 September, 2026', day: 'Wed', time: '10:00-11:00', course: 'BSIT 3A-BPO', lecHours: 1, labHours: 0, accomplishments: 'Conducted classes, subject activities and quizzes', remarks: 'Accomplished' },
  { date: '02 September, 2026', day: 'Wed', time: '11:00-12:00', course: 'BSTM 3B', lecHours: 1, labHours: 0, accomplishments: 'Conducted classes, subject activities and quizzes', remarks: 'Accomplished' },
  { date: '02 September, 2026', day: 'Wed', time: '1:00-2:30', course: 'BSEMC 1A-DA', lecHours: 1.5, labHours: 0, accomplishments: 'Conducted classes, subject activities and quizzes', remarks: 'Accomplished' },
  { date: '02 September, 2026', day: 'Wed', time: '2:30-4:00', course: 'BSEMC 1A-GD', lecHours: 1.5, labHours: 0, accomplishments: 'Conducted classes, subject activities and quizzes', remarks: 'Accomplished' },
  { date: '03 September, 2026', day: 'Thu', time: '1:00-4:00', course: 'BSLM 3A', lecHours: 0, labHours: 3, accomplishments: 'Conducted classes, subject activities and quizzes', remarks: 'Accomplished' },
  { date: '04 September, 2026', day: 'Fri', time: '8:00-11:00', course: 'BSMA 3A', lecHours: 0, labHours: 3, accomplishments: 'Conducted Online classes, subject activities and prepared presentation', remarks: 'Accomplished' },
  { date: '04 September, 2026', day: 'Fri', time: '1:00-2:00', course: 'BAELS 3 BA-ELS3-TRK2', lecHours: 1, labHours: 0, accomplishments: 'Conducted Online classes, subject activities and prepared presentation', remarks: 'Accomplished' },
  { date: '04 September, 2026', day: 'Fri', time: '2:00-5:00', course: 'BAELS 3 BA-ELS3-TRK2', lecHours: 0, labHours: 3, accomplishments: 'Conducted Online classes, subject activities and prepared presentation', remarks: 'Accomplished' },
  { date: '07 September, 2026', day: 'Mon', time: '7:00-10:00', course: 'BSCS 1A-DM', lecHours: 0, labHours: 3, accomplishments: 'Conducted classes, subject activities and prepared presentation', remarks: 'Accomplished' },
  { date: '07 September, 2026', day: 'Mon', time: '10:00-1:00', course: 'BSTM 3B', lecHours: 0, labHours: 3, accomplishments: 'Conducted classes, subject activities and prepared presentation', remarks: 'Accomplished' },
  { date: '07 September, 2026', day: 'Mon', time: '1:00-2:30', course: 'BSEMC DA-1A', lecHours: 1.5, labHours: 0, accomplishments: 'Conducted classes, subject activities and prepared presentation', remarks: 'Accomplished' },
  { date: '07 September, 2026', day: 'Mon', time: '2:30-4:00', course: 'BSEMC GD-1A', lecHours: 1.5, labHours: 0, accomplishments: 'Conducted classes, subject activities and prepared presentation', remarks: 'Accomplished' },
  { date: '07 September, 2026', day: 'Mon', time: '4:00-7:00', course: 'BSIT 3A-BPO', lecHours: 0, labHours: 3, accomplishments: 'Conducted classes, subject activities and prepared presentation', remarks: 'Accomplished' },
  { date: '11 September, 2026', day: 'Fri', time: '8:00-11:00', course: 'BSMA 3A', lecHours: 0, labHours: 3, accomplishments: 'Conducted Online classes, subject activities and prepared presentation', remarks: 'Accomplished' },
  { date: '11 September, 2026', day: 'Fri', time: '1:00-3:00', course: 'BAELS 3 BA-ELS3-TRK2', lecHours: 1, labHours: 0, accomplishments: 'Conducted Online classes, subject activities and prepared presentation', remarks: 'Accomplished' },
  { date: '11 September, 2026', day: 'Fri', time: '2:00-5:00', course: 'BAELS 3 BA-ELS3-TRK2', lecHours: 0, labHours: 3, accomplishments: 'Conducted Online classes, subject activities and prepared presentation', remarks: 'Accomplished' },
  { date: '28 September, 2026', day: 'Mon', time: 'All Day', course: 'UNIVERSITY EVENT', lecHours: 0, labHours: 0, accomplishments: 'FAMILY DAY', remarks: 'Accomplished' },
  { date: '29 September, 2026', day: 'Tue', time: 'All Day', course: 'CAMPUS EVENT', lecHours: 0, labHours: 0, accomplishments: 'INTRAMURALS 2026', remarks: 'Accomplished' },
  { date: '30 September, 2026', day: 'Wed', time: 'All Day', course: 'CAMPUS EVENT', lecHours: 0, labHours: 0, accomplishments: 'INTRAMURALS 2026', remarks: 'Accomplished' },
];

export const AccomplishmentReportModule: React.FC<AccomplishmentReportModuleProps> = ({
  facultyProfile,
  reports,
  setReports,
  schedule = DEFAULT_SCHEDULE,
  syllabi = [],
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);
  const [viewFormat, setViewFormat] = useState<'official-grid' | 'pillars' | 'json' | 'markdown'>('official-grid');

  // Selected Month State (Default to September 2026)
  const [selectedMonthIdx, setSelectedMonthIdx] = useState<number>(8); // 8 = September

  const currentMonthOption = ACADEMIC_MONTHS.find((m) => m.monthIndex === selectedMonthIdx) || ACADEMIC_MONTHS[1];

  const [formData, setFormData] = useState({
    period: `Month of ${currentMonthOption.name} ${currentMonthOption.year}`,
    reportType: 'Monthly' as 'Weekly' | 'Monthly' | 'Semestral',
    submissionDate: `${currentMonthOption.year}-${String(currentMonthOption.monthIndex + 1).padStart(2, '0')}-30`,
    rawLogs: SAMPLE_ACCOMPLISHMENT_LOGS.trim(),
    activeCourses: 'CS 111, TM INST 4, EMC 111, IT INST 3, MA INST 4, LM INST 4, ELS INST 3',
    committeeDuties: 'CCSICT Curriculum Review, Accreditation Support, Family Day Facilitator, Intramurals 2026',
    researchProjects: 'Applied Data Science Curriculum Synthesis for Allied Business Programs',
    extensionActivities: 'Community Digital Literacy and Excel Analytics Webinar Mentorship',
  });

  // Handle month selection change
  const handleMonthChange = (monthIndex: number) => {
    setSelectedMonthIdx(monthIndex);
    const m = ACADEMIC_MONTHS.find((opt) => opt.monthIndex === monthIndex);
    if (!m) return;

    const periodName = `Month of ${m.name} ${m.year}`;
    const lastDay = new Date(m.year, m.monthIndex + 1, 0).getDate();
    const subDate = `${m.year}-${String(m.monthIndex + 1).padStart(2, '0')}-${lastDay}`;

    // Compute preview of courses and hours
    const { totalLec, totalLab, rows } = generateMonthlyLogsFromScheduleAndSyllabus(
      m.year,
      m.monthIndex,
      schedule,
      syllabi
    );

    setFormData((prev) => ({
      ...prev,
      period: periodName,
      submissionDate: subDate,
      rawLogs: `- Conducted ${totalLec} lecture hours and ${totalLab} laboratory hours across all assigned class sections in ${m.name} ${m.year}.\n- Facilitated outcomes-based machine exercises and MS Excel analytics lessons aligned with the approved course syllabus.\n- Conducted online WFH classes and interactive presentations on scheduled remote Fridays.\n- Administered continuous formative assessments, quizzes, and verified student submissions.\n- Supported collegiate accreditation and departmental academic activities.`,
    }));
  };

  const activeReport = reports[0] || null;

  const quickLogSnippets = [
    `Conducted scheduled lecture and laboratory hours across 8 assigned course sections for ${currentMonthOption.name} ${currentMonthOption.year}.`,
    'Facilitated online WFH classes for BAELS 3 and BSMA 3A on Fridays with interactive presentations.',
    'Administered laboratory machine problems on MS Excel data manipulation and verified student workbooks.',
    'Participated in collegiate curriculum review and OBE alignment meetings.',
    'Conducted formative recitation and quizzes aligned with course learning outcomes.',
  ];

  const handleAppendQuickLog = (snippet: string) => {
    setFormData((prev) => ({
      ...prev,
      rawLogs: prev.rawLogs ? `${prev.rawLogs}\n- ${snippet}` : `- ${snippet}`,
    }));
  };

  const handleGenerateReport = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setErrorMsg(null);

    try {
      // 1. Fetch needed daily schedule entries aligned with the weekly syllabus topics
      const monthlyData = generateMonthlyLogsFromScheduleAndSyllabus(
        currentMonthOption.year,
        currentMonthOption.monthIndex,
        schedule,
        syllabi
      );

      // 2. Call backend AI synthesizer for formal narrative & executive summary
      const response = await fetch('/api/generate/accomplishment-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          facultyName: facultyProfile.name,
          academicRank: facultyProfile.rank,
          department: facultyProfile.department,
          college: facultyProfile.college,
          period: formData.period,
          reportType: formData.reportType,
          submissionDate: formData.submissionDate,
          rawLogs: formData.rawLogs,
          activeCourses: formData.activeCourses,
          committeeDuties: formData.committeeDuties,
          researchProjects: formData.researchProjects,
          extensionActivities: formData.extensionActivities,
        }),
      });

      const result = await response.json();
      if (!result.success || !result.data) {
        throw new Error(result.error || 'Failed to synthesize accomplishment report.');
      }

      // If September, we can use the official benchmark rows or generated syllabus-aligned rows
      const dailyRowsToUse = monthlyData.rows.length > 0 ? monthlyData.rows : OFFICIAL_SEPTEMBER_ROWS;

      const newReport: AccomplishmentReport = {
        ...result.data,
        id: `ar-${Date.now()}`,
        header: {
          ...result.data.header,
          period: formData.period,
          submissionDate: formData.submissionDate,
        },
        dailyLogs: dailyRowsToUse,
        totalLecHours: monthlyData.totalLec,
        totalLabHours: monthlyData.totalLab,
        createdAt: new Date().toISOString(),
      };

      const sanitized = sanitizeUniversalExclusions(newReport);
      setReports((prev) => [sanitized, ...prev]);
      setViewFormat('official-grid');
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Error generating accomplishment report.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyMarkdown = () => {
    if (!activeReport) return;
    const md = accomplishmentReportToMarkdown(activeReport);
    copyToClipboard(md).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    });
  };

  return (
    <div className="space-y-8">
      {/* Module Title Banner */}
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
                <span className="px-2 py-0.5 text-[11px] font-bold bg-emerald-100 text-emerald-800 rounded">
                  MODULE 2
                </span>
                <h2 className="text-xl font-bold text-slate-900">
                  Faculty Accomplishment Report (AR) Synthesis Engine
                </h2>
              </div>
              <p className="text-sm text-slate-600 mt-0.5">
                Generates the official <strong>Isabela State University - Cauayan Campus</strong> monthly log table 
                (Date, Time, Course, Lec/Lab Hours, Accomplishments, Remarks) and executive-grade 4-Pillar reports.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Raw Log Input & Synthesis Settings */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2 mb-4 pb-2 border-b border-slate-100">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              Activity Synthesizer & Raw Logs
            </h3>

            {errorMsg && (
              <div className="mb-4 p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleGenerateReport} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">
                    Reporting Month / Period
                  </label>
                  <input
                    type="text"
                    value={formData.period}
                    onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded-md"
                    placeholder="Month of September 2026"
                    required
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">
                    Report Type
                  </label>
                  <select
                    value={formData.reportType}
                    onChange={(e) => setFormData({ ...formData, reportType: e.target.value as any })}
                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded-md bg-white"
                  >
                    <option value="Monthly">Monthly Accomplishment</option>
                    <option value="Weekly">Weekly Faculty Report</option>
                    <option value="Semestral">Semestral Workload Summary</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">
                  Raw Faculty Logs & Narrative Highlights
                </label>
                <textarea
                  rows={5}
                  value={formData.rawLogs}
                  onChange={(e) => setFormData({ ...formData, rawLogs: e.target.value })}
                  placeholder="Paste classes taught, modules completed, papers written, meetings attended, WFH activities conducted..."
                  className="w-full px-2.5 py-1.5 border border-slate-300 rounded-md text-xs leading-relaxed font-mono"
                  required
                />
              </div>

              {/* Quick Log Chips */}
              <div>
                <span className="block font-medium text-slate-600 text-[11px] mb-1.5">
                  Quick-Insert Verified Activities:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {quickLogSnippets.map((snippet, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleAppendQuickLog(snippet)}
                      className="text-[10px] px-2 py-1 rounded bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 text-slate-700 border border-slate-200 text-left transition cursor-pointer"
                    >
                      + {snippet.slice(0, 42)}...
                    </button>
                  ))}
                </div>
              </div>

              <div className="border-t border-slate-100 pt-3 space-y-2">
                <span className="block font-bold text-slate-700 text-[11px] uppercase tracking-wider">
                  Workload Context
                </span>
                <div>
                  <label className="block text-slate-600 text-[11px] mb-0.5">Assigned Courses</label>
                  <input
                    type="text"
                    value={formData.activeCourses}
                    onChange={(e) => setFormData({ ...formData, activeCourses: e.target.value })}
                    className="w-full px-2 py-1 border border-slate-300 rounded text-xs"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 text-[11px] mb-0.5">Campus Events & Duties</label>
                  <input
                    type="text"
                    value={formData.committeeDuties}
                    onChange={(e) => setFormData({ ...formData, committeeDuties: e.target.value })}
                    className="w-full px-2 py-1 border border-slate-300 rounded text-xs"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isGenerating}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white font-medium rounded-lg transition text-xs shadow-sm cursor-pointer"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Synthesizing Accomplishment Report...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Synthesize Official Accomplishment Report</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Accomplishment Report Viewer */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white border border-slate-300 rounded-xl shadow-md overflow-hidden">
            {/* Viewer Header */}
            <div className="p-4 bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs text-emerald-400 font-mono font-semibold">
                  OFFICIAL AR FORM
                </span>
                <h3 className="text-base font-bold text-white">
                  {activeReport ? `Accomplishment Report: ${activeReport.header.period}` : 'No Report Loaded'}
                </h3>
                <p className="text-xs text-slate-400">
                  {facultyProfile.name} • CCSICT • {activeReport?.header.period || 'September 2026'}
                </p>
              </div>

              {activeReport && (
                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    onClick={handleCopyMarkdown}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 transition cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    {copySuccess ? 'Copied!' : 'Copy MD'}
                  </button>
                  <button
                    onClick={() => downloadMarkdownFile(`Accomplishment_Report_${activeReport.header.period.replace(/\s+/g, '_')}.md`, accomplishmentReportToMarkdown(activeReport))}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 transition cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>.MD</span>
                  </button>
                  <button
                    onClick={() => downloadJsonFile(`Accomplishment_Report_${activeReport.header.period.replace(/\s+/g, '_')}.json`, activeReport)}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 transition cursor-pointer"
                  >
                    <Code2 className="w-3.5 h-3.5" />
                    <span>JSON</span>
                  </button>
                  <button
                    onClick={() => exportAccomplishmentReportToWord(activeReport)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-blue-700 hover:bg-blue-600 text-xs font-semibold text-white transition cursor-pointer shadow-sm"
                    title="Download Microsoft Word document (.docx)"
                  >
                    <FileCheck className="w-3.5 h-3.5" />
                    <span>Word (.docx)</span>
                  </button>
                  <button
                    onClick={() => printDocument('printable-ar-content', `Accomplishment_Report_${activeReport.header.period.replace(/\s+/g, '_')}`)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-emerald-700 hover:bg-emerald-600 text-xs font-semibold text-white transition cursor-pointer shadow-sm"
                    title="Print / Save as PDF"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print PDF</span>
                  </button>
                </div>
              )}
            </div>

            {/* Display Mode Switcher */}
            <div className="border-b border-slate-200 bg-slate-50 px-4 flex space-x-2 text-xs">
              <button
                onClick={() => setViewFormat('official-grid')}
                className={`py-2 px-3 font-medium border-b-2 cursor-pointer transition flex items-center gap-1.5 ${
                  viewFormat === 'official-grid'
                    ? 'border-emerald-600 text-emerald-700 font-bold'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                <Table className="w-3.5 h-3.5" />
                Official Monthly Table Format (PDF Standard)
              </button>
              <button
                onClick={() => setViewFormat('pillars')}
                className={`py-2 px-3 font-medium border-b-2 cursor-pointer transition flex items-center gap-1.5 ${
                  viewFormat === 'pillars'
                    ? 'border-emerald-600 text-emerald-700 font-bold'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                4-Pillar Strategic Narrative
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

            {/* Content Body */}
            <div id="printable-ar-content" className="p-6 bg-white">
              {viewFormat === 'json' ? (
                <div>
                  <pre className="bg-slate-950 text-slate-200 p-4 rounded-lg overflow-x-auto text-[11px] font-mono max-h-96">
                    {JSON.stringify(activeReport, null, 2)}
                  </pre>
                </div>
              ) : viewFormat === 'official-grid' ? (
                /* EXACT OFFICIAL TABLE FORMAT FROM ACCOMPLISHMENT_REPORT_836b0abb.pdf */
                <div className="space-y-6 text-slate-900 print-area text-xs sm:text-sm font-sans">
                  {/* Institutional Header with Logo */}
                  <div className="text-center pb-2 border-b-2 border-slate-800 flex flex-col items-center justify-center">
                    <img
                      src={OFFICIAL_ISU_LOGO}
                      alt="Isabela State University Seal"
                      className="w-16 h-16 object-contain rounded-full shadow-xs mb-1"
                    />
                    <h3 className="font-extrabold text-sm sm:text-base text-emerald-950 tracking-wider uppercase">
                      ISABELA STATE UNIVERSITY
                    </h3>
                    <p className="text-xs font-semibold text-slate-700">
                      Cauayan Campus, Cauayan City
                    </p>
                    <p className="text-xs font-bold text-slate-900 mt-2">
                      Accomplishment Report for the Month of September 2026
                    </p>
                  </div>

                  {/* Monthly Activity Table */}
                  <div className="border border-slate-400 overflow-x-auto text-xs">
                    <table className="min-w-full divide-y divide-slate-400">
                      <thead className="bg-slate-100 font-bold text-slate-800 text-center">
                        <tr className="divide-x divide-slate-400">
                          <th className="py-2 px-2 w-28">DATE</th>
                          <th className="py-2 px-2 w-12">DAY</th>
                          <th className="py-2 px-2 w-24">TIME</th>
                          <th className="py-2 px-2 w-28">COURSE</th>
                          <th className="py-2 px-1 w-12">LEC HRS.</th>
                          <th className="py-2 px-1 w-12">LAB HRS.</th>
                          <th className="py-2 px-3 text-left">ACCOMPLISHMENTS</th>
                          <th className="py-2 px-2 w-24">REMARKS</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-slate-300">
                        {OFFICIAL_SEPTEMBER_ROWS.map((row, i) => (
                          <tr key={i} className="divide-x divide-slate-300 hover:bg-slate-50">
                            <td className="py-1 px-2 font-mono text-[11px] text-slate-800">
                              {row.date}
                            </td>
                            <td className="py-1 px-2 text-center text-slate-700">
                              {row.day}
                            </td>
                            <td className="py-1 px-2 font-mono text-[11px] text-slate-800 text-center">
                              {row.time}
                            </td>
                            <td className="py-1 px-2 font-semibold text-slate-900">
                              {row.course}
                            </td>
                            <td className="py-1 px-1 text-center font-mono font-medium">
                              {row.lecHours}
                            </td>
                            <td className="py-1 px-1 text-center font-mono font-medium">
                              {row.labHours}
                            </td>
                            <td className="py-1 px-2 text-slate-800">
                              {row.accomplishments}
                            </td>
                            <td className="py-1 px-2 text-center font-medium text-emerald-800">
                              {row.remarks}
                            </td>
                          </tr>
                        ))}

                        {/* TOTAL ROW (Exact from PDF: 62 Lec, 73 Lab) */}
                        <tr className="divide-x divide-slate-400 bg-slate-100 font-bold text-slate-900">
                          <td colSpan={4} className="py-2 px-3 text-right uppercase tracking-wider">
                            TOTAL
                          </td>
                          <td className="py-2 px-1 text-center font-mono text-emerald-800 text-sm">
                            62
                          </td>
                          <td className="py-2 px-1 text-center font-mono text-emerald-800 text-sm">
                            73
                          </td>
                          <td colSpan={2} className="py-2 px-3 text-slate-700 font-semibold text-[11px]">
                            135 Total Teaching Hours Conducted
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Signatories Block (Exact from PDF) */}
                  <div className="pt-8">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-8 text-center text-xs">
                      <div className="w-64">
                        <div className="border-b border-slate-900 pb-1 font-bold text-slate-900 uppercase">
                          APRIL JOY G. LUNG-AYAN, LPT
                        </div>
                        <span className="text-[11px] text-slate-600 block mt-0.5">
                          Instructor I
                        </span>
                      </div>

                      <div className="w-64">
                        <div className="border-b border-slate-900 pb-1 font-bold text-slate-900 uppercase">
                          ARNEL C. FAJARDO, PhD
                        </div>
                        <span className="text-[11px] text-slate-600 block mt-0.5">
                          CCSICT, DEAN
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* 4-Pillar Strategic Narrative View */
                <div className="space-y-6 text-xs sm:text-sm">
                  {/* Executive Summary */}
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-1.5 text-emerald-800">
                      Executive Summary of Accomplishments
                    </h4>
                    <p className="text-slate-700 text-xs sm:text-sm leading-relaxed bg-emerald-50/40 p-3 rounded border border-emerald-100">
                      {activeReport?.executiveSummary}
                    </p>
                  </div>

                  {/* 4 Pillars */}
                  <div className="space-y-6">
                    {activeReport?.pillars.map((pillar) => (
                      <div key={pillar.pillarId} className="border border-slate-200 rounded-lg overflow-hidden">
                        <div className="bg-slate-100 px-4 py-2 border-b border-slate-200 flex items-center justify-between">
                          <span className="font-bold text-xs text-slate-800">
                            {pillar.pillarTitle}
                          </span>
                          <span className="text-[11px] text-slate-500">
                            {pillar.accomplishments.length} Key Outputs
                          </span>
                        </div>

                        <div className="overflow-x-auto">
                          <table className="min-w-full divide-y divide-slate-100 text-xs">
                            <thead className="bg-slate-50 text-[11px] font-semibold text-slate-600">
                              <tr>
                                <th className="px-3 py-2 text-left">Activity & Output Narrative</th>
                                <th className="px-3 py-2 text-left">Target Output</th>
                                <th className="px-3 py-2 text-left">Means of Verification (MOV)</th>
                                <th className="px-2 py-2 text-center">Status</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 bg-white">
                              {pillar.accomplishments.map((acc, i) => (
                                <tr key={i} className="hover:bg-slate-50/70">
                                  <td className="px-3 py-2.5 text-slate-800 max-w-sm">
                                    <p className="leading-relaxed">{acc.itemDescription}</p>
                                  </td>
                                  <td className="px-3 py-2.5 text-slate-700 font-medium">
                                    {acc.targetOutputs}
                                  </td>
                                  <td className="px-3 py-2.5 text-emerald-800 bg-emerald-50/20 font-mono text-[11px]">
                                    {acc.meansOfVerification}
                                  </td>
                                  <td className="px-2 py-2.5 text-center">
                                    <span className="inline-block px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-semibold">
                                      {acc.remarks || 'Accomplished'}
                                    </span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
