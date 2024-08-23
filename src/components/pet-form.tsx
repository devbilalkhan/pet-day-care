"use client";
import React from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { usePetContext } from "../hooks/hooks";
import { Button } from "./ui/button";

type PetFormProps = {
  handleDialogClose: (value: boolean) => void;
  action: "edit" | "new";
};

function PetForm({ handleDialogClose, action }: PetFormProps) {
  const { selectedPet: pet } = usePetContext();
  const { handleAddPet, handleEditPet } = usePetContext();
  console.log(open, "outer");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    handleDialogClose(false);

    const formData = new FormData(e.currentTarget);
    const petFormDetails = {
      name: formData.get("name") as string,
      ownerName: formData.get("owner-name") as string,
      age: +(formData.get("age") as string),
      imageUrl:
        (formData.get("image-url") as string) ||
        "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png",
      note: formData.get("note") as string,
    };
    action === "new"
      ? handleAddPet(petFormDetails)
      : handleEditPet(pet!.id, petFormDetails);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          type="text"
          defaultValue={action === "edit" ? pet?.name : ""}
        />
      </div>
      <div className="mt-3">
        <Label htmlFor="owner-name">Owner Name</Label>
        <Input
          id="owner-name"
          name="owner-name"
          defaultValue={action === "edit" ? pet?.ownerName : ""}
          type="text"
        />
      </div>

      <div className="mt-3">
        <Label htmlFor="image-url">Image Url</Label>
        <Input
          id="image-url"
          name="image-url"
          type="text"
          defaultValue={action === "edit" ? pet?.imageUrl : ""}
        />
      </div>

      <div className="mt-3">
        <Label htmlFor="pet-age">Age</Label>
        <Input
          id="pet-age"
          name="age"
          defaultValue={action === "edit" ? pet?.age : ""}
          type="number"
        />
      </div>

      <div className="mt-3 space-y-3">
        <Label htmlFor="note">Notes</Label>
        <Textarea
          id="note"
          name="note"
          rows={3}
          defaultValue={action === "edit" ? pet?.note : ""}
        />
      </div>
      <Button type="submit" className="mt-6 py-5 ">
        {action === "new" ? "Add" : "Edit"} Pet
      </Button>
    </form>
  );
}

export default PetForm;
