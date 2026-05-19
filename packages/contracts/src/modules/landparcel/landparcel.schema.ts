import { z } from "zod"

export const landparcelSchema = z.object({
  id: z.number(),
  parcelId: z.string(),
  ownerName: z.string(),
  location: z.string(),
  area: z.number(),
  soilType: z.string().optional(),
  irrigationType: z.string().optional(),
  titleNumber: z.string().optional(),
  status: z.string().default("active"),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
})

export type LandParcel = z.infer<typeof landparcelSchema>