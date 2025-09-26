"use client";
import { useState, useEffect, useRef, useCallback } from "react";

interface UnsplashImage {
  id: string;
  urls: { small: string; full: string };
  alt_description: string;
  user: { name: string };
}

export default function MasonryGrid({ query }: { query: string }) {
  const [images, setImages] = useState<UnsplashImage[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const loader = useRef<HTMLDivElement | null>(null);

  const fetchImages = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.unsplash.com/search/photos?query=${query}&page=${page}&per_page=12&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`
      );
      const data = await res.json();

      if (Array.isArray(data.results)) {
        setImages((prev) => [...prev, ...data.results]);
      }
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  }, [query, page]);

  useEffect(() => {
    setImages([]);
    setPage(1);
  }, [query]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 }
    );
    if (loader.current) observer.observe(loader.current);
    return () => {
      if (loader.current) observer.unobserve(loader.current);
    };
  }, [loading]);

  return (
    <>
      {/* Masonry Columns Layout */}
      <div
        style={{
          columnCount: 4,
          columnGap: "16px",
          padding: "10px",
        }}
      >
        {images.map((img) => (
          <div
            key={img.id}
            style={{
              breakInside: "avoid",
              marginBottom: "16px",
              background: "#fff",
              borderRadius: "8px",
              overflow: "hidden",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <a href={img.urls.full} target="_blank" rel="noopener noreferrer">
              <img
                src={img.urls.small}
                alt={img.alt_description || "Unsplash Image"}
                style={{ width: "100%", display: "block" }}
              />
              <div style={{ padding: "8px", fontSize: "0.9rem", color: "#555" , textAlign : 'center'}}>
                {img.user.name}
              </div>
            </a>
          </div>
        ))}
      </div>

      {loading && <p style={{ textAlign: "center", marginTop: "20px" }}>Loading...</p>}

      {/* Intersection Observer Loader */}
      <div ref={loader} style={{ height: "50px" }}></div>
    </>
  );
}
