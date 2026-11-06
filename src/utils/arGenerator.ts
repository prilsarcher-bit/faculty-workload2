import { ClassScheduleItem, CourseSyllabus, ARDailyLogRow } from '../types';

export interface MonthOption {
  monthIndex: number; // 0-based: 7 = August, 8 = September, 9 = October, 10 = November, 11 = December
  name: string;
  year: number;
  label: string;
}

export const ACADEMIC_MONTHS: MonthOption[] = [
  { monthIndex: 7, name: 'August', year: 2026, label: 'August 2026 (Weeks 1 - 4)' },
  { monthIndex: 8, name: 'September', year: 2026, label: 'September 2026 (Weeks 5 - 8)' },
  { monthIndex: 9, name: 'October', year: 2026, label: 'October 2026 (Weeks 9 - 12 - Midterm)' },
  { monthIndex: 10, name: 'November', year: 2026, label: 'November 2026 (Weeks 13 - 16)' },
  { monthIndex: 11, name: 'December', year: 2026, label: 'December 2026 (Weeks 17 - 18 - Finals)' },
];

// Helper to calculate weekly syllabus topic based on date within the 1st Semester 2026-2027
// Semester starts on Monday, August 10, 2026
const SEMESTER_START = new Date(2026, 7, 10); // Aug 10, 2026

export function getSemesterWeekForDate(date: Date): number {
  const diffTime = date.getTime() - SEMESTER_START.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  if (diffDays < 0) return 1;
  const week = Math.floor(diffDays / 7) + 1;
  return Math.min(Math.max(week, 1), 18);
}

/**
 * Maps syllabus topic for a given course and semester week number
 */
export function getTopicForCourseWeek(
  courseCode: string,
  weekNumber: number,
  syllabi: CourseSyllabus[]
): { topic: string; task: string } {
  // Find matching syllabus or fall back to first active syllabus
  const matchedSyllabus = syllabi.find(
    (s) =>
      s.headerInfo.courseCode.toLowerCase().includes(courseCode.toLowerCase()) ||
      courseCode.toLowerCase().includes(s.headerInfo.courseCode.toLowerCase())
  ) || syllabi[0];

  if (!matchedSyllabus || !matchedSyllabus.coursePlan || matchedSyllabus.coursePlan.length === 0) {
    return {
      topic: 'Outcomes-Based Course Competencies & Practical Exercises',
      task: 'Conducted classes, subject activities and machine exercises',
    };
  }

  // Look for exact weekNumber or week covering this week
  const planWeek =
    matchedSyllabus.coursePlan.find((w) => {
      if (w.weekNumber === weekNumber) return true;
      // Handle ranges like "Weeks 2-3", "Weeks 4-6", "Weeks 7-11", "Weeks 13-17"
      const match = w.weekRange.match(/(\d+)\s*-\s*(\d+)/);
      if (match) {
        const start = parseInt(match[1], 10);
        const end = parseInt(match[2], 10);
        return weekNumber >= start && weekNumber <= end;
      }
      return false;
    }) || matchedSyllabus.coursePlan[0];

  const topic = planWeek.topic;
  const at = planWeek.ats?.[0] || 'Conducted classes, subject activities and hands-on exercises';

  return { topic, task: at };
}

/**
 * Generate official daily log rows for a selected month
 * seamlessly synchronized with the Instructor's weekly schedule and syllabus topics.
 */
export function generateMonthlyLogsFromScheduleAndSyllabus(
  year: number,
  monthIndex: number,
  schedule: ClassScheduleItem[],
  syllabi: CourseSyllabus[]
): {
  rows: ARDailyLogRow[];
  totalLec: number;
  totalLab: number;
  totalTeachingHours: number;
  distinctCourses: string[];
} {
  const daysMap: Record<number, string> = {
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday',
  };

  const dayAbbrMap: Record<string, string> = {
    Monday: 'Mon',
    Tuesday: 'Tue',
    Wednesday: 'Wed',
    Thursday: 'Thu',
    Friday: 'Fri',
    Saturday: 'Sat',
  };

  const rows: ARDailyLogRow[] = [];
  let totalLec = 0;
  let totalLab = 0;
  const courseSet = new Set<string>();

  // Determine number of days in month
  const totalDaysInMonth = new Date(year, monthIndex + 1, 0).getDate();

  for (let d = 1; d <= totalDaysInMonth; d++) {
    const currentDate = new Date(year, monthIndex, d);
    const dayOfWeekNumber = currentDate.getDay(); // 0 is Sunday, 1 is Monday...

    // Skip Sundays
    if (dayOfWeekNumber === 0) continue;

    const dayName = daysMap[dayOfWeekNumber];
    if (!dayName) continue;

    // Filter instructor's schedule for this day of week
    const classesOnDay = schedule.filter((s) => s.dayOfWeek === dayName);
    if (classesOnDay.length === 0) continue;

    const weekNum = getSemesterWeekForDate(currentDate);
    const dateFormatted = `${String(d).padStart(2, '0')} ${currentDate.toLocaleString('en-US', { month: 'long' })}, ${year}`;

    // University Events in September (as in reference document)
    if (monthIndex === 8 && d === 28) {
      rows.push({
        date: dateFormatted,
        day: 'Mon',
        time: 'All Day',
        course: 'UNIVERSITY EVENT',
        lecHours: 0,
        labHours: 0,
        accomplishments: 'FAMILY DAY Celebration & Faculty Participation',
        remarks: 'Accomplished',
      });
      continue;
    }
    if (monthIndex === 8 && (d === 29 || d === 30)) {
      rows.push({
        date: dateFormatted,
        day: dayAbbrMap[dayName] || dayName.slice(0, 3),
        time: 'All Day',
        course: 'CAMPUS EVENT',
        lecHours: 0,
        labHours: 0,
        accomplishments: 'INTRAMURALS 2026 Committee Facilitation',
        remarks: 'Accomplished',
      });
      continue;
    }

    // Process each class schedule
    for (const item of classesOnDay) {
      courseSet.add(item.courseCode);

      // Distribute lecture / lab hours based on schedule and units
      let lec = 0;
      let lab = 0;

      // Clean course display name e.g. "BSMA 3A", "BSLM 3A", "BSCS 1A-DM"
      const courseSectionDisplay = `${item.section}`;

      // In ISU CCSICT schedule: 3-hour lab sessions vs 1-hour/1.5-hour lectures
      if (item.startTime.includes('01:00 PM') && item.endTime.includes('04:00 PM')) {
        lab = 3;
      } else if (item.startTime.includes('07:00 AM') && item.endTime.includes('10:00 AM')) {
        lab = 3;
      } else if (item.startTime.includes('10:00 AM') && item.endTime.includes('01:00 PM')) {
        lab = 3;
      } else if (item.startTime.includes('04:00 PM') && item.endTime.includes('07:00 PM')) {
        lab = 3;
      } else if (item.startTime.includes('08:00 AM') && item.endTime.includes('11:00 AM')) {
        lab = 3;
      } else if (item.startTime.includes('02:00 PM') && item.endTime.includes('05:00 PM')) {
        lab = 3;
      } else if (item.creditUnits === 1.5) {
        lec = 1.5;
      } else if (item.creditUnits === 1) {
        lec = 1;
      } else if (item.creditUnits === 2) {
        lec = 2;
      } else {
        lab = 3;
      }

      totalLec += lec;
      totalLab += lab;

      // Extract syllabus-aligned topic for this course and week
      const { topic, task } = getTopicForCourseWeek(item.courseCode, weekNum, syllabi);

      // Modality notation (WFH on Fridays)
      const isWFH = item.dayOfWeek === 'Friday' || item.modalityDefault === 'Synchronous';
      const actionPrefix = isWFH ? 'Conducted Online classes' : 'Conducted classes';

      const timeSlotDisplay = `${item.startTime.replace(':00 ', ' ').replace(' AM', '').replace(' PM', '')}-${item.endTime.replace(':00 ', ' ').replace(' AM', '').replace(' PM', '')}`;

      rows.push({
        date: dateFormatted,
        day: dayAbbrMap[dayName] || dayName.slice(0, 3),
        time: timeSlotDisplay,
        course: courseSectionDisplay,
        lecHours: lec,
        labHours: lab,
        accomplishments: `${actionPrefix}, delivered [Week ${weekNum}]: ${topic.slice(0, 85)}...; ${task.slice(0, 65)}`,
        remarks: 'Accomplished',
      });
    }
  }

  return {
    rows,
    totalLec: Math.round(totalLec * 10) / 10,
    totalLab: Math.round(totalLab * 10) / 10,
    totalTeachingHours: Math.round((totalLec + totalLab) * 10) / 10,
    distinctCourses: Array.from(courseSet),
  };
}
