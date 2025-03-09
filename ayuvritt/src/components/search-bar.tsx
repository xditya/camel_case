interface SearchBarProps {
  query: string;
  setQuery: (query: string) => void;
  handleSearch: () => void;
  loading: boolean;
  placeholder?: string;
}

export function SearchBar({
  query,
  setQuery,
  handleSearch,
  loading,
  placeholder = "Search...",
}: SearchBarProps) {
  return (
    <div className="max-w-2xl mx-auto mb-12">
      <div className="flex gap-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder={placeholder}
          className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-black"
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors disabled:bg-emerald-400"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>
    </div>
  );
}
