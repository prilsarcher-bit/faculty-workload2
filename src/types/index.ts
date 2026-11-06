export interface FacultyProfile {
  name: string;
  rank: string;
  college: string;
  department: string;
  academicYear: string;
  semester: string;
  departmentChair: string;
  collegeDean: string;
  vpaa: string;
  photoUrl?: string;
  email?: string;
  employeeId?: string;
}

export interface ClassScheduleItem {
  id: string;
  courseCode: string;
  courseTitle: string;
  section: string;
  dayOfWeek: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
  startTime: string;
  endTime: string;
  creditUnits: number;
  roomOrPlatform: string;
  modalityDefault?: 'Face-to-Face' | 'Asynchronous' | 'Synchronous' | 'Blended';
}

// Module 1: Syllabus Types
export interface InstitutionalOutcome {
  code: string;
  title: string;
  description: string;
}

export interface GraduateAttribute {
  code: string;
  title: string;
  description: string;
}

export interface ProgramOutcome {
  code: string;
  statement: string;
}

export interface CourseLearningOutcome {
  code: string;
  statement: string;
  poMapping: {
    poCode: string;
    level: 'I' | 'E' | 'D' | '-'; // Introduced, Enabled, Demonstrated
  }[];
  gaCodes: string[];
}

export interface TeachingLearningActivity {
  modality: 'Synchronous' | 'Asynchronous' | 'Face-to-Face' | 'Blended' | string;
  activity: string;
}

export interface CoursePlanWeek {
  weekNumber: number;
  weekRange: string;
  topic: string;
  lilos: string[]; // Lesson Intended Learning Outcomes
  cloCodes: string[];
  tlas: TeachingLearningActivity[];
  ats: string[]; // Assessment Tasks
  resources: string[];
}

export interface CourseAssessmentAttainmentItem {
  cloCode: string;
  assessmentEvidence: string;
  measure: 'Direct' | 'Indirect' | string;
  performanceIndicator: string;
  rubricStandard: string;
  target: string;
  type: string;
}

export interface DocumentRevisionEntry {
  revisionNo: string;
  date: string;
  descriptionOfRevision: string;
  basisRemarks: string;
  preparedBy: string;
  reviewedBy: string;
  approvedBy: string;
}

export interface CourseSyllabus {
  id: string;
  documentCode?: string;
  revisionNumber?: string;
  headerInfo: {
    courseCode: string;
    courseTitle: string;
    program: string;
    chedCmo: string;
    creditUnits: string;
    prerequisites: string;
    college: string;
    department: string;
    semester: string;
    academicYear: string;
    instructorName: string;
  };
  vision?: string;
  mission?: string;
  qualityPolicy?: string[];
  institutionalOutcomes: InstitutionalOutcome[];
  graduateAttributes: GraduateAttribute[];
  courseDescription: string;
  goalsOfCollege?: string[];
  programOutcomes: ProgramOutcome[];
  courseLearningOutcomes: CourseLearningOutcome[];
  courseObjectives: string[];
  sdgs?: { code: string; title: string; description: string }[];
  assessmentGradingSystem: {
    lectureWeight: number;
    labWeight?: number;
    components: { name: string; percentage: number }[];
  };
  courseAssessmentAttainmentMatrix?: CourseAssessmentAttainmentItem[];
  coursePlan: CoursePlanWeek[];
  cqpdcaMechanism?: {
    plan: string;
    do: string;
    check: string;
    act: string;
  };
  aiPolicy?: {
    policyName: string;
    threshold: string;
    tiers: { tier: string; description: string }[];
  };
  gradingFormula?: string;
  gradeEquivalents?: { range: string; grade: string }[];
  classroomPolicies?: string[];
  references: {
    category: string;
    items: string[];
  }[];
  revisionHistory?: DocumentRevisionEntry[];
  signatories?: {
    preparedBy: string;
    reviewedBy: string;
    approvedBy: string;
    date?: string;
  };
  createdAt: string;
  lastUpdated: string;
}

// Module 2: Accomplishment Report (AR) Types
export interface AccomplishmentItem {
  itemDescription: string;
  targetOutputs: string;
  meansOfVerification: string;
  timelineOrDate?: string;
  remarks?: string;
}

export interface AccomplishmentPillar {
  pillarId: string;
  pillarTitle: string;
  description: string;
  accomplishments: AccomplishmentItem[];
}

export interface ChallengeAndIntervention {
  challenge: string;
  actionTaken: string;
  impact?: string;
}

export interface ARDailyLogRow {
  date: string;
  day: string;
  time: string;
  course: string;
  lecHours: number;
  labHours: number;
  accomplishments: string;
  remarks: string;
}

export interface AccomplishmentReport {
  id: string;
  header: {
    facultyName: string;
    academicRank: string;
    department: string;
    college: string;
    period: string;
    reportType: 'Weekly' | 'Monthly' | 'Semestral';
    submissionDate: string;
  };
  executiveSummary: string;
  pillars: AccomplishmentPillar[];
  challengesAndInterventions: ChallengeAndIntervention[];
  dailyLogs?: ARDailyLogRow[];
  totalLecHours?: number;
  totalLabHours?: number;
  signatories: {
    preparedBy: string;
    verifiedBy: string;
    approvedBy: string;
  };
  createdAt: string;
}

// Module 3: Learner's Activity Report (LAR) Types
export interface LARClassReport {
  courseCode: string;
  courseTitle: string;
  section: string;
  timeSchedule: string;
  creditUnits?: string;
  platformUsed: string;
  topicCovered: string;
  intendedLearningOutcomes: string[];
  accomplishments: string[];
  studentEngagement: {
    enrolledStudents: number;
    activeParticipants: number;
    submissionCount?: number;
    remarks?: string;
  };
  meansOfVerification: string[];
  remarksAndObservations?: string;
}

export interface NonTeachingActivity {
  timeSlot: string;
  activityType: string;
  description: string;
  outputOrMOV: string;
}

export interface LearnerActivityReport {
  id: string;
  header: {
    reportTitle: string;
    facultyName: string;
    academicRank: string;
    college: string;
    department: string;
    academicYear: string;
    semester: string;
    wfhDate: string;
    dayOfWeek: string;
    modality: string;
    weekNumber: number;
  };
  classesReported: LARClassReport[];
  nonTeachingActivities?: NonTeachingActivity[];
  overallDaySummary: string;
  certificationText: string;
  signatories: {
    facultyName: string;
    departmentChair: string;
    collegeDean: string;
  };
  createdAt: string;
}
