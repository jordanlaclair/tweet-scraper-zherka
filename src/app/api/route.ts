export async function GET(request: Request) {
  return Response.json({ hello: "world" });
}

export async function POST(request: Request) {
  const res = await request.json();
  return Response.json({ res });
}
