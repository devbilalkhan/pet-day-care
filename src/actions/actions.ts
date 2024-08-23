'use server'

import prisma from "@/lib/db"
import { Pet } from "@/lib/types"
import { revalidatePath } from "next/cache"


export async function createPet(formData) {
  await prisma.pet.create({
    data: {
      name: formData.get("name"),
      ownerName: formData.get("owner-name"),
      age: +(formData.get("age")),
      note: formData.get("note"),
      imageUrl: formData.get("imageUrl") || 'https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png',
    }
  })

  revalidatePath('/app', 'layout')
  
}