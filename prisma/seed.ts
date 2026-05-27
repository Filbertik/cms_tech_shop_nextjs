import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding full ecommerce...");

  const user = await prisma.user.create({
    data: {
      firstName: "Іван",
      lastName: "Петренко",
      email: "ivan@example.com",
      phone: "+380501112233",
      address: "Lviv, Ukraine",
      preferences: {
        favoriteBrands: ["Intel", "Asus"],
        budget: 30000,
      },
    },
  });

  const product = await prisma.product.create({
    data: {
      title: "Asus Vivobook 15 X1504VA",
      description: "Потужний ноутбук для роботи та навчання",

      price: 32000,
      discount: 10,
      discountPrice: 28800,
      sku: "ASUS-VIVO-1504",
      inStock: true,

      specs: {
        Діагональ: '15.6" IPS',
        Процесор: "Intel Core i5-1335U",
        ОЗП: "16 GB DDR4",
        Накопичувач: "512 GB SSD",
        Графіка: "Intel Iris Xe",
        ОС: "Windows 11 Home",
        Вага: "1.7 кг",
        "Роздільна здатність": "1920x1080",
        "Частота екрану": "60 Гц",
      },

      images: {
        create: [
          { url: "/products/1.jpg" },
          { url: "/products/2.jpg" },
          { url: "/products/3.jpg" },
        ],
      },
    },
  });

  await prisma.review.create({
    data: {
      rating: 5,
      comment: "Дуже швидкий ноутбук!",
      userId: user.id,
      productId: product.id,
    },
  });

  await prisma.order.create({
    data: {
      userId: user.id,
      total: 28800,
      status: "paid",
    },
  });

  console.log("✅ Seed done");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// async function main() {
//   console.log("🌱 Seeding database...");

//   // 👤 USERS
//   const user1 = await prisma.user.create({
//     data: {
//       firstName: "Іван",
//       lastName: "Петренко",
//       email: "ivan@example.com",
//       phone: "+380501112233",
//       address: "Lviv, Ukraine",
//       preferences: {
//         favoriteBrands: ["Intel", "Asus"],
//         budget: 30000,
//       },
//     },
//   });

//   // 📦 PRODUCTS
//   const product1 = await prisma.product.create({
//     data: {
//       title: "Asus Vivobook 15 X1504VA",
//       description:
//         "Потужний ноутбук для роботи та навчання з сучасним процесором Intel i5 та швидким SSD накопичувачем.",

//       price: 32000,
//       discount: 10,
//       discountPrice: 28800,
//       sku: "ASUS-VIVO-1504",

//       inStock: true,

//       images: [
//         "/products/laptop1-1.jpg",
//         "/products/laptop1-2.jpg",
//         "/products/laptop1-3.jpg",
//       ],

//       specs: {
//         Діагональ: '15.6" IPS',
//         Процесор: "Intel Core i5-1335U",
//         ОЗП: "16 GB DDR4",
//         Накопичувач: "512 GB SSD",
//         Графіка: "Intel Iris Xe",
//         ОС: "Windows 11 Home",
//         Вага: "1.7 кг",
//         "Роздільна здатність": "1920x1080 FullHD",
//         "Частота екрану": "60 Гц",
//         Яскравість: "250 cd/m²",
//         Порти: "USB-C, HDMI, USB 3.2",
//         WiFi: "Wi-Fi 802.11ax + Bluetooth 5.2",
//         Клавіатура: "Підсвітка, цифровий блок",
//         Камера: "720p",
//         Безпека: "TPM, MIL-STD-810H",
//         Батарея: "42 Wh",
//       },
//     },
//   });

//   // ⭐ REVIEWS
//   await prisma.review.create({
//     data: {
//       rating: 5,
//       comment: "Дуже швидкий ноутбук, ідеально для роботи!",
//       userId: user1.id,
//       productId: product1.id,
//     },
//   });

//   await prisma.review.create({
//     data: {
//       rating: 4,
//       comment: "Хороший варіант за свої гроші.",
//       userId: user1.id,
//       productId: product1.id,
//     },
//   });

//   // 🛒 ORDER
//   await prisma.order.create({
//     data: {
//       userId: user1.id,
//       total: 28800,
//     },
//   });

//   console.log("✅ Seed completed!");
// }

// main()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
