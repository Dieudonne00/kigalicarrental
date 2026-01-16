"use client";

import ManagerSidebar from "@/components/ManagerSidebar";

export default function SettingsPage() {
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <ManagerSidebar />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto lg:ml-64 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 font-[family-name:var(--font-plus-jakarta)]">
            Settings
          </h1>
          <p className="mt-2 text-gray-600">
            Manage your account and platform settings.
          </p>
        </div>

        {/* Settings Sections */}
        <div className="space-y-6">
          {/* Account Settings */}
          <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-plus-jakarta)]">
              Account Settings
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#01B000] focus:outline-none"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#01B000] focus:outline-none"
                  placeholder="your.email@example.com"
                />
              </div>
              <button className="bg-[#01B000] text-white px-6 py-2 rounded-lg font-bold hover:bg-[#019500] transition-all shadow-md">
                Save Changes
              </button>
            </div>
          </div>

          {/* Password Settings */}
          <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-plus-jakarta)]">
              Change Password
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Current Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#01B000] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#01B000] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#01B000] focus:outline-none"
                />
              </div>
              <button className="bg-[#01B000] text-white px-6 py-2 rounded-lg font-bold hover:bg-[#019500] transition-all shadow-md">
                Update Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
