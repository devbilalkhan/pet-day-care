"use client";
import { Pet } from "@/lib/types";
import { createContext, useMemo, useState } from "react";

type PetsContextType = {
  pets: Pet[];
  selectedId: string | null;
  handleSelectedPetId: (id: string) => void;
  handleCheckout: (id: string) => void;
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

  // select a pet based on id for an active state
  const handleSelectedPetId = (id: string) => {
    setSelectedId(id);
  };

  // remove pet from the list
  const handleCheckout = (id: string) => {
    setPets((prev) => prev.filter((p) => p.id !== id));
    setSelectedId(null);
  };

  return (
    <PetsContext.Provider
      value={{
        pets,
        selectedId,
        handleSelectedPetId,
        selectedPet,
        totalPets,
        handleCheckout,
      }}
    >
      {children}
    </PetsContext.Provider>
  );
}
