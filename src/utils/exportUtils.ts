import {
  CourseSyllabus,
  AccomplishmentReport,
  LearnerActivityReport,
} from '../types';
import { sanitizeUniversalExclusions } from './sanitizer';

export function syllabusToMarkdown(syllabus: CourseSyllabus): string {
  const s = sanitizeUniversalExclusions(syllabus);
  const h = s.headerInfo;

  let md = `# COURSE SYLLABUS: ${h.courseCode} - ${h.courseTitle}
${s.documentCode ? `**Document Code:** ${s.documentCode} | **Revision:** ${s.revisionNumber || 'Revision 01'}\n` : ''}
**Program:** ${h.program}  
**Reference CMO:** ${h.chedCmo || 'CHED CMO Compliant'}  
**Credit Units:** ${h.creditUnits} | **Prerequisites:** ${h.prerequisites || 'None'}  
**College:** ${h.college} | **Department:** ${h.department}  
**Academic Term:** ${h.semester}, A.Y. ${h.academicYear}  
**Faculty / Instructor:** ${h.instructorName}  

---

${s.vision ? `## VISION\n${s.vision}\n\n## MISSION\n${s.mission}\n\n` : ''}
${s.qualityPolicy ? `## QUALITY POLICY & OBJECTIVES\n${s.qualityPolicy.join('\n')}\n\n---\n\n` : ''}
${s.goalsOfCollege ? `## GOALS OF THE COLLEGE\n${s.goalsOfCollege.map((g) => `• ${g}`).join('\n')}\n\n---\n\n` : ''}
## I. COURSE DESCRIPTION
${s.courseDescription}

## II. COURSE OBJECTIVES
${s.courseObjectives.map((obj, i) => `${i + 1}. ${obj}`).join('\n')}

---

## III. INSTITUTIONAL OUTCOMES (IOs)
| Code | Title | Description |
| --- | --- | --- |
${s.institutionalOutcomes.map((io) => `| **${io.code}** | ${io.title} | ${io.description} |`).join('\n')}

---

## IV. GRADUATE ATTRIBUTES (GAs)
| Code | Title | Description |
| --- | --- | --- |
${s.graduateAttributes.map((ga) => `| **${ga.code}** | ${ga.title} | ${ga.description} |`).join('\n')}

---

## V. PROGRAM OUTCOMES (POs)
| Code | Statement of Program Outcome |
| --- | --- |
${s.programOutcomes.map((po) => `| **${po.code}** | ${po.statement} |`).join('\n')}

---

## VI. COURSE LEARNING OUTCOMES (CLOs)
| CLO Code | Course Learning Outcome Statement | Mapped GAs |
| --- | --- | --- |
${s.courseLearningOutcomes.map((clo) => `| **${clo.code}** | ${clo.statement} | ${clo.gaCodes?.join(', ') || 'N/A'} |`).join('\n')}

---

## VII. ALIGNMENT MATRIX 1: LILO - CLO - PO MAPPING
| Weeks | Lesson Intended Learning Outcomes (LILOs) | Aligned CLO | PO1 | PO2 | PO3 | PO4 |
| --- | --- | --- | --- | --- | --- | --- |
${s.coursePlan.map((w) => {
  const isOrientation = w.cloCodes.includes('Orientation');
  const clo1 = w.cloCodes.includes('CLO1');
  const clo2 = w.cloCodes.includes('CLO2');
  const clo3 = w.cloCodes.includes('CLO3');
  const clo4 = w.cloCodes.includes('CLO4');
  let po1 = '-', po2 = '-', po3 = '-', po4 = '-';
  if (isOrientation) { po1 = '-'; po2 = '-'; po3 = '-'; po4 = '-'; }
  else if (clo1) { po1 = 'I'; po2 = 'I'; po3 = 'I'; po4 = '-'; }
  else if (clo2) { po1 = '-'; po2 = 'E'; po3 = 'E'; po4 = 'I'; }
  else if (clo3) { po1 = 'E'; po2 = 'E'; po3 = 'D'; po4 = 'E'; }
  else if (clo4) { po1 = 'D'; po2 = 'D'; po3 = 'D'; po4 = 'D'; }
  return `| **${w.weekRange}** | ${w.lilos.join('<br>')} | ${w.cloCodes.join(', ')} | ${po1} | ${po2} | ${po3} | ${po4} |`;
}).join('\n')}

*(Legend: I - Introduced; E - Enabled; D - Demonstrated. Progression from exposure to guided practice, to evidence of performance)*

---

## VIII. ALIGNMENT MATRIX 2: CLO - GA - IO MAPPING
| Course Learning Outcomes | Aligned Graduate Attributes | I-PEN Cluster | Institutional Outcomes | Level |
| --- | --- | --- | --- | --- |
| **CLO1** | GA1, GA2 | Innovator | IO1 | I |
| **CLO2** | GA2, GA4 | Innovator / People | IO1, IO2 | E |
| **CLO3** | GA1, GA2 | Innovator | IO1 | D |
| **CLO4** | GA1, GA2, GA7 | Innovator / Entrepreneur | IO1, IO3 | D |

---

## VII. ASSESSMENT AND GRADING SYSTEM
- **Lecture Weight:** ${s.assessmentGradingSystem.lectureWeight}%
${s.assessmentGradingSystem.labWeight ? `- **Laboratory Weight:** ${s.assessmentGradingSystem.labWeight}%\n` : ''}

| Component | Percentage |
| --- | --- |
${s.assessmentGradingSystem.components.map((c) => `| ${c.name} | ${c.percentage}% |`).join('\n')}

---

${
  s.sdgs
    ? `## TARGET SUSTAINABLE DEVELOPMENT GOALS (SDGS)
| Goal | Institutional Description |
| --- | --- |
${s.sdgs.map((sdg) => `| **${sdg.code} - ${sdg.title}** | ${sdg.description} |`).join('\n')}

---
`
    : ''
}
${
  s.aiPolicy
    ? `## ${s.aiPolicy.policyName}
*${s.aiPolicy.threshold}*

${s.aiPolicy.tiers.map((t) => `### ${t.tier}\n${t.description}`).join('\n\n')}

---
`
    : ''
}
## VIII. COURSE PLAN & WEEK-BY-WEEK OBE LEARNING MATRIX
| Week | Topic / Content Module | Lesson Intended Learning Outcomes (LILOs) | Mapped CLOs | Teaching-Learning Activities (TLAs) | Assessment Tasks (ATs) | Learning Resources |
| --- | --- | --- | --- | --- | --- | --- |
${s.coursePlan
  .map(
    (w) =>
      `| **${w.weekRange}** | ${w.topic} | ${w.lilos.map((l) => `• ${l}`).join('<br>')} | ${w.cloCodes.join(', ')} | ${w.tlas.map((t) => `[${t.modality}] ${t.activity}`).join('<br>')} | ${w.ats.map((a) => `• ${a}`).join('<br>')} | ${w.resources?.join('<br>') || 'N/A'} |`
  )
  .join('\n')}

---

## IX. REFERENCES & LEARNING RESOURCES
${s.references
  .map(
    (ref) =>
      `### ${ref.category}\n${ref.items.map((item, i) => `${i + 1}. ${item}`).join('\n')}`
  )
  .join('\n\n')}

---
*Generated via Faculty Workload Portal OBE Engine.*
`;

  return sanitizeUniversalExclusions(md);
}

export function accomplishmentReportToMarkdown(ar: AccomplishmentReport): string {
  const a = sanitizeUniversalExclusions(ar);
  const h = a.header;

  let md = `# FACULTY ACCOMPLISHMENT REPORT
**Faculty Member:** ${h.facultyName}  
**Academic Rank:** ${h.academicRank || 'Faculty'}  
**Department:** ${h.department}  
**College:** ${h.college}  
**Reporting Period:** ${h.period} (${h.reportType})  
**Submission Date:** ${h.submissionDate}  

---

## EXECUTIVE SUMMARY
${a.executiveSummary}

---

## ACCOMPLISHMENTS BY STRATEGIC PILLAR

`;

  a.pillars.forEach((p, idx) => {
    md += `### ${p.pillarTitle}\n`;
    if (p.description) {
      md += `*${p.description}*\n\n`;
    }
    md += `| Item / Activity | Target Outputs | Means of Verification (MOV) | Timeline / Date | Remarks |\n`;
    md += `| --- | --- | --- | --- | --- |\n`;
    p.accomplishments.forEach((acc) => {
      md += `| ${acc.itemDescription} | ${acc.targetOutputs} | ${acc.meansOfVerification} | ${acc.timelineOrDate || 'As scheduled'} | ${acc.remarks || 'Completed'} |\n`;
    });
    md += `\n`;
  });

  if (a.challengesAndInterventions && a.challengesAndInterventions.length > 0) {
    md += `---

## CHALLENGES ENCOUNTERED & STRATEGIC INTERVENTIONS
| Challenge Encountered | Action Taken / Strategic Intervention | Impact / Outcome |
| --- | --- | --- |
${a.challengesAndInterventions.map((c) => `| ${c.challenge} | ${c.actionTaken} | ${c.impact || 'Resolved'} |`).join('\n')}

`;
  }

  md += `---

## SIGNATORIES
- **Prepared by:** ${a.signatories.preparedBy} (Faculty Member)
- **Verified by:** ${a.signatories.verifiedBy || 'Department Chair'}
- **Approved by:** ${a.signatories.approvedBy || 'College Dean'}

---
*Generated via Faculty Workload Portal.*
`;

  return sanitizeUniversalExclusions(md);
}

export function learningActivityReportToMarkdown(lar: LearnerActivityReport): string {
  const l = sanitizeUniversalExclusions(lar);
  const h = l.header;

  let md = `# LEARNING ACTIVITY REPORT
*(Work-From-Home / Remote Instructional Modality)*

**Faculty Name:** ${h.facultyName}  
**Academic Rank:** ${h.academicRank || 'Faculty'}  
**College:** ${h.college} | **Department:** ${h.department}  
**Academic Year:** ${h.academicYear} | **Term:** ${h.semester}  
**WFH Date:** ${h.wfhDate} (${h.dayOfWeek}) | **Semester Week:** Week ${h.weekNumber}  
**Instructional Modality:** ${h.modality}  

---

## I. CLASSES CONDUCTED & SYLLABUS-ALIGNED ACCOMPLISHMENTS

`;

  l.classesReported.forEach((cls, idx) => {
    md += `### Subject ${idx + 1}: ${cls.courseCode} - ${cls.courseTitle} (${cls.section})
- **Schedule Time:** ${cls.timeSchedule}  
- **Delivery Platform / LMS:** ${cls.platformUsed}  
- **Credit Units:** ${cls.creditUnits || '3 Units'}  
- **Student Engagement:** Enrolled: ${cls.studentEngagement.enrolledStudents} | Active: ${cls.studentEngagement.activeParticipants} ${cls.studentEngagement.submissionCount !== undefined ? `| Submissions: ${cls.studentEngagement.submissionCount}` : ''}  
- **Topic Covered:** **${cls.topicCovered}**  

#### Intended Learning Outcomes (LILOs) Addressed:
${cls.intendedLearningOutcomes?.map((ilo) => `• ${ilo}`).join('\n') || '• Syllabus aligned learning outcomes'}

#### Accomplishments & Learning Activities:
${cls.accomplishments.map((acc) => `• ${acc}`).join('\n')}

#### Means of Verification (MOV):
${cls.meansOfVerification.map((mov) => `• [MOV] ${mov}`).join('\n')}

${cls.remarksAndObservations ? `*Remarks/Observations:* ${cls.remarksAndObservations}\n` : ''}
---
`;
  });

  if (l.nonTeachingActivities && l.nonTeachingActivities.length > 0) {
    md += `## II. NON-TEACHING ACADEMIC & ADMINISTRATIVE ACTIVITIES (WFH)
| Time Slot | Activity Type | Description | Output / MOV |
| --- | --- | --- | --- |
${l.nonTeachingActivities.map((nta) => `| ${nta.timeSlot} | ${nta.activityType} | ${nta.description} | ${nta.outputOrMOV} |`).join('\n')}

---
`;
  }

  md += `## III. OVERALL DAY SYNTHESIS
${l.overallDaySummary}

---

## IV. CERTIFICATION & SIGNATURES
*${l.certificationText || 'I hereby certify that the above indicated remote teaching and learning accomplishments were faithfully conducted and recorded in full adherence to university academic guidelines and quality standards.'}*

**Faculty Member:**  
${l.signatories.facultyName}  
Date: ${h.wfhDate}  

**Verified by:**  
${l.signatories.departmentChair || 'Department Chair'}  
Date: ____________________  

**Approved by:**  
${l.signatories.collegeDean || 'College Dean'}  
Date: ____________________  

---
*Generated via Faculty Workload Portal.*
`;

  return sanitizeUniversalExclusions(md);
}

export function downloadJsonFile(filename: string, data: any): void {
  const sanitized = sanitizeUniversalExclusions(data);
  const blob = new Blob([JSON.stringify(sanitized, null, 2)], {
    type: 'application/json',
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function downloadMarkdownFile(filename: string, content: string): void {
  const sanitized = sanitizeUniversalExclusions(content);
  const blob = new Blob([sanitized], { type: 'text/markdown;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function copyToClipboard(text: string): Promise<void> {
  const sanitized = sanitizeUniversalExclusions(text);
  return navigator.clipboard.writeText(sanitized);
}

/**
 * Robust print function that works inside sandboxed iframes or modal contexts.
 * Can print either the whole window, or clone a specific printable element into a new printable document.
 */
export function printDocument(elementId?: string, documentTitle: string = 'Document'): void {
  try {
    if (elementId) {
      const sourceElement = document.getElementById(elementId);
      if (sourceElement) {
        const printWindow = window.open('', '_blank', 'width=950,height=800');
        if (printWindow) {
          const contentHtml = sourceElement.innerHTML;
          printWindow.document.open();
          printWindow.document.write(`<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${documentTitle}</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    @media print {
      body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      .no-print { display: none !important; }
      @page { margin: 12mm 10mm; size: auto; }
    }
    body { font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; background: #fff; padding: 20px; color: #1e293b; }
    table { border-collapse: collapse; width: 100%; }
  </style>
</head>
<body>
  ${contentHtml}
  <script>
    window.onload = function() {
      setTimeout(function() {
        window.focus();
        window.print();
      }, 500);
    };
  </script>
</body>
</html>`);
          printWindow.document.close();
          return;
        }
      }
    }

    // Fallback: standard window.print()
    window.print();
  } catch (err) {
    console.error('Print trigger failed, attempting direct window.print:', err);
    window.print();
  }
}
