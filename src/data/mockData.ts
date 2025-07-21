export interface Student {
  id: string;
  name: string;
  email: string;
  class: string;
  photo: string;
  rollNumber: string;
}

export interface Subject {
  id: string;
  name: string;
  teacher: string;
  time: string;
  room: string;
  color: string;
}

export interface Assignment {
  id: string;
  subject: string;
  title: string;
  description: string;
  dueDate: string;
  isCompleted: boolean;
  priority: 'high' | 'medium' | 'low';
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  isRead: boolean;
  type: 'announcement' | 'assignment' | 'event' | 'grade';
}

export interface Event {
  id: string;
  title: string;
  date: string;
  type: 'exam' | 'holiday' | 'event' | 'meeting';
  description: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earnedDate: string;
  category: 'academic' | 'attendance' | 'participation';
}

export const mockStudent: Student = {
  id: '1',
  name: 'Alex Johnson',
  email: 'alex.johnson@school.edu',
  class: 'Grade 10-A',
  photo: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
  rollNumber: '2024001'
};

export const mockTimetable: Subject[] = [
  {
    id: '1',
    name: 'Mathematics',
    teacher: 'Ms. Sarah Wilson',
    time: '09:00 AM - 09:45 AM',
    room: 'Room 101',
    color: 'bg-blue-500'
  },
  {
    id: '2',
    name: 'Physics',
    teacher: 'Mr. David Brown',
    time: '09:45 AM - 10:30 AM',
    room: 'Lab 1',
    color: 'bg-green-500'
  },
  {
    id: '3',
    name: 'English Literature',
    teacher: 'Mrs. Emily Davis',
    time: '11:00 AM - 11:45 AM',
    room: 'Room 205',
    color: 'bg-purple-500'
  },
  {
    id: '4',
    name: 'Chemistry',
    teacher: 'Dr. Michael Taylor',
    time: '11:45 AM - 12:30 PM',
    room: 'Lab 2',
    color: 'bg-red-500'
  },
  {
    id: '5',
    name: 'History',
    teacher: 'Mr. James Anderson',
    time: '01:30 PM - 02:15 PM',
    room: 'Room 301',
    color: 'bg-yellow-500'
  },
  {
    id: '6',
    name: 'Physical Education',
    teacher: 'Coach Martinez',
    time: '02:15 PM - 03:00 PM',
    room: 'Gymnasium',
    color: 'bg-indigo-500'
  }
];

export const mockAssignments: Assignment[] = [
  {
    id: '1',
    subject: 'Mathematics',
    title: 'Quadratic Equations Worksheet',
    description: 'Complete exercises 1-15 from Chapter 4',
    dueDate: '2024-12-18',
    isCompleted: false,
    priority: 'high'
  },
  {
    id: '2',
    subject: 'English Literature',
    title: 'Essay on Shakespeare',
    description: 'Write a 500-word essay on character development in Hamlet',
    dueDate: '2024-12-20',
    isCompleted: true,
    priority: 'medium'
  },
  {
    id: '3',
    subject: 'Physics',
    title: 'Lab Report - Motion',
    description: 'Submit lab report on projectile motion experiment',
    dueDate: '2024-12-19',
    isCompleted: false,
    priority: 'high'
  },
  {
    id: '4',
    subject: 'Chemistry',
    title: 'Periodic Table Quiz Prep',
    description: 'Study atomic properties and trends',
    dueDate: '2024-12-22',
    isCompleted: false,
    priority: 'medium'
  },
  {
    id: '5',
    subject: 'History',
    title: 'World War I Timeline',
    description: 'Create a detailed timeline of major WWI events',
    dueDate: '2024-12-25',
    isCompleted: false,
    priority: 'low'
  }
];

export const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Assignment Due Tomorrow',
    message: 'Your Mathematics worksheet is due tomorrow. Don\'t forget to submit!',
    date: '2024-12-17T14:30:00Z',
    isRead: false,
    type: 'assignment'
  },
  {
    id: '2',
    title: 'Grade Updated',
    message: 'Your Physics lab report has been graded. Check your gradebook!',
    date: '2024-12-17T10:15:00Z',
    isRead: true,
    type: 'grade'
  },
  {
    id: '3',
    title: 'School Event',
    message: 'Annual Science Fair scheduled for next Friday. Registration is open!',
    date: '2024-12-16T16:45:00Z',
    isRead: false,
    type: 'event'
  },
  {
    id: '4',
    title: 'Holiday Notice',
    message: 'Winter break starts from December 23rd. Classes resume January 8th.',
    date: '2024-12-15T09:00:00Z',
    isRead: true,
    type: 'announcement'
  }
];

export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Mathematics Test',
    date: '2024-12-19',
    type: 'exam',
    description: 'Chapter 4: Quadratic Equations and Functions'
  },
  {
    id: '2',
    title: 'Science Fair',
    date: '2024-12-21',
    type: 'event',
    description: 'Annual school science fair - showcase your projects!'
  },
  {
    id: '3',
    title: 'Winter Break',
    date: '2024-12-23',
    type: 'holiday',
    description: 'Winter holidays begin - classes resume January 8th'
  },
  {
    id: '4',
    title: 'Parent-Teacher Meeting',
    date: '2024-12-20',
    type: 'meeting',
    description: 'Quarterly progress review with parents and teachers'
  }
];

export const mockAchievements: Achievement[] = [
  {
    id: '1',
    title: 'Perfect Attendance',
    description: 'Attended all classes this month',
    icon: '🎯',
    earnedDate: '2024-12-01',
    category: 'attendance'
  },
  {
    id: '2',
    title: 'Top Scorer',
    description: 'Highest marks in Mathematics test',
    icon: '🏆',
    earnedDate: '2024-11-28',
    category: 'academic'
  },
  {
    id: '3',
    title: 'Homework Champion',
    description: 'Submitted all assignments on time',
    icon: '📚',
    earnedDate: '2024-11-25',
    category: 'academic'
  },
  {
    id: '4',
    title: 'Class Participation',
    description: 'Active participation in class discussions',
    icon: '🗣️',
    earnedDate: '2024-11-20',
    category: 'participation'
  }
];

export const mockGrades = [
  { subject: 'Mathematics', grade: 'A+', percentage: 95, color: 'bg-green-500' },
  { subject: 'Physics', grade: 'A', percentage: 88, color: 'bg-blue-500' },
  { subject: 'Chemistry', grade: 'A-', percentage: 85, color: 'bg-purple-500' },
  { subject: 'English', grade: 'A', percentage: 90, color: 'bg-indigo-500' },
  { subject: 'History', grade: 'B+', percentage: 82, color: 'bg-yellow-500' }
];

export const mockResources = [
  {
    id: '1',
    name: 'Mathematics Formula Sheet',
    subject: 'Mathematics',
    type: 'PDF',
    size: '2.5 MB',
    url: '#'
  },
  {
    id: '2',
    name: 'Physics Lab Manual',
    subject: 'Physics',
    type: 'PDF',
    size: '15.8 MB',
    url: '#'
  },
  {
    id: '3',
    name: 'Chemistry Reference Guide',
    subject: 'Chemistry',
    type: 'PDF',
    size: '8.2 MB',
    url: '#'
  },
  {
    id: '4',
    name: 'English Literature Notes',
    subject: 'English',
    type: 'DOC',
    size: '4.1 MB',
    url: '#'
  }
];

export const mockQuizQuestions = [
  {
    id: '1',
    question: 'What is the capital of France?',
    options: ['London', 'Berlin', 'Paris', 'Madrid'],
    correctAnswer: 2,
    subject: 'Geography'
  },
  {
    id: '2',
    question: 'What is 2 + 2 × 3?',
    options: ['12', '8', '10', '6'],
    correctAnswer: 1,
    subject: 'Mathematics'
  },
  {
    id: '3',
    question: 'Who wrote "Romeo and Juliet"?',
    options: ['Charles Dickens', 'William Shakespeare', 'Jane Austen', 'Mark Twain'],
    correctAnswer: 1,
    subject: 'Literature'
  },
  {
    id: '4',
    question: 'What is the chemical symbol for water?',
    options: ['H2O', 'CO2', 'NaCl', 'O2'],
    correctAnswer: 0,
    subject: 'Chemistry'
  },
  {
    id: '5',
    question: 'In which year did World War II end?',
    options: ['1944', '1945', '1946', '1947'],
    correctAnswer: 1,
    subject: 'History'
  }
];