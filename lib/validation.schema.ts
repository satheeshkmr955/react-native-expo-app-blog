import { z } from "zod";

import {
  CONTENT_REQUIRED,
  TITLE_REQUIRED,
} from "@/constants/message.constants";

export const newPostInputSchema = z.object({
  content: z.string().min(4, CONTENT_REQUIRED),
  title: z.string().min(2, TITLE_REQUIRED),
});

export const deletePostInputSchema = z.object({
  id: z.string().min(4, CONTENT_REQUIRED),
});

export const editPostInputSchema = z.object({
  content: z.string().min(4, CONTENT_REQUIRED).optional(),
  title: z.string().min(2, TITLE_REQUIRED).optional(),
});
