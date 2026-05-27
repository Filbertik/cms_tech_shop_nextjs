import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

const models: any = {
  products: prisma.product,
  users: prisma.user,
  categories: prisma.category,
  orders: prisma.order,
};

export async function GET(
  req: Request,
  { params }: { params: Promise<{ table: string }> },
) {
  const { table } = await params; // 🔥 ВАЖЛИВИЙ FIX

  const model = models[table];

  if (!model) {
    return NextResponse.json({ error: "Table not found" }, { status: 404 });
  }

  const data = await model.findMany();

  return NextResponse.json(data);
}

// import { NextResponse } from "next/server";
// import prisma from "@/lib/prisma";

// const models: any = {
//   products: prisma.product,
//   users: prisma.user,
//   categories: prisma.category,
//   orders: prisma.order,
// };

// export async function GET(req: Request, { params }: any) {
//   const model = models[params.table];

//   if (!model) {
//     return NextResponse.json({ error: "Table not found" }, { status: 404 });
//   }

//   const data = await model.findMany();

//   return NextResponse.json(data);
// }
