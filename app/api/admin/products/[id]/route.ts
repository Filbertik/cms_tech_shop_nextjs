import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  const product = await prisma.product.findUnique({
    where: { id: params.id },
  });

  return NextResponse.json(product);
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } },
) {
  const body = await req.json();

  const updated = await prisma.product.update({
    where: { id: params.id },
    data: {
      title: body.title,
      price: Number(body.price),
      stock: Number(body.stock),
      description: body.description,
      slug: body.slug || null,
    },
  });

  return NextResponse.json(updated);
}
