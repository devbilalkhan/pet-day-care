import React from "react";

type ContentBlockProps = {
  children: React.ReactNode;
};

function ContentBlock({ children }: ContentBlockProps) {
  return (
    <div className="bg-[#f7f8fa] shahow-sm rounded-md h-full w-full overflow-hidden">
      {children}
    </div>
  );
}

export default ContentBlock;
