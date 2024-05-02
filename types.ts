import type { Post } from "@prisma/client";

export type NewPost = Pick<Post, "title" | "content">;

declare global {
  interface Request {
    expoUrl: {
      href: string;
      origin: string;
      protocol: string;
      username: string;
      password: string;
      host: string;
      hostname: string;
      port: string;
      pathname: string;
      search: string;
      searchParams: URLSearchParams;
      hash: string;
    };
  }
}
