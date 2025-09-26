import { useEffect, useRef, useState } from "react";

export default function useInfiniteScroll(callback: () => void, loading: boolean) {
  const observer = useRef<IntersectionObserver | null>(null);
  const [node, setNode] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !loading) {
        callback();
      }
    });

    if (node) observer.current.observe(node);

    return () => observer.current?.disconnect();
  }, [node, callback, loading]);

  return setNode;
}
