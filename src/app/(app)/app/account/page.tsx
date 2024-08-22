import ContentBlock from "@/components/content-block";
import H1 from "@/components/h1";

type PageProps = {};

function Page(props: PageProps) {
  return (
    <main className="h-full w-full flex flex-col items-start justify-between text-white py-8">
      <H1 className="py-10">Your Account</H1>
      <ContentBlock className="h-[600px] flex justify-center items-center text-black/80 text-base">
        <p>Logged in as ...</p>
      </ContentBlock>
    </main>
  );
}

export default Page;
