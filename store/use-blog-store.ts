import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import type {} from "@redux-devtools/extension";

interface BlogStore {}

export const useBlogStore = create<BlogStore>()(
  devtools(
    immer((set) => ({})),
    {
      name: "blog-store",
      // enabled: process.env.NODE_ENV !== "production",
    }
  )
);
