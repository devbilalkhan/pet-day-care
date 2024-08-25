import { z } from "zod";
import { DEFAULT_PET_IMAGE } from "./constants";

export const petFormSchema = z.object({
    name: z
      .string()
      .trim()
      .min(3, { message: "Name should be min of 3 and max of 30 charactes" })
      .max(30, { message: "Name should be min of 3 and max of 30 charactes" }),

    ownerName: z
      .string()
      .trim()
      .min(3, { message: "Name should be min of 3 and max of 30 charactes" })
      .max(30, { message: "Name should be min of 3 and max of 30 charactes" }),
    imageUrl: z.union([
      z.literal(""),
      z.string().trim().url({ message: "Must be a valid url." }),
    ]),
    age: z.coerce.number().int().positive().max(999),
    note: z.union([z.literal(""), z.string().trim().max(10)]),
  })
  .transform((data) => ({
    ...data,
    imageUrl:
      data.imageUrl || DEFAULT_PET_IMAGE  
  }));
export type PetFormFields = z.infer<typeof petFormSchema>;
