import { Pet } from "@/lib/types";
import Image from "next/image";

type PetListProps = {
  pets: Pet[];
};

function PetList({ pets }: PetListProps) {
  return (
    <>
      <ul className="bg-white border-b border-black/[0.08]">
        {pets.map(({ id, name, imageUrl }: Pet) => (
          <li key={id}>
            <button
              className="flex h-[70px] w-full cursor-pointer items-center 
          gap-x-2 px-5 text-base hover:bg-[#eff1f2] focus:bg-[#eff1f2]"
            >
              <Image
                src={imageUrl}
                alt="dog photo"
                height={45}
                width={45}
                className="rounded-full object-cover w-[45px] h-[45px]"
              />
              <p className="font-semibold">{name}</p>
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default PetList;
