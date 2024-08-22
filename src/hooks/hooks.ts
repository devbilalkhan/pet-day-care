import { PetsContext } from "@/context/pets-context-provider";
import { useContext, useEffect, useState } from "react";


/**
 * Custom hook to access the PetsContext.
 * 
 * This hook provides a convenient way to access the PetsContext within your components.
 * It ensures that the context is available and throws an error if it is not.
 * 
 * @returns {PetsContextType} - The current value of the PetsContext.
 * @throws {Error} - Throws an error if the PetsContext is not available.
 */
export function usePetContext() {
  const context = useContext(PetsContext)
  if (!context) throw new Error("There is no pets context")
  return context
}

/**
 * Custom hook to debounce a given input text.
 * 
 * This hook delays the update of the input text by a specified delay time.
 * It is useful for scenarios where you want to limit the rate at which a function is executed,
 * such as handling user input in a search bar.
 * 
 * @param {string} inputText - The input text to be debounced.
 * @param {number} [delay=500] - The delay time in milliseconds. Default is 500ms.
 * @returns {string | null} - The debounced text.
 */

export function useDebounce(inputText: string, delay = 500) {
  const [debouncedText, setDebouncedText] = useState<string | null>(null);

  useEffect(() => {
   const timer =  setTimeout(() => {

      setDebouncedText(inputText);
    }, delay);
  return () => clearTimeout(timer)
  }, [setDebouncedText, delay, inputText]);
  return debouncedText;
}
