"use client";
import { Pet } from "@/lib/types";
import { createContext, useState } from "react";

type PetsContextType = {
  pets: Pet[];
  selectedId: string | null;
  handleSelectedPetId: (id: string) => void;
  selectedPet: Pet | undefined;
  totalPets: number;
};

export const PetsContext = createContext<PetsContextType | null>(null);

export function PetsContextProvider({
  children,
  data,
}: {
  children: React.ReactNode;
  data: Pet[];
}) {
  const [pets, setPets] = useState<Pet[]>(data);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  //derived state
  const selectedPet = pets.find((p) => p.id === selectedId);
  const totalPets = pets.length;
  const handleSelectedPetId = (id: string) => {
    setSelectedId(id);
  };

  return (
    <PetsContext.Provider
      value={{
        pets,
        selectedId,
        handleSelectedPetId,
        selectedPet,
        totalPets,
      }}
    >
      {children}
    </PetsContext.Provider>
  );
}
