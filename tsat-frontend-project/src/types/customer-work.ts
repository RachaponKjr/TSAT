import { z } from "zod";

const TextNode = z.object({
  type: z.literal("text"),
  text: z.string(),
});

const ParagraphNode = z.object({
  type: z.literal("paragraph"),
  content: z.array(TextNode),
});

const ImageNode = z.object({
  type: z.literal("image"),
  attrs: z.object({
    src: z.string(),
    alt: z.string().optional(),
  }),
});

const HeadingNode = z.object({
  type: z.literal("heading"),
  attrs: z.object({
    level: z.number(),
  }),
  content: z.array(TextNode),
});

// เพิ่ม node types ได้เรื่อย ๆ ตามที่ใช้จริง
const ContentNode = z.union([ParagraphNode, ImageNode, HeadingNode]);

const ContentSchema = z.object({
  type: z.literal("doc"),
  content: z.array(ContentNode),
});

export const WorkSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  content: ContentSchema,
  isShow: z.boolean(),
  type: z.string(),
  images: z.string(),
  carSubModel: z.object({
    name: z.string().nullable(),
  }),
  carModel: z.object({
    id: z.string().uuid(),
    name: z.string(),
    image: z.string(),
  }),
  tags: z.array(z.string()),
});

export type Work = z.infer<typeof WorkSchema>;

export type Content = z.infer<typeof ContentSchema>;

export type ContentNode = z.infer<typeof ContentNode>;

export type ParagraphNode = z.infer<typeof ParagraphNode>;
