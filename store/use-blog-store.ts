import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import type {} from "@redux-devtools/extension";
import { NewPost, Post } from "@/types";

interface BlogStore {
  blogPosts: Post[];
  addBlogPost: (post: NewPost) => Post;
  editBlogPost: (id: number, post: NewPost) => Post;
  deleteBlogPost: (post: Post) => void;
  currentBlogPost: Post | null;
  setCurrentBlogPost: (post: Post) => void;
}

export const useBlogStore = create<BlogStore>()(
  devtools(
    immer((set) => ({
      blogPosts: [],
      setCurrentBlogPost: (post) => set({ currentBlogPost: post }),
      currentBlogPost: null,
      editBlogPost: (id, post) => {
        let updatedPost = { ...post, id };
        set((state) => {
          const index = state.blogPosts.findIndex((post) => post.id === id);
          if (index > -1) {
            state.blogPosts[index] = { ...state.blogPosts[index], ...post };
            updatedPost = state.blogPosts[index];
          }
        });
        return updatedPost;
      },
      addBlogPost: (post) => {
        const newPost = {
          ...post,
          id: Math.floor(Math.random() * 99999),
        };
        set((state) => {
          state.blogPosts.push(newPost);
        });
        return newPost;
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
