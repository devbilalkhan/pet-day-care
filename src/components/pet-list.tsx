"use client";

import { useDebounce, usePetContext } from "@/hooks/hooks";
import { Pet } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useSearchStore } from "@/store/store";
import Image from "next/image";
import { useMemo } from "react";

function PetList() {
  const { pets, handleSelectedPetId, selectedId } = usePetContext();
  const searchText = useSearchStore((state) => state.searchText);
  const debouncedText = useDebounce(searchText);

  const filteredPetList = useMemo(() => {
    if (debouncedText) {
      return pets.filter((pet) =>
        pet.name.toLowerCase().includes(debouncedText.toLowerCase())
      );
    }

    return pets;
  }, [debouncedText, pets]);

  return (
    <>
      <ul className="bg-white border-b border-light">
        {filteredPetList.map(({ id, name, imageUrl }: Pet) => (
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
      {filteredPetList.length === 0 && (
        <div className="flex text-black/50 text-base h-full items-center justify-center">
          <p>No pets found with the name {debouncedText}</p>
        </div>
      )}
    </>
  );
}

export default PetList;
