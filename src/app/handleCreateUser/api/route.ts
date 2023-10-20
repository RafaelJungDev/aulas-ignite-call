export async function GET(request: Request) {
  const body = await request.json();

  return new Response(body);
}

export async function POST(request: Request) {}
