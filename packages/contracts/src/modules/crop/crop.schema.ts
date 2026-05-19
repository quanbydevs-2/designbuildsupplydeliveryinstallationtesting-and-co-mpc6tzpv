import { z } from "zod"

export const cropSchema = z.object({
  id: z.number(),
  cropName: z.string(),
  variety: z.string(),
  plantingDate: z.date(),
  harvestDate: z.date().optional(),
  areaPlanted: z.number(),
  farmerName: z.string(),
  estimatedYield: z.number().optional(),
  status: z.string().default("active"),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
})

export type Crop = z.infer<typeof cropSchema>