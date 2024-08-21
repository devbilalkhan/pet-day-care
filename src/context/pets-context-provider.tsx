"use client";
import { Pet } from "@/lib/types";
import { createContext, useState } from "react";

type PetsContextType = {
  pets: Pet[];
  selectedId: string | null;
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
  const [selectedId, setSelectedId] = useState(null);
  return (
    <PetsContext.Provider
      value={{
        pets,
        selectedId,
      }}
    >
      {children}
    </PetsContext.Provider>
  );
}
