/* eslint-disable @typescript-eslint/no-unused-vars */
import { z } from "zod";

const CarSubModelSchema = z.object({
  carModelId: z.string(),
  createdAt: z.string(),
  id: z.string(),
  name: z.string(),
  updatedAt: z.string(),
  image: z.string(),
});

const CarModelSchema = z.object({
  carSubModels: z.array(CarSubModelSchema),
  createdAt: z.string(),
  id: z.string(),
  name: z.string(),
  showActice: z.boolean(),
  updatedAt: z.string(),
});

const CarCatogorySchema = z.object({
  createdAt: z.string(),
  id: z.string(),
  name: z.string(),
  image: z.string(),
  imageName: z.string(),
  showActive: z.boolean(),
  categories: z.array(z.string()),
  categoryService: z.array(z.string()),
});

export type CarSubModel = z.infer<typeof CarSubModelSchema>;
export type CarModel = z.infer<typeof CarModelSchema>;
export type CarCatogory = z.infer<typeof CarCatogorySchema>;
