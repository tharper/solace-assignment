interface AdvocateSearchProps {
  onSearch: (searchTerm: string) => void;
  onReset: () => void;
}

export function AdvocateSearch({ onSearch, onReset }: AdvocateSearchProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    document.getElementById("search-term")!.innerHTML = searchTerm;
    onSearch(searchTerm);
  };

  return (
    <div className="mb-8">
      <p className="text-lg font-semibold mb-2">Search</p>
      <p className="mb-2">
        Searching for: <span id="search-term" className="font-medium"></span>
      </p>
      <div className="flex gap-4">
        <input 
          className="border border-gray-300 rounded px-4 py-2 w-full max-w-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
          onChange={handleChange} 
          placeholder="Search advocates..."
        />
        <button 
          onClick={onReset}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Reset Search
        </button>
      </div>
    </div>
  );
} 