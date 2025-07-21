import React from 'react';
import { Calendar, TrendingUp, Clock } from 'lucide-react';
import { Card } from '../components/Common/Card';

export function Attendance() {
  const attendanceData = {
    present: 178,
    absent: 12,
    total: 190,
    percentage: 94
  };

  const monthlyData = [
    { month: 'Sep', present: 22, total: 23 },
    { month: 'Oct', present: 20, total: 21 },
    { month: 'Nov', present: 18, total: 19 },
    { month: 'Dec', present: 15, total: 16 }
  ];

  const recentAttendance = [
    { date: '2024-12-17', status: 'present' },
    { date: '2024-12-16', status: 'present' },
    { date: '2024-12-15', status: 'absent' },
    { date: '2024-12-14', status: 'present' },
    { date: '2024-12-13', status: 'present' },
    { date: '2024-12-12', status: 'present' },
    { date: '2024-12-11', status: 'present' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Attendance Tracker</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Monitor your attendance record and trends
          </p>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 text-center">
          <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Calendar size={24} className="text-green-600 dark:text-green-400" />
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{attendanceData.present}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Days Present</p>
        </Card>

        <Card className="p-6 text-center">
          <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Clock size={24} className="text-red-600 dark:text-red-400" />
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{attendanceData.absent}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Days Absent</p>
        </Card>

        <Card className="p-6 text-center">
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
            <TrendingUp size={24} className="text-blue-600 dark:text-blue-400" />
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{attendanceData.percentage}%</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Attendance Rate</p>
        </Card>

        <Card className="p-6 text-center">
          <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Calendar size={24} className="text-purple-600 dark:text-purple-400" />
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{attendanceData.total}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Total Days</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Breakdown */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Monthly Breakdown</h3>
          <div className="space-y-4">
            {monthlyData.map((month, index) => {
              const percentage = Math.round((month.present / month.total) * 100);
              return (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span className="font-medium text-gray-900 dark:text-white w-8">
                      {month.month}
                    </span>
                    <div className="flex-1 w-40 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {month.present}/{month.total}
                    </span>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{percentage}%</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Recent Attendance */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Recent Attendance</h3>
          <div className="space-y-3">
            {recentAttendance.map((record, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    record.status === 'present' 
                      ? 'bg-green-500' 
                      : 'bg-red-500'
                  }`}></div>
                  <span className="text-gray-900 dark:text-white">
                    {new Date(record.date).toLocaleDateString('en-US', { 
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                <span className={`px-3 py-1 text-xs font-medium rounded-full capitalize ${
                  record.status === 'present'
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                }`}>
                  {record.status}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Attendance Goal */}
      <Card className="p-6 bg-gradient-to-r from-green-50 to-blue-50 dark:from-gray-800 dark:to-gray-700">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Attendance Goal
          </h3>
          <div className="flex items-center justify-center space-x-8 mb-4">
            <div>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                {attendanceData.percentage}%
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Current</p>
            </div>
            <div className="text-gray-400 dark:text-gray-600">vs</div>
            <div>
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">95%</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Target</p>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            {attendanceData.percentage >= 95 
              ? "🎉 Great job! You've reached your attendance goal!"
              : `You need ${Math.ceil((95 * attendanceData.total / 100) - attendanceData.present)} more present days to reach 95%.`
            }
          </p>
        </div>
      </Card>
    </div>
  );
}