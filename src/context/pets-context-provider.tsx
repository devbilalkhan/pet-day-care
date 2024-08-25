"use client";
import { createPet, deletePet, updatePet } from "@/actions/actions";
import { PetEssentials } from "@/lib/types";
import { Pet } from "@prisma/client";
import { createContext, startTransition, useOptimistic, useState } from "react";
import { toast } from "sonner";

type PetsContextType = {
  pets: Pet[];
  selectedId: Pet["id"] | null;
  selectedPet: Pet | undefined;
  totalPets: number;
  handleSelectedPetId: (id: Pet["id"] | null) => void;
  handleAddPet: (petData: PetEssentials) => Promise<void>;
  handleEditPet: (id: Pet["id"], petData: PetEssentials) => Promise<void>;
  handleCheckout: (id: Pet["id"]) => Promise<void>;
};

export const PetsContext = createContext<PetsContextType | null>(null);

export function PetsContextProvider({
  children,
  data,
}: {
  children: React.ReactNode;
  data: Pet[];
}) {
  const [optimisticPets, setOptimisticPets] = useOptimistic(
    data,
    (state, { action, payload }) => {
      switch (action) {
        case "add":
          return [...state, { ...payload, id: new Date().getTime() }];
        case "edit":
          return state.map((pet) => {
            if (pet.id === payload.id) {
              return { ...pet, ...payload.petData };
            }
            return pet;
          });
        case "delete":
          return state.filter((pet) => pet.id !== payload.id);
        default:
          return state;
      }
    }
  );
  const [selectedId, setSelectedId] = useState<string | null>(null);

  //derived state
  const selectedPet = optimisticPets.find((p) => p.id === selectedId);
  const totalPets = optimisticPets.length;

  // select a pet based on id for an active state
  const handleSelectedPetId = (id: Pet["id"] | null) => {
    setSelectedId(id);
  };

  // add new pet
  const handleAddPet = async (petData: PetEssentials) => {
    setOptimisticPets({ action: "add", payload: petData });
    const response = await createPet(petData);
    response.success
      ? toast.success(response.success)
      : toast.error(response.error);
  };

  const handleEditPet = async (id: Pet["id"], petData: PetEssentials) => {
    setOptimisticPets({ action: "edit", payload: { id, petData } });
    const response = await updatePet(id, petData);
    response.success
      ? toast.success(response.success)
      : toast.error(response.error);
  };

  const handleCheckout = async (id: Pet["id"]) => {
    startTransition(() => {
      setOptimisticPets({ action: "delete", payload: id });
    });
    await deletePet(id);
    handleSelectedPetId(null);
  };
  return (
    <PetsContext.Provider
      value={{
        pets: optimisticPets,
        selectedId,
        handleSelectedPetId,
        selectedPet,
        totalPets,
        handleAddPet,
        handleEditPet,
        handleCheckout,
      }}
    >
      {children}
    </PetsContext.Provider>
  );
}
