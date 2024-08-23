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
  handleAddPet: (pet: Omit<Pet, "id">) => void;
  handleEditPet: (id: string, pet: Omit<Pet, "id">) => void;
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

  //event handlers /actions
  // add a new pet
  const handleAddPet = (newPet: Omit<Pet, "id">) => {
    let id = new Date().getTime().toString();
    const petWithId: Pet = { ...newPet, id };
    setPets((prev) => [...prev, petWithId]);
  };

  // edit a pet details
  const handleEditPet = (id: string, newPetData: Omit<Pet, "id">) => {
    setPets((prev) =>
      prev.map((pet) => {
        if (pet.id === id) {
          return {
            id,
            ...newPetData,
          };
        }
        return pet;
      })
    );
  };
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
        handleAddPet,
        handleEditPet,
      }}
    >
      {children}
    </PetsContext.Provider>
  );
}
