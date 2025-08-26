// src/app/api/products/[id]/route.ts
import { NextResponse } from "next/server";

type RouteCtx = { params: Record<string, string | string[]> };

export async function GET(_req: Request, { params }: RouteCtx) {
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  // stub response if you don't have data yet:
  return NextResponse.json({ id, status: "ok" });
  // or, if you have seed data:
  // const item = products.find((p) => p.id === id);
  // if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
  // return NextResponse.json(item);
}
