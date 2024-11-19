import React, { useState, useEffect } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { TodoItem } from './components/TodoItem';
import { TodoInput } from './components/TodoInput';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text: string) => {
    setTodos([
      ...todos,
      { id: crypto.randomUUID(), text, completed: false }
    ]);
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const completedCount = todos.filter(todo => todo.completed).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-3 mb-8">
            <CheckCircle2 className="h-8 w-8 text-emerald-500" />
            <h1 className="text-2xl font-bold text-gray-900">Todo List</h1>
          </div>
          
          <TodoInput onAdd={addTodo} />

          {todos.length > 0 && (
            <div className="mt-6 text-sm text-gray-500">
              {completedCount} of {todos.length} tasks completed
            </div>
          )}
        </div>

        <div className="space-y-3">
          {todos.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No tasks yet. Add one above!
            </div>
          ) : (
            todos.map(todo => (
              <TodoItem
                key={todo.id}
                {...todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;