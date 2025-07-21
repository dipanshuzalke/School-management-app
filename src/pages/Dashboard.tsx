import React from 'react';
import { Calendar, BookOpen, Bell, CalendarDays, CheckSquare, Award } from 'lucide-react';
import { Card } from '../components/Common/Card';
import { QuickAccessCard } from '../components/Dashboard/QuickAccessCard';
import { Student, Assignment, Notification, Event } from '../data/mockData';

interface DashboardProps {
  student: Student;
  assignments: Assignment[];
  notifications: Notification[];
  events: Event[];
  onNavigate: (page: string) => void;
}

export function Dashboard({ student, assignments, notifications, events, onNavigate }: DashboardProps) {
  const pendingAssignments = assignments.filter(a => !a.isCompleted).length;
  const unreadNotifications = notifications.filter(n => !n.isRead).length;
  const upcomingEvents = events.filter(e => new Date(e.date) >= new Date()).length;

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <Card className="p-6">
        <div className="flex items-center space-x-4">
          <img
            src={student.photo}
            alt={student.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Welcome back, {student.name.split(' ')[0]}! 👋
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {student.class} • Roll No: {student.rollNumber}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
        </div>
      </Card>

      {/* Quick Access Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <QuickAccessCard
          title="Today's Classes"
          subtitle="View your schedule"
          icon={Calendar}
          color="bg-blue-600"
          count={6}
          onClick={() => onNavigate('timetable')}
        />
        
        <QuickAccessCard
          title="Pending Tasks"
          subtitle="Assignments due soon"
          icon={BookOpen}
          color="bg-orange-600"
          count={pendingAssignments}
          onClick={() => onNavigate('assignments')}
        />
        
        <QuickAccessCard
          title="Notifications"
          subtitle="New updates"
          icon={Bell}
          color="bg-purple-600"
          count={unreadNotifications}
          onClick={() => onNavigate('notifications')}
        />
        
        <QuickAccessCard
          title="Upcoming Events"
          subtitle="School activities"
          icon={CalendarDays}
          color="bg-green-600"
          count={upcomingEvents}
          onClick={() => onNavigate('events')}
        />
        
        <QuickAccessCard
          title="To-Do List"
          subtitle="Daily tasks"
          icon={CheckSquare}
          color="bg-indigo-600"
          onClick={() => onNavigate('todo')}
        />
        
        <QuickAccessCard
          title="Achievements"
          subtitle="Your progress"
          icon={Award}
          color="bg-yellow-600"
          onClick={() => onNavigate('achievements')}
        />
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Assignments */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Recent Assignments
          </h3>
          <div className="space-y-3">
            {assignments.slice(0, 3).map((assignment) => (
              <div key={assignment.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex-1">
                  <p className="font-medium text-gray-900 dark:text-white">
                    {assignment.title}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {assignment.subject} • Due: {new Date(assignment.dueDate).toLocaleDateString()}
                  </p>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  assignment.isCompleted
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                }`}>
                  {assignment.isCompleted ? 'Completed' : 'Pending'}
                </span>
              </div>
            ))}
          </div>
          <button
            onClick={() => onNavigate('assignments')}
            className="mt-4 w-full text-center text-blue-600 dark:text-blue-400 hover:underline"
          >
            View All Assignments
          </button>
        </Card>

        {/* Quick Stats */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Academic Overview
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">Overall Grade</span>
              <span className="font-semibold text-green-600 dark:text-green-400">A</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">Attendance</span>
              <span className="font-semibold text-blue-600 dark:text-blue-400">94%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">Assignments Completed</span>
              <span className="font-semibold text-purple-600 dark:text-purple-400">
                {assignments.filter(a => a.isCompleted).length}/{assignments.length}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">Current Rank</span>
              <span className="font-semibold text-orange-600 dark:text-orange-400">3rd</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}