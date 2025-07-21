import React, { useState } from 'react';
import { CheckCircle, XCircle, RotateCcw, Trophy } from 'lucide-react';
import { Card } from '../components/Common/Card';
import { mockQuizQuestions } from '../data/mockData';

export function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < mockQuizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
    setQuizStarted(false);
  };

  const calculateScore = () => {
    let correct = 0;
    selectedAnswers.forEach((answer, index) => {
      if (answer === mockQuizQuestions[index].correctAnswer) {
        correct++;
      }
    });
    return correct;
  };

  const score = calculateScore();
  const percentage = Math.round((score / mockQuizQuestions.length) * 100);

  if (!quizStarted) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Quick Quiz</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Test your knowledge with our interactive quiz
          </p>
        </div>

        <Card className="p-8 text-center">
          <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Trophy size={32} className="text-purple-600 dark:text-purple-400" />
          </div>
          
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Ready to Start?
          </h2>
          
          <div className="space-y-4 mb-8">
            <div className="flex justify-center space-x-8 text-sm">
              <div className="text-center">
                <p className="font-semibold text-gray-900 dark:text-white">{mockQuizQuestions.length}</p>
                <p className="text-gray-600 dark:text-gray-400">Questions</p>
              </div>
              <div className="text-center">
                <p className="font-semibold text-gray-900 dark:text-white">~5 min</p>
                <p className="text-gray-600 dark:text-gray-400">Duration</p>
              </div>
              <div className="text-center">
                <p className="font-semibold text-gray-900 dark:text-white">Mixed</p>
                <p className="text-gray-600 dark:text-gray-400">Subjects</p>
              </div>
            </div>
            
            <p className="text-gray-600 dark:text-gray-400">
              This quiz covers various subjects including Mathematics, Science, Literature, and History.
            </p>
          </div>
          
          <button
            onClick={() => setQuizStarted(true)}
            className="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
          >
            Start Quiz
          </button>
        </Card>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Quiz Results</h1>
        </div>

        <Card className="p-8 text-center">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 ${
            percentage >= 70 
              ? 'bg-green-100 dark:bg-green-900/20' 
              : percentage >= 50 
                ? 'bg-yellow-100 dark:bg-yellow-900/20'
                : 'bg-red-100 dark:bg-red-900/20'
          }`}>
            <Trophy size={32} className={
              percentage >= 70 
                ? 'text-green-600 dark:text-green-400' 
                : percentage >= 50 
                  ? 'text-yellow-600 dark:text-yellow-400'
                  : 'text-red-600 dark:text-red-400'
            } />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Your Score: {score}/{mockQuizQuestions.length}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
            {percentage}% Correct
          </p>
          
          <div className={`text-lg font-medium mb-6 ${
            percentage >= 70 
              ? 'text-green-600 dark:text-green-400' 
              : percentage >= 50 
                ? 'text-yellow-600 dark:text-yellow-400'
                : 'text-red-600 dark:text-red-400'
          }`}>
            {percentage >= 70 
              ? '🎉 Excellent work!' 
              : percentage >= 50 
                ? '👍 Good effort!'
                : '📚 Keep practicing!'
            }
          </div>
          
          <button
            onClick={resetQuiz}
            className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
          >
            <RotateCcw size={20} className="mr-2" />
            Take Quiz Again
          </button>
        </Card>

        {/* Detailed Results */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Question Review
          </h3>
          <div className="space-y-4">
            {mockQuizQuestions.map((question, index) => {
              const userAnswer = selectedAnswers[index];
              const isCorrect = userAnswer === question.correctAnswer;
              
              return (
                <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div className="flex items-start space-x-3">
                    {isCorrect ? (
                      <CheckCircle size={20} className="text-green-600 dark:text-green-400 mt-0.5" />
                    ) : (
                      <XCircle size={20} className="text-red-600 dark:text-red-400 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-white mb-2">
                        {index + 1}. {question.question}
                      </p>
                      <div className="text-sm space-y-1">
                        <p className={`${isCorrect ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                          Your answer: {question.options[userAnswer]}
                        </p>
                        {!isCorrect && (
                          <p className="text-green-600 dark:text-green-400">
                            Correct answer: {question.options[question.correctAnswer]}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    );
  }

  const question = mockQuizQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / mockQuizQuestions.length) * 100;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Quiz</h1>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Question {currentQuestion + 1} of {mockQuizQuestions.length}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
        <div
          className="bg-purple-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <Card className="p-8">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <span className="px-3 py-1 text-sm font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 rounded-full">
              {question.subject}
            </span>
          </div>
          
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            {question.question}
          </h2>
          
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full p-4 text-left border rounded-lg transition-colors ${
                  selectedAnswers[currentQuestion] === index
                    ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 text-purple-900 dark:text-purple-100'
                    : 'border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-4 h-4 rounded-full border-2 ${
                    selectedAnswers[currentQuestion] === index
                      ? 'border-purple-500 bg-purple-500'
                      : 'border-gray-300 dark:border-gray-600'
                  }`}>
                    {selectedAnswers[currentQuestion] === index && (
                      <div className="w-full h-full bg-white rounded-full scale-50"></div>
                    )}
                  </div>
                  <span className="text-gray-900 dark:text-white">{option}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex justify-between">
          <button
            onClick={handlePreviousQuestion}
            disabled={currentQuestion === 0}
            className={`px-6 py-2 rounded-lg transition-colors ${
              currentQuestion === 0
                ? 'bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-600 cursor-not-allowed'
                : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            Previous
          </button>
          
          <button
            onClick={handleNextQuestion}
            disabled={selectedAnswers[currentQuestion] === undefined}
            className={`px-6 py-2 rounded-lg transition-colors ${
              selectedAnswers[currentQuestion] === undefined
                ? 'bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-600 cursor-not-allowed'
                : 'bg-purple-600 text-white hover:bg-purple-700'
            }`}
          >
            {currentQuestion === mockQuizQuestions.length - 1 ? 'Finish' : 'Next'}
          </button>
        </div>
      </Card>
    </div>
  );
}