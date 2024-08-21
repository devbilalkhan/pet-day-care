import React from "react";

type H1Props = {
  children: React.ReactNode;
};

function H1({ children }: H1Props) {
  return (
    <>
      <h1 className="font-medium text-2xl leading-6">{children}</h1>
    </>
  );
}

export default H1;
