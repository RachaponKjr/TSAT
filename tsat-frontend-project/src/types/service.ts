/* eslint-disable @typescript-eslint/no-unused-vars */
import { z } from "zod";

const ServiceSchema = z.object({
  createdAt: z.date(),
  explain: z.string(),
  icon: z.string(),
  id: z.string(),
  images: z.array(z.string()),
  serviceDetail: z.string(),
  serviceName: z.string(),
  title: z.string(),
  bgIcon:z.string(),
  updatedAt: z.date(),
});

export type Service = z.infer<typeof ServiceSchema>;
