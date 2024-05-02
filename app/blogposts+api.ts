import { db } from "@/lib/db";
import { InvalidInput } from "@/lib/errors";
import { newPostInputSchema } from "@/lib/validation.schema";

export async function GET() {
  const posts = await db.post.findMany();
  return Response.json({ posts });
}

export async function POST(request: Request) {
  const body = await request.json();

  const result = newPostInputSchema.safeParse(body);
  if (!result.success) {
    return InvalidInput(
      JSON.stringify({ errors: result.error.formErrors.fieldErrors })
    );
  }

  const post = await db.post.create({ data: result.data });

  return Response.json({ post });
}
