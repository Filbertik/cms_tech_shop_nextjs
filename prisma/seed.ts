import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
}

async function main() {
  console.log("🌱 seeding...");

  // USERS
  const users = await prisma.user.createMany({
    data: [
      {
        firstName: "User",
        lastName: "One",
        email: "user1@test.com",
        role: "USER",
      },
      {
        firstName: "User",
        lastName: "Two",
        email: "user2@test.com",
        role: "USER",
      },
    ],
  });

  const allUsers = await prisma.user.findMany();

  // PRODUCTS (60 pcs)
  const products = Array.from({ length: 60 }).map((_, i) => {
    const title = `Laptop Model ${i + 1}`;

    return {
      title,
      slug: slugify(title + "-" + i),
      description: "Auto generated laptop",
      brand: i % 2 === 0 ? "Asus" : "Lenovo",
      category: "Laptops",
      price: 20000 + i * 500,
      oldPrice: 25000 + i * 500,
      discount: 10,
      sku: `SKU-${i + 1}`,
      specs: {
        cpu: "Intel i5",
        ram: "16GB",
      },
    };
  });

  await prisma.product.createMany({
    data: products,
  });

  console.log("✅ PRODUCTS CREATED: 60");

  const dbProducts = await prisma.product.findMany();

  // IMAGES (5 per product)
  for (const product of dbProducts) {
    await prisma.productImage.createMany({
      data: Array.from({ length: 5 }).map((_, i) => ({
        url: `/images/${product.slug}-${i}.jpg`,
        productId: product.id,
      })),
    });
  }

  console.log("🖼️ images created");

  console.log("🎉 DONE");
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());

// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// async function main() {
//   console.log("🌱 Seeding started...");

//   // ===== USERS =====
//   const user1 = await prisma.user.create({
//     data: {
//       firstName: "User",
//       lastName: "One",
//       email: "user1@test.com",
//       phone: "+380000000001",
//       role: "USER",
//     },
//   });

//   const user2 = await prisma.user.create({
//     data: {
//       firstName: "User",
//       lastName: "Two",
//       email: "user2@test.com",
//       phone: "+380000000002",
//       role: "USER",
//     },
//   });

//   // ===== PRODUCTS =====
//   const product1 = await prisma.product.create({
//     data: {
//       title: "Asus Vivobook 15 X1504VA",
//       slug: "asus-vivobook-15-x1504va",
//       description: "Потужний ноутбук для роботи та навчання",
//       brand: "Asus",
//       category: "Laptops",
//       price: 32000,
//       oldPrice: 35000,
//       discount: 10,
//       sku: "ASUS-VIVO-1504",

//       specs: {
//         cpu: "Intel i5",
//         ram: "16GB",
//         storage: "512GB SSD",
//       },

//       images: {
//         create: [
//           { url: "/images/asus/1.jpg" },
//           { url: "/images/asus/2.jpg" },
//           { url: "/images/asus/3.jpg" },
//           { url: "/images/asus/4.jpg" },
//           { url: "/images/asus/5.jpg" },
//         ],
//       },

//       reviews: {
//         create: [
//           {
//             rating: 5,
//             comment: "Дуже хороший ноутбук",
//             userId: user1.id,
//           },
//         ],
//       },
//     },
//   });

//   console.log("✅ Seed completed");
//   console.log({ user1, user2, product1 });
// }

// main()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });

// // import { PrismaClient } from "@prisma/client";

// // const prisma = new PrismaClient();

// // function slugify(text: string) {
// //   return text
// //     .toLowerCase()
// //     .replace(/ /g, "-")
// //     .replace(/[^\w-]+/g, "");
// // }

// // async function main() {
// //   // 👤 Користувачі
// //   const user1 = await prisma.user.create({
// //     data: {
// //       email: "user1@test.com",
// //       name: "User One",
// //     },
// //   });

// //   const user2 = await prisma.user.create({
// //     data: {
// //       email: "user2@test.com",
// //       name: "User Two",
// //     },
// //   });

// //   // 🏷️ Дані
// //   const brands = ["Asus", "HP", "Lenovo", "Acer", "Dell"];
// //   const categories = ["Laptops", "Monitors", "Accessories"];

// //   for (let i = 1; i <= 50; i++) {
// //     const title = `Laptop Model ${i}`;
// //     const brand = brands[i % brands.length];
// //     const category = categories[i % categories.length];

// //     const product = await prisma.product.create({
// //       data: {
// //         title,
// //         slug: slugify(title + "-" + i),
// //         description: `Description for ${title}`,
// //         price: 500 + i * 10,
// //         brand,
// //         category,

// //         images: {
// //           create: Array.from({ length: 5 }).map((_, index) => ({
// //             url: `https://picsum.photos/seed/${i}-${index}/600/600`,
// //           })),
// //         },
// //       },
// //     });

// //     // ⭐ Відгуки
// //     await prisma.review.create({
// //       data: {
// //         rating: (i % 5) + 1,
// //         comment: `Great product ${i}`,
// //         userId: i % 2 === 0 ? user1.id : user2.id,
// //         productId: product.id,
// //       },
// //     });
// //   }

// //   console.log("✅ Seed completed");
// // }

// // main()
// //   .catch(console.error)
// //   .finally(() => prisma.$disconnect());

// // // import { PrismaClient } from "@prisma/client";

// // // const prisma = new PrismaClient();

// // // const products = Array.from({ length: 40 }).map((_, i) => ({
// // //   title: `Ноутбук Model ${i + 1}`,
// // //   slug: `laptop-${i + 1}`,
// // //   description: "Потужний ноутбук для роботи, навчання та ігор",

// // //   brand: i % 2 === 0 ? "Asus" : "Lenovo",
// // //   category: "Laptops",

// // //   price: 20000 + i * 500,
// // //   oldPrice: 22000 + i * 500,
// // //   discount: 5 + (i % 20),

// // //   sku: `SKU-${1000 + i}`,
// // //   inStock: i % 7 !== 0,

// // //   rating: 3 + (i % 3),

// // //   reviewsCount: i * 2,

// // //   specs: {
// // //     Діагональ: '15.6" IPS',
// // //     Процесор: "Intel Core i5",
// // //     ОЗП: "16 GB DDR4",
// // //     SSD: "512 GB",
// // //     Графіка: "Intel Iris Xe",
// // //     ОС: "Windows 11",
// // //   },
// // // }));

// // // async function main() {
// // //   console.log("🌱 Seeding 40 products...");

// // //   for (const p of products) {
// // //     await prisma.product.create({
// // //       data: {
// // //         ...p,
// // //         images: {
// // //           create: [
// // //             { url: `/products/${p.slug}-1.jpg` },
// // //             { url: `/products/${p.slug}-2.jpg` },
// // //           ],
// // //         },
// // //       },
// // //     });
// // //   }

// // //   console.log("✅ Done: 40 products created");
// // // }

// // // main()
// // //   .catch(console.error)
// // //   .finally(() => prisma.$disconnect());
