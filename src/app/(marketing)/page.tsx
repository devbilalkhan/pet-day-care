import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <main
      className="bg-accent min-h-screen
     flex xl:flex-row flex-col justify-center items-center gap-x-10"
    >
      <Image
        alt="preview pet day care"
        height={519}
        width={472}
        src="https://bytegrad.com/course-assets/react-nextjs/petsoft-preview.png"
      />

      <div>
        <Logo />
        <h1 className="text-5xl font-semibold my-6 max-w-[500px]">
          Manage your <span className="font-extrabold">pet daycare </span> with
          eash
        </h1>
        <p className="text-2xl font-medium max-w-[600px]">
          Use Peto to easily keep track of pets under your care. Get Lifetime
          access for $299
        </p>
        <div className="mt-10 space-x-3">
          <Button >Get Started</Button>
          <Button  variant="secondary">
            Login
          </Button>
        </div>
      </div>
    </main>
  );
}
