"use client";

import React, { useState, useEffect } from "react";
import clsx from "clsx";

interface TypeWriterProps {
  text: string;
  delayMs?: number;
  speedMs?: number;
  className?: string;
  onComplete?: () => void;
  showCursor?: boolean;
}

export function TypeWriter({
  text,
  delayMs = 400,
  speedMs = 30,
  className,
  onComplete,
  showCursor = true,
}: TypeWriterProps) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setStarted(true), delayMs);
    return () => clearTimeout(timeout);
  }, [delayMs]);

  useEffect(() => {
    if (!started || completed) return;

    if (displayed.length < text.length) {
      const timer = setTimeout(() => {
        setDisplayed(text.slice(0, displayed.length + 1));
      }, speedMs);
      return () => clearTimeout(timer);
    }

    setCompleted(true);
    onComplete?.();
  }, [started, displayed, text, speedMs, completed, onComplete]);

  return (
    <span className={className}>
      {displayed}
      {showCursor && !completed && (
        <span className="inline-block w-[8px] h-[1em] align-middle bg-current ml-[2px] cursor-blink" />
      )}
    </span>
  );
}
