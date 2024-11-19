import React from 'react';
import { Check, Trash2, Circle } from 'lucide-react';

interface TodoItemProps {
  id: string;
  text: string;
  completed: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ id, text, completed, onToggle, onDelete }: TodoItemProps) {
  return (
    <div className="group flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm transition-all duration-200 hover:shadow-md">
      <button
        onClick={() => onToggle(id)}
        className="flex-shrink-0 transition-colors duration-200"
      >
        {completed ? (
          <div className="h-6 w-6 rounded-full bg-emerald-500 flex items-center justify-center">
            <Check className="h-4 w-4 text-white" />
          </div>
        ) : (
          <Circle className="h-6 w-6 text-gray-400 hover:text-emerald-500" />
        )}
      </button>
      <span className={`flex-grow ${completed ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
        {text}
      </span>
      <button
        onClick={() => onDelete(id)}
        className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
      >
        <Trash2 className="h-5 w-5 text-gray-400 hover:text-red-500 transition-colors duration-200" />
      </button>
    </div>
  );
}