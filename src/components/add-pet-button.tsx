"use client";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import NewPetForm from "./new-pet-form";

export function AddPetButton() {
  const [open, setOpen] = useState(false);
  const handleDialogClose = (value: boolean) => {
    setOpen(value);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="icon">
          <PlusIcon className="h-6 w-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[625px] px-10 py-10">
        <DialogHeader>
          <DialogTitle>Add a new pet</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <NewPetForm  handleDialogClose={handleDialogClose} />
      </DialogContent>
    </Dialog>
  );
}
