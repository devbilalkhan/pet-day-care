"use client";
import React from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { usePetContext } from "../hooks/hooks";
import { Button } from "./ui/button";
import { createPet, updatePet } from "@/actions/actions";
import { sleep } from "@/lib/utils";
import { useFormState, useFormStatus } from "react-dom";
import { toast } from "sonner";
type ActionType = {
  action: "edit" | "new";
};
type PetFormProps = ActionType & {
  handleDialogClose: (value: boolean) => void;
};

function PetForm({ handleDialogClose, action }: PetFormProps) {
  const { selectedPet: pet } = usePetContext();

  return (
    <form
      action={async (formData) => {
        let response;
        if (action === "new") {
          response = await createPet(formData);
        }
        if (action === "edit") {
          response = await updatePet(pet?.id, formData);
        }
        response?.success
          ? toast.success(response?.success)
          : toast.error(response?.error);
        handleDialogClose(false);
      }}
    >
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
      <PetFormButton action={action} />
    </form>
  );
}

export default PetForm;

function PetFormButton({ action }: ActionType) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="mt-6 py-5 ">
      {pending ? "Loading..." : action === "new" ? "Add Pet" : "Edit Pet"}
    </Button>
  );
}
