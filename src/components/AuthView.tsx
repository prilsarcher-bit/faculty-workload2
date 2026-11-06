import React, { useState } from 'react';
import { FacultyProfile } from '../types';
import { DEFAULT_FACULTY_PROFILE, OFFICIAL_ISU_LOGO } from '../data/sampleData';
import {
  Lock,
  Mail,
  User,
  GraduationCap,
  Building,
  Camera,
  Upload,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

interface AuthViewProps {
  onLoginSuccess: (profile: FacultyProfile) => void;
}

export const AuthView: React.FC<AuthViewProps> = ({ onLoginSuccess }) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('lungayan.apriljoy@isu.edu.ph');
  const [password, setPassword] = useState('••••••••••••');
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  // Registration Form Fields
  const [regData, setRegData] = useState<FacultyProfile>({
    name: 'APRIL JOY G. LUNG-AYAN, LPT',
    rank: 'INSTRUCTOR I',
    college: 'College of Computing Studies, Information and Communication Technology (CCSICT)',
    department: 'Department of Computer Science & Information Technology',
    academicYear: '2026-2027',
    semester: '1st Semester',
    departmentChair: 'AIMEE D. MOLATO, DIT',
    collegeDean: 'ARNEL C. FAJARDO, PhD',
    vpaa: 'OFFICE OF ACADEMIC AFFAIRS',
    email: 'lungayan.apriljoy@isu.edu.ph',
  });

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('Please choose a photo below 2MB.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setPhotoPreview(base64);
        setRegData((prev) => ({ ...prev, photoUrl: base64 }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleQuickDemoLogin = () => {
    const profile: FacultyProfile = {
      ...DEFAULT_FACULTY_PROFILE,
      photoUrl: photoPreview || undefined,
      email: 'lungayan.apriljoy@isu.edu.ph',
    };
    onLoginSuccess(profile);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Retrieve any previously saved profile or fallback to demo
    try {
      const saved = localStorage.getItem('fwp_faculty_profile');
      if (saved) {
        const parsed = JSON.parse(saved);
        onLoginSuccess({
          ...parsed,
          email,
          photoUrl: photoPreview || parsed.photoUrl,
        });
        return;
      }
    } catch (err) {}

    onLoginSuccess({
      ...DEFAULT_FACULTY_PROFILE,
      email,
      photoUrl: photoPreview || undefined,
    });
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalProfile: FacultyProfile = {
      ...regData,
      photoUrl: photoPreview || undefined,
      email,
    };
    localStorage.setItem('fwp_faculty_profile', JSON.stringify(finalProfile));
    onLoginSuccess(finalProfile);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#023e25] via-[#005a36] to-[#046a38] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative Gold & Emerald Background Glows */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Container */}
      <div className="sm:mx-auto sm:w-full sm:max-w-xl relative z-10">
        <div className="text-center mb-6">
          <div className="inline-block p-3 rounded-full bg-white/10 backdrop-blur-md shadow-xl border border-white/20 mb-3">
            <img
              src={OFFICIAL_ISU_LOGO}
              alt="ISU Seal"
              className="w-20 h-20 object-contain drop-shadow-md mx-auto"
            />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            ISABELA STATE UNIVERSITY
          </h1>
          <p className="text-sm font-semibold text-amber-300 uppercase tracking-widest mt-1">
            Faculty Workload Portal
          </p>
          <p className="text-xs text-emerald-100 mt-1 max-w-md mx-auto">
            Cauayan Campus • Outcomes-Based Education Syllabi, Accomplishment Reports (AR), and Learner's Activity Reports (LAR)
          </p>
        </div>

        {/* Card Box */}
        <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden">
          {/* Mode Switch Tabs */}
          <div className="flex border-b border-slate-200 bg-slate-50">
            <button
              type="button"
              onClick={() => setMode('login')}
              className={`flex-1 py-3.5 text-center text-sm font-semibold transition cursor-pointer ${
                mode === 'login'
                  ? 'bg-white text-[#005a36] border-b-2 border-[#005a36]'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Log In to Portal
            </button>
            <button
              type="button"
              onClick={() => setMode('register')}
              className={`flex-1 py-3.5 text-center text-sm font-semibold transition cursor-pointer ${
                mode === 'register'
                  ? 'bg-white text-[#005a36] border-b-2 border-[#005a36]'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Register & Set Up Profile
            </button>
          </div>

          <div className="p-6 sm:p-8">
            {mode === 'login' ? (
              /* LOGIN FORM */
              <form onSubmit={handleLoginSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Institutional Email / Faculty ID
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-4 w-4 text-slate-400" />
                    </div>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full pl-9 pr-3 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#005a36] focus:border-[#005a36]"
                      placeholder="faculty.name@isu.edu.ph"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-4 w-4 text-slate-400" />
                    </div>
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="block w-full pl-9 pr-3 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#005a36] focus:border-[#005a36]"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="rounded text-[#005a36] focus:ring-[#005a36]"
                    />
                    <span>Remember my session</span>
                  </label>
                  <span className="text-[#005a36] hover:underline cursor-pointer">
                    Need help logging in?
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-gradient-to-r from-[#023e25] to-[#005a36] hover:from-[#00331e] hover:to-[#024a2d] text-white font-semibold text-sm shadow-md transition cursor-pointer"
                >
                  <span>Sign In to Workload Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-slate-400">
                      Or Quick Demo Access
                    </span>
                  </div>
                </div>

                {/* 1-Click Instructor Profile Access */}
                <button
                  type="button"
                  onClick={handleQuickDemoLogin}
                  className="w-full flex items-center justify-between p-3 rounded-xl border-2 border-emerald-200 bg-emerald-50/70 hover:bg-emerald-100/70 text-[#005a36] transition cursor-pointer text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white border border-emerald-300 flex items-center justify-center text-emerald-800 font-bold text-xs shadow-xs">
                      AJ
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">
                        April Joy G. Lung-ayan, LPT
                      </div>
                      <div className="text-[11px] text-slate-600">
                        Instructor I • CCSICT (Cauayan Campus)
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-semibold px-2 py-1 rounded bg-[#005a36] text-white">
                    1-Click Login
                  </span>
                </button>
              </form>
            ) : (
              /* REGISTRATION FORM WITH PICTURE UPLOAD */
              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                {/* Profile Picture Upload */}
                <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#005a36] bg-slate-200 flex items-center justify-center">
                      {photoPreview ? (
                        <img
                          src={photoPreview}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User className="w-8 h-8 text-slate-400" />
                      )}
                    </div>
                    <label
                      htmlFor="auth-photo-upload"
                      className="absolute -bottom-1 -right-1 p-1.5 bg-[#005a36] text-white rounded-full cursor-pointer shadow hover:bg-[#023e25]"
                      title="Upload Photo"
                    >
                      <Camera className="w-3.5 h-3.5" />
                      <input
                        id="auth-photo-upload"
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-semibold text-slate-800">
                      Upload Profile Picture
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Add your official institutional portrait photo for your profile and reports.
                    </p>
                    <label
                      htmlFor="auth-photo-upload-btn"
                      className="inline-block mt-1 text-[11px] text-[#005a36] font-semibold hover:underline cursor-pointer"
                    >
                      Browse file...
                      <input
                        id="auth-photo-upload-btn"
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Faculty Full Name & Title
                    </label>
                    <input
                      type="text"
                      required
                      value={regData.name}
                      onChange={(e) =>
                        setRegData({ ...regData, name: e.target.value })
                      }
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#005a36]"
                      placeholder="e.g. APRIL JOY G. LUNG-AYAN, LPT"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Academic Rank
                    </label>
                    <input
                      type="text"
                      required
                      value={regData.rank}
                      onChange={(e) =>
                        setRegData({ ...regData, rank: e.target.value })
                      }
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#005a36]"
                      placeholder="e.g. INSTRUCTOR I"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      College
                    </label>
                    <input
                      type="text"
                      required
                      value={regData.college}
                      onChange={(e) =>
                        setRegData({ ...regData, college: e.target.value })
                      }
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#005a36]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Department
                    </label>
                    <input
                      type="text"
                      required
                      value={regData.department}
                      onChange={(e) =>
                        setRegData({ ...regData, department: e.target.value })
                      }
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#005a36]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Institutional Email
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#005a36]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Password
                    </label>
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#005a36]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Department Chair
                    </label>
                    <input
                      type="text"
                      required
                      value={regData.departmentChair}
                      onChange={(e) =>
                        setRegData({ ...regData, departmentChair: e.target.value })
                      }
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#005a36]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      College Dean
                    </label>
                    <input
                      type="text"
                      required
                      value={regData.collegeDean}
                      onChange={(e) =>
                        setRegData({ ...regData, collegeDean: e.target.value })
                      }
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#005a36]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-3 flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-gradient-to-r from-[#023e25] to-[#005a36] hover:from-[#00331e] hover:to-[#024a2d] text-white font-semibold text-sm shadow-md transition cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4 text-amber-300" />
                  <span>Register & Open Workload Portal</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Security & Compliance Footer Note */}
        <div className="mt-4 text-center text-xs text-emerald-100 flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-amber-300" />
          <span>Institutional Portal • Isabela State University Cauayan</span>
        </div>
      </div>
    </div>
  );
};
