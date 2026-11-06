import React, { useState } from 'react';
import { FacultyProfile, ClassScheduleItem } from '../types';
import {
  User,
  Calendar,
  Clock,
  Plus,
  Trash2,
  Edit2,
  Save,
  CheckCircle,
  Building2,
  BookOpen,
  Sparkles,
} from 'lucide-react';
import { DEFAULT_SCHEDULE, DEFAULT_FACULTY_PROFILE } from '../data/sampleData';

interface ScheduleProfileModuleProps {
  facultyProfile: FacultyProfile;
  setFacultyProfile: React.Dispatch<React.SetStateAction<FacultyProfile>>;
  schedule: ClassScheduleItem[];
  setSchedule: React.Dispatch<React.SetStateAction<ClassScheduleItem[]>>;
}

export const ScheduleProfileModule: React.FC<ScheduleProfileModuleProps> = ({
  facultyProfile,
  setFacultyProfile,
  schedule,
  setSchedule,
}) => {
  const [profileSaved, setProfileSaved] = useState(false);
  const [showAddClass, setShowAddClass] = useState(false);
  const [newClass, setNewClass] = useState<Partial<ClassScheduleItem>>({
    dayOfWeek: 'Friday',
    courseCode: '',
    courseTitle: '',
    section: '',
    startTime: '08:00 AM',
    endTime: '11:00 AM',
    creditUnits: 3,
    roomOrPlatform: 'Google Classroom / Zoom',
    modalityDefault: 'Asynchronous',
  });

  const handleProfileChange = (field: keyof FacultyProfile, value: string) => {
    setFacultyProfile((prev) => ({ ...prev, [field]: value }));
    setProfileSaved(false);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 3000);
  };

  const handleAddClass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClass.courseCode || !newClass.courseTitle || !newClass.section) return;

    const item: ClassScheduleItem = {
      id: `sched-${Date.now()}`,
      courseCode: newClass.courseCode,
      courseTitle: newClass.courseTitle,
      section: newClass.section,
      dayOfWeek: (newClass.dayOfWeek as any) || 'Friday',
      startTime: newClass.startTime || '08:00 AM',
      endTime: newClass.endTime || '11:00 AM',
      creditUnits: Number(newClass.creditUnits) || 3,
      roomOrPlatform: newClass.roomOrPlatform || 'Google Classroom',
      modalityDefault: newClass.modalityDefault as any || 'Asynchronous',
    };

    setSchedule((prev) => [...prev, item]);
    setShowAddClass(false);
    setNewClass({
      dayOfWeek: 'Friday',
      courseCode: '',
      courseTitle: '',
      section: '',
      startTime: '08:00 AM',
      endTime: '11:00 AM',
      creditUnits: 3,
      roomOrPlatform: 'Google Classroom / Zoom',
      modalityDefault: 'Asynchronous',
    });
  };

  const handleDeleteClass = (id: string) => {
    setSchedule((prev) => prev.filter((item) => item.id !== id));
  };

  const daysOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  // Group schedule by days
  const groupedSchedule = daysOrder.map((day) => ({
    day,
    items: schedule.filter((s) => s.dayOfWeek === day),
  }));

  const totalTeachingUnits = schedule.reduce((sum, item) => sum + (item.creditUnits || 0), 0);

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <User className="w-5 h-5 text-emerald-600" />
              Faculty Profile & Master Teaching Schedule
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Your official credentials and class schedules are seamlessly synchronized into the 
              <strong> Accomplishment Reports (AR)</strong> and <strong> Learner's Activity Reports (LAR)</strong>.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg border border-slate-300 font-medium">
              Total Teaching Units: <strong className="text-emerald-700">{totalTeachingUnits} Units</strong>
            </span>
            <button
              onClick={() => {
                setSchedule(DEFAULT_SCHEDULE);
                setFacultyProfile(DEFAULT_FACULTY_PROFILE);
              }}
              className="text-xs text-slate-600 hover:text-slate-900 underline flex items-center gap-1 cursor-pointer"
            >
              Reset to Recommended Preset
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Faculty Profile Form */}
        <div className="lg:col-span-1 bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
            <h3 className="font-semibold text-slate-900 flex items-center gap-2 text-base">
              <Building2 className="w-4 h-4 text-emerald-600" />
              Faculty Information
            </h3>
            {profileSaved && (
              <span className="inline-flex items-center text-xs text-emerald-600 font-medium gap-1">
                <CheckCircle className="w-3.5 h-3.5" /> Saved
              </span>
            )}
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-3.5 text-sm">
            {/* Faculty Photo Upload */}
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
              <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#005a36] bg-slate-200 flex items-center justify-center shrink-0">
                {facultyProfile.photoUrl ? (
                  <img
                    src={facultyProfile.photoUrl}
                    alt={facultyProfile.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-7 h-7 text-slate-400" />
                )}
              </div>
              <div className="flex-1 text-xs">
                <span className="font-semibold text-slate-800 block">Faculty Photo</span>
                <label className="text-[11px] text-[#005a36] font-medium hover:underline cursor-pointer inline-block mt-0.5">
                  Change Photo
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          handleProfileChange('photoUrl', reader.result as string);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                </label>
                {facultyProfile.photoUrl && (
                  <button
                    type="button"
                    onClick={() => handleProfileChange('photoUrl', '')}
                    className="ml-2 text-[11px] text-rose-600 hover:underline"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Full Name with Title & Degree
              </label>
              <input
                type="text"
                value={facultyProfile.name}
                onChange={(e) => handleProfileChange('name', e.target.value)}
                className="w-full px-3 py-1.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-[#005a36] focus:outline-none text-slate-800"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Academic Rank
                </label>
                <input
                  type="text"
                  value={facultyProfile.rank}
                  onChange={(e) => handleProfileChange('rank', e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:outline-none text-slate-800"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Academic Year
                </label>
                <input
                  type="text"
                  value={facultyProfile.academicYear}
                  onChange={(e) => handleProfileChange('academicYear', e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:outline-none text-slate-800"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Semester / Term
                </label>
                <select
                  value={facultyProfile.semester}
                  onChange={(e) => handleProfileChange('semester', e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:outline-none text-slate-800 bg-white"
                >
                  <option value="1st Semester">1st Semester</option>
                  <option value="2nd Semester">2nd Semester</option>
                  <option value="Midyear / Summer">Midyear / Summer</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Department
                </label>
                <input
                  type="text"
                  value={facultyProfile.department}
                  onChange={(e) => handleProfileChange('department', e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:outline-none text-slate-800"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                College / Institute
              </label>
              <input
                type="text"
                value={facultyProfile.college}
                onChange={(e) => handleProfileChange('college', e.target.value)}
                className="w-full px-3 py-1.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:outline-none text-slate-800"
              />
            </div>

            <div className="border-t border-slate-200 pt-3 mt-3">
              <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                Approval Signatories
              </h4>
              <div className="space-y-2">
                <div>
                  <label className="block text-[11px] font-medium text-slate-600 mb-0.5">
                    Department Chair
                  </label>
                  <input
                    type="text"
                    value={facultyProfile.departmentChair}
                    onChange={(e) => handleProfileChange('departmentChair', e.target.value)}
                    className="w-full px-2.5 py-1 text-xs border border-slate-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-600 mb-0.5">
                    College Dean
                  </label>
                  <input
                    type="text"
                    value={facultyProfile.collegeDean}
                    onChange={(e) => handleProfileChange('collegeDean', e.target.value)}
                    className="w-full px-2.5 py-1 text-xs border border-slate-300 rounded-md"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-4 flex items-center justify-center gap-2 py-2 px-4 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-lg transition text-xs cursor-pointer shadow-sm"
            >
              <Save className="w-4 h-4" /> Save Profile Details
            </button>
          </form>
        </div>

        {/* Master Schedule Manager */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-semibold text-slate-900 flex items-center gap-2 text-base">
                  <Calendar className="w-4 h-4 text-emerald-600" />
                  Weekly Class Teaching Schedule
                </h3>
                <p className="text-xs text-slate-500">
                  Classes programmed for each day. WFH reports will auto-pull from this schedule.
                </p>
              </div>

              <button
                onClick={() => setShowAddClass(!showAddClass)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-medium transition cursor-pointer shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                {showAddClass ? 'Cancel' : 'Add Class Subject'}
              </button>
            </div>

            {/* Add Class Form */}
            {showAddClass && (
              <form
                onSubmit={handleAddClass}
                className="bg-slate-50 border border-slate-200 rounded-lg p-4 mb-6 text-xs space-y-3"
              >
                <h4 className="font-bold text-slate-800 text-xs">New Class Assignment</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-slate-600 mb-1">Subject / Course Code</label>
                    <input
                      type="text"
                      placeholder="e.g. IT 311"
                      value={newClass.courseCode}
                      onChange={(e) => setNewClass({ ...newClass, courseCode: e.target.value })}
                      className="w-full px-2.5 py-1.5 border border-slate-300 rounded bg-white"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-slate-600 mb-1">Course Title</label>
                    <input
                      type="text"
                      placeholder="e.g. Web Systems and Technologies"
                      value={newClass.courseTitle}
                      onChange={(e) => setNewClass({ ...newClass, courseTitle: e.target.value })}
                      className="w-full px-2.5 py-1.5 border border-slate-300 rounded bg-white"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-slate-600 mb-1">Section</label>
                    <input
                      type="text"
                      placeholder="e.g. BSIT 3-A"
                      value={newClass.section}
                      onChange={(e) => setNewClass({ ...newClass, section: e.target.value })}
                      className="w-full px-2.5 py-1.5 border border-slate-300 rounded bg-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-slate-600 mb-1">Day of Week</label>
                    <select
                      value={newClass.dayOfWeek}
                      onChange={(e) => setNewClass({ ...newClass, dayOfWeek: e.target.value as any })}
                      className="w-full px-2.5 py-1.5 border border-slate-300 rounded bg-white"
                    >
                      {daysOrder.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-600 mb-1">Time Schedule</label>
                    <input
                      type="text"
                      placeholder="08:00 AM - 11:00 AM"
                      value={`${newClass.startTime} - ${newClass.endTime}`}
                      onChange={(e) => {
                        const parts = e.target.value.split('-');
                        setNewClass({
                          ...newClass,
                          startTime: parts[0]?.trim() || '08:00 AM',
                          endTime: parts[1]?.trim() || '11:00 AM',
                        });
                      }}
                      className="w-full px-2.5 py-1.5 border border-slate-300 rounded bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-600 mb-1">Credit Units</label>
                    <input
                      type="number"
                      value={newClass.creditUnits}
                      onChange={(e) => setNewClass({ ...newClass, creditUnits: Number(e.target.value) })}
                      className="w-full px-2.5 py-1.5 border border-slate-300 rounded bg-white"
                      min={1}
                      max={6}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-600 mb-1">Room or Online Platform</label>
                    <input
                      type="text"
                      placeholder="e.g. Google Classroom / Zoom or Comp Lab 3"
                      value={newClass.roomOrPlatform}
                      onChange={(e) => setNewClass({ ...newClass, roomOrPlatform: e.target.value })}
                      className="w-full px-2.5 py-1.5 border border-slate-300 rounded bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 mb-1">Default Teaching Modality</label>
                    <select
                      value={newClass.modalityDefault}
                      onChange={(e) => setNewClass({ ...newClass, modalityDefault: e.target.value as any })}
                      className="w-full px-2.5 py-1.5 border border-slate-300 rounded bg-white"
                    >
                      <option value="Asynchronous">Asynchronous (WFH)</option>
                      <option value="Synchronous">Synchronous (Live WFH)</option>
                      <option value="Face-to-Face">Face-to-Face (On-Campus)</option>
                      <option value="Blended">Blended / HyFlex</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddClass(false)}
                    className="px-3 py-1.5 rounded bg-slate-200 text-slate-700 hover:bg-slate-300 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded bg-emerald-600 text-white font-medium hover:bg-emerald-700 cursor-pointer shadow-sm"
                  >
                    Save Subject
                  </button>
                </div>
              </form>
            )}

            {/* Schedule View Grouped by Day */}
            <div className="space-y-4">
              {groupedSchedule.map(({ day, items }) => (
                <div
                  key={day}
                  className={`border rounded-lg overflow-hidden ${
                    day === 'Friday' ? 'border-amber-300/80 bg-amber-50/20' : 'border-slate-200'
                  }`}
                >
                  <div
                    className={`px-4 py-2 flex items-center justify-between text-xs font-bold ${
                      day === 'Friday'
                        ? 'bg-amber-100/70 text-amber-900 border-b border-amber-200'
                        : 'bg-slate-100 text-slate-700 border-b border-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      <span>{day}</span>
                      {day === 'Friday' && (
                        <span className="text-[10px] bg-amber-500 text-white px-1.5 py-0.2 rounded font-semibold uppercase">
                          WFH Designated Day
                        </span>
                      )}
                    </div>
                    <span className="text-slate-500 font-normal">
                      {items.length} {items.length === 1 ? 'Class' : 'Classes'}
                    </span>
                  </div>

                  {items.length === 0 ? (
                    <div className="p-3 text-center text-xs text-slate-400 italic">
                      No classes scheduled for {day}
                    </div>
                  ) : (
                    <div className="divide-y divide-slate-100">
                      {items.map((item) => (
                        <div
                          key={item.id}
                          className="p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-slate-50/80 transition"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-bold text-xs text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                                {item.courseCode}
                              </span>
                              <span className="font-semibold text-xs text-slate-900">
                                {item.courseTitle}
                              </span>
                              <span className="text-[11px] text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                                Section: {item.section}
                              </span>
                            </div>
                            <div className="flex items-center gap-3 text-xs text-slate-600 flex-wrap">
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3 text-slate-400" />
                                {item.startTime} - {item.endTime}
                              </span>
                              <span>•</span>
                              <span>{item.creditUnits} Units</span>
                              <span>•</span>
                              <span className="text-slate-500 italic">{item.roomOrPlatform}</span>
                              <span
                                className={`text-[10px] px-1.5 py-0.2 rounded font-medium ${
                                  item.modalityDefault === 'Asynchronous'
                                    ? 'bg-blue-100 text-blue-700'
                                    : item.modalityDefault === 'Synchronous'
                                    ? 'bg-purple-100 text-purple-700'
                                    : 'bg-slate-100 text-slate-700'
                                }`}
                              >
                                {item.modalityDefault || 'Asynchronous'}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-1 self-end sm:self-center">
                            <button
                              onClick={() => handleDeleteClass(item.id)}
                              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded transition cursor-pointer"
                              title="Delete class"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
