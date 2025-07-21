import React from 'react';
import { Award, Calendar, TrendingUp } from 'lucide-react';
import { Card } from '../components/Common/Card';
import { mockAchievements } from '../data/mockData';

export function Achievements() {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'academic': return 'bg-blue-500';
      case 'attendance': return 'bg-green-500';
      case 'participation': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'academic': return '🎓';
      case 'attendance': return '📅';
      case 'participation': return '🤝';
      default: return '🏆';
    }
  };

  const groupedAchievements = mockAchievements.reduce((acc, achievement) => {
    if (!acc[achievement.category]) {
      acc[achievement.category] = [];
    }
    acc[achievement.category].push(achievement);
    return acc;
  }, {} as Record<string, typeof mockAchievements>);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Achievements</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Celebrate your academic milestones and progress
          </p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
            {mockAchievements.length}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Total Badges</p>
        </div>
      </div>

      {/* Achievement Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 text-center">
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
            <TrendingUp size={24} className="text-blue-600 dark:text-blue-400" />
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {groupedAchievements.academic?.length || 0}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Academic</p>
        </Card>

        <Card className="p-6 text-center">
          <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Calendar size={24} className="text-green-600 dark:text-green-400" />
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {groupedAchievements.attendance?.length || 0}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Attendance</p>
        </Card>

        <Card className="p-6 text-center">
          <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Award size={24} className="text-purple-600 dark:text-purple-400" />
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {groupedAchievements.participation?.length || 0}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Participation</p>
        </Card>
      </div>

      {/* Achievements by Category */}
      {Object.entries(groupedAchievements).map(([category, achievements]) => (
        <div key={category}>
          <div className="flex items-center mb-4">
            <span className="text-2xl mr-3">{getCategoryIcon(category)}</span>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white capitalize">
              {category} Achievements
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement) => (
              <Card key={achievement.id} className="p-6 text-center">
                <div className="text-4xl mb-4">{achievement.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {achievement.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {achievement.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className={`px-3 py-1 text-xs font-medium rounded-full text-white capitalize ${getCategoryColor(achievement.category)}`}>
                    {achievement.category}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(achievement.earnedDate).toLocaleDateString()}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      ))}

      {/* Progress Section */}
      <Card className="p-6 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-gray-800 dark:to-gray-700">
        <div className="text-center">
          <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Award size={32} className="text-yellow-600 dark:text-yellow-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Keep Up the Great Work! 🌟
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            You're doing amazing! Continue your excellent performance to unlock more achievements.
          </p>
          
          {/* Upcoming Achievements */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 max-w-md mx-auto">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Next Milestone</h4>
            <div className="flex items-center space-x-3">
              <span className="text-2xl">🎯</span>
              <div className="flex-1 text-left">
                <p className="text-sm font-medium text-gray-900 dark:text-white">Excellence Award</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Maintain A+ grade for 3 months</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500 dark:text-gray-400">2/3 months</p>
                <div className="w-16 bg-gray-200 dark:bg-gray-600 rounded-full h-1 mt-1">
                  <div className="bg-yellow-500 h-1 rounded-full" style={{ width: '67%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}