import { z } from "zod"

export const farmerSchema = z.object({
  id: z.number(),
  fullName: z.string(),
  barangay: z.string(),
  farmSize: z.number(),
  contactNumber: z.string().optional(),
  registrationDate: z.date(),
  farmingType: z.string(),
  isActive: z.boolean().default(false),
  status: z.string().default("active"),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
})

export type Farmer = z.infer<typeof farmerSchema>