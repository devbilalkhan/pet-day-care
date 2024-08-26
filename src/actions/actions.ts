"use server";

import prisma from "@/lib/db";
import {  PetEssentials } from "@/lib/types";
import { sleep } from "@/lib/utils";
import { petFormSchema, petIdSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";

export async function createPet(petData: unknown) {
  await sleep(1000);
  const validatedPet = petFormSchema.safeParse(petData)
  if(! validatedPet.success) {
    return {
      message: "Invalid pet data"
    }
  }

  try {
    await prisma.pet.create({
      data: validatedPet.data,
      
    });
    revalidatePath("/app", "layout");
    return {
      success: `${validatedPet.data.name} is successfully added.`
    }
    
  } catch (error) {
    return {
      error: "Something went wrong! Could not create pet."
    }
  }
}


export async function updatePet(petId: unknown, petData: unknown) {
  await sleep(1000)
  const validatedPet = petFormSchema.safeParse(petData)
  const validatedId = petIdSchema.safeParse(petId)
  if (!validatedPet.success || !validatedId.success) {
    return {
      message: 'Invalid pet data',
    }
  }
  try {
    await prisma.pet.update({
      where : {
        id: validatedId.data
      },
      data: validatedPet.data
    })

    revalidatePath("/app", "layout");
    return {
      success: `${validatedPet.data.name} information is successfully updated.`
    }
  } catch (error) {
    return {
      error: "Could not update the pet information."
    }
  }
}

export async function deletePet(petId: unknown){
  await sleep(1000) 
  const validatedId = petIdSchema.safeParse(petId)
  if(!validatedId.success){
    return {
      message: 'Invalid pet data',
    }
  }
  try {
    await prisma.pet.delete({
      where: {
        id: validatedId.data
      }
    })
    revalidatePath("/app", "layout");
    return {
      success: "Pet deleted successfully."
    }
  } catch (error) {
    return {
      error: "Something went wrong! deletion failed."
    }
  }
}