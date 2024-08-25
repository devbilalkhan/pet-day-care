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

type ActionType = {
  action: "edit" | "new";
};
type PetFormProps = ActionType & {
  handleDialogClose: (value: boolean) => void;
};

type PetFormFields = {
  name: string;
  "owner-name": string;
  "image-url": string;
  age: number;
  note: string;
};

const petFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, { message: "Name should be min of 3 and max of 30 charactes" })
    .max(30, { message: "Name should be min of 3 and max of 30 charactes" }),

  "owner-name": z
    .string()
    .trim()
    .min(3, { message: "Name should be min of 3 and max of 30 charactes" })
    .max(30, { message: "Name should be min of 3 and max of 30 charactes" }),
  "image-url": z.union([
    z.literal(""),
    z.string().trim().url({ message: "Must be a valid url." }),
  ]),
  age: z.coerce.number().int().positive().max(999),
  note: z.union([z.literal(""), z.string().trim().max(1000)]),
});

function PetForm({ handleDialogClose, action }: PetFormProps) {
  const { selectedPet: pet, handleAddPet, handleEditPet } = usePetContext();
  const {
    register,
    formState: { errors, isSubmitting, trigger },
  } = useForm<PetFormFields>({
    resolver: zodResolver(petFormSchema)
  });
  return (
    <form
      action={async (formData) => {
        const result = await trigger();
        if (!result) return;
        handleDialogClose(false);
        const petData = {
          name: formData.get("name")?.toString() || "",
          ownerName: formData.get("owner-name")?.toString() || "",
          imageUrl:
            "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png",
          age: parseInt(formData.get("age")?.toString() || "0", 10),
          note: formData.get("note")?.toString() || "",
        };
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
        <Label htmlFor="owner-name">Owner Name</Label>
        <Input id="owner-name" {...register("owner-name")} />
        {errors["owner-name"] && (
          <p className="text-red-500">{errors["owner-name"].message}</p>
        )}
      </div>

      <div className="mt-3">
        <Label htmlFor="image-url">Image Url</Label>
        <Input id="image-url" {...register("image-url")} />
        {errors["image-url"] && (
          <p className="text-red-500">{errors["image-url"].message}</p>
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
