import React from 'react';
import { Download, FileText, BookOpen, ExternalLink } from 'lucide-react';
import { Card } from '../components/Common/Card';
import { mockResources } from '../data/mockData';

export function Resources() {
  const getFileIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'pdf': return '📄';
      case 'doc': case 'docx': return '📝';
      case 'ppt': case 'pptx': return '📊';
      case 'xls': case 'xlsx': return '📊';
      default: return '📁';
    }
  };

  const getFileColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'pdf': return 'text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400';
      case 'doc': case 'docx': return 'text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400';
      case 'ppt': case 'pptx': return 'text-orange-600 bg-orange-50 dark:bg-orange-900/20 dark:text-orange-400';
      case 'xls': case 'xlsx': return 'text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400';
      default: return 'text-gray-600 bg-gray-50 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const groupedResources = mockResources.reduce((acc, resource) => {
    if (!acc[resource.subject]) {
      acc[resource.subject] = [];
    }
    acc[resource.subject].push(resource);
    return acc;
  }, {} as Record<string, typeof mockResources>);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Learning Resources</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Access study materials, notes, and reference documents
          </p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {mockResources.length}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Resources</p>
        </div>
      </div>

      {/* Quick Access */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 text-center cursor-pointer hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
            <FileText size={24} className="text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Study Notes</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Comprehensive notes for all subjects
          </p>
        </Card>

        <Card className="p-6 text-center cursor-pointer hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
            <BookOpen size={24} className="text-green-600 dark:text-green-400" />
          </div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Reference Books</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Digital library access
          </p>
        </Card>

        <Card className="p-6 text-center cursor-pointer hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
            <ExternalLink size={24} className="text-purple-600 dark:text-purple-400" />
          </div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Online Resources</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            External learning platforms
          </p>
        </Card>
      </div>

      {/* Resources by Subject */}
      {Object.entries(groupedResources).map(([subject, resources]) => (
        <div key={subject}>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {subject} Resources
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {resources.map((resource) => (
              <Card key={resource.id} className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-start space-x-4">
                  <div className="text-3xl">{getFileIcon(resource.type)}</div>
                  
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      {resource.name}
                    </h3>
                    
                    <div className="flex items-center space-x-3 mb-3">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getFileColor(resource.type)}`}>
                        {resource.type}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {resource.size}
                      </span>
                    </div>
                    
                    <button
                      onClick={() => {
                        // Simulate download
                        alert(`Downloading ${resource.name}...`);
                      }}
                      className="inline-flex items-center px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Download size={16} className="mr-2" />
                      Download
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      ))}

      {/* Online Resources */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Recommended Online Resources
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900 dark:text-white">Educational Platforms</h4>
            <div className="space-y-3">
              <a href="#" className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm font-bold">K</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Khan Academy</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Free online courses</p>
                </div>
                <ExternalLink size={16} className="text-gray-400" />
              </a>
              
              <a href="#" className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm font-bold">C</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Coursera</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">University courses</p>
                </div>
                <ExternalLink size={16} className="text-gray-400" />
              </a>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900 dark:text-white">Study Tools</h4>
            <div className="space-y-3">
              <a href="#" className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm font-bold">Q</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Quizlet</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Flashcards & study sets</p>
                </div>
                <ExternalLink size={16} className="text-gray-400" />
              </a>
              
              <a href="#" className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm font-bold">W</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Wolfram Alpha</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Computational engine</p>
                </div>
                <ExternalLink size={16} className="text-gray-400" />
              </a>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}