import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET ONE
export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  const product = await prisma.product.findUnique({
    where: { id: Number(params.id) },
  });

  return NextResponse.json(product);
}

// UPDATE
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } },
) {
  const body = await req.json();

  const updated = await prisma.product.update({
    where: { id: Number(params.id) },
    data: {
      title: body.title,
      price: Number(body.price),
    },
  });

  return NextResponse.json(updated);
}

// import { prisma } from "@/lib/prisma";
// import { NextResponse } from "next/server";

// export async function GET(
//   req: Request,
//   { params }: { params: { id: string } },
// ) {
//   const product = await prisma.product.findUnique({
//     where: { id: params.id },
//   });

//   return NextResponse.json(product);
// }

// export async function PATCH(
//   req: Request,
//   { params }: { params: { id: string } },
// ) {
//   const body = await req.json();

//   const updated = await prisma.product.update({
//     where: { id: params.id },
//     data: {
//       title: body.title,
//       price: Number(body.price),
//       stock: Number(body.stock),
//       description: body.description,
//       slug: body.slug || null,
//     },
//   });

//   return NextResponse.json(updated);
// }
