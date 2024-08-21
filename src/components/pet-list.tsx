import Image from "next/image";

type PetListProps = {};

"bytegrad.com/course-assets/projects/petsoft/api/pets"

function PetList(props: PetListProps) {

  
  return (
    <>
      <ul className="bg-white border-b border-black/[0.08]">
        <li>
          <button
            className="flex h-[70px] w-full cursor-pointer items-center 
          gap-x-2 px-5 text-base hover:bg-[#eff1f2] focus:bg-[#eff1f2]"
          >
            <Image
              src="https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png"
              alt="dog photo"
              height={45}
              width={45}
              className="rounded-full object-cover"
            />
            <p className="font-semibold">Benjamin</p>
          </button>
        </li>
      </ul>
    </>
  );
}

export default PetList;
