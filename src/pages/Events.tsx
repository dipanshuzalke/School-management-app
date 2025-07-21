import React from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { Card } from '../components/Common/Card';
import { Event } from '../data/mockData';

interface EventsProps {
  events: Event[];
}

export function Events({ events }: EventsProps) {
  const getEventColor = (type: string) => {
    switch (type) {
      case 'exam': return 'bg-red-500';
      case 'holiday': return 'bg-green-500';
      case 'event': return 'bg-blue-500';
      case 'meeting': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'exam': return '📝';
      case 'holiday': return '🏖️';
      case 'event': return '🎉';
      case 'meeting': return '👥';
      default: return '📅';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      day: date.getDate(),
      month: date.toLocaleDateString('en-US', { month: 'short' }),
      full: date.toLocaleDateString('en-US', { 
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    };
  };

  const isUpcoming = (dateString: string) => {
    const eventDate = new Date(dateString);
    const today = new Date();
    return eventDate >= today;
  };

  const upcomingEvents = events.filter(event => isUpcoming(event.date));
  const pastEvents = events.filter(event => !isUpcoming(event.date));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Academic Calendar</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Stay updated with important academic events and deadlines
          </p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {upcomingEvents.length}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Upcoming</p>
        </div>
      </div>

      {upcomingEvents.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Upcoming Events
          </h2>
          <div className="space-y-4">
            {upcomingEvents.map((event) => {
              const dateInfo = formatDate(event.date);
              
              return (
                <Card key={event.id} className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="text-center">
                      <div className={`w-12 h-12 rounded-lg ${getEventColor(event.type)} flex items-center justify-center text-white font-bold`}>
                        <span className="text-lg">{getEventIcon(event.type)}</span>
                      </div>
                      <div className="mt-2 text-center">
                        <p className="text-sm font-bold text-gray-900 dark:text-white">{dateInfo.day}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{dateInfo.month}</p>
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {event.title}
                        </h3>
                        <span className={`px-3 py-1 text-xs font-medium rounded-full text-white capitalize ${getEventColor(event.type)}`}>
                          {event.type}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 dark:text-gray-400 mb-3">
                        {event.description}
                      </p>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center">
                          <Calendar size={14} className="mr-1" />
                          {dateInfo.full}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {pastEvents.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Past Events
          </h2>
          <div className="space-y-4 opacity-75">
            {pastEvents.map((event) => {
              const dateInfo = formatDate(event.date);
              
              return (
                <Card key={event.id} className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="text-center">
                      <div className={`w-12 h-12 rounded-lg ${getEventColor(event.type)} opacity-50 flex items-center justify-center text-white font-bold`}>
                        <span className="text-lg">{getEventIcon(event.type)}</span>
                      </div>
                      <div className="mt-2 text-center">
                        <p className="text-sm font-bold text-gray-500 dark:text-gray-400">{dateInfo.day}</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500">{dateInfo.month}</p>
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400">
                          {event.title}
                        </h3>
                        <span className="px-3 py-1 text-xs font-medium rounded-full bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-400 capitalize">
                          {event.type}
                        </span>
                      </div>
                      
                      <p className="text-gray-500 dark:text-gray-500 mb-3">
                        {event.description}
                      </p>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-400 dark:text-gray-500">
                        <div className="flex items-center">
                          <Calendar size={14} className="mr-1" />
                          {dateInfo.full}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {events.length === 0 && (
        <Card className="p-12 text-center">
          <div className="text-gray-400 dark:text-gray-600 mb-4">
            <Calendar size={48} className="mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No events scheduled
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Academic events and important dates will appear here.
          </p>
        </Card>
      )}
    </div>
  );
}