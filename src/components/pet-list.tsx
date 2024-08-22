"use client";

import { usePetContext } from "@/hooks/hooks";
import { Pet } from "@/lib/types";
import { cn } from "@/lib/utils";
import Image from "next/image";

function PetList() {
  const { pets, handleSelectedPetId, selectedId } = usePetContext();

  return (
    <>
      <ul className="bg-white border-b border-light">
        {pets.map(({ id, name, imageUrl }: Pet) => (
          <li key={id}>
            <button
              onClick={() => handleSelectedPetId(id)}
              className={cn(
                "flex h-[70px] w-full cursor-pointer items-center gap-x-2 px-5 text-base hover:bg-[#eff1f2] focus:bg-[#eff1f2]",
                {
                  "active:bg-white/50": selectedId === id,
                }
              )}
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
