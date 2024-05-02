export const InvalidInput = (message: string) => {
  return new Response(message, {
    status: 400,
    headers: {
      "Content-Type": "text/json",
    },
  });
};

export const NotFound = (message: string) => {
  return new Response(message, {
    status: 404,
    headers: {
      "Content-Type": "text/json",
    },
  });
};
