import React, { useState } from 'react';
import { FacultyProfile } from '../types';
import { OFFICIAL_ISU_LOGO } from '../data/sampleData';
import {
  X,
  Camera,
  Upload,
  User,
  Building,
  GraduationCap,
  Calendar,
  CheckCircle,
  Save,
} from 'lucide-react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  facultyProfile: FacultyProfile;
  onSaveProfile: (updated: FacultyProfile) => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  facultyProfile,
  onSaveProfile,
}) => {
  const [profileData, setProfileData] = useState<FacultyProfile>(facultyProfile);
  const [imagePreview, setImagePreview] = useState<string | null>(
    facultyProfile.photoUrl || null
  );
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('Please choose an image under 2MB.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setImagePreview(base64);
        setProfileData((prev) => ({ ...prev, photoUrl: base64 }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile({
      ...profileData,
      photoUrl: imagePreview || profileData.photoUrl,
    });
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header with ISU Green Gradient */}
        <div className="bg-gradient-to-r from-[#023e25] via-[#005a36] to-[#046a38] px-6 py-4 flex items-center justify-between text-white border-b-2 border-amber-400">
          <div className="flex items-center gap-3">
            <img
              src={OFFICIAL_ISU_LOGO}
              alt="ISU Logo"
              className="w-10 h-10 object-contain drop-shadow"
            />
            <div>
              <h2 className="text-lg font-bold text-white tracking-wide">
                Faculty Profile & Credentials
              </h2>
              <p className="text-xs text-emerald-100">
                Isabela State University • Cauayan Campus
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          {savedSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 text-sm rounded-lg flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>Profile updated successfully!</span>
            </div>
          )}

          {/* Profile Picture Upload Section */}
          <div className="flex flex-col sm:flex-row items-center gap-6 p-4 bg-slate-50 rounded-xl border border-slate-200">
            <div className="relative group">
              <div className="w-24 h-24 rounded-full overflow-hidden border-3 border-[#005a36] bg-slate-200 shadow-md flex items-center justify-center">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt={profileData.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-12 h-12 text-slate-400" />
                )}
              </div>
              <label
                htmlFor="photo-upload"
                className="absolute bottom-0 right-0 p-2 rounded-full bg-[#005a36] hover:bg-[#023e25] text-white shadow cursor-pointer transition"
                title="Upload Profile Picture"
              >
                <Camera className="w-4 h-4" />
                <input
                  id="photo-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>

            <div className="space-y-1 text-center sm:text-left flex-1">
              <h3 className="text-sm font-semibold text-slate-800">
                Official Faculty Photo
              </h3>
              <p className="text-xs text-slate-500">
                Upload your institutional portrait photo. This appears on your
                portal header and generated faculty reports. Max 2MB (JPG, PNG).
              </p>
              <div className="pt-2 flex items-center justify-center sm:justify-start gap-2">
                <label
                  htmlFor="photo-upload-btn"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-emerald-50 hover:bg-emerald-100 text-[#005a36] border border-emerald-300 cursor-pointer transition"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Choose Photo File</span>
                  <input
                    id="photo-upload-btn"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
                {imagePreview && (
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreview(null);
                      setProfileData((prev) => ({ ...prev, photoUrl: undefined }));
                    }}
                    className="text-xs text-rose-600 hover:underline px-2 py-1"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Form Fields Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Full Name & Credentials
              </label>
              <input
                type="text"
                required
                value={profileData.name}
                onChange={(e) =>
                  setProfileData({ ...profileData, name: e.target.value })
                }
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#005a36] focus:border-transparent"
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
                value={profileData.rank}
                onChange={(e) =>
                  setProfileData({ ...profileData, rank: e.target.value })
                }
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#005a36] focus:border-transparent"
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
                value={profileData.college}
                onChange={(e) =>
                  setProfileData({ ...profileData, college: e.target.value })
                }
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#005a36] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Department
              </label>
              <input
                type="text"
                required
                value={profileData.department}
                onChange={(e) =>
                  setProfileData({ ...profileData, department: e.target.value })
                }
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#005a36] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Academic Year
              </label>
              <input
                type="text"
                required
                value={profileData.academicYear}
                onChange={(e) =>
                  setProfileData({ ...profileData, academicYear: e.target.value })
                }
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#005a36] focus:border-transparent"
                placeholder="2026-2027"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Semester / Term
              </label>
              <input
                type="text"
                required
                value={profileData.semester}
                onChange={(e) =>
                  setProfileData({ ...profileData, semester: e.target.value })
                }
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#005a36] focus:border-transparent"
                placeholder="1st Semester"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Department / Program Chair
              </label>
              <input
                type="text"
                required
                value={profileData.departmentChair}
                onChange={(e) =>
                  setProfileData({
                    ...profileData,
                    departmentChair: e.target.value,
                  })
                }
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#005a36] focus:border-transparent"
                placeholder="e.g. AIMEE D. MOLATO, DIT"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                College Dean
              </label>
              <input
                type="text"
                required
                value={profileData.collegeDean}
                onChange={(e) =>
                  setProfileData({ ...profileData, collegeDean: e.target.value })
                }
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#005a36] focus:border-transparent"
                placeholder="e.g. ARNEL C. FAJARDO, PhD"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2 text-sm font-medium text-white bg-gradient-to-r from-[#023e25] to-[#005a36] hover:from-[#00331e] hover:to-[#024a2d] rounded-lg shadow-sm transition"
            >
              <Save className="w-4 h-4" />
              <span>Save Profile & Photo</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
