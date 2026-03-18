"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomScrollbar() {
  const [thumbHeight, setThumbHeight] = useState(0);
  const [thumbTop, setThumbTop] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [dragging, setDragging] = useState(false);
  const dragStartY = useRef(0);
  const dragStartScroll = useRef(0);

  const update = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    const ratio = clientHeight / scrollHeight;
    setThumbHeight(Math.max(ratio * clientHeight, 40));
    setThumbTop((scrollTop / (scrollHeight - clientHeight)) * (clientHeight - Math.max(ratio * clientHeight, 40)));
  };

  useEffect(() => {
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setDragging(true);
    dragStartY.current = e.clientY;
    dragStartScroll.current = document.documentElement.scrollTop;
  };

  useEffect(() => {
    if (!dragging) return;
    document.documentElement.style.scrollBehavior = "auto";
    const onMove = (e: MouseEvent) => {
      const { scrollHeight, clientHeight } = document.documentElement;
      const trackHeight = clientHeight - thumbHeight;
      const scrollRatio = (scrollHeight - clientHeight) / trackHeight;
      const delta = e.clientY - dragStartY.current;
      document.documentElement.scrollTop = dragStartScroll.current + delta * scrollRatio;
    };
    const onUp = () => {
      setDragging(false);
      document.documentElement.style.scrollBehavior = "";
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      document.documentElement.style.scrollBehavior = "";
    };
  }, [dragging, thumbHeight]);

  const width = hovered || dragging ? 10 : 5;

  return (
    <div
      className="fixed right-0 top-0 bottom-0 z-[9999] flex justify-end"
      style={{ width: 16, pointerEvents: "none" }}
    >
      <div
        style={{
          position: "absolute",
          right: 4,
          top: thumbTop,
          width,
          height: thumbHeight,
          background: hovered || dragging ? "rgba(0,0,0,0.4)" : "rgba(0,0,0,0.18)",
          borderRadius: 99,
          cursor: "pointer",
          pointerEvents: "all",
          transition: "width 0.2s ease, background 0.2s ease",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onMouseDown={onMouseDown}
      />
    </div>
  );
}
