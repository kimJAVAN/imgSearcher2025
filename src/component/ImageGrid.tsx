"use client";
import { useState, useEffect, useRef, useCallback } from "react";

interface UnsplashImage {
  id: string;
  urls: { small: string; full: string };
  alt_description: string;
  user: { name: string };
}

export default function ImageGrid({ query }: { query: string }) {
  const [images, setImages] = useState<UnsplashImage[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const loader = useRef<HTMLDivElement | null>(null);

  // 이미지 불러오기
  const fetchImages = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.unsplash.com/search/photos?query=${query}&page=${page}&per_page=12&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`
      );
      const data = await res.json();

      // results 없는 경우 방어 처리
      if (Array.isArray(data.results)) {
        setImages((prev) => [...prev, ...data.results]);
      }
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  }, [query, page]);

  // query가 바뀌면 이미지 새로 불러오기
  useEffect(() => {
    setImages([]);
    setPage(1);
  }, [query]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  // 무한 스크롤 (IntersectionObserver)
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {images.map((img) => (
          <a
            key={img.id}
            href={img.urls.full}
            target="_blank"
            rel="noopener noreferrer"
            className="group block rounded-xl overflow-hidden shadow hover:shadow-lg transition"
          >
            <img
              src={img.urls.small}
              alt={img.alt_description || "Unsplash Image"}
              className="w-full h-64 object-cover group-hover:scale-105 transition-transform"
            />
            <div className="p-2 text-sm text-gray-600 bg-white">{img.user.name}</div>
          </a>
        ))}
      </div>

      {loading && <p className="text-center my-6">Loading...</p>}

      {/* 무한스크롤 감시용 div */}
      <div ref={loader} className="h-10"></div>
    </>
  );
}
