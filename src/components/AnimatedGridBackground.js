import React, { useEffect, useRef, useState } from "react";

/**
 * AnimatedGridBackground
 * Fullscreen, subtle, moving grid background. Moves towards top-right.
 * - Semi-transparent lines, adaptive to light/dark theme
 * - Uses requestAnimationFrame for smooth animation
 * - Canvas scaled for devicePixelRatio for crisp lines
 */
export default function AnimatedGridBackground({
  spacing = 42, // px between grid lines
  speedX = 12, // px per second to the right
  speedY = -8, // px per second upward (negative Y)
  opacityLight = 0.05, // slightly more transparent by default
  opacityDark = 0.09,  // slightly more transparent by default
}) {
  const canvasRef = useRef(null);
  const frameRef = useRef(null);
  const lastTimeRef = useRef(0);
  const offsetRef = useRef({ x: 0, y: 0 });

  const [isDark, setIsDark] = useState(() => {
    if (typeof window === "undefined") return true;
    if (document.documentElement.classList.contains("dark")) return true;
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) return true;
    return false;
  });

  // Mobile detection to adjust density/speed and transparency
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth < 768; // md breakpoint
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const update = () => setIsMobile(window.innerWidth < 768);
    update();
    window.addEventListener("resize", update);
    window.addEventListener("orientationchange", update);
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("orientationchange", update);
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)");
    function onChange() {
      setIsDark(document.documentElement.classList.contains("dark") || (mq && mq.matches));
    }
    onChange();
    if (mq && mq.addEventListener) mq.addEventListener("change", onChange);
    else if (mq && mq.addListener) mq.addListener(onChange);
    const observer = new MutationObserver(onChange);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => {
      if (mq && mq.removeEventListener) mq.removeEventListener("change", onChange);
      else if (mq && mq.removeListener) mq.removeListener(onChange);
      observer.disconnect();
    };
  }, []);

  // Resize and draw
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      const { innerWidth: w, innerHeight: h } = window;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    // Effective, responsive params
    const spacingEff = isMobile ? Math.round(spacing * 1.6) : spacing;
    const speedXEff = isMobile ? speedX * 0.6 : speedX;
    const speedYEff = isMobile ? speedY * 0.6 : speedY;
    const opacityLightEff = Math.max(0, (isMobile ? opacityLight - 0.02 : opacityLight));
    const opacityDarkEff = Math.max(0, (isMobile ? opacityDark - 0.02 : opacityDark));

    function drawGrid() {
      const { width, height } = canvas;
      // We scaled context, so use CSS pixels
      const cssW = canvas.clientWidth || window.innerWidth;
      const cssH = canvas.clientHeight || window.innerHeight;

      ctx.clearRect(0, 0, cssW, cssH);

      const alpha = isDark ? opacityDarkEff : opacityLightEff;
      const stroke = isDark
        ? `rgba(148, 163, 184, ${alpha})` // slate-400-ish
        : `rgba(3, 105, 161, ${alpha})`; // sky-700-ish, very subtle

      ctx.strokeStyle = stroke;
      ctx.lineWidth = isMobile ? 0.75 : 1;

      const offX = offsetRef.current.x % spacingEff;
      const offY = offsetRef.current.y % spacingEff;

      // Vertical lines
      for (let x = -offX; x <= cssW; x += spacingEff) {
        ctx.beginPath();
        ctx.moveTo(x + 0.5, 0);
        ctx.lineTo(x + 0.5, cssH);
        ctx.stroke();
      }

      // Horizontal lines
      for (let y = -offY; y <= cssH; y += spacingEff) {
        ctx.beginPath();
        ctx.moveTo(0, y + 0.5);
        ctx.lineTo(cssW, y + 0.5);
        ctx.stroke();
      }
    }

    function animate(ts) {
      const last = lastTimeRef.current || ts;
      const dt = (ts - last) / 1000; // seconds
      lastTimeRef.current = ts;

      offsetRef.current.x += speedXEff * dt;
      // Move towards top-right: +x and -y (provide negative speedY for upward by default)
      offsetRef.current.y += speedYEff * dt;

      drawGrid();
      frameRef.current = requestAnimationFrame(animate);
    }

    resize();
    const onResize = () => {
      resize();
      drawGrid();
    };
    window.addEventListener("resize", onResize);
    frameRef.current = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener("resize", onResize);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [isDark, isMobile, spacing, speedX, speedY, opacityDark, opacityLight]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        opacity: 1,
      }}
    />
  );
}
