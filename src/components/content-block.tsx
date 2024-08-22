import { cn } from "@/lib/utils";
import React from "react";

type ContentBlockProps = {
  children: React.ReactNode;
  className?: string;
};

function ContentBlock({ children, className }: ContentBlockProps) {
  return (
    <div
      className={cn(
        "bg-[#f7f8fa] shahow-sm rounded-md h-full w-full overflow-hidden",
        className
      )}
    >
      {children}
    </div>
  );
}

export default ContentBlock;
