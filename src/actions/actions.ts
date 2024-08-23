'use server'

import prisma from "@/lib/db"
import { Pet } from "@/lib/types"


export async function createPet(newPet: Omit<Pet, 'id'>) {
  await prisma.pet.create({
    data: newPet
  })

}