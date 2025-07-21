import React from 'react';
import { TrendingUp, Award, BarChart3 } from 'lucide-react';
import { Card } from '../components/Common/Card';
import { mockGrades } from '../data/mockData';

export function Grades() {
  const overallGPA = mockGrades.reduce((sum, grade) => sum + grade.percentage, 0) / mockGrades.length;
  const getGradeFromPercentage = (percentage: number) => {
    if (percentage >= 90) return 'A+';
    if (percentage >= 80) return 'A';
    if (percentage >= 70) return 'B+';
    if (percentage >= 60) return 'B';
    return 'C';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Academic Performance</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Track your grades and academic progress
          </p>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 text-center">
          <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Award size={24} className="text-green-600 dark:text-green-400" />
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {getGradeFromPercentage(overallGPA)}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Overall Grade</p>
        </Card>

        <Card className="p-6 text-center">
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
            <TrendingUp size={24} className="text-blue-600 dark:text-blue-400" />
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {overallGPA.toFixed(1)}%
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Average Score</p>
        </Card>

        <Card className="p-6 text-center">
          <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
            <BarChart3 size={24} className="text-purple-600 dark:text-purple-400" />
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">3rd</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Class Rank</p>
        </Card>
      </div>

      {/* Subject-wise Performance */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
          Subject-wise Performance
        </h3>
        <div className="space-y-6">
          {mockGrades.map((subject, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className={`w-3 h-3 rounded-full ${subject.color}`}></div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900 dark:text-white">
                    {subject.subject}
                  </span>
                  <div className="flex items-center space-x-4">
                    <span className="text-lg font-bold text-gray-900 dark:text-white">
                      {subject.grade}
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {subject.percentage}%
                    </span>
                  </div>
                </div>
                
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${subject.color}`}
                    style={{ width: `${subject.percentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Performance Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Strengths & Areas for Improvement
          </h3>
          
          <div className="space-y-6">
            <div>
              <h4 className="font-medium text-green-600 dark:text-green-400 mb-3">
                🎯 Strong Subjects
              </h4>
              <div className="space-y-2">
                {mockGrades
                  .filter(grade => grade.percentage >= 90)
                  .map((subject, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <span className="text-gray-900 dark:text-white">{subject.subject}</span>
                      <span className="font-bold text-green-600 dark:text-green-400">{subject.percentage}%</span>
                    </div>
                  ))
                }
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-orange-600 dark:text-orange-400 mb-3">
                📈 Room for Growth
              </h4>
              <div className="space-y-2">
                {mockGrades
                  .filter(grade => grade.percentage < 90)
                  .map((subject, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                      <span className="text-gray-900 dark:text-white">{subject.subject}</span>
                      <span className="font-bold text-orange-600 dark:text-orange-400">{subject.percentage}%</span>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Academic Progress
          </h3>
          
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600 dark:text-gray-400">Current Semester</span>
                <span className="font-bold text-blue-600 dark:text-blue-400">Fall 2024</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600 dark:text-gray-400">Credits Completed</span>
                <span className="font-bold text-gray-900 dark:text-white">18/24</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Semester GPA</span>
                <span className="font-bold text-green-600 dark:text-green-400">3.8</span>
              </div>
            </div>
            
            <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-lg">
              <div className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Next Academic Goal
                </p>
                <p className="font-semibold text-gray-900 dark:text-white">
                  Maintain 90%+ in all subjects
                </p>
                <div className="mt-3 w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">75% Complete</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}