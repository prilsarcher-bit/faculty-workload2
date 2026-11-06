import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { AuthView } from './components/AuthView';
import { ProfileModal } from './components/ProfileModal';
import { SyllabusModule } from './components/SyllabusModule';
import { AccomplishmentReportModule } from './components/AccomplishmentReportModule';
import { LearnerActivityReportModule } from './components/LearnerActivityReportModule';
import { ScheduleProfileModule } from './components/ScheduleProfileModule';
import {
  FacultyProfile,
  ClassScheduleItem,
  CourseSyllabus,
  AccomplishmentReport,
  LearnerActivityReport,
} from './types';
import {
  DEFAULT_FACULTY_PROFILE,
  DEFAULT_SCHEDULE,
  SAMPLE_INITIAL_SYLLABUS,
  SAMPLE_INITIAL_AR,
  SAMPLE_INITIAL_LAR,
  OFFICIAL_ISU_LOGO,
} from './data/sampleData';
import { sanitizeUniversalExclusions } from './utils/sanitizer';

export default function App() {
  const [activeTab, setActiveTab] = useState<'syllabus' | 'accomplishment' | 'lar' | 'schedule'>('syllabus');
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // Authentication State: Check if user is logged in
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return localStorage.getItem('fwp_is_authenticated') === 'true';
    } catch (e) {
      return false;
    }
  });

  // Faculty Profile State (persisted in localStorage)
  const [facultyProfile, setFacultyProfile] = useState<FacultyProfile>(() => {
    try {
      const saved = localStorage.getItem('fwp_faculty_profile');
      if (saved) return sanitizeUniversalExclusions(JSON.parse(saved));
    } catch (e) {}
    return DEFAULT_FACULTY_PROFILE;
  });

  // Master Schedule State
  const [schedule, setSchedule] = useState<ClassScheduleItem[]>(() => {
    try {
      const saved = localStorage.getItem('fwp_schedule');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return DEFAULT_SCHEDULE;
  });

  // Syllabi Repository State
  const [syllabi, setSyllabi] = useState<CourseSyllabus[]>(() => {
    try {
      const saved = localStorage.getItem('fwp_syllabi');
      if (saved) return sanitizeUniversalExclusions(JSON.parse(saved));
    } catch (e) {}
    return [SAMPLE_INITIAL_SYLLABUS];
  });

  const [activeSyllabusId, setActiveSyllabusId] = useState<string>(() => {
    return SAMPLE_INITIAL_SYLLABUS.id;
  });

  // Accomplishment Reports State
  const [reports, setReports] = useState<AccomplishmentReport[]>(() => {
    try {
      const saved = localStorage.getItem('fwp_reports');
      if (saved) return sanitizeUniversalExclusions(JSON.parse(saved));
    } catch (e) {}
    return [SAMPLE_INITIAL_AR];
  });

  // Learner's Activity Reports (WFH) State
  const [larReports, setLarReports] = useState<LearnerActivityReport[]>(() => {
    try {
      const saved = localStorage.getItem('fwp_lar_reports');
      if (saved) return sanitizeUniversalExclusions(JSON.parse(saved));
    } catch (e) {}
    return [SAMPLE_INITIAL_LAR];
  });

  // Sync state to local storage
  useEffect(() => {
    try {
      localStorage.setItem('fwp_faculty_profile', JSON.stringify(facultyProfile));
      localStorage.setItem('fwp_schedule', JSON.stringify(schedule));
      localStorage.setItem('fwp_syllabi', JSON.stringify(syllabi));
      localStorage.setItem('fwp_reports', JSON.stringify(reports));
      localStorage.setItem('fwp_lar_reports', JSON.stringify(larReports));
      localStorage.setItem('fwp_is_authenticated', isAuthenticated ? 'true' : 'false');
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [facultyProfile, schedule, syllabi, reports, larReports, isAuthenticated]);

  const handleLoginSuccess = (profile: FacultyProfile) => {
    setFacultyProfile(profile);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    try {
      localStorage.setItem('fwp_is_authenticated', 'false');
    } catch (e) {}
  };

  const handleLoadSampleData = () => {
    setFacultyProfile(DEFAULT_FACULTY_PROFILE);
    setSchedule(DEFAULT_SCHEDULE);
    setSyllabi([SAMPLE_INITIAL_SYLLABUS]);
    setActiveSyllabusId(SAMPLE_INITIAL_SYLLABUS.id);
    setReports([SAMPLE_INITIAL_AR]);
    setLarReports([SAMPLE_INITIAL_LAR]);
  };

  // If not logged in, gate the system with the Login / Registration screen
  if (!isAuthenticated) {
    return <AuthView onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLoadSampleData={handleLoadSampleData}
        facultyProfile={facultyProfile}
        onOpenProfileModal={() => setIsProfileModalOpen(true)}
        onLogout={handleLogout}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'syllabus' && (
          <SyllabusModule
            syllabi={syllabi}
            setSyllabi={setSyllabi}
            activeSyllabusId={activeSyllabusId}
            setActiveSyllabusId={setActiveSyllabusId}
            facultyProfile={facultyProfile}
          />
        )}

        {activeTab === 'accomplishment' && (
          <AccomplishmentReportModule
            facultyProfile={facultyProfile}
            reports={reports}
            setReports={setReports}
            schedule={schedule}
            syllabi={syllabi}
          />
        )}

        {activeTab === 'lar' && (
          <LearnerActivityReportModule
            facultyProfile={facultyProfile}
            schedule={schedule}
            syllabi={syllabi}
            activeSyllabusId={activeSyllabusId}
            larReports={larReports}
            setLarReports={setLarReports}
          />
        )}

        {activeTab === 'schedule' && (
          <ScheduleProfileModule
            facultyProfile={facultyProfile}
            setFacultyProfile={setFacultyProfile}
            schedule={schedule}
            setSchedule={setSchedule}
          />
        )}
      </main>

      {/* Edit Profile Modal */}
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        facultyProfile={facultyProfile}
        onSaveProfile={(updated) => setFacultyProfile(updated)}
      />

      {/* Clean University Footer */}
      <footer className="bg-white border-t border-slate-200 py-4 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <img
              src={OFFICIAL_ISU_LOGO}
              alt="ISU Seal"
              className="w-5 h-5 object-contain"
            />
            <span className="font-semibold text-slate-700">
              Isabela State University — Cauayan Campus
            </span>
            <span>•</span>
            <span>Faculty Workload Portal</span>
          </div>

          <div className="flex items-center gap-3">
            <span>Outcomes-Based Education (OBE) Standard</span>
            <span>•</span>
            <span>CHED CMO Standard Compliant</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
