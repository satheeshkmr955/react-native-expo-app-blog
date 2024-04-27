export interface Post {
  title: string;
  id: number;
  content: string;
}

export type NewPost = Omit<Post, "id">;
