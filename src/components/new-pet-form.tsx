"use client";
import React from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { usePetContext } from "../hooks/hooks";
import { Button } from "./ui/button";

type NewPetFormProps = {
  handleDialogClose: (value: boolean) => void;
};

function NewPetForm({ handleDialogClose }: NewPetFormProps) {
  const { handleAddPet } = usePetContext();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleDialogClose(false);
    const formData = new FormData(e.currentTarget);

    const newPet = {
      name: formData.get("name") as string,
      ownerName: formData.get("owner-name") as string,
      age: +(formData.get("age") as string),
      imageUrl:
        (formData.get("image-url") as string) ||
        "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png",
      note: formData.get("note") as string,
    };
    handleAddPet(newPet);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" type="text" />
      </div>
      <div className="mt-3">
        <Label htmlFor="owner-name">Owner Name</Label>
        <Input id="owner-name" name="owner-name" type="text" />
      </div>

      <div className="mt-3">
        <Label htmlFor="image-url">Image Url</Label>
        <Input id="image-url" name="image-url" type="text" />
      </div>

      <div className="mt-3">
        <Label htmlFor="pet-age">Age</Label>
        <Input id="pet-age" name="age" type="number" />
      </div>

      <div className="mt-3 space-y-3">
        <Label htmlFor="note">Notes</Label>
        <Textarea id="note" name="note" rows={3} />
      </div>
      <Button type="submit" className="mt-6 py-5 ">
        Add Pet
      </Button>
    </form>
  );
}

export default NewPetForm;
