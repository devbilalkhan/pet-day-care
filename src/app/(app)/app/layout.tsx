import Backgound from "@/components/backgound";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { Toaster } from "@/components/ui/sonner";
import { PetsContextProvider } from "@/context/pets-context-provider";
import prisma from "@/lib/db";

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
  const pets = await prisma.pet.findMany();
  return (
    <>
      <Backgound />
      <div className="flex flex-col max-w-[1200px] mx-auto px-10 min-h-screen">
        <Header />
        <PetsContextProvider data={pets}>{children}</PetsContextProvider>
        <Footer />
      </div>
      <Toaster position="top-right" />
    </>
  );
}

export default Layout;
