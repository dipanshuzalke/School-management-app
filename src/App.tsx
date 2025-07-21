import React, { useState, useEffect } from 'react';
import { Header } from './components/Layout/Header';
import { Sidebar } from './components/Layout/Sidebar';
import { LoginModal } from './components/Auth/LoginModal';
import { Dashboard } from './pages/Dashboard';
import { Timetable } from './pages/Timetable';
import { Assignments } from './pages/Assignments';
import { Notifications } from './pages/Notifications';
import { Events } from './pages/Events';
import { ToDo } from './pages/ToDo';
import { Attendance } from './pages/Attendance';
import { Quiz } from './pages/Quiz';
import { Achievements } from './pages/Achievements';
import { Grades } from './pages/Grades';
import { Resources } from './pages/Resources';
import { Profile } from './pages/Profile';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useNotifications } from './hooks/useNotifications';
import { usePWA } from './hooks/usePWA';
import {
  Student,
  Assignment,
  Notification,
  mockTimetable,
  mockAssignments,
  mockNotifications,
  mockEvents
} from './data/mockData';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useLocalStorage('darkMode', 
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );
  const [student, setStudent] = useLocalStorage<Student | null>('student', null);
  const [assignments, setAssignments] = useLocalStorage<Assignment[]>('assignments', mockAssignments);
  const [notifications, setNotifications] = useLocalStorage<Notification[]>('notifications', mockNotifications);

  const { sendNotification } = useNotifications();
  const { isInstallable, installApp } = usePWA();

  // Apply dark mode
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Register service worker
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration);
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError);
        });
    }
  }, []);

  const handleLogin = (studentData: Student) => {
    setStudent(studentData);
  };

  const handleLogout = () => {
    localStorage.clear();
    setStudent(null);
    setCurrentPage('dashboard');
  };

  const handleSendNotification = async () => {
    if (!student) return;
    
    const title = 'School App Notification';
    const message = `Hello ${student.name.split(' ')[0]}, new update received!`;
    
    await sendNotification(title, message);
    
    // Also add to local notifications
    const newNotification: Notification = {
      id: Date.now().toString(),
      title,
      message,
      date: new Date().toISOString(),
      isRead: false,
      type: 'announcement'
    };
    
    setNotifications([newNotification, ...notifications]);
  };

  const handleUpdateAssignment = (id: string, isCompleted: boolean) => {
    setAssignments(assignments.map(assignment =>
      assignment.id === id ? { ...assignment, isCompleted } : assignment
    ));
  };

  const handleMarkNotificationAsRead = (id: string) => {
    setNotifications(notifications.map(notification =>
      notification.id === id ? { ...notification, isRead: true } : notification
    ));
  };

  const unreadNotifications = notifications.filter(n => !n.isRead).length;

  const getPageTitle = () => {
    switch (currentPage) {
      case 'dashboard': return 'Dashboard';
      case 'timetable': return 'Timetable';
      case 'assignments': return 'Assignments';
      case 'notifications': return 'Notifications';
      case 'events': return 'Events';
      case 'todo': return 'To-Do List';
      case 'attendance': return 'Attendance';
      case 'quiz': return 'Quiz';
      case 'achievements': return 'Achievements';
      case 'grades': return 'Grades';
      case 'resources': return 'Resources';
      case 'profile': return 'Profile';
      default: return 'School App';
    }
  };

  const renderCurrentPage = () => {
    if (!student) return null;

    switch (currentPage) {
      case 'dashboard':
        return (
          <Dashboard
            student={student}
            assignments={assignments}
            notifications={notifications}
            events={mockEvents}
            onNavigate={setCurrentPage}
          />
        );
      case 'timetable':
        return <Timetable subjects={mockTimetable} />;
      case 'assignments':
        return (
          <Assignments
            assignments={assignments}
            onUpdateAssignment={handleUpdateAssignment}
          />
        );
      case 'notifications':
        return (
          <Notifications
            notifications={notifications}
            student={student}
            onSendNotification={handleSendNotification}
            onMarkAsRead={handleMarkNotificationAsRead}
          />
        );
      case 'events':
        return <Events events={mockEvents} />;
      case 'todo':
        return <ToDo />;
      case 'attendance':
        return <Attendance />;
      case 'quiz':
        return <Quiz />;
      case 'achievements':
        return <Achievements />;
      case 'grades':
        return <Grades />;
      case 'resources':
        return <Resources />;
      case 'profile':
        return <Profile student={student} onLogout={handleLogout} />;
      default:
        return (
          <Dashboard
            student={student}
            assignments={assignments}
            notifications={notifications}
            events={mockEvents}
            onNavigate={setCurrentPage}
          />
        );
    }
  };

  if (!student) {
    return (
      <div className={`min-h-screen transition-colors duration-200 ${
        isDarkMode ? 'bg-gray-900' : 'bg-gray-100'
      }`}>
        <LoginModal isOpen={true} onLogin={handleLogin} />
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-200 ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-100'
    }`}>
      <div className="flex h-screen">
        <Sidebar
          currentPage={currentPage}
          onNavigate={setCurrentPage}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header
            title={getPageTitle()}
            isDarkMode={isDarkMode}
            onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
            onToggleMenu={() => setIsSidebarOpen(!isSidebarOpen)}
            notificationCount={unreadNotifications}
            onNotificationsClick={() => setCurrentPage('notifications')}
            isInstallable={isInstallable}
            onInstallClick={installApp}
          />
          
          <main className="flex-1 overflow-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {renderCurrentPage()}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;