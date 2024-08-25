"use server";

import prisma from "@/lib/db";
import {  PetEssentials } from "@/lib/types";
import { sleep } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export async function createPet(petData: PetEssentials) {
  await sleep(1000);
  try {
    await prisma.pet.create({
      data: petData,
      
    });
    revalidatePath("/app", "layout");
    return {
      success: `${petData.name} is successfully added.`
    }
    
  } catch (error) {
    return {
      error: "Something went wrong! Could not create pet."
    }
  }
}


export async function updatePet(petId: string, petData: PetEssentials) {
  await sleep(1000)
  try {
    await prisma.pet.update({
      where : {
        id: petId
      },
      data: petData
    })

    revalidatePath("/app", "layout");
    return {
      success: `${petData.name} information is successfully updated.`
    }
  } catch (error) {
    return {
      error: "Could not update the pet information."
    }
  }
}

export async function deletePet(petId: string){
  await sleep(1000) 
  try {
    await prisma.pet.delete({
      where: {
        id: petId
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