"use client";
import { useState } from "react";
import MasonryGrid from "./../component/MasonryGrid";

export default function Home() {
  const [query, setQuery] = useState("nature");

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = (e.currentTarget.elements.namedItem("search") as HTMLInputElement).value;
    setQuery(input || "nature");
  };

  return (
    <main style={{ maxWidth: "1200px", margin: "auto", padding: "20px" }}>
      <h1 style={{ textAlign: "center", fontSize: "2rem", marginBottom: "20px" }}>
        Unsplash Image Search
      </h1>

      <form onSubmit={handleSearch} style={{ display: "flex", justifyContent: "center", marginBottom: "30px" }}>
        <input
          type="text"
          name="search"
          placeholder="Search images..."
          style={{
            width: "300px",
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            marginRight: "10px"
          }}
        />
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            background: "#0070f3",
            color: "white",
            borderRadius: "6px",
            border: "none",
            cursor: "pointer"
          }}
        >
          Search
        </button>
      </form>

      <MasonryGrid query={query} />
    </main>
  );
}
