import React from 'react';
import { Clock, MapPin, User } from 'lucide-react';
import { Card } from '../components/Common/Card';
import { Subject } from '../data/mockData';

interface TimetableProps {
  subjects: Subject[];
}

export function Timetable({ subjects }: TimetableProps) {
  const currentTime = new Date().toLocaleTimeString('en-US', { 
    hour12: false,
    hour: '2-digit',
    minute: '2-digit'
  });

  const isCurrentClass = (time: string) => {
    const [startTime] = time.split(' - ');
    const [hour, minute] = startTime.split(':');
    const classTime = `${hour}:${minute}`;
    return currentTime >= classTime;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Today's Schedule</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500 dark:text-gray-400">Current Time</p>
          <p className="text-lg font-semibold text-gray-900 dark:text-white">
            {new Date().toLocaleTimeString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit'
            })}
          </p>
        </div>
      </div>

      <div className="grid gap-4">
        {subjects.map((subject, index) => (
          <Card 
            key={subject.id} 
            className={`p-6 border-l-4 ${subject.color} ${
              isCurrentClass(subject.time) && index === 0 
                ? 'ring-2 ring-blue-500 ring-opacity-50' 
                : ''
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-lg ${subject.color} flex items-center justify-center`}>
                  <span className="text-white font-bold text-lg">
                    {subject.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {subject.name}
                  </h3>
                  <div className="flex items-center space-x-4 mt-1">
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <User size={14} className="mr-1" />
                      {subject.teacher}
                    </div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <MapPin size={14} className="mr-1" />
                      {subject.room}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="flex items-center text-lg font-semibold text-gray-900 dark:text-white">
                  <Clock size={18} className="mr-2" />
                  {subject.time}
                </div>
                {isCurrentClass(subject.time) && index === 0 && (
                  <span className="inline-block mt-2 px-3 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full text-sm font-medium">
                    Current Class
                  </span>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            School Hours
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Monday - Friday: 8:30 AM - 3:30 PM
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
            Lunch Break: 12:30 PM - 1:30 PM
          </p>
        </div>
      </Card>
    </div>
  );
}