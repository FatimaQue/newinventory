'use client';

import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Bell, 
  ShieldCheck, 
  Monitor, 
  LogOut, 
  Camera 
} from 'lucide-react';

const AccountSettings = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', name: 'My Profile', icon: <User size={18} /> },
    { id: 'email', name: 'Email & Security', icon: <Mail size={18} /> },
    { id: 'notifications', name: 'Notifications', icon: <Bell size={18} /> },
    { id: 'sessions', name: 'Active Sessions', icon: <Monitor size={18} /> },
  ];

  return (
    <div className="max-w-6xl mx-auto min-h-screen bg-gray-50/50 p-4 md:p-8">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Sidebar Navigation */}
        <aside className="w-full md:w-64 shrink-0">
          <h1 className="text-2xl font-bold text-gray-900 mb-6 px-2">Settings</h1>
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all
                  ${activeTab === tab.id 
                    ? 'bg-white text-blue-600 shadow-sm ring-1 ring-gray-200' 
                    : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'}`}
              >
                {tab.icon}
                {tab.name}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          
          {/* Profile Section */}
          {activeTab === 'profile' && (
            <div className="p-6 md:p-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Public Profile</h2>
              
              <div className="flex items-center gap-6 mb-8">
                <div className="relative group">
                  <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-3xl font-bold border-4 border-white shadow-md">
                   FI
                  </div>
                  <button className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-lg border border-gray-100 text-gray-600 hover:text-blue-600 transition-colors">
                    <Camera size={16} />
                  </button>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Fatima Iqbal</h3>
                  <p className="text-sm text-gray-500">Update your photo and personal details.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">First Name</label>
                  <input type="text" defaultValue="fatima" className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Last Name</label>
                  <input type="text" defaultValue="iqbal" className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-medium text-gray-700">Bio</label>
                  <textarea rows={4} className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all" placeholder="Tell us about yourself..." />
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end gap-3">
                <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">Cancel</button>
                <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors">Save Changes</button>
              </div>
            </div>
          )}

          {/* Active Sessions Section */}
          {activeTab === 'sessions' && (
            <div className="p-6 md:p-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <h2 className="text-xl font-bold text-gray-900 mb-2">Active Sessions</h2>
              <p className="text-sm text-gray-500 mb-8">Manage the devices where you are currently logged in.</p>

              <div className="space-y-4">
                {[
                  { device: 'MacBook Pro', os: 'macOS Sonoma', location: 'San Francisco, CA', active: true },
                  { device: 'iPhone 15 Pro', os: 'iOS 17.4', location: 'San Francisco, CA', active: false },
                ].map((session, i) => (
                  <div key={i} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-gray-100 rounded-lg text-gray-600">
                        <Monitor size={20} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-gray-900">{session.device}</h4>
                          {session.active && <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-bold uppercase rounded-full">Current</span>}
                        </div>
                        <p className="text-xs text-gray-500">{session.os} • {session.location}</p>
                      </div>
                    </div>
                    {!session.active && (
                      <button className="text-sm font-medium text-red-600 hover:underline">Log out</button>
                    )}
                  </div>
                ))}
              </div>

              <button className="mt-8 w-full py-3 flex items-center justify-center gap-2 text-sm font-semibold text-gray-700 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all">
                <LogOut size={16} />
                Sign out of all other sessions
              </button>
            </div>
          )}

          {/* Fallback for other tabs */}
          {(activeTab === 'email' || activeTab === 'notifications') && (
            <div className="p-20 text-center">
              <ShieldCheck className="mx-auto text-gray-300 mb-4" size={48} />
              <p className="text-gray-500 italic">This section is under construction.</p>
            </div>
          )}

        </main>
      </div>
    </div>
  );
};

export default AccountSettings;