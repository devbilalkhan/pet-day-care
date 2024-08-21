import { PetsContext } from "@/context/pets-context-provider";
import { useContext } from "react";

export function usePetContext() {
  const context = useContext(PetsContext)
  if (!context) throw new Error("There is no pets context")
  return context
}