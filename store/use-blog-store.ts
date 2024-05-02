import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import type {} from "@redux-devtools/extension";
import type { Post } from "@prisma/client";

interface BlogStore {
  blogPosts: Post[];
  addBlogPost: (post: Post) => Post;
  editBlogPost: (id: string, post: Post) => Post;
  getBlogPost: (posts: Post[]) => void;
  deleteBlogPost: (post: Post) => void;
  currentBlogPost: Post | null;
  setCurrentBlogPost: (post: Post) => void;
}

export const useBlogStore = create<BlogStore>()(
  devtools(
    immer((set) => ({
      blogPosts: [],
      getBlogPost: (posts) => {
        set((state) => {
          state.blogPosts = [...state.blogPosts, ...posts];
        });
      },
      setCurrentBlogPost: (post) => set({ currentBlogPost: post }),
      currentBlogPost: null,
      editBlogPost: (id, post) => {
        set((state) => {
          const index = state.blogPosts.findIndex((post) => post.id === id);
          if (index > -1) {
            state.blogPosts[index] = { ...state.blogPosts[index], ...post };
          }
        });
        return post;
      },
      addBlogPost: (post) => {
        set((state) => {
          state.blogPosts.unshift(post);
        });
        return post;
      },
      deleteBlogPost: (post) => {
        set((state) => {
          const index = state.blogPosts.findIndex(({ id }) => id === post.id);
          if (index > -1) {
            state.blogPosts.splice(index, 1);
          }
        });
      },
    })),
    {
      name: "blog-store",
      // enabled: process.env.NODE_ENV !== "production",
    }
  )
);
