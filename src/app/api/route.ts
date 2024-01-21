export async function GET(request: Request) {
  const res = Response.json(
    { message: "Hello World!" },
    {
      status: 200,
    }
  );

  return res;
}
