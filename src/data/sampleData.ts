import {
  FacultyProfile,
  ClassScheduleItem,
  CourseSyllabus,
  AccomplishmentReport,
  LearnerActivityReport,
} from '../types';

export const OFFICIAL_ISU_LOGO = '/assets/aistudio/isu_logo_51d7eef7.png';

// Exact Faculty Profile from Reference Documents
export const DEFAULT_FACULTY_PROFILE: FacultyProfile = {
  name: 'APRIL JOY G. LUNG-AYAN, LPT',
  rank: 'INSTRUCTOR I',
  college: 'College of Computing Studies, Information and Communication Technology (CCSICT)',
  department: 'Department of Computer Science & Information Technology',
  academicYear: '2026-2027',
  semester: '1st Semester',
  departmentChair: 'AIMEE D. MOLATO, DIT',
  collegeDean: 'ARNEL C. FAJARDO, PhD',
  vpaa: 'OFFICE OF ACADEMIC AFFAIRS',
};

// Exact Master Schedule from weekly_sched_new_2a75fd62.pdf & april_LAR-2026_f16c6624.pdf
export const DEFAULT_SCHEDULE: ClassScheduleItem[] = [
  // Monday
  {
    id: 'sched-m1',
    courseCode: 'CS 111',
    courseTitle: 'Introduction to Computing',
    section: 'BSCS 1A-DM',
    dayOfWeek: 'Monday',
    startTime: '07:00 AM',
    endTime: '10:00 AM',
    creditUnits: 3,
    roomOrPlatform: 'IT LAB 201 (F55)',
    modalityDefault: 'Face-to-Face',
  },
  {
    id: 'sched-m2',
    courseCode: 'TM INST 4',
    courseTitle: 'Data Science Analytics',
    section: 'BSTM 3B',
    dayOfWeek: 'Monday',
    startTime: '10:00 AM',
    endTime: '01:00 PM',
    creditUnits: 3,
    roomOrPlatform: 'NB 316 (E235)',
    modalityDefault: 'Face-to-Face',
  },
  {
    id: 'sched-m3',
    courseCode: 'EMC 111',
    courseTitle: 'Introduction to Computing',
    section: 'BSEMC-DA 1A',
    dayOfWeek: 'Monday',
    startTime: '01:00 PM',
    endTime: '02:30 PM',
    creditUnits: 1.5,
    roomOrPlatform: 'IT RM 302 (F250)',
    modalityDefault: 'Face-to-Face',
  },
  {
    id: 'sched-m4',
    courseCode: 'EMC 111',
    courseTitle: 'Introduction to Computing',
    section: 'BSEMC-GD 1A',
    dayOfWeek: 'Monday',
    startTime: '02:30 PM',
    endTime: '04:00 PM',
    creditUnits: 1.5,
    roomOrPlatform: 'IT RM 302 (F69)',
    modalityDefault: 'Face-to-Face',
  },
  {
    id: 'sched-m5',
    courseCode: 'IT INST 3',
    courseTitle: 'Data Science Analytics',
    section: 'BSIT 3A-BPO',
    dayOfWeek: 'Monday',
    startTime: '04:00 PM',
    endTime: '07:00 PM',
    creditUnits: 3,
    roomOrPlatform: 'RMB LAB 104 (F175)',
    modalityDefault: 'Face-to-Face',
  },

  // Tuesday
  {
    id: 'sched-t1',
    courseCode: 'MA INST 4',
    courseTitle: 'Data Science Analytics',
    section: 'BSMA 3A',
    dayOfWeek: 'Tuesday',
    startTime: '01:30 PM',
    endTime: '02:30 PM',
    creditUnits: 1,
    roomOrPlatform: 'NB 406 (E282)',
    modalityDefault: 'Face-to-Face',
  },
  {
    id: 'sched-t2',
    courseCode: 'LM INST 4',
    courseTitle: 'Data Science Analytics',
    section: 'BSLM 3A',
    dayOfWeek: 'Tuesday',
    startTime: '02:30 PM',
    endTime: '03:30 PM',
    creditUnits: 1,
    roomOrPlatform: 'NB 416 (E309)',
    modalityDefault: 'Face-to-Face',
  },
  {
    id: 'sched-t3',
    courseCode: 'ELS INST 3',
    courseTitle: 'Data Science Analytics',
    section: 'BA-ELS 3 (BA-ELS3-TRK2)',
    dayOfWeek: 'Tuesday',
    startTime: '03:30 PM',
    endTime: '05:30 PM',
    creditUnits: 2,
    roomOrPlatform: 'A98 Room',
    modalityDefault: 'Face-to-Face',
  },

  // Wednesday
  {
    id: 'sched-w1',
    courseCode: 'CS 111',
    courseTitle: 'Introduction to Computing',
    section: 'BSCS 1A-DM',
    dayOfWeek: 'Wednesday',
    startTime: '08:00 AM',
    endTime: '10:00 AM',
    creditUnits: 2,
    roomOrPlatform: 'IT LAB 201 (F55)',
    modalityDefault: 'Face-to-Face',
  },
  {
    id: 'sched-w2',
    courseCode: 'IT INST 3',
    courseTitle: 'Data Science Analytics',
    section: 'BSIT 3A-BPO',
    dayOfWeek: 'Wednesday',
    startTime: '10:00 AM',
    endTime: '11:00 AM',
    creditUnits: 1,
    roomOrPlatform: 'IT ROOM (F175)',
    modalityDefault: 'Face-to-Face',
  },
  {
    id: 'sched-w3',
    courseCode: 'TM INST 4',
    courseTitle: 'Data Science Analytics',
    section: 'BSTM 3B',
    dayOfWeek: 'Wednesday',
    startTime: '11:00 AM',
    endTime: '12:00 PM',
    creditUnits: 1,
    roomOrPlatform: 'NB 316 (E235)',
    modalityDefault: 'Face-to-Face',
  },
  {
    id: 'sched-w4',
    courseCode: 'EMC 111',
    courseTitle: 'Introduction to Computing',
    section: 'BSEMC-DA 1A',
    dayOfWeek: 'Wednesday',
    startTime: '01:00 PM',
    endTime: '02:30 PM',
    creditUnits: 1.5,
    roomOrPlatform: 'IT RM 302 (F250)',
    modalityDefault: 'Face-to-Face',
  },
  {
    id: 'sched-w5',
    courseCode: 'EMC 111',
    courseTitle: 'Introduction to Computing',
    section: 'BSEMC-GD 1A',
    dayOfWeek: 'Wednesday',
    startTime: '02:30 PM',
    endTime: '04:00 PM',
    creditUnits: 1.5,
    roomOrPlatform: 'IT RM 302 (F69)',
    modalityDefault: 'Face-to-Face',
  },

  // Thursday
  {
    id: 'sched-th1',
    courseCode: 'LM INST 4',
    courseTitle: 'Data Science Analytics',
    section: 'BSLM 3A',
    dayOfWeek: 'Thursday',
    startTime: '01:00 PM',
    endTime: '04:00 PM',
    creditUnits: 3,
    roomOrPlatform: 'NB 416 (E309)',
    modalityDefault: 'Face-to-Face',
  },

  // Friday (Designated WFH Remote Teaching Day)
  {
    id: 'sched-f1',
    courseCode: 'MA INST 4',
    courseTitle: 'Data Science Analytics',
    section: 'BSMA 3A',
    dayOfWeek: 'Friday',
    startTime: '08:00 AM',
    endTime: '11:00 AM',
    creditUnits: 3,
    roomOrPlatform: 'Online LMS / NB 406 (E282)',
    modalityDefault: 'Synchronous',
  },
  {
    id: 'sched-f2',
    courseCode: 'ELS INST 3',
    courseTitle: 'Data Science Analytics',
    section: 'BA-ELS 3 (BA-ELS3-TRK2)',
    dayOfWeek: 'Friday',
    startTime: '01:00 PM',
    endTime: '02:00 PM',
    creditUnits: 1,
    roomOrPlatform: 'Online LMS / A98',
    modalityDefault: 'Synchronous',
  },
  {
    id: 'sched-f3',
    courseCode: 'ELS INST 3',
    courseTitle: 'Data Science Analytics',
    section: 'BA-ELS 3 (BA-ELS3-TRK2)',
    dayOfWeek: 'Friday',
    startTime: '02:00 PM',
    endTime: '05:00 PM',
    creditUnits: 3,
    roomOrPlatform: 'Online LMS / A98',
    modalityDefault: 'Synchronous',
  },
];

// Reference Summary of Courses for LAR Table
export const OFFICIAL_SUBJECTS_LIST = [
  {
    courseNo: 'CS 111',
    courseTitle: 'INTRODUCTION TO COMPUTING',
    schedule: 'M 7:00 AM - 10:00 AM, W 8:00 AM – 10:00 AM',
  },
  {
    courseNo: 'TM INST 4',
    courseTitle: 'DATA SCIENCE ANALYTICS',
    schedule: 'M 10:00 AM – 1:00 PM, W 11:00 AM – 12:00 PM',
  },
  {
    courseNo: 'EMC 111',
    courseTitle: 'INTRODUCTION TO COMPUTING',
    schedule: 'M 1:00 PM – 2:30 PM, W 1:00 PM – 2:30 PM',
  },
  {
    courseNo: 'EMC 111',
    courseTitle: 'INTRODUCTION TO COMPUTING',
    schedule: 'M 2:30 PM – 4:00 PM, W 2:30 PM – 4:00 PM',
  },
  {
    courseNo: 'IT INST 3',
    courseTitle: 'DATA SCIENCE ANALYTICS',
    schedule: 'M 4:00 PM – 7:00 PM, W 10:00 AM – 11:00 AM',
  },
  {
    courseNo: 'MA INST 4',
    courseTitle: 'DATA SCIENCE ANALYTICS',
    schedule: 'T 1:30 PM – 2:30 PM, F 8:00 AM – 11:00 AM',
  },
  {
    courseNo: 'LM INST 4',
    courseTitle: 'DATA SCIENCE ANALYTICS',
    schedule: 'T 2:30 PM – 3:30 PM, TH 1:00 PM – 4:00 PM',
  },
  {
    courseNo: 'ELS INST 3',
    courseTitle: 'DATA SCIENCE ANALYTICS',
    schedule: 'T 3:30 PM – 5:30 PM, F 1:00 PM – 2:00 PM, F 2:00 PM – 5:00 PM',
  },
];

export const CHED_CMO_PRESETS = [
  {
    program: 'BS Information Technology (Data Science Analytics)',
    cmo: 'CHED CMO No. 25, Series of 2015 (PSG for BSCS, BSIS, and BSIT)',
    code: 'IT',
  },
  {
    program: 'BS Computer Science (Introduction to Computing)',
    cmo: 'CHED CMO No. 25, Series of 2015 (PSG for Computer Science)',
    code: 'CS',
  },
  {
    program: 'BS Entertainment & Multimedia Computing (EMC 111)',
    cmo: 'CHED CMO No. 25, Series of 2015 (PSG for EMC - DA & GD tracks)',
    code: 'EMC',
  },
  {
    program: 'Applied Data Science for Allied Programs (BSMA, BSTM, BSLM, BA-ELS)',
    cmo: 'CHED CMO No. 25, Series of 2015 / Institutional General Education Analytics Track',
    code: 'DSA',
  },
];

export const SAMPLE_ACCOMPLISHMENT_LOGS = `
- Conducted 62 lecture hours and 73 laboratory hours across 8 assigned course sections in September 2026.
- Facilitated hands-on machine problems and MS Excel data manipulation exercises for BSCS 1A-DM and BSTM 3B.
- Conducted online WFH classes and interactive presentations for BAELS 3 and BSMA 3A on scheduled remote Fridays.
- Administered subject activities, formative quizzes, and checked student data entry workbooks.
- Actively participated in the campus-wide Family Day celebration on September 28, 2026.
- Facilitated and coordinated student participation in the university Intramurals 2026 events on September 29-30, 2026.
`;

// Pre-loaded official OBE Syllabus from DSA_Syllabus_BSLM_LM-INST4_5439ce1f.pdf
export const SAMPLE_INITIAL_SYLLABUS: CourseSyllabus = {
  id: 'syl-dsa-bslm-official',
  documentCode: 'ISUE-UDI-Syl-014',
  revisionNumber: 'Revision 01- July 13, 2026',
  headerInfo: {
    courseCode: 'LM INST 4',
    courseTitle: 'Data Science Analytics',
    program: 'Bachelor of Science in Legal Management',
    chedCmo: 'CHED Memorandum Order No. 46, s. 2012',
    creditUnits: '2 units (1 lec / 3 lab hours per week)',
    prerequisites: 'None',
    college: 'CCSICT (College of Computing Studies, Information and Communication Technology)',
    department: 'Department of Computer Science & Information Technology',
    semester: 'First Semester',
    academicYear: '2026-2027',
    instructorName: 'APRIL JOY G. LUNG-AYAN, LPT',
  },
  vision: 'A model SMART-Green University with a global reputation for positive societal transformation.',
  mission: 'The Isabela State University is committed to developing lifelong and future-ready professionals empowered to become generators of knowledge and agents of positive change for the inclusive and sustainable transformation of communities through a SMART-Green higher education experience.',
  qualityPolicy: [
    'The Isabela State University is determined to be a lead university in instruction, research, extension and resource generation through continuous improvement of services and commits to comply with the standards set by statutory, regulatory and accrediting bodies. To uphold this commitment, ISU shall attain the following quality objectives:',
    '1. Sustain academic excellence and quality instruction;',
    '2. Generate research work breakthroughs;',
    '3. Engage in sectoral activities for communal development;',
    '4. Develop products for globalization;',
    '5. Support students’ participation to local and international fora to enhance their potentialities.',
  ],
  institutionalOutcomes: [
    { code: 'IO1 - Innovator', title: 'Innovator', description: 'Research-driven, technologically adept global citizens.' },
    { code: 'IO2 - People-Oriented', title: 'People-Oriented', description: 'Ethical, socially responsible servant-leaders.' },
    { code: 'IO3 - Entrepreneur', title: 'Entrepreneur', description: 'Opportunity-seeking and value-creating professionals.' },
    { code: 'IO4 - Naturalist', title: 'Naturalist', description: 'Stewards of the environment and sustainable development.' },
  ],
  graduateAttributes: [
    { code: 'GA1', title: 'Critical and creative thinker', description: 'Critical and creative thinker' },
    { code: 'GA2', title: 'Research-informed and technology-enabled innovator', description: 'Research-informed and technology-enabled innovator' },
    { code: 'GA3', title: 'Socially responsible citizen', description: 'Socially responsible citizen' },
    { code: 'GA4', title: 'Ethical professional', description: 'Ethical professional' },
    { code: 'GA5', title: 'Socially responsible citizen', description: 'Socially responsible citizen' },
    { code: 'GA6', title: 'Service-oriented leader and team member', description: 'Service-oriented leader and team member' },
    { code: 'GA7', title: 'Opportunity-seeking problem solver', description: 'Opportunity-seeking problem solver' },
    { code: 'GA8', title: 'Entrepreneurial and intrapreneurial actor', description: 'Entrepreneurial and intrapreneurial actor' },
    { code: 'GA9', title: 'Environmentally conscious individual', description: 'Environmentally conscious individual' },
    { code: 'GA10', title: 'Sustainability-oriented practitioner', description: 'Sustainability-oriented practitioner' },
  ],
  courseDescription:
    'This course introduces Bachelor of Science in Legal Management students to the fundamental principles of data science and analytics and to how data supports evidence-based decision-making in legal practice, compliance, and organizational management. It covers data collection, cleaning, and preparation; descriptive analytics; data exploration and visualization; and an introduction to predictive and prescriptive analytics, using Microsoft Excel and data relevant to legal and management settings, such as case loads, compliance records, contract and transaction logs, and client or organizational data. The course develops students\' ability to apply legal and management principles together with ICT and decision-making tools, to communicate data-driven insights, and to observe ethical, legal, and data privacy responsibilities in handling information, consistent with the outcomes-based education standards of CHED Memorandum Order No. 46, s. 2012 and with the legal and management orientation of the BS Legal Management program.',
  goalsOfCollege: [
    'Equip students with the conceptual, human, and technical knowledge, skills, and competence in law and management for their complex functions as responsible professionals and citizens in the world of work.',
    'Provide students with professional training through immersion and practicum to prepare them for the complex functions of legal support, compliance, and organizational administration.',
    'Equip students with contemporary and relevant legal and management concepts, and the tools and techniques necessary to enhance good governance and the rule of law.',
    'Prepare students to become efficient, effective, and ethical legal managers and administrators who are fully aware of their social responsibility, not only to their organizations but also in service to the community.',
    'Provide future professionals with skills in research, policy analysis, and decision making in different areas of legal and management practice.',
  ],
  programOutcomes: [
    { code: 'PO1', statement: 'Apply legal and management principles, theories, and methods to analyze problems in various types of organizations.' },
    { code: 'PO2', statement: 'Assess complex legal and business problems using appropriate legal research, analytical, and management tools, techniques, and frameworks.' },
    { code: 'PO3', statement: 'Apply information and communication technology (ICT) skills, including data management and analysis tools, as required by legal and business environments.' },
    { code: 'PO4', statement: 'Demonstrate commitment to ethical, legal, and professional responsibility in the practice of legal management.' },
  ],
  courseLearningOutcomes: [
    {
      code: 'CLO1',
      statement: 'Explain the concepts and processes of data science and data analytics and their applications in legal practice and management, using fundamental MS Excel tools.',
      poMapping: [
        { poCode: 'PO1', level: 'I' },
        { poCode: 'PO2', level: 'I' },
        { poCode: 'PO3', level: 'I' },
        { poCode: 'PO4', level: '-' },
      ],
      gaCodes: ['GA1', 'GA2'],
    },
    {
      code: 'CLO2',
      statement: 'Collect, clean, and prepare legal and management data in MS Excel and summarize it using descriptive analytics, observing data ethics, confidentiality, and data privacy principles.',
      poMapping: [
        { poCode: 'PO1', level: '-' },
        { poCode: 'PO2', level: 'E' },
        { poCode: 'PO3', level: 'E' },
        { poCode: 'PO4', level: 'I' },
      ],
      gaCodes: ['GA2', 'GA4'],
    },
    {
      code: 'CLO3',
      statement: 'Create data visualizations and interactive dashboards in MS Excel that communicate legal and management insights to support organizational decision-making.',
      poMapping: [
        { poCode: 'PO1', level: 'E' },
        { poCode: 'PO2', level: 'E' },
        { poCode: 'PO3', level: 'D' },
        { poCode: 'PO4', level: 'E' },
      ],
      gaCodes: ['GA1', 'GA2'],
    },
    {
      code: 'CLO4',
      statement: 'Apply predictive and prescriptive analytics (regression, time-series forecasting, and what-if analysis) in MS Excel to forecast outcomes and recommend data-driven, ethically sound actions for legal and management problems.',
      poMapping: [
        { poCode: 'PO1', level: 'D' },
        { poCode: 'PO2', level: 'D' },
        { poCode: 'PO3', level: 'D' },
        { poCode: 'PO4', level: 'D' },
      ],
      gaCodes: ['GA1', 'GA2', 'GA7'],
    },
  ],
  sdgs: [
    { code: 'SDG 4', title: 'Quality Education', description: 'Builds data literacy and digital skills that make legal management graduates future-ready professionals.' },
    { code: 'SDG 8', title: 'Decent Work and Economic Growth', description: 'Supports data-driven decisions that promote sound organizational governance, productivity, and compliance.' },
    { code: 'SDG 9', title: 'Industry, Innovation, and Infrastructure', description: 'Integrates analytics tools and technology to innovate legal and management processes.' },
    { code: 'SDG 16', title: 'Peace, Justice, and Strong Institutions', description: 'Upholds ethics, the rule of law, data privacy (RA 10173), and accountability in handling legal and organizational data.' },
    { code: 'SDG 17', title: 'Partnerships for the Goals', description: 'Supports evidence-based collaboration among legal, business, and government stakeholders through shared data and reporting.' },
  ],
  courseObjectives: [
    'This course aims to develop students\' ability to explain the fundamentals of data science and analytics; collect and prepare legal and management data with due regard for ethics, confidentiality, and data privacy; apply descriptive, predictive, and prescriptive analytics and data visualization using Microsoft Excel; and communicate data-driven recommendations that support sound legal and management decisions, consistent with the legal and management orientation of the BS Legal Management program.',
  ],
  courseAssessmentAttainmentMatrix: [
    {
      cloCode: 'CLO1',
      assessmentEvidence: 'Quizzes, laboratory activity on Excel fundamentals, individual performance task, midterm exam items',
      measure: 'Direct',
      performanceIndicator: 'Differentiates data science and analytics, explains the analytics process, and performs data entry, formulas, and functions accurately',
      rubricStandard: '75% mastery (discrete item scoring) or 3/4 Proficient (laboratory rubric)',
      target: '>=75% of students meet threshold',
      type: 'Formative + Summative',
    },
    {
      cloCode: 'CLO2',
      assessmentEvidence: 'Laboratory activity on data cleaning and descriptive analytics, individual performance task, quiz, midterm exam items',
      measure: 'Direct',
      performanceIndicator: 'Prepares and cleans a dataset (duplicates, missing values, outliers), applies descriptive statistics correctly, and observes data ethics, confidentiality, and privacy',
      rubricStandard: '3/4 Proficient in accuracy, completeness of cleaning, and ethical handling of data',
      target: '>=75% of students meet threshold',
      type: 'Performance-based',
    },
    {
      cloCode: 'CLO3',
      assessmentEvidence: 'Chart and dashboard laboratory outputs, individual performance task, dashboard presentation, midterm exam items',
      measure: 'Direct',
      performanceIndicator: 'Creates appropriate visualizations and an interactive dashboard that communicate legal and management insights',
      rubricStandard: '3/4 Proficient in chart selection, accuracy, interactivity, and clarity of insight',
      target: '>=75% of students meet threshold',
      type: 'Performance-based',
    },
    {
      cloCode: 'CLO4',
      assessmentEvidence: 'Regression, forecasting, and what-if laboratory outputs; final analytics project; final examination',
      measure: 'Direct',
      performanceIndicator: 'Builds and interprets predictive and prescriptive models and proposes justified, data-driven recommendations',
      rubricStandard: '3/4 Proficient in model accuracy, interpretation, and justification of recommendations',
      target: '>=75% of students meet threshold',
      type: 'Summative',
    },
  ],
  coursePlan: [
    {
      weekNumber: 1,
      weekRange: 'Week 1',
      topic: 'University Orientation, VMGO, Quality Policy, and Institutional Outcomes; Overview of Course, CLOs, and Program Outcomes; Syllabus Discussion; Course Requirements and Expectations; Classroom AI Policy',
      lilos: [
        'State the vision, mission, goals, and institutional outcomes of ISU.',
        'Identify the content, requirements, and learning outcomes of the course and relate them to the program outcomes for BS Legal Management.',
        'Practice the rules and regulations of the university, including the Classroom AI Policy.',
      ],
      cloCodes: ['Orientation'],
      tlas: [
        { modality: 'Interactive orientation', activity: 'Group discussion, group essay writing on VMGO, quality policy, and institutional outcomes' },
      ],
      ats: [
        'Recitation; group essay on the VMGO, quality policy, and institutional outcomes',
      ],
      resources: [
        'Student manual, syllabus, institutional issuances; presentation of IO, VMGO, PO, and CLO',
      ],
    },
    {
      weekNumber: 2,
      weekRange: 'Weeks 2-3',
      topic: 'Unit I. Overview of Data, Data Science Analytics, and Tools: about data science; about data analytics and its types; data, data sources, and data types; the data analytics process; applications in legal practice and management; MS Excel as a data analytics tool (interface, creating and saving workbooks, worksheets and data entry, formulas and functions)',
      lilos: [
        'Differentiate data science and data analytics.',
        'Classify data, data sources, and data types commonly used in legal and management settings (e.g., case records, compliance logs, contracts, client or organizational data).',
        'Explain the data analytics process and the types of analytics.',
        'Demonstrate proficiency in fundamental MS Excel functions: data entry, formatting, formulas, and functions.',
      ],
      cloCodes: ['CLO1'],
      tlas: [
        { modality: 'Discussion and demonstration', activity: 'Hands-on laboratory exercises on data entry, formulas, and functions using sample legal and management data' },
      ],
      ats: [
        'Quiz; individual performance task; laboratory activity (hands-on exercise)',
      ],
      resources: [
        'Nandi & Sharma (2020); sample legal and management datasets; computer laboratory with MS Excel',
      ],
    },
    {
      weekNumber: 4,
      weekRange: 'Weeks 4-6',
      topic: 'Unit II. Data Collection and Preparation; Descriptive Analytics: importance of data collection and preparation; basic data quality assessment; confidentiality, ethical, and legal considerations in data collection and data privacy; importing data from various sources; data cleaning and preprocessing in Excel; handling missing data and outliers; overview of descriptive analytics; descriptive statistics (mean, median, standard deviation, etc.); Excel functions for data analysis; Data Analysis ToolPak; hypothesis tests and t-tests',
      lilos: [
        'Explain the importance of data collection and preparation.',
        'Discuss basic data quality assessment and the ethical and legal considerations in data collection, including confidentiality and the Data Privacy Act of 2012 (RA 10173).',
        'Import data from external sources into Excel and perform basic data cleaning, including removing duplicates and handling missing values and outliers.',
        'Explain the key principles of descriptive analytics and apply them to a dataset using MS Excel.',
      ],
      cloCodes: ['CLO2'],
      tlas: [
        { modality: 'Discussion and demonstration', activity: 'Case discussion on data privacy, confidentiality, and ethics; hands-on data cleaning and descriptive analysis of a legal or management dataset' },
      ],
      ats: [
        'Quiz; individual performance task; laboratory activity (data cleaning and descriptive analytics)',
      ],
      resources: [
        'Martino (2019); RA 10173 (Data Privacy Act of 2012); public legal and governance statistics (e.g., PSA, DOJ, SEC); computer laboratory',
      ],
    },
    {
      weekNumber: 7,
      weekRange: 'Weeks 7-11',
      topic: 'Unit III. Data Exploration, Visualization, and Dashboards: the power of graphs and charts; data-driven decision-making; creating charts and graphs to visualize data distributions and trends; bar charts, line charts, heatmaps; histograms, box plots, scatter plots; advanced data visualization techniques in Excel (creating interactive dashboards, PivotTable slicers and filters, visualizing data with PivotCharts)',
      lilos: [
        'Explain the importance of graphs and charts and their role in data-driven decision-making.',
        'Create appropriate charts (bar, line, heatmap, histogram, box plot, scatter plot) to visualize distributions and trends in caseload, compliance, and organizational data.',
        'Build interactive dashboards using PivotTables, slicers, filters, and PivotCharts that provide a comprehensive view of legal and management data.',
        'Communicate insights from visualizations and dashboards orally and in writing.',
      ],
      cloCodes: ['CLO3'],
      tlas: [
        { modality: 'Discussion and demonstration', activity: 'Hands-on production of visualizations and interactive dashboards from legal and management datasets (e.g., case disposition rates, compliance violations, contract turnaround time, client intake trends); short dashboard presentations' },
      ],
      ats: [
        'Quiz; individual performance task; laboratory activity; dashboard presentation',
      ],
      resources: [
        'Martino (2019); sample datasets; computer laboratory',
      ],
    },
    {
      weekNumber: 12,
      weekRange: 'Week 12',
      topic: 'Coverage: Weeks 2 to 11 (Units I to III) - Midterm Examination',
      lilos: [
        'Demonstrate mastery of Units I to III through a written and hands-on MS Excel examination.',
      ],
      cloCodes: ['CLO1', 'CLO2', 'CLO3'],
      tlas: [
        { modality: 'Examination', activity: 'Proctored written examination (lecture) and practical examination in the computer laboratory' },
      ],
      ats: [
        'Midterm Examination (ME) - Accomplished examination and Excel file',
      ],
      resources: [
        'Examination questionnaire, datasets, computer laboratory',
      ],
    },
    {
      weekNumber: 13,
      weekRange: 'Weeks 13-17',
      topic: 'Unit IV. Predictive and Prescriptive Analytics: overview of predictive analytics; simple linear regression; multiple regression; time series analysis (analyzing time-based data, creating time series charts and forecasting models); prescriptive analytics (overview, What-If Analysis tool, application of optimization to organizational problems); responsible and ethical use of predictive and prescriptive models',
      lilos: [
        'Explain the key principles of predictive analytics and perform simple and multiple regression in Excel.',
        'Analyze time-series data and develop forecasts (e.g., monthly case filings or compliance incidents) using Excel.',
        'Explain the key principles of prescriptive analytics and apply What-If Analysis and optimization to a legal or management problem.',
        'Conduct simulation and optimization based on a predictive model, and present data-driven recommendations ethically and responsibly.',
      ],
      cloCodes: ['CLO4'],
      tlas: [
        { modality: 'Discussion and demonstration', activity: 'Hands-on modeling, forecasting, and what-if exercises; case-based final analytics project' },
      ],
      ats: [
        'Quiz; individual performance task; laboratory activity; final analytics project (Regression and forecasting workbook; final analytics project)',
      ],
      resources: [
        'Fávero & Belfiore (2019); Klimberg (2023); Roque (2022); Tutorialspoint (2016)',
      ],
    },
    {
      weekNumber: 18,
      weekRange: 'Week 18',
      topic: 'Coverage: Unit IV, with integration of Units I to III - Final Examination',
      lilos: [
        'Demonstrate mastery of the course learning outcomes, with emphasis on Unit IV, through a written and hands-on MS Excel examination.',
      ],
      cloCodes: ['CLO4'],
      tlas: [
        { modality: 'Examination', activity: 'Proctored written examination (lecture) and practical examination in the computer laboratory' },
      ],
      ats: [
        'Final Examination (FE) - Accomplished examination and Excel file',
      ],
      resources: [
        'Examination questionnaire, datasets, computer laboratory',
      ],
    },
  ],
  cqpdcaMechanism: {
    plan: 'Align CLOs with approved Program Outcomes, Graduate Attributes, and Institutional Outcomes; identify assessment evidence and attainment targets.',
    do: 'Implement the course plan, administer learning activities and assessments, and collect direct evidence of student performance.',
    check: 'Compute CLO attainment using agreed metrics such as percentage of students meeting the mastery threshold and mean rubric score per CLO (Minimum standard: >=75% meeting threshold).',
    act: 'Use the attainment summary, gap analysis, and student feedback to revise content, strategies, assessment tools, and support mechanisms in the next course offering.',
  },
  aiPolicy: {
    policyName: 'CLASSROOM AI POLICY FOR STUDENT ASSESSMENT (BOR NO. 66, SERIES OF 2026)',
    threshold: 'The acceptable AI assistance threshold for student assessment submissions, including but not limited to case studies, narrative reports, capstone or special projects, theses, dissertations, reaction papers, and reflection papers, shall not exceed 25%.',
    tiers: [
      {
        tier: 'Minor Violations (26% to 50% similarity)',
        description: 'Faculty are expected to guide students through constructive discussions about responsible AI use, issue verbal warnings, and provide opportunities to redo assessment tasks. The faculty also takes a proactive educational approach, ensures students understand institutional expectations, and requires a promissory letter if the student receives three (3) verbal warnings.',
      },
      {
        tier: 'Moderate Violations (51% to 75% similarity)',
        description: 'Faculty move toward more formal interventions, such as organizing official meetings and imposing grade reductions on the assessment task.',
      },
      {
        tier: 'Severe Violations (76% to 100% similarity)',
        description: 'Faculty respond with decisive action by assigning a failing grade for the assessment task, coordinating student counseling with college services, and emphasizing the seriousness of the violation.',
      },
    ],
  },
  gradingFormula: 'Grade = [TOTAL (Lec) * 0.6 + [TOTAL (Lab)] * 0.4]',
  assessmentGradingSystem: {
    lectureWeight: 60,
    labWeight: 40,
    components: [
      { name: 'Lecture Formative Assessment', percentage: 50 },
      { name: 'Lecture Midterm Examination (ME)', percentage: 25 },
      { name: 'Lecture Final Examination (FE)', percentage: 25 },
      { name: 'Laboratory Formative Assessment', percentage: 50 },
      { name: 'Laboratory Midterm Examination (ME)', percentage: 25 },
      { name: 'Laboratory Final Examination (FE)', percentage: 25 },
    ],
  },
  gradeEquivalents: [
    { range: '98.00 – 100.00', grade: '1.00' },
    { range: '95.00 – 97.00', grade: '1.25' },
    { range: '92.00 – 94.00', grade: '1.50' },
    { range: '89.00 – 91.00', grade: '1.75' },
    { range: '86.00 – 88.0', grade: '2.00' },
    { range: '83.00 – 85.00', grade: '2.25' },
    { range: '80.00 – 82.00', grade: '2.50' },
    { range: '77.00 – 79.00', grade: '2.75' },
    { range: '75.00 – 76.00', grade: '3.00' },
    { range: 'Below 75.00', grade: '5.00' },
  ],
  classroomPolicies: [
    '1. Students are expected to follow University rules on attendance, dress code, decorum, and professional conduct.',
    '2. Cheating, plagiarism, academic dishonesty, and other forms of misconduct are strictly prohibited.',
    '3. Use of gadgets and digital platforms is allowed only for learning purposes and when permitted by the instructor.',
    '4. Safety, orderliness, courtesy, and respect for diversity shall be observed at all times.',
    '5. For complete guidelines, students shall refer to the latest approved Student Manual and related University issuances.',
  ],
  references: [
    {
      category: 'Course References & Textbooks',
      items: [
        'Fávero, L. P., & Belfiore, P. (2019). Data science for business and decision making. Academic Press.',
        'Klimberg, R. (2023). Fundamentals of predictive analytics with JMP. SAS Institute.',
        'Martino, J. C. R. (2019). Hands-On Machine Learning with Microsoft Excel 2019: Build complete data analysis flows, from data collection to visualization. Packt Publishing Ltd.',
        'Nandi, G., & Sharma, R. K. (2020). Data Science fundamentals and practical approaches: understand why data science is the next. BPB Publications.',
        'Roque, F. (2022). Data Forecasting and Segmentation Using Microsoft Excel: Perform Data Grouping, Linear Predictions, and Time Series Machine Learning Statistics Without Using Code. Packt Publishing Limited.',
        'Tutorialspoint. (2016). Data Analysis with MS Excel. Retrieved from https://www.tutorialspoint.com/excel_data_analysis',
        'Commission on Higher Education. (2012). CHED Memorandum Order No. 46, Series of 2012: Policy-standard to enhance quality assurance in Philippine higher education through an outcomes-based and typology-based quality assurance system.',
        'Republic Act No. 10173 (Data Privacy Act of 2012).',
        'Isabela State University Outcomes-Based Education Framework.',
        'Latest approved ISU Student Manual, OBE guidelines, and relevant issuances.',
      ],
    },
  ],
  revisionHistory: [
    {
      revisionNo: '1.0',
      date: 'July 13, 2026',
      descriptionOfRevision: 'Initial enhanced OBE Course Syllabus Template for presentation and review',
      basisRemarks: 'For University-wide review and adoption',
      preparedBy: 'Office of the VPAA/Director for Instruction',
      reviewedBy: 'Academic Affairs Directors, Deans, and Program Chairs',
      approvedBy: 'Vice President for Academic Affairs',
    },
    {
      revisionNo: '2.0',
      date: 'July 14, 2026',
      descriptionOfRevision: 'Major revision and enhancement of the OBE Course Syllabus Template',
      basisRemarks: 'Based on the consultation with the Academic Affairs Office and the Deans and alignment with the University OBE Framework, CQI, and accreditation requirements',
      preparedBy: 'Office of the VPAA/Director for Instruction',
      reviewedBy: 'Academic Affairs Directors, Deans, and Program Chairs',
      approvedBy: 'Vice President for Academic Affairs',
    },
  ],
  signatories: {
    preparedBy: 'APRIL JOY G. LUNG-AYAN, LPT (Instructor)',
    reviewedBy: 'AIMEE D. MOLATO, DIT (Program Chair)',
    approvedBy: 'ARNEL C. FAJARDO, PhD (Dean, CCSICT)',
    date: 'July 13, 2026',
  },
  createdAt: '2026-07-13T08:00:00.000Z',
  lastUpdated: '2026-11-06T08:00:00.000Z',
};

// Initial LAR matching april_LAR-2026_f16c6624.pdf
export const SAMPLE_INITIAL_LAR: LearnerActivityReport = {
  id: 'lar-initial-official',
  header: {
    reportTitle: 'LEARNING ACTIVITY REPORT',
    facultyName: 'APRIL JOY G. LUNG-AYAN',
    academicRank: 'INSTRUCTOR I',
    college: 'CCSICT',
    department: 'Department of Computer Science & Information Technology',
    academicYear: '2026-2027',
    semester: '1st Semester',
    wfhDate: '2026-07-24',
    dayOfWeek: 'Friday',
    modality: 'Synchronous (WFH)',
    weekNumber: 2,
  },
  classesReported: [
    {
      courseCode: 'MA INST 4',
      courseTitle: 'Data Science Analytics',
      section: 'BSMA 3A',
      timeSchedule: 'F 8:00am-11:00am',
      creditUnits: '3 Units',
      platformUsed: 'Online LMS (Google Classroom / Zoom)',
      topicCovered: 'Overview of Data, Data Science Analytics, and Tools',
      intendedLearningOutcomes: [
        'Discuss core data science and business analytics concepts.',
        'Examine analytical classifications and data types.',
      ],
      accomplishments: [
        '-Discussed About Data Science',
        '-Discussed About Data Analytics and its types',
        'Facilitated synchronous live Q&A on analytical frameworks.',
      ],
      studentEngagement: {
        enrolledStudents: 42,
        activeParticipants: 40,
        submissionCount: 40,
        remarks: 'Active student participation during live presentation.',
      },
      meansOfVerification: [
        'Zoom Cloud Recording Link & Attendance Log',
        'Google Classroom Stream Post & Presentation Slides',
      ],
      remarksAndObservations: 'Students actively engaged in distinguishing descriptive vs predictive analytics.',
    },
    {
      courseCode: 'ELS INST 3',
      courseTitle: 'Data Science Analytics',
      section: 'BA-ELS 3 (Track 2)',
      timeSchedule: 'F 1:00pm-2:00pm',
      creditUnits: '1 Unit',
      platformUsed: 'Online LMS (Google Classroom / Zoom)',
      topicCovered: 'Overview of Data, Data Science Analytics, and Tools',
      intendedLearningOutcomes: [
        'Explore qualitative and quantitative data types in language and social science context.',
      ],
      accomplishments: [
        '-Discussed About Data Science applications in applied linguistics and text analytics',
        'Introduced data entry standards and digital spreadsheet tools.',
      ],
      studentEngagement: {
        enrolledStudents: 36,
        activeParticipants: 35,
        submissionCount: 35,
        remarks: 'Completed attendance verification.',
      },
      meansOfVerification: [
        'Class Attendance Spreadsheet',
        'LMS Activity Timestamped Screenshot',
      ],
    },
    {
      courseCode: 'ELS INST 3',
      courseTitle: 'Data Science Analytics',
      section: 'BA-ELS 3 (Track 2)',
      timeSchedule: 'F 2:00pm-5:00pm',
      creditUnits: '3 Units',
      platformUsed: 'Online LMS (Google Classroom / Zoom)',
      topicCovered: 'Overview of Data, Data Science Analytics, and Tools',
      intendedLearningOutcomes: [
        'Demonstrate MS Excel Interface, Workbook Creation, and Basic Statistical Functions.',
      ],
      accomplishments: [
        '-Discussed and Demonstrated Excel as Data Analytics Tool',
        'Guided students through MS Excel Interface, Creating and Saving Workbooks',
        'Conducted live practice on Worksheets, Data Entry, Formulas and Statistical Functions',
      ],
      studentEngagement: {
        enrolledStudents: 36,
        activeParticipants: 34,
        submissionCount: 34,
        remarks: '34 hands-on practice workbooks submitted in Google Classroom.',
      },
      meansOfVerification: [
        'Google Classroom Submitted Workbooks Archive',
        'Zoom Recording Link & Chat Interaction Transcript',
      ],
    },
  ],
  overallDaySummary:
    'Successfully conducted 7 hours of synchronous remote learning sessions across BSMA 3A and BA-ELS 3 sections. Delivered lecture presentations on data science fundamentals and completed interactive MS Excel hands-on laboratories with high student engagement.',
  certificationText:
    'I hereby certify that the above indicated remote teaching and learning accomplishments were faithfully conducted and recorded in full adherence to university academic guidelines and quality standards.',
  signatories: {
    facultyName: 'APRIL JOY G. LUNG-AYAN, LPT',
    departmentChair: 'AIMEE D. MOLATO, DIT',
    collegeDean: 'ARNEL C. FAJARDO, PHD',
  },
  createdAt: '2026-07-24T17:00:00.000Z',
};

// Initial Accomplishment Report matching ACCOMPLISHMENT_REPORT_836b0abb.pdf format
export const SAMPLE_INITIAL_AR: AccomplishmentReport = {
  id: 'ar-initial-official',
  header: {
    facultyName: 'APRIL JOY G. LUNG-AYAN, LPT',
    academicRank: 'Instructor I',
    department: 'CCSICT (College of Computing Studies, Information and Communication Technology)',
    college: 'ISABELA STATE UNIVERSITY - Cauayan Campus, Cauayan City',
    period: 'Month of September 2026',
    reportType: 'Monthly',
    submissionDate: '2026-09-30',
  },
  executiveSummary:
    'During the month of September 2026, a total of 135 teaching hours (62 Lecture Hours and 73 Laboratory Hours) were successfully conducted across 8 course sections including BSCS 1A-DM, BSTM 3B, BSEMC 1A-DA, BSEMC 1A-GD, BSIT 3A-BPO, BSMA 3A, BSLM 3A, and BAELS 3. Online and face-to-face classes, subject activities, quizzes, and institutional activities (Family Day, Intramurals 2026) were comprehensively facilitated.',
  pillars: [
    {
      pillarId: 'pillar-1',
      pillarTitle: 'Instruction and Student Academic Mentorship',
      description: 'Formal classroom, laboratory, and remote instruction conducted in September 2026.',
      accomplishments: [
        {
          itemDescription: 'Conducted classes, subject activities, and prepared presentations for BSMA 3A, BSLM 3A, BSHM, and BSEMC sections.',
          targetOutputs: '62 Lecture Hours conducted across assigned sections',
          meansOfVerification: 'Class registers, lesson slides, LMS submission records',
          timelineOrDate: 'September 1-30, 2026',
          remarks: 'Accomplished',
        },
        {
          itemDescription: 'Conducted hands-on laboratory sessions and coding/analytical machine problems for BSCS 1A-DM, BSTM 3B, BSIT 3A-BPO, and BAELS 3.',
          targetOutputs: '73 Laboratory Hours facilitated with graded exercises',
          meansOfVerification: 'Laboratory machine problem logs, student repository submissions',
          timelineOrDate: 'September 1-30, 2026',
          remarks: 'Accomplished',
        },
        {
          itemDescription: 'Conducted Online/WFH classes, subject activities and prepared presentations for BAELS 3, BSMA 3A, and BSCS 1A-DM on designated remote days.',
          targetOutputs: 'Synchronous lectures and recorded demonstrations',
          meansOfVerification: 'Google Classroom stream archives, Zoom cloud recordings',
          timelineOrDate: 'Sept 04, 11, 18, 25, 2026',
          remarks: 'Accomplished',
        },
      ],
    },
    {
      pillarId: 'pillar-2',
      pillarTitle: 'Research & Scholarly Development',
      description: 'Academic research and ongoing data analytics scholarly inquiries.',
      accomplishments: [
        {
          itemDescription: 'Continuous review of data analytics instructional literature and curriculum alignment with CHED CMO 25 s. 2015.',
          targetOutputs: 'Curriculum comparative analysis matrix',
          meansOfVerification: 'Departmental syllabus review minutes',
          timelineOrDate: 'September 2026',
          remarks: 'Accomplished',
        },
      ],
    },
    {
      pillarId: 'pillar-3',
      pillarTitle: 'Support to Operations and Institutional Participation',
      description: 'Active involvement in university-wide events and institutional activities.',
      accomplishments: [
        {
          itemDescription: 'Participated in the university-wide Family Day celebration and supported student welfare programs.',
          targetOutputs: 'Institutional participation and attendance',
          meansOfVerification: 'Event attendance log',
          timelineOrDate: 'September 28, 2026',
          remarks: 'Accomplished',
        },
        {
          itemDescription: 'Facilitated and participated in Intramurals 2026 collegiate sports and socio-cultural activities.',
          targetOutputs: 'Event committee facilitation and student coordination',
          meansOfVerification: 'Faculty intramural committee designation',
          timelineOrDate: 'September 29-30, 2026',
          remarks: 'Accomplished',
        },
      ],
    },
  ],
  challengesAndInterventions: [
    {
      challenge: 'Network latency experienced by some students during Friday WFH synchronous sessions.',
      actionTaken: 'Uploaded recorded lectures and provided offline practice datasets in Google Classroom.',
      impact: '100% of affected students submitted their laboratory tasks within the extended grace period.',
    },
  ],
  signatories: {
    preparedBy: 'APRIL JOY G. LUNG-AYAN, LPT',
    verifiedBy: 'AIMEE D. MOLATO, DIT',
    approvedBy: 'ARNEL C. FAJARDO, PhD',
  },
  createdAt: '2026-09-30T17:00:00.000Z',
};
