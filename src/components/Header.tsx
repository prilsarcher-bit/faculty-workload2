import React from 'react';
import {
  FileText,
  BarChart3,
  CalendarDays,
  UserCheck,
  Sparkles,
  User,
  LogOut,
  Settings,
} from 'lucide-react';
import { OFFICIAL_ISU_LOGO } from '../data/sampleData';
import { FacultyProfile } from '../types';

interface HeaderProps {
  activeTab: 'syllabus' | 'accomplishment' | 'lar' | 'schedule';
  setActiveTab: (tab: 'syllabus' | 'accomplishment' | 'lar' | 'schedule') => void;
  onLoadSampleData: () => void;
  facultyProfile: FacultyProfile;
  onOpenProfileModal: () => void;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onLoadSampleData,
  facultyProfile,
  onOpenProfileModal,
  onLogout,
}) => {
  return (
    <header className="bg-gradient-to-r from-[#023e25] via-[#005a36] to-[#046a38] text-white shadow-lg border-b-2 border-amber-400">
      {/* Top Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Logo & Portal Identity */}
          <div className="flex items-center gap-3.5">
            <img
              src={OFFICIAL_ISU_LOGO}
              alt="Isabela State University Logo"
              className="w-13 h-13 object-contain drop-shadow-md rounded-full bg-white/10 p-0.5 border border-amber-400/30"
            />
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-lg sm:text-xl font-extrabold tracking-tight text-white drop-shadow-xs">
                  ISABELA STATE UNIVERSITY
                </h1>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/40 uppercase tracking-wide">
                  Cauayan Campus
                </span>
              </div>
              <p className="text-xs text-emerald-100 font-medium">
                Faculty Workload Portal • Syllabi, Accomplishment Reports (AR) & Learner's Activity Reports (LAR)
              </p>
            </div>
          </div>

          {/* User Profile Bar & Actions */}
          <div className="flex items-center flex-wrap gap-2.5">
            {/* Faculty Profile Card */}
            <div
              onClick={onOpenProfileModal}
              className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 transition cursor-pointer group shadow-xs"
              title="Click to view and edit profile"
            >
              <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-amber-400 bg-white/20 flex items-center justify-center text-white shrink-0 shadow-xs">
                {facultyProfile.photoUrl ? (
                  <img
                    src={facultyProfile.photoUrl}
                    alt={facultyProfile.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-4 h-4 text-emerald-100" />
                )}
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-white group-hover:text-amber-300 transition flex items-center gap-1">
                  <span>{facultyProfile.name}</span>
                  <Settings className="w-3 h-3 opacity-70 group-hover:opacity-100" />
                </div>
                <div className="text-[10px] text-emerald-200">
                  {facultyProfile.rank} • CCSICT
                </div>
              </div>
            </div>

            {/* Quick Demo Reload */}
            <button
              onClick={onLoadSampleData}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition cursor-pointer shadow-sm"
              title="Reload official demo profile & schedule"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Demo Data</span>
            </button>

            {/* Log Out Button */}
            <button
              onClick={onLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-rose-600 text-white font-medium text-xs border border-white/20 hover:border-rose-500 transition cursor-pointer"
              title="Log out of session"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs Bar */}
      <div className="bg-[#012d1b] border-t border-emerald-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-2 sm:space-x-3 overflow-x-auto py-2">
            <button
              onClick={() => setActiveTab('syllabus')}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg whitespace-nowrap transition cursor-pointer ${
                activeTab === 'syllabus'
                  ? 'bg-amber-400 text-slate-950 shadow-sm font-bold'
                  : 'text-emerald-100 hover:bg-white/10 hover:text-white'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Module 1: OBE Syllabus</span>
            </button>

            <button
              onClick={() => setActiveTab('accomplishment')}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg whitespace-nowrap transition cursor-pointer ${
                activeTab === 'accomplishment'
                  ? 'bg-amber-400 text-slate-950 shadow-sm font-bold'
                  : 'text-emerald-100 hover:bg-white/10 hover:text-white'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Module 2: Accomplishment Report (AR)</span>
            </button>

            <button
              onClick={() => setActiveTab('lar')}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg whitespace-nowrap transition cursor-pointer ${
                activeTab === 'lar'
                  ? 'bg-amber-400 text-slate-950 shadow-sm font-bold'
                  : 'text-emerald-100 hover:bg-white/10 hover:text-white'
              }`}
            >
              <CalendarDays className="w-4 h-4" />
              <span>Module 3: Learner's Activity Report (LAR)</span>
              <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded ${
                activeTab === 'lar'
                  ? 'bg-slate-900 text-amber-300'
                  : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
              }`}>
                WFH
              </span>
            </button>

            <button
              onClick={() => setActiveTab('schedule')}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg whitespace-nowrap transition cursor-pointer ${
                activeTab === 'schedule'
                  ? 'bg-amber-400 text-slate-950 shadow-sm font-bold'
                  : 'text-emerald-100 hover:bg-white/10 hover:text-white'
              }`}
            >
              <UserCheck className="w-4 h-4" />
              <span>Schedule & Faculty Profile</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};
