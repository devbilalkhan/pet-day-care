import Logo from "@/components/logo";
import React from "react";

type LayoutProps = {
  children: React.ReactNode;
};

function Layout({ children }: LayoutProps) {
  return (
    <section className="flex flex-col gap-y-10 justify-center min-h-screen items-center">
      <Logo />
      {children}
    </section>
  );
}

export default Layout;
