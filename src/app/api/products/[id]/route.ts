import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  _ctx: { params: { id: string } }
) {
  // not implemented yet
  return NextResponse.json({ error: "Not implemented" }, { status: 404 });
}
