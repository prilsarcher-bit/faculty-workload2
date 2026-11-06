import React, { useState } from 'react';
import { CourseSyllabus, FacultyProfile } from '../types';
import { CHED_CMO_PRESETS, SAMPLE_INITIAL_SYLLABUS, OFFICIAL_ISU_LOGO } from '../data/sampleData';
import {
  FileText,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Copy,
  Download,
  Printer,
  ChevronRight,
  Eye,
  Grid3X3,
  ListOrdered,
  BookOpen,
  Code2,
  RefreshCw,
  PlusCircle,
  ShieldCheck,
  FileCheck,
} from 'lucide-react';
import {
  syllabusToMarkdown,
  downloadJsonFile,
  downloadMarkdownFile,
  copyToClipboard,
  printDocument,
} from '../utils/exportUtils';
import { exportSyllabusToWord } from '../utils/wordExport';
import { sanitizeUniversalExclusions } from '../utils/sanitizer';

interface SyllabusModuleProps {
  syllabi: CourseSyllabus[];
  setSyllabi: React.Dispatch<React.SetStateAction<CourseSyllabus[]>>;
  activeSyllabusId: string;
  setActiveSyllabusId: (id: string) => void;
  facultyProfile: FacultyProfile;
}

export const SyllabusModule: React.FC<SyllabusModuleProps> = ({
  syllabi,
  setSyllabi,
  activeSyllabusId,
  setActiveSyllabusId,
  facultyProfile,
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);
  const [viewSubTab, setViewSubTab] = useState<'overview' | 'matrix' | 'plan' | 'grading' | 'json' | 'markdown'>('overview');

  // Syllabus Generator Form State
  const [formData, setFormData] = useState({
    courseCode: 'IT INST 3 / MA INST 4',
    courseTitle: 'Data Science Analytics',
    program: 'BS Information Technology (Data Science Analytics)',
    chedCmo: 'CHED CMO No. 25, Series of 2015 (PSG for BSCS, BSIS, and BSIT)',
    creditUnits: '3 Units',
    lectureHours: 1,
    labHours: 3,
    prerequisites: 'CS 111 - Introduction to Computing',
    focusTopics: 'Overview of Data, MS Excel Data Analytics Tools, Formulas & Functions, Pivot Tables, Data Cleaning, Visualization, Predictive Analytics, and Data Privacy Act compliance.',
    institutionalOutcomesPreset: 'Standard Polytechnic & State University OBE Model',
  });

  const activeSyllabus = syllabi.find((s) => s.id === activeSyllabusId) || syllabi[0] || SAMPLE_INITIAL_SYLLABUS;

  const handleCmoPresetChange = (presetProgram: string) => {
    const found = CHED_CMO_PRESETS.find((p) => p.program === presetProgram);
    if (found) {
      setFormData((prev) => ({
        ...prev,
        program: found.program,
        chedCmo: found.cmo,
      }));
    }
  };

  const handleGenerateSyllabus = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setGenerationError(null);

    try {
      const response = await fetch('/api/generate/syllabus', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          college: facultyProfile.college,
          department: facultyProfile.department,
          academicYear: facultyProfile.academicYear,
          semester: facultyProfile.semester,
          instructorName: facultyProfile.name,
        }),
      });

      const result = await response.json();
      if (!result.success || !result.data) {
        throw new Error(result.error || 'Failed to generate syllabus.');
      }

      const generatedData: CourseSyllabus = {
        ...result.data,
        id: `syl-${Date.now()}`,
        createdAt: new Date().toISOString(),
        lastUpdated: new Date().toISOString(),
      };

      const sanitized = sanitizeUniversalExclusions(generatedData);
      setSyllabi((prev) => [sanitized, ...prev]);
      setActiveSyllabusId(sanitized.id);
      setViewSubTab('overview');
    } catch (err: any) {
      console.error(err);
      setGenerationError(err.message || 'Generation failed. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyMarkdown = () => {
    if (!activeSyllabus) return;
    const md = syllabusToMarkdown(activeSyllabus);
    copyToClipboard(md).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2500);
    });
  };

  return (
    <div className="space-y-8">
      {/* Module Title Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 text-[11px] font-bold bg-emerald-100 text-emerald-800 rounded">
                MODULE 1
              </span>
              <h2 className="text-xl font-bold text-slate-900">
                Outcomes-Based Education (OBE) Course Syllabus Generator
              </h2>
            </div>
            <p className="text-sm text-slate-600 mt-1">
              Drafts rigorous OBE syllabi mapped to CHED Memorandum Orders (CMO), Program Outcomes (POs), 
              Course Learning Outcomes (CLOs), Bloom-ranked LILOs, and 18-week course plans.
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid: Generator Input Form & Library */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Form & Syllabi Selector */}
        <div className="lg:col-span-5 space-y-6">
          {/* Syllabus Generator Card */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2 mb-4 pb-2 border-b border-slate-100">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              AI Syllabus Drafting Engine
            </h3>

            {generationError && (
              <div className="mb-4 p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                <span>{generationError}</span>
              </div>
            )}

            <form onSubmit={handleGenerateSyllabus} className="space-y-4 text-xs">
              <div>
                <label className="block font-medium text-slate-700 mb-1">
                  CHED CMO & Program Preset
                </label>
                <select
                  value={formData.program}
                  onChange={(e) => handleCmoPresetChange(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white text-slate-800"
                >
                  {CHED_CMO_PRESETS.map((p) => (
                    <option key={p.program} value={p.program}>
                      {p.program} — {p.cmo.split('(')[0]}
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-slate-500 mt-0.5 italic">
                  Ref: {formData.chedCmo}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-1">
                  <label className="block font-medium text-slate-700 mb-1">
                    Course Code
                  </label>
                  <input
                    type="text"
                    value={formData.courseCode}
                    onChange={(e) => setFormData({ ...formData, courseCode: e.target.value })}
                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded-md"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label className="block font-medium text-slate-700 mb-1">
                    Course Title
                  </label>
                  <input
                    type="text"
                    value={formData.courseTitle}
                    onChange={(e) => setFormData({ ...formData, courseTitle: e.target.value })}
                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded-md"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">
                    Credit Units
                  </label>
                  <input
                    type="text"
                    value={formData.creditUnits}
                    onChange={(e) => setFormData({ ...formData, creditUnits: e.target.value })}
                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">
                    Lec Hrs/Wk
                  </label>
                  <input
                    type="number"
                    value={formData.lectureHours}
                    onChange={(e) => setFormData({ ...formData, lectureHours: Number(e.target.value) })}
                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded-md"
                    min={0}
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">
                    Lab Hrs/Wk
                  </label>
                  <input
                    type="number"
                    value={formData.labHours}
                    onChange={(e) => setFormData({ ...formData, labHours: Number(e.target.value) })}
                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded-md"
                    min={0}
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">
                  Prerequisites
                </label>
                <input
                  type="text"
                  value={formData.prerequisites}
                  onChange={(e) => setFormData({ ...formData, prerequisites: e.target.value })}
                  className="w-full px-2.5 py-1.5 border border-slate-300 rounded-md"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">
                  Faculty Topic Directives & Focus Directives
                </label>
                <textarea
                  rows={3}
                  value={formData.focusTopics}
                  onChange={(e) => setFormData({ ...formData, focusTopics: e.target.value })}
                  placeholder="Key competencies, technologies, industry frameworks..."
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
                    <span>Synthesizing OBE Syllabus with CHED CMO...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Generate Complete 18-Week OBE Syllabus</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Saved Syllabi Selector */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
            <h4 className="font-semibold text-xs text-slate-700 uppercase tracking-wider mb-3">
              Saved Syllabus Repository ({syllabi.length})
            </h4>
            <div className="space-y-2">
              {syllabi.map((s) => (
                <div
                  key={s.id}
                  onClick={() => setActiveSyllabusId(s.id)}
                  className={`p-3 rounded-lg border text-xs cursor-pointer transition flex items-center justify-between ${
                    activeSyllabus.id === s.id
                      ? 'border-emerald-500 bg-emerald-50/60 font-medium text-emerald-950'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div>
                    <div className="font-bold flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{s.headerInfo.courseCode}: {s.headerInfo.courseTitle}</span>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      {s.headerInfo.program} • {s.coursePlan?.length || 18} Weeks
                    </div>
                  </div>
                  {activeSyllabus.id === s.id && (
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                      Active
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Syllabus Document Viewer & Alignment Matrices */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            {/* Viewer Header and Action Controls */}
            <div className="p-4 bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs text-emerald-400 font-mono font-semibold">
                  {activeSyllabus.headerInfo.courseCode}
                </span>
                <h3 className="text-base font-bold text-white">
                  {activeSyllabus.headerInfo.courseTitle}
                </h3>
                <p className="text-xs text-slate-400">
                  {activeSyllabus.headerInfo.program} | {activeSyllabus.headerInfo.chedCmo}
                </p>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={handleCopyMarkdown}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 transition cursor-pointer"
                  title="Copy full syllabus as Markdown"
                >
                  <Copy className="w-3.5 h-3.5" />
                  {copySuccess ? 'Copied!' : 'Copy MD'}
                </button>
                <button
                  onClick={() => downloadMarkdownFile(`${activeSyllabus.headerInfo.courseCode}_Syllabus.md`, syllabusToMarkdown(activeSyllabus))}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 transition cursor-pointer"
                  title="Download Markdown"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>.MD</span>
                </button>
                <button
                  onClick={() => downloadJsonFile(`${activeSyllabus.headerInfo.courseCode}_Syllabus.json`, activeSyllabus)}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 transition cursor-pointer"
                  title="Download JSON structure"
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>JSON</span>
                </button>
                <button
                  onClick={() => exportSyllabusToWord(activeSyllabus)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-blue-700 hover:bg-blue-600 text-xs font-semibold text-white transition cursor-pointer shadow-sm"
                  title="Download Microsoft Word document (.docx)"
                >
                  <FileCheck className="w-3.5 h-3.5" />
                  <span>Word (.docx)</span>
                </button>
                <button
                  onClick={() => printDocument('printable-syllabus-content', `${activeSyllabus.headerInfo.courseCode}_Syllabus`)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-emerald-700 hover:bg-emerald-600 text-xs font-semibold text-white transition cursor-pointer shadow-sm"
                  title="Print / Save as PDF"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print PDF</span>
                </button>
              </div>
            </div>

            {/* Sub-Tabs Navigation */}
            <div className="border-b border-slate-200 bg-slate-50 px-4 flex space-x-2 overflow-x-auto text-xs">
              <button
                onClick={() => setViewSubTab('overview')}
                className={`py-2.5 px-3 font-medium border-b-2 cursor-pointer transition flex items-center gap-1.5 ${
                  viewSubTab === 'overview'
                    ? 'border-emerald-600 text-emerald-700 font-bold'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                Course Info & Outcomes
              </button>

              <button
                onClick={() => setViewSubTab('matrix')}
                className={`py-2.5 px-3 font-medium border-b-2 cursor-pointer transition flex items-center gap-1.5 ${
                  viewSubTab === 'matrix'
                    ? 'border-emerald-600 text-emerald-700 font-bold'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                <Grid3X3 className="w-3.5 h-3.5" />
                CLO-to-PO Alignment Matrix
              </button>

              <button
                onClick={() => setViewSubTab('plan')}
                className={`py-2.5 px-3 font-medium border-b-2 cursor-pointer transition flex items-center gap-1.5 ${
                  viewSubTab === 'plan'
                    ? 'border-emerald-600 text-emerald-700 font-bold'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                <ListOrdered className="w-3.5 h-3.5" />
                18-Week Course Plan & LILOs
              </button>

              <button
                onClick={() => setViewSubTab('grading')}
                className={`py-2.5 px-3 font-medium border-b-2 cursor-pointer transition flex items-center gap-1.5 ${
                  viewSubTab === 'grading'
                    ? 'border-emerald-600 text-emerald-700 font-bold'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                Assessment & References
              </button>

              <button
                onClick={() => setViewSubTab('json')}
                className={`py-2.5 px-3 font-medium border-b-2 cursor-pointer transition flex items-center gap-1.5 ${
                  viewSubTab === 'json'
                    ? 'border-emerald-600 text-emerald-700 font-bold'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                <Code2 className="w-3.5 h-3.5" />
                Structured JSON
              </button>
            </div>

            {/* Sub-Tab Content */}
            <div id="printable-syllabus-content" className="p-6">
              {/* Tab 1: Overview */}
              {viewSubTab === 'overview' && (
                <div className="space-y-6 text-sm">
                  {/* Clean Institutional Header Box (Guaranteed no forbidden terms) */}
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-xs space-y-3">
                    <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
                      <img
                        src={OFFICIAL_ISU_LOGO}
                        alt="University Logo"
                        className="w-12 h-12 object-contain rounded-full shadow-xs shrink-0"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-extrabold text-sm text-emerald-950 uppercase tracking-wide">
                            ISABELA STATE UNIVERSITY
                          </span>
                          <span className="text-slate-500 font-mono text-[11px]">
                            {activeSyllabus.headerInfo.semester}, A.Y. {activeSyllabus.headerInfo.academicYear}
                          </span>
                        </div>
                        <p className="font-semibold text-slate-700 text-xs">
                          {activeSyllabus.headerInfo.college}
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-slate-600">
                      <div>
                        <span className="block text-[10px] text-slate-400 uppercase">Department</span>
                        <span className="font-medium text-slate-800">{activeSyllabus.headerInfo.department}</span>
                      </div>
                      <div>
                        <span className="block text-[10px] text-slate-400 uppercase">Credit Units</span>
                        <span className="font-medium text-slate-800">{activeSyllabus.headerInfo.creditUnits}</span>
                      </div>
                      <div>
                        <span className="block text-[10px] text-slate-400 uppercase">Prerequisites</span>
                        <span className="font-medium text-slate-800">{activeSyllabus.headerInfo.prerequisites || 'None'}</span>
                      </div>
                      <div>
                        <span className="block text-[10px] text-slate-400 uppercase">Instructor</span>
                        <span className="font-medium text-slate-800">{activeSyllabus.headerInfo.instructorName}</span>
                      </div>
                    </div>
                  </div>

                  {/* Institutional Philosophy & Framework */}
                  {activeSyllabus.vision && (
                    <div className="bg-emerald-50/40 border border-emerald-200/80 rounded-lg p-3.5 space-y-2.5 text-xs">
                      <div>
                        <span className="font-bold text-emerald-900 uppercase tracking-wide text-[11px] block">
                          University Vision
                        </span>
                        <p className="text-slate-800 italic mt-0.5">{activeSyllabus.vision}</p>
                      </div>

                      {activeSyllabus.mission && (
                        <div className="border-t border-emerald-200/60 pt-2">
                          <span className="font-bold text-emerald-900 uppercase tracking-wide text-[11px] block">
                            University Mission
                          </span>
                          <p className="text-slate-800 italic mt-0.5">{activeSyllabus.mission}</p>
                        </div>
                      )}

                      {activeSyllabus.qualityPolicy && (
                        <div className="border-t border-emerald-200/60 pt-2">
                          <span className="font-bold text-emerald-900 uppercase tracking-wide text-[11px] block mb-1">
                            Quality Policy & Quality Objectives
                          </span>
                          <ul className="space-y-0.5 text-slate-700 text-[11px]">
                            {activeSyllabus.qualityPolicy.map((qp, i) => (
                              <li key={i}>{qp}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}

                  {activeSyllabus.goalsOfCollege && (
                    <div className="border border-slate-200 rounded-lg p-3 bg-white text-xs">
                      <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-1.5 text-emerald-800">
                        Goals of the College
                      </h4>
                      <ul className="list-disc list-inside space-y-1 text-slate-700 text-[11px]">
                        {activeSyllabus.goalsOfCollege.map((goal, i) => (
                          <li key={i}>{goal}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div>
                    <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-2 text-emerald-800">
                      I. Course Description
                    </h4>
                    <p className="text-slate-700 leading-relaxed text-xs sm:text-sm bg-slate-50/50 p-3 rounded border border-slate-100">
                      {activeSyllabus.courseDescription}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-2 text-emerald-800">
                      II. General Course Objectives
                    </h4>
                    <ul className="list-disc list-inside space-y-1.5 text-xs text-slate-700">
                      {activeSyllabus.courseObjectives.map((obj, i) => (
                        <li key={i} className="leading-relaxed">
                          {obj}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-2 text-emerald-800">
                      III. Institutional Outcomes (IOs) & Graduate Attributes (GAs)
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      <div className="border border-slate-200 rounded-lg p-3 bg-white space-y-2">
                        <span className="font-bold text-slate-800 text-[11px] uppercase block">
                          Institutional Outcomes (IO)
                        </span>
                        {activeSyllabus.institutionalOutcomes?.map((io) => (
                          <div key={io.code} className="border-l-2 border-emerald-500 pl-2">
                            <span className="font-bold text-emerald-800">{io.code}: {io.title}</span>
                            <p className="text-[11px] text-slate-600">{io.description}</p>
                          </div>
                        ))}
                      </div>

                      <div className="border border-slate-200 rounded-lg p-3 bg-white space-y-2">
                        <span className="font-bold text-slate-800 text-[11px] uppercase block">
                          Graduate Attributes (GA)
                        </span>
                        {activeSyllabus.graduateAttributes?.map((ga) => (
                          <div key={ga.code} className="border-l-2 border-teal-500 pl-2">
                            <span className="font-bold text-teal-800">{ga.code}: {ga.title}</span>
                            <p className="text-[11px] text-slate-600">{ga.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-2 text-emerald-800">
                      IV. Program Outcomes (POs) — {activeSyllabus.headerInfo.chedCmo}
                    </h4>
                    <div className="space-y-1.5 text-xs">
                      {activeSyllabus.programOutcomes.map((po) => (
                        <div key={po.code} className="flex items-start gap-2 p-2 rounded bg-slate-50 border border-slate-100">
                          <span className="font-bold text-emerald-700 font-mono shrink-0">
                            {po.code}
                          </span>
                          <span className="text-slate-700">{po.statement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: CLO-to-PO Alignment Matrix */}
              {viewSubTab === 'matrix' && (
                <div className="space-y-6 text-xs">
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-1 text-emerald-800">
                      Course Learning Outcomes (CLOs) Defined
                    </h4>
                    <p className="text-slate-500 mb-3 text-[11px]">
                      Outcomes-based action statements mapped with Bloom's Taxonomy.
                    </p>
                    <div className="space-y-2">
                      {activeSyllabus.courseLearningOutcomes.map((clo) => (
                        <div key={clo.code} className="p-3 rounded-lg border border-slate-200 bg-white">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                              {clo.code}
                            </span>
                            <span className="font-medium text-slate-800">{clo.statement}</span>
                          </div>
                          {clo.gaCodes && clo.gaCodes.length > 0 && (
                            <div className="text-[10px] text-slate-500 mt-1">
                              Mapped Attributes: <span className="text-teal-700 font-semibold">{clo.gaCodes.join(', ')}</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-2 text-emerald-800">
                      CLO-to-PO Curriculum Alignment Matrix
                    </h4>
                    <div className="overflow-x-auto border border-slate-200 rounded-lg">
                      <table className="min-w-full divide-y divide-slate-200 text-xs">
                        <thead className="bg-slate-100 font-bold text-slate-700">
                          <tr>
                            <th className="px-3 py-2 text-left">Course Learning Outcome</th>
                            {activeSyllabus.programOutcomes.map((po) => (
                              <th key={po.code} className="px-2 py-2 text-center" title={po.statement}>
                                {po.code}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 bg-white">
                          {activeSyllabus.courseLearningOutcomes.map((clo) => (
                            <tr key={clo.code} className="hover:bg-slate-50/80">
                              <td className="px-3 py-2 font-medium text-slate-800 max-w-xs">
                                <span className="font-bold text-emerald-700 mr-1">{clo.code}:</span>
                                <span className="text-[11px] text-slate-600 line-clamp-2">{clo.statement}</span>
                              </td>
                              {activeSyllabus.programOutcomes.map((po) => {
                                const mapping = clo.poMapping.find((m) => m.poCode === po.code);
                                const level = mapping ? mapping.level : '-';
                                return (
                                  <td key={po.code} className="px-2 py-2 text-center">
                                    <span
                                      className={`inline-block w-6 h-6 leading-6 rounded font-bold text-xs ${
                                        level === 'I'
                                          ? 'bg-blue-100 text-blue-700'
                                          : level === 'E'
                                          ? 'bg-amber-100 text-amber-800'
                                          : level === 'D'
                                          ? 'bg-emerald-100 text-emerald-800'
                                          : 'text-slate-300'
                                      }`}
                                    >
                                      {level}
                                    </span>
                                  </td>
                                );
                              })}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="mt-2 flex items-center gap-4 text-[11px] text-slate-600">
                      <span className="font-semibold">Legend:</span>
                      <span className="inline-flex items-center gap-1">
                        <span className="w-3.5 h-3.5 rounded bg-blue-100 text-blue-800 text-center font-bold text-[10px]">I</span> Introduced
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <span className="w-3.5 h-3.5 rounded bg-amber-100 text-amber-800 text-center font-bold text-[10px]">E</span> Enabled
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <span className="w-3.5 h-3.5 rounded bg-emerald-100 text-emerald-800 text-center font-bold text-[10px]">D</span> Demonstrated
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 3: 18-Week Course Plan & LILOs */}
              {viewSubTab === 'plan' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-emerald-800">
                      18-Week Outcomes-Based Learning Plan & LILO Matrix
                    </h4>
                    <span className="text-xs text-slate-500 font-medium">
                      {activeSyllabus.coursePlan.length} Scheduled Modules
                    </span>
                  </div>

                  <div className="space-y-3">
                    {activeSyllabus.coursePlan.map((week) => (
                      <div
                        key={week.weekNumber}
                        className={`border rounded-lg p-3 text-xs ${
                          week.weekNumber === 9 || week.weekNumber === 18
                            ? 'border-amber-300 bg-amber-50/30'
                            : 'border-slate-200 bg-white'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-2 mb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-xs bg-slate-800 text-white px-2 py-0.5 rounded font-mono">
                              {week.weekRange}
                            </span>
                            <span className="font-bold text-slate-900 text-sm">
                              {week.topic}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            {week.cloCodes.map((code) => (
                              <span
                                key={code}
                                className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded"
                              >
                                {code}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          {/* LILOs */}
                          <div>
                            <span className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                              Lesson Learning Outcomes (LILOs)
                            </span>
                            <ul className="list-disc list-inside space-y-1 text-slate-700 text-[11px]">
                              {week.lilos.map((lilo, i) => (
                                <li key={i}>{lilo}</li>
                              ))}
                            </ul>
                          </div>

                          {/* TLAs */}
                          <div>
                            <span className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                              Teaching-Learning Activities (TLAs)
                            </span>
                            <div className="space-y-1 text-[11px]">
                              {week.tlas.map((tla, i) => (
                                <div key={i} className="flex items-start gap-1">
                                  <span className="text-[9px] uppercase px-1 py-0.2 rounded font-semibold bg-slate-100 text-slate-700 shrink-0">
                                    {tla.modality}
                                  </span>
                                  <span className="text-slate-700">{tla.activity}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* ATs & Resources */}
                          <div>
                            <span className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                              Assessment Tasks (ATs)
                            </span>
                            <ul className="list-disc list-inside space-y-1 text-slate-700 text-[11px]">
                              {week.ats.map((at, i) => (
                                <li key={i}>{at}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 4: Grading System & References */}
              {viewSubTab === 'grading' && (
                <div className="space-y-6 text-xs">
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-2 text-emerald-800">
                      Assessment & Grading Policy
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="border border-slate-200 rounded-lg p-4 bg-slate-50">
                        <span className="font-bold text-slate-800 block text-xs mb-2">Weight Distribution</span>
                        <div className="flex gap-4">
                          <div className="text-center p-3 rounded bg-white border border-slate-200 flex-1">
                            <span className="text-2xl font-bold text-emerald-700">
                              {activeSyllabus.assessmentGradingSystem.lectureWeight}%
                            </span>
                            <span className="block text-[11px] text-slate-500">Lecture Component</span>
                          </div>
                          {activeSyllabus.assessmentGradingSystem.labWeight && (
                            <div className="text-center p-3 rounded bg-white border border-slate-200 flex-1">
                              <span className="text-2xl font-bold text-teal-700">
                                {activeSyllabus.assessmentGradingSystem.labWeight}%
                              </span>
                              <span className="block text-[11px] text-slate-500">Laboratory Component</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="border border-slate-200 rounded-lg p-4 bg-white">
                        <span className="font-bold text-slate-800 block text-xs mb-2">Scoring Components</span>
                        <div className="space-y-1.5">
                          {activeSyllabus.assessmentGradingSystem.components.map((c, i) => (
                            <div key={i} className="flex items-center justify-between py-1 border-b border-slate-100 last:border-none">
                              <span className="text-slate-700">{c.name}</span>
                              <span className="font-bold text-slate-900">{c.percentage}%</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    {activeSyllabus.gradingFormula && (
                      <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200 flex items-center justify-between">
                        <span className="font-semibold text-slate-700">Official Grading Formula:</span>
                        <code className="font-mono font-bold text-emerald-900 bg-white px-2 py-1 rounded border border-emerald-300">
                          {activeSyllabus.gradingFormula}
                        </code>
                      </div>
                    )}

                    {/* Grade Equivalents */}
                    <div className="border border-slate-200 rounded-lg p-3 bg-white">
                      <span className="font-bold text-slate-800 block text-xs mb-2 uppercase text-emerald-800">
                        University Grade Equivalents
                      </span>
                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
                        <div className="p-1.5 rounded bg-slate-50 border"><strong>98-100:</strong> 1.00</div>
                        <div className="p-1.5 rounded bg-slate-50 border"><strong>95-97:</strong> 1.25</div>
                        <div className="p-1.5 rounded bg-slate-50 border"><strong>92-94:</strong> 1.50</div>
                        <div className="p-1.5 rounded bg-slate-50 border"><strong>89-91:</strong> 1.75</div>
                        <div className="p-1.5 rounded bg-slate-50 border"><strong>86-88:</strong> 2.00</div>
                        <div className="p-1.5 rounded bg-slate-50 border"><strong>83-85:</strong> 2.25</div>
                        <div className="p-1.5 rounded bg-slate-50 border"><strong>80-82:</strong> 2.50</div>
                        <div className="p-1.5 rounded bg-slate-50 border"><strong>77-79:</strong> 2.75</div>
                        <div className="p-1.5 rounded bg-emerald-50 border border-emerald-200 text-emerald-900 font-bold"><strong>75-76:</strong> 3.00</div>
                        <div className="p-1.5 rounded bg-rose-50 border border-rose-200 text-rose-800 font-bold"><strong>Below 75:</strong> 5.00</div>
                      </div>
                    </div>

                    {/* Classroom AI Policy for Student Assessment (BOR No. 66, Series of 2026) */}
                    {activeSyllabus.aiPolicy && (
                      <div className="border border-amber-300 bg-amber-50/40 rounded-lg p-4 space-y-2">
                        <div className="flex items-center justify-between border-b border-amber-200 pb-2">
                          <span className="font-bold text-amber-950 uppercase text-xs">
                            {activeSyllabus.aiPolicy.policyName}
                          </span>
                          <span className="text-[11px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                            Threshold: 25% Max
                          </span>
                        </div>
                        <p className="text-slate-700 italic text-[11px]">{activeSyllabus.aiPolicy.threshold}</p>
                        <div className="space-y-1.5 pt-1">
                          {activeSyllabus.aiPolicy.tiers.map((tier, i) => (
                            <div key={i} className="p-2 rounded bg-white border border-amber-200 text-slate-800 text-[11px]">
                              <strong className="text-amber-900 block mb-0.5">{tier.tier}</strong>
                              <span>{tier.description}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Target SDGs */}
                    {activeSyllabus.sdgs && (
                      <div className="border border-slate-200 rounded-lg p-3 bg-white space-y-2">
                        <span className="font-bold text-slate-800 block text-xs uppercase text-emerald-800">
                          Target Sustainable Development Goals (SDGs)
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                          {activeSyllabus.sdgs.map((sdg) => (
                            <div key={sdg.code} className="p-2 rounded bg-slate-50 border border-slate-100">
                              <span className="font-bold text-emerald-800">{sdg.code} - {sdg.title}</span>
                              <p className="text-[11px] text-slate-600 mt-0.5">{sdg.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-2 text-emerald-800">
                      References & Resource Materials
                    </h4>
                    <div className="space-y-3">
                      {activeSyllabus.references.map((ref, idx) => (
                        <div key={idx} className="border border-slate-200 rounded-lg p-3 bg-white">
                          <span className="font-bold text-slate-800 text-xs block mb-1.5 text-emerald-900">
                            {ref.category}
                          </span>
                          <ol className="list-decimal list-inside space-y-1 text-slate-700 text-[11px]">
                            {ref.items.map((item, i) => (
                              <li key={i}>{item}</li>
                            ))}
                          </ol>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 5: Structured JSON */}
              {viewSubTab === 'json' && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-slate-500 font-mono">Structured JSON Output for Template Engines</span>
                    <button
                      onClick={() => {
                        copyToClipboard(JSON.stringify(activeSyllabus, null, 2));
                        setCopySuccess(true);
                        setTimeout(() => setCopySuccess(false), 2000);
                      }}
                      className="text-xs text-emerald-700 hover:text-emerald-800 font-semibold cursor-pointer"
                    >
                      {copySuccess ? 'Copied JSON!' : 'Copy Raw JSON'}
                    </button>
                  </div>
                  <pre className="bg-slate-950 text-slate-200 p-4 rounded-lg overflow-x-auto text-[11px] font-mono max-h-96">
                    {JSON.stringify(activeSyllabus, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
