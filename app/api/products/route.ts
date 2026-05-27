import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || 10);
  const search = searchParams.get("search") || "";

  const skip = (page - 1) * limit;

  const products = await prisma.product.findMany({
    where: {
      name: {
        contains: search,
        mode: "insensitive",
      },
    },
    skip,
    take: limit,
    orderBy: {
      createdAt: "desc",
    },
  });

  const total = await prisma.product.count({
    where: {
      name: {
        contains: search,
        mode: "insensitive",
      },
    },
  });

  return NextResponse.json({
    data: products,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  });
}

// import { prisma } from "@/lib/prisma";
// import { NextResponse } from "next/server";

// export async function GET() {
//   const products = await prisma.product.findMany({
//     include: { images: true },
//     orderBy: { createdAt: "desc" },
//   });

//   return NextResponse.json(products);
// }
