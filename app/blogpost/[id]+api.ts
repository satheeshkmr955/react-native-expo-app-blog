import { InvalidInput, NotFound } from "@/lib/errors";
import {
  deletePostInputSchema,
  editPostInputSchema,
} from "@/lib/validation.schema";
import { db } from "@/lib/db";
import { POST_NOT_FOUND } from "@/constants/message.constants";

export async function DELETE(request: Request) {
  const id = request.expoUrl.searchParams.get("id");

  const result = deletePostInputSchema.safeParse({ id });
  if (!result.success) {
    return InvalidInput(
      JSON.stringify({ errors: result.error.formErrors.fieldErrors })
    );
  }

  const isPostExists = await db.post.findFirst({
    where: { id: result.data.id },
  });

  if (!isPostExists) {
    return NotFound(JSON.stringify({ errors: { id: [POST_NOT_FOUND] } }));
  }

  const post = await db.post.delete({ where: { id: result.data.id } });

  return Response.json({ post });
}

export async function PATCH(request: Request) {
  const id = request.expoUrl.searchParams.get("id") || "";
  const body = await request.json();

  const resultId = deletePostInputSchema.safeParse({ id });
  if (!resultId.success) {
    return InvalidInput(
      JSON.stringify({ errors: resultId.error.formErrors.fieldErrors })
    );
  }

  const resultBody = editPostInputSchema.safeParse(body);
  if (!resultBody.success) {
    return InvalidInput(
      JSON.stringify({ errors: resultBody.error.formErrors.fieldErrors })
    );
  }

  const isPostExists = await db.post.findFirst({
    where: { id },
  });

  if (!isPostExists) {
    return NotFound(JSON.stringify({ errors: { id: [POST_NOT_FOUND] } }));
  }

  const post = await db.post.update({ where: { id }, data: resultBody.data });

  return Response.json({ post });
}
