import React, { useState } from 'react';
import { Plus, Check, Trash2, Circle, CheckCircle } from 'lucide-react';
import { Card } from '../components/Common/Card';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface TodoItem {
  id: string;
  title: string;
  isCompleted: boolean;
  createdAt: string;
}

export function ToDo() {
  const [todos, setTodos] = useLocalStorage<TodoItem[]>('todos', []);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      const todo: TodoItem = {
        id: Date.now().toString(),
        title: newTodo.trim(),
        isCompleted: false,
        createdAt: new Date().toISOString()
      };
      setTodos([todo, ...todos]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const completedCount = todos.filter(todo => todo.isCompleted).length;
  const pendingCount = todos.length - completedCount;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Daily To-Do List</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Keep track of your daily goals and tasks
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
              {pendingCount}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Pending</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
              {completedCount}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Done</p>
          </div>
        </div>
      </div>

      {/* Add New Todo */}
      <Card className="p-6">
        <form onSubmit={addTodo} className="flex space-x-4">
          <div className="flex-1">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Add a new task or goal..."
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
          >
            <Plus size={20} className="mr-2" />
            Add Task
          </button>
        </form>
      </Card>

      {/* Todo List */}
      {todos.length > 0 ? (
        <div className="space-y-4">
          {todos.map((todo) => (
            <Card key={todo.id} className="p-4">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => toggleTodo(todo.id)}
                  className={`transition-colors ${
                    todo.isCompleted
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-gray-400 hover:text-green-600'
                  }`}
                >
                  {todo.isCompleted ? <CheckCircle size={24} /> : <Circle size={24} />}
                </button>
                
                <div className="flex-1">
                  <p className={`text-lg ${
                    todo.isCompleted
                      ? 'line-through text-gray-500 dark:text-gray-400'
                      : 'text-gray-900 dark:text-white'
                  }`}>
                    {todo.title}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Added {new Date(todo.createdAt).toLocaleDateString()}
                  </p>
                </div>
                
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-12 text-center">
          <div className="text-gray-400 dark:text-gray-600 mb-4">
            <CheckCircle size={48} className="mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No tasks yet
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Add your first task to get started with organizing your day!
          </p>
        </Card>
      )}

      {/* Progress Summary */}
      {todos.length > 0 && (
        <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Today's Progress
            </h3>
            <div className="flex items-center justify-center space-x-8">
              <div>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {Math.round((completedCount / todos.length) * 100)}%
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Completed</p>
              </div>
              <div className="w-32 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(completedCount / todos.length) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}