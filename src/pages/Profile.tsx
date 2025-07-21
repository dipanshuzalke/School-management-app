import React from 'react';
import { User, Mail, GraduationCap, Hash, LogOut, Edit } from 'lucide-react';
import { Card } from '../components/Common/Card';
import { Student } from '../data/mockData';

interface ProfileProps {
  student: Student;
  onLogout: () => void;
}

export function Profile({ student, onLogout }: ProfileProps) {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Profile</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Manage your account information
        </p>
      </div>

      {/* Profile Card */}
      <Card className="p-8">
        <div className="text-center mb-8">
          <div className="relative inline-block">
            <img
              src={student.photo}
              alt={student.name}
              className="w-24 h-24 rounded-full object-cover mx-auto"
            />
            <button className="absolute bottom-0 right-0 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
              <Edit size={16} />
            </button>
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-4">
            {student.name}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {student.class}
          </p>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <User size={20} className="text-gray-600 dark:text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Full Name</p>
                  <p className="font-medium text-gray-900 dark:text-white">{student.name}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <Mail size={20} className="text-gray-600 dark:text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Email Address</p>
                  <p className="font-medium text-gray-900 dark:text-white">{student.email}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <GraduationCap size={20} className="text-gray-600 dark:text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Class</p>
                  <p className="font-medium text-gray-900 dark:text-white">{student.class}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <Hash size={20} className="text-gray-600 dark:text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Roll Number</p>
                  <p className="font-medium text-gray-900 dark:text-white">{student.rollNumber}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Academic Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">A</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Overall Grade</p>
              </div>
              <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">94%</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Attendance</p>
              </div>
              <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">3rd</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Class Rank</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <button
              onClick={onLogout}
              className="w-full flex items-center justify-center px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <LogOut size={20} className="mr-2" />
              Logout
            </button>
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-2">
              This will clear your session data and return you to the login screen
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}