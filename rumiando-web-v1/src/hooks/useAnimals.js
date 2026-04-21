import { useContext } from "react";
import { AnimalsContext } from "../context/AnimalsContext";

export function useAnimals() {
  const context = useContext(AnimalsContext);

  if (!context) {
    throw new Error("useAnimals debe usarse dentro de AnimalsProvider");
  }

  return context;
}