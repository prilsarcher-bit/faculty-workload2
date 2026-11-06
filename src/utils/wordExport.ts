import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  HeadingLevel,
  WidthType,
  AlignmentType,
  BorderStyle,
} from 'docx';
import {
  CourseSyllabus,
  AccomplishmentReport,
  LearnerActivityReport,
} from '../types';
import { sanitizeUniversalExclusions } from './sanitizer';

// Helper to download a Blob
function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// 1. Export Course Syllabus to Word (.docx)
export async function exportSyllabusToWord(syllabus: CourseSyllabus): Promise<void> {
  const s = sanitizeUniversalExclusions(syllabus);
  const h = s.headerInfo;

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            text: 'ISABELA STATE UNIVERSITY',
            heading: HeadingLevel.HEADING_1,
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({
            text: `${h.college || 'College of Computing Studies, Information and Communication Technology'}`,
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({
            text: `COURSE SYLLABUS: ${h.courseCode} - ${h.courseTitle}`,
            heading: HeadingLevel.HEADING_2,
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({
            text: `Academic Term: ${h.semester}, A.Y. ${h.academicYear} | Instructor: ${h.instructorName}`,
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({ text: '' }),

          // Course Info
          new Paragraph({
            text: 'I. COURSE DETAILS',
            heading: HeadingLevel.HEADING_3,
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Program: ', bold: true }),
              new TextRun(h.program),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Credit Units: ', bold: true }),
              new TextRun(h.creditUnits),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Prerequisites: ', bold: true }),
              new TextRun(h.prerequisites || 'None'),
            ],
          }),
          new Paragraph({ text: '' }),

          // Course Description
          new Paragraph({
            text: 'II. COURSE DESCRIPTION',
            heading: HeadingLevel.HEADING_3,
          }),
          new Paragraph({ text: s.courseDescription }),
          new Paragraph({ text: '' }),

          // Course Objectives
          new Paragraph({
            text: 'III. GENERAL COURSE OBJECTIVES',
            heading: HeadingLevel.HEADING_3,
          }),
          ...s.courseObjectives.map(
            (obj, idx) =>
              new Paragraph({
                text: `${idx + 1}. ${obj}`,
              })
          ),
          new Paragraph({ text: '' }),

          // Course Learning Outcomes
          new Paragraph({
            text: 'IV. COURSE LEARNING OUTCOMES (CLOs)',
            heading: HeadingLevel.HEADING_3,
          }),
          ...s.courseLearningOutcomes.map(
            (clo) =>
              new Paragraph({
                children: [
                  new TextRun({ text: `${clo.code}: `, bold: true }),
                  new TextRun(clo.statement),
                ],
              })
          ),
          new Paragraph({ text: '' }),

          // Course Plan Table
          new Paragraph({
            text: 'V. 18-WEEK COURSE PLAN & OBE LEARNING MATRIX',
            heading: HeadingLevel.HEADING_3,
          }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Week', bold: true })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Topic / Content Module', bold: true })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Lesson Learning Outcomes (LILOs)', bold: true })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Assessment Tasks (ATs)', bold: true })] })] }),
                ],
              }),
              ...s.coursePlan.map(
                (w) =>
                  new TableRow({
                    children: [
                      new TableCell({ children: [new Paragraph(w.weekRange)] }),
                      new TableCell({ children: [new Paragraph(w.topic)] }),
                      new TableCell({ children: [new Paragraph(w.lilos.join('\n• '))] }),
                      new TableCell({ children: [new Paragraph(w.ats.join('\n• '))] }),
                    ],
                  })
              ),
            ],
          }),
          new Paragraph({ text: '' }),

          // Grading
          new Paragraph({
            text: 'VI. ASSESSMENT & GRADING SYSTEM',
            heading: HeadingLevel.HEADING_3,
          }),
          ...(s.gradingFormula ? [new Paragraph({ text: `Formula: ${s.gradingFormula}` })] : []),
          new Paragraph({
            text: `Lecture Weight: ${s.assessmentGradingSystem.lectureWeight}% | Laboratory Weight: ${s.assessmentGradingSystem.labWeight || 0}%`,
          }),
          ...s.assessmentGradingSystem.components.map(
            (c) => new Paragraph({ text: `• ${c.name}: ${c.percentage}%` })
          ),
          new Paragraph({ text: '' }),

          // Signatories
          new Paragraph({
            text: 'Prepared by: ' + h.instructorName,
            alignment: AlignmentType.LEFT,
          }),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  downloadBlob(blob, `${h.courseCode || 'Course'}_Syllabus.docx`);
}

// 2. Export Accomplishment Report to Word (.docx)
export async function exportAccomplishmentReportToWord(ar: AccomplishmentReport): Promise<void> {
  const a = sanitizeUniversalExclusions(ar);
  const h = a.header;

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            text: 'ISABELA STATE UNIVERSITY',
            heading: HeadingLevel.HEADING_1,
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({
            text: 'Cauayan Campus, Cauayan City',
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({
            text: `Accomplishment Report for the ${h.period}`,
            heading: HeadingLevel.HEADING_2,
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({
            text: `Faculty Member: ${h.facultyName} (${h.academicRank || 'Faculty'}) | Department: ${h.department}`,
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({ text: '' }),

          // Executive Summary
          new Paragraph({
            text: 'EXECUTIVE SUMMARY',
            heading: HeadingLevel.HEADING_3,
          }),
          new Paragraph({ text: a.executiveSummary }),
          new Paragraph({ text: '' }),

          // Monthly Grid Table if present
          ...(a.dailyLogs && a.dailyLogs.length > 0
            ? [
                new Paragraph({
                  text: 'MONTHLY TEACHING & ACADEMIC LOGS',
                  heading: HeadingLevel.HEADING_3,
                }),
                new Table({
                  width: { size: 100, type: WidthType.PERCENTAGE },
                  rows: [
                    new TableRow({
                      children: [
                        new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Date', bold: true })] })] }),
                        new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Day', bold: true })] })] }),
                        new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Time', bold: true })] })] }),
                        new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Course', bold: true })] })] }),
                        new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Lec', bold: true })] })] }),
                        new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Lab', bold: true })] })] }),
                        new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Accomplishments', bold: true })] })] }),
                        new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Remarks', bold: true })] })] }),
                      ],
                    }),
                    ...a.dailyLogs.map(
                      (row) =>
                        new TableRow({
                          children: [
                            new TableCell({ children: [new Paragraph(row.date)] }),
                            new TableCell({ children: [new Paragraph(row.day)] }),
                            new TableCell({ children: [new Paragraph(row.time)] }),
                            new TableCell({ children: [new Paragraph(row.course)] }),
                            new TableCell({ children: [new Paragraph(String(row.lecHours))] }),
                            new TableCell({ children: [new Paragraph(String(row.labHours))] }),
                            new TableCell({ children: [new Paragraph(row.accomplishments)] }),
                            new TableCell({ children: [new Paragraph(row.remarks)] }),
                          ],
                        })
                    ),
                    new TableRow({
                      children: [
                        new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'TOTAL', bold: true })] })] }),
                        new TableCell({ children: [new Paragraph('')] }),
                        new TableCell({ children: [new Paragraph('')] }),
                        new TableCell({ children: [new Paragraph('')] }),
                        new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: String(a.totalLecHours ?? a.dailyLogs.reduce((s, r) => s + r.lecHours, 0)), bold: true })] })] }),
                        new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: String(a.totalLabHours ?? a.dailyLogs.reduce((s, r) => s + r.labHours, 0)), bold: true })] })] }),
                        new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: `${(a.totalLecHours ?? a.dailyLogs.reduce((s, r) => s + r.lecHours, 0)) + (a.totalLabHours ?? a.dailyLogs.reduce((s, r) => s + r.labHours, 0))} Total Teaching Hours`, bold: true })] })] }),
                        new TableCell({ children: [new Paragraph('Accomplished')] }),
                      ],
                    }),
                  ],
                }),
                new Paragraph({ text: '' }),
              ]
            : []),

          // Signatories
          new Paragraph({ text: '' }),
          new Paragraph({
            text: 'Prepared by: ' + h.facultyName,
            alignment: AlignmentType.LEFT,
          }),
          new Paragraph({
            text: 'Approved by: ' + (a.signatories.approvedBy || 'Dean, CCSICT'),
            alignment: AlignmentType.LEFT,
          }),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  downloadBlob(blob, `Accomplishment_Report_${h.period.replace(/\s+/g, '_')}.docx`);
}

// 3. Export Learner's Activity Report (LAR) to Word (.docx)
export async function exportLARToWord(lar: LearnerActivityReport): Promise<void> {
  const l = sanitizeUniversalExclusions(lar);
  const h = l.header;

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            text: 'ISABELA STATE UNIVERSITY',
            heading: HeadingLevel.HEADING_1,
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({
            text: 'Cauayan Campus • Cauayan City, Isabela',
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({
            text: 'LEARNING ACTIVITY REPORT',
            heading: HeadingLevel.HEADING_2,
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({
            text: `1st SEMESTER A.Y. ${h.academicYear || '2026-2027'} | Doc Ref: ISUCYN-AA-LAR-046`,
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({ text: '' }),

          // Faculty Meta Table
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Name of Faculty', bold: true })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Rank', bold: true })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Designation', bold: true })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Total FTE', bold: true })] })] }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph(h.facultyName)] }),
                  new TableCell({ children: [new Paragraph(h.academicRank || 'INSTRUCTOR I')] }),
                  new TableCell({ children: [new Paragraph('CCSICT')] }),
                  new TableCell({ children: [new Paragraph('31')] }),
                ],
              }),
            ],
          }),
          new Paragraph({ text: '' }),

          // Daily Activity Table
          new Paragraph({
            text: `DAILY WFH ACCOMPLISHMENT RECORD: ${h.wfhDate} (${h.dayOfWeek}) - ${h.modality}`,
            heading: HeadingLevel.HEADING_3,
          }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'DATE', bold: true })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'SCHEDULE', bold: true })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'TOPIC(S) COVERED', bold: true })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'ACCOMPLISHMENT(S)', bold: true })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'HOURS', bold: true })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'MODALITY', bold: true })] })] }),
                ],
              }),
              ...l.classesReported.map(
                (cls) =>
                  new TableRow({
                    children: [
                      new TableCell({ children: [new Paragraph(h.wfhDate)] }),
                      new TableCell({ children: [new Paragraph(`${cls.timeSchedule}\n(${cls.courseCode})`)] }),
                      new TableCell({ children: [new Paragraph(cls.topicCovered)] }),
                      new TableCell({ children: [new Paragraph(cls.accomplishments.join('\n• '))] }),
                      new TableCell({ children: [new Paragraph('3')] }),
                      new TableCell({ children: [new Paragraph(h.modality)] }),
                    ],
                  })
              ),
            ],
          }),
          new Paragraph({ text: '' }),

          // Overall Day Summary
          new Paragraph({
            text: 'OVERALL DAY SUMMARY',
            heading: HeadingLevel.HEADING_3,
          }),
          new Paragraph({ text: l.overallDaySummary }),
          new Paragraph({ text: '' }),

          // Certification
          new Paragraph({
            children: [
              new TextRun({
                text: l.certificationText ||
                  'I hereby certify on my honor that the above report is a true and faithful record of the remote teaching and learning activities conducted on the specified Work-From-Home date.',
                italics: true,
              }),
            ],
          }),
          new Paragraph({ text: '' }),

          // Signatories
          new Paragraph({
            text: `Prepared by: ${l.signatories.facultyName} (Faculty)`,
          }),
          new Paragraph({
            text: `Noted by: ${l.signatories.departmentChair || 'AIMEE D. MOLATO, DIT'} (Program Chair)`,
          }),
          new Paragraph({
            text: `Approved by: ${l.signatories.collegeDean || 'ARNEL C. FAJARDO, PHD'} (Dean)`,
          }),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  downloadBlob(blob, `LAR_${h.wfhDate}.docx`);
}
