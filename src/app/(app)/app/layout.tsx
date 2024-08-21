import Backgound from "@/components/backgound";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { PetsContextProvider } from "@/context/pets-context-provider";
import { Pet } from "@/lib/types";
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

async function Layout({ children }: LayoutProps) {
  const respose = await fetch(
    "https://bytegrad.com/course-assets/projects/petsoft/api/pets"
  );

  if (!respose.ok) {
    throw new Error("could not fetch pets");
  }
  const data: Pet[] = await respose.json();

  return (
    <>
      <Backgound />
      <div className="flex flex-col max-w-[1200px] mx-auto px-10 min-h-screen">
        <Header />
        <PetsContextProvider data={data}>{children}</PetsContextProvider>
        <Footer />
      </div>
    </>
  );
}

export default Layout;
