"use client";
import Image from "next/image";
import { usePetContext } from "../hooks/hooks";
import { Pet } from "@/lib/types";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import PetForm from "./pet-form";
import { useState, useTransition } from "react";
import { deletePet } from "@/actions/actions";
import { flushSync } from "react-dom";

type PetListProps = {};

function PetDetails(props: PetListProps) {
  const { selectedPet, handleSelectedPetId, handleCheckout } = usePetContext();

  if (!selectedPet) {
    return <EmptyView />;
  } else {
    return (
      <>
        <section className="flex flex-col h-full">
          <TopBar
            selectedPet={selectedPet}
            handleSelectedPetId={handleSelectedPetId}
            handleCheckout={handleCheckout}
          />
          <OtherInfo selectedPet={selectedPet} />
          <Notes selectedPet={selectedPet} />
        </section>
      </>
    );
  }
}

export default PetDetails;

function EmptyView() {
  return (
    <>
      <section
        className="w-full h-full flex items-center
      font-bold text-black/[0.78] justify-center text-2xl"
      >
        No pet selected
      </section>
    </>
  );
}

function TopBar({
  selectedPet,
  handleSelectedPetId,
  handleCheckout,
}: {
  selectedPet: Pet;
  handleSelectedPetId: (id: string) => void;
  handleCheckout: (id: string) => void;
}) {
  const [open, isOpen] = useState(false);

  // const [isPending, startTransition] = useTransition();
  const handleDialogClose = (value: boolean) => {
    flushSync(() => {
      isOpen(value);
    });
  };

  return (
    <div className="flex items-center gap-x-3 bg-white px-12 py-5 border-b border-light">
      <Image
        src={selectedPet?.imageUrl}
        height={75}
        width={75}
        alt="pet"
        className="rounded-full w-[75px] h-[75px]"
      />
      <h2 className="text-3xl font-semibold ">{selectedPet?.name}</h2>
      <Dialog open={open} onOpenChange={isOpen}>
        <DialogTrigger asChild>
          <Button variant="secondary" className="ml-auto">
            Edit
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] md:max-w-[625px] p-10">
          <DialogHeader>
            <DialogTitle>Edit pet</DialogTitle>
          </DialogHeader>
          <PetForm action="edit" handleDialogClose={handleDialogClose} />
        </DialogContent>
      </Dialog>
      <Button
        onClick={async () => {
          // startTransition(async () => {
          // });
          await handleCheckout(selectedPet?.id);
        }}
        variant="secondary"
      >
        Checkout
      </Button>
    </div>
  );
}

export function EditPetForm() {
  return <form></form>;
}

function OtherInfo({ selectedPet }: { selectedPet: Pet }) {
  return (
    <div className="flex justify-around py-10 px-5 text-center">
      <div>
        <h3 className="text-[13px]  text-lg font-medium uppercase text-zinc-700">
          Owner Name
        </h3>
        <p className="mt-1 text-lg text-zinc-800">{selectedPet?.ownerName}</p>
      </div>
      <div>
        <h3 className="text-[13px] text-lg font-medium uppercase text-zinc-700">
          Age
        </h3>
        <p className="mt-1 text-lg text-zinc-800">{selectedPet?.age}</p>
      </div>
    </div>
  );
}

function Notes({ selectedPet }: { selectedPet: Pet }) {
  return (
    <section className="bg-white text-black px-7 py-5 rounded-md mb-9 mx-8 flex-1 border border-light">
      {selectedPet?.note}
    </section>
  );
}
