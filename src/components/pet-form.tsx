"use client";
import React from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { usePetContext } from "../hooks/hooks";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { DEFAULT_PET_IMAGE } from "@/lib/constants";
import { PetFormFields, petFormSchema } from "@/lib/validations";

type ActionType = {
  action: "edit" | "new";
};
type PetFormProps = ActionType & {
  handleDialogClose: (value: boolean) => void;
};

function PetForm({ handleDialogClose, action }: PetFormProps) {
  const { selectedPet: pet, handleAddPet, handleEditPet } = usePetContext();
  const {
    register,
    trigger,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<PetFormFields>({
    resolver: zodResolver(petFormSchema),
    defaultValues: {
      name: pet?.name,
      ownerName: pet?.ownerName,
      imageUrl: pet?.imageUrl,
      age: pet?.age,
      note: pet?.note,
    },
  });
  return (
    <form
      action={async () => {
        const result = await trigger();
        if (!result) return;
        handleDialogClose(false);

        const petData = getValues();
        petData.imageUrl = petData.imageUrl || DEFAULT_PET_IMAGE;

        // this is server action whereas above lines are client side
        if (action === "new") {
          await handleAddPet(petData);
        }
        if (action === "edit") {
          await handleEditPet(pet!.id, petData);
        }
      }}
    >
      <div>
        <Label htmlFor="name">Name</Label>
        <Input id="name" {...register("name")} />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </div>
      <div className="mt-3">
        <Label htmlFor="ownerName">Owner Name</Label>
        <Input id="ownerName" {...register("ownerName")} />
        {errors.ownerName && (
          <p className="text-red-500">{errors.ownerName.message}</p>
        )}
      </div>

      <div className="mt-3">
        <Label htmlFor="imageUrl">Image Url</Label>
        <Input id="imageUrl" {...register("imageUrl")} />
        {errors.imageUrl && (
          <p className="text-red-500">{errors.imageUrl.message}</p>
        )}
      </div>

      <div className="mt-3">
        <Label htmlFor="pet-age">Age</Label>
        <Input id="pet-age" {...register("age")} />
        {errors.age && <p className="text-red-500">{errors.age.message}</p>}
      </div>

      <div className="mt-3 space-y-3">
        <Label htmlFor="note">Notes</Label>
        <Textarea id="note" {...register("note")} />
        {errors.note && <p className="text-red-500">{errors.note.message}</p>}
      </div>
      <PetFormButton action={action} />
    </form>
  );
}

export default PetForm;

function PetFormButton({ action }: ActionType) {
  return (
    <Button type="submit" className="mt-6 py-5 ">
      {action === "new" ? "Add Pet" : "Edit Pet"}
    </Button>
  );
}
