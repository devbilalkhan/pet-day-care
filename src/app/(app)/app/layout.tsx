import Backgound from "@/components/backgound";
import Footer from "@/components/footer";
import Header from "@/components/header";
import type { Metadata } from "next";
type LayoutProps = {
  children: React.ReactNode;
};

export async function generateMetaData({
  params,
}: {
  params: { slug: string };
}) {
  return {
    title: "Dashboard",
  };
}

function Layout({ children }: LayoutProps) {
  return (
    <>
      <Backgound />
      <div className="flex flex-col max-w-[1200px] mx-auto px-10 min-h-screen">
        <Header />
        {children}
        <Footer />
      </div>
    </>
  );
}

export default Layout;
