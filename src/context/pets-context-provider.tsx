"use client";
import { createPet, deletePet, updatePet } from "@/actions/actions";
import { Pet } from "@/lib/types";
import {
  createContext,
  startTransition,
  useMemo,
  useOptimistic,
  useState,
} from "react";
import { toast } from "sonner";

type PetsContextType = {
  pets: Pet[];
  selectedId: string | null;
  selectedPet: Pet | undefined;
  totalPets: number;
  handleSelectedPetId: (id: string | null) => void;
  handleAddPet: (petData: Omit<Pet, "id">) => Promise<void>;
  handleEditPet: (id: string, petData: Omit<Pet, "id">) => Promise<void>;
  handleCheckout: (id: string) => Promise<void>;
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
  console.log(optimisticPets);
  //derived state
  const selectedPet = optimisticPets.find((p) => p.id === selectedId);
  const totalPets = optimisticPets.length;

  // select a pet based on id for an active state
  const handleSelectedPetId = (id: string | null) => {
    setSelectedId(id);
  };

  // add new pet
  const handleAddPet = async (petData: Omit<Pet, "id">) => {
    setOptimisticPets({ action: "add", payload: petData });
    const response = await createPet(petData);
    response.success
      ? toast.success(response.success)
      : toast.error(response.error);
  };

  const handleEditPet = async (id: string, petData: Omit<Pet, "id">) => {
    setOptimisticPets({ action: "edit", payload: { id, petData } });
    const response = await updatePet(id, petData);
    response.success
      ? toast.success(response.success)
      : toast.error(response.error);
  };

  const handleCheckout = async (id: string) => {
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
