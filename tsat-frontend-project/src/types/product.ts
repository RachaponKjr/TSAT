/* eslint-disable @typescript-eslint/no-unused-vars */
import { z } from "zod";

const ProductSchema = z.object({
  category: z.object({ name: z.string() }),
  name: z.string(),
  imageProduct: z.string(),
  id: z.string(),
  detail: z.string(),
  categoryId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Product = z.infer<typeof ProductSchema>;
