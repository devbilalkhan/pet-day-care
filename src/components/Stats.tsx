"use client";
import { usePetContext } from "@/hooks/hooks";

type StatsProps = {};

function Stats(props: StatsProps) {
  const { totalPets } = usePetContext();
  return (
    <>
      <section className="text-center">
        <p className="text-2xl font-bold leading-6">{totalPets}</p>
        <p className="opacity-70">Current guests</p>
      </section>
    </>
  );
}

export default Stats;
