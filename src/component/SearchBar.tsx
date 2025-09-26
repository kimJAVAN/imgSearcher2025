"use client";
import { useState } from "react";

interface SearchBarProps {
  onSearch: (keyword: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [keyword, setKeyword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (keyword.trim()) {
      onSearch(keyword.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex p-4">
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search images..."
        className="border rounded-l px-4 py-2 flex-grow"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-r"
      >
        Search
      </button>
    </form>
  );
}
