import React from 'react';
import { Calendar, Clock, CheckCircle, Circle, AlertTriangle } from 'lucide-react';
import { Card } from '../components/Common/Card';
import { Assignment } from '../data/mockData';

interface AssignmentsProps {
  assignments: Assignment[];
  onUpdateAssignment: (id: string, isCompleted: boolean) => void;
}

export function Assignments({ assignments, onUpdateAssignment }: AssignmentsProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400';
      case 'medium': return 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'low': return 'text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400';
      default: return 'text-gray-600 bg-gray-50 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const pendingAssignments = assignments.filter(a => !a.isCompleted);
  const completedAssignments = assignments.filter(a => a.isCompleted);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Assignments</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage your academic tasks and deadlines
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-red-600 dark:text-red-400">
              {pendingAssignments.length}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Pending</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
              {completedAssignments.length}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Completed</p>
          </div>
        </div>
      </div>

      {pendingAssignments.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Pending Assignments
          </h2>
          <div className="space-y-4">
            {pendingAssignments.map((assignment) => {
              const daysUntilDue = getDaysUntilDue(assignment.dueDate);
              const isOverdue = daysUntilDue < 0;
              const isDueSoon = daysUntilDue <= 1 && daysUntilDue >= 0;
              
              return (
                <Card key={assignment.id} className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <button
                        onClick={() => onUpdateAssignment(assignment.id, true)}
                        className="mt-1 text-gray-400 hover:text-green-600 transition-colors"
                      >
                        <Circle size={20} />
                      </button>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {assignment.title}
                          </h3>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${getPriorityColor(assignment.priority)}`}>
                            {assignment.priority}
                          </span>
                        </div>
                        
                        <p className="text-gray-600 dark:text-gray-400 mb-3">
                          {assignment.description}
                        </p>
                        
                        <div className="flex items-center space-x-4 text-sm">
                          <div className="flex items-center text-gray-500 dark:text-gray-400">
                            <span className="font-medium">{assignment.subject}</span>
                          </div>
                          
                          <div className="flex items-center text-gray-500 dark:text-gray-400">
                            <Calendar size={14} className="mr-1" />
                            Due: {new Date(assignment.dueDate).toLocaleDateString()}
                          </div>
                          
                          <div className={`flex items-center ${
                            isOverdue 
                              ? 'text-red-600 dark:text-red-400' 
                              : isDueSoon 
                                ? 'text-orange-600 dark:text-orange-400'
                                : 'text-gray-500 dark:text-gray-400'
                          }`}>
                            <Clock size={14} className="mr-1" />
                            {isOverdue 
                              ? `Overdue by ${Math.abs(daysUntilDue)} day${Math.abs(daysUntilDue) !== 1 ? 's' : ''}`
                              : isDueSoon
                                ? daysUntilDue === 0 ? 'Due Today' : 'Due Tomorrow'
                                : `${daysUntilDue} day${daysUntilDue !== 1 ? 's' : ''} left`
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {(isOverdue || isDueSoon) && (
                      <AlertTriangle 
                        size={20} 
                        className={isOverdue 
                          ? 'text-red-600 dark:text-red-400' 
                          : 'text-orange-600 dark:text-orange-400'
                        } 
                      />
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {completedAssignments.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Completed Assignments
          </h2>
          <div className="space-y-4">
            {completedAssignments.map((assignment) => (
              <Card key={assignment.id} className="p-6 opacity-75">
                <div className="flex items-start space-x-4">
                  <button
                    onClick={() => onUpdateAssignment(assignment.id, false)}
                    className="mt-1 text-green-600 hover:text-gray-400 transition-colors"
                  >
                    <CheckCircle size={20} />
                  </button>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-through">
                        {assignment.title}
                      </h3>
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                        Completed
                      </span>
                    </div>
                    
                    <p className="text-gray-500 dark:text-gray-500 mb-2">
                      {assignment.description}
                    </p>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-medium">{assignment.subject}</span>
                      <div className="flex items-center">
                        <Calendar size={14} className="mr-1" />
                        Due: {new Date(assignment.dueDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {assignments.length === 0 && (
        <Card className="p-12 text-center">
          <div className="text-gray-400 dark:text-gray-600 mb-4">
            <BookOpen size={48} className="mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No assignments yet
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Your assignments will appear here when they're available.
          </p>
        </Card>
      )}
    </div>
  );
}