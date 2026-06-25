import React from "react";
import clsx from "clsx";

interface AsciiArtProps {
  art: string;
  className?: string;
}

export function AsciiArt({ art, className }: AsciiArtProps) {
  return (
    <pre className={clsx("font-mono text-[10px] md:text-[12px] leading-[1.2] whitespace-pre", className)}>
      {art}
    </pre>
  );
}
