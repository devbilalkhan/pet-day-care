import Branding from "@/components/branding";
import PetDetails from "@/components/pet-details";
import PetList from "@/components/pet-list";
import SearchForm from "@/components/search-form";
import Stats from "@/components/Stats";
import ContentBlock from "../../../../components/content-block";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";

function Page() {
  return (
    <main>
      <div className="flex items-center justify-between text-white py-8">
        <Branding />
        <Stats />
      </div>
      <div className="grid grid-cols-1 grid-rows-[45px_300px_500px] md:grid-cols-3 md:grid-rows-[45px_1fr] gap-4 md:h-[600px]">
        <div className="md:row-start-1 md:row-span-1 md:col-start-1 md:col-span-1">
          <SearchForm />
        </div>
        <div className="relative md:col-start-1 md:row-start-2 md:row-span-full  md:col-span-1">
          <ContentBlock>
            <PetList />
            <Button size="icon" className="absolute bottom-5 right-5">
              <PlusIcon className="h-6 w-6" />
            </Button>
          </ContentBlock>
        </div>
        <div className="md:col-start-2 md:col-span-full md:row-span-full md:row-start-1">
          <ContentBlock>
            <PetDetails />
          </ContentBlock>
        </div>
      </div>
    </main>
  );
}

export default Page;
