'use client';

import { useState, useEffect, useCallback } from 'react';
import { useDebounce } from '@/hooks/useDebounce';

interface AdvocateSearchProps {
  onSearch: (searchTerm: string) => void;
  onReset: () => void;
}

export function AdvocateSearch({ onSearch, onReset }: AdvocateSearchProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
  };

  const handleReset = () => {
    setSearchTerm('');
    onReset();
  };

  // Call onSearch with debounced value
  useEffect(() => {
    onSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  return (
    <div className="mb-8">
      <p className="mb-2">
        Searching for: <span className="font-medium">{searchTerm}</span>
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <input 
          className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" 
          onChange={handleChange} 
          value={searchTerm}
          placeholder="Search advocates..."
        />
        <button 
          onClick={handleReset}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors whitespace-nowrap"
        >
          Reset Search
        </button>
      </div>
    </div>
  );
} 