// db/seed.ts

import { db } from "@/src/prisma/db";
import sampleData from "./sample-data";

// 1. Import the Prisma 8 db instance (adjust the import path to your project's wiring)

// 2. Import your static sample data

async function main() {
  console.log('Starting database seeding...');

  // 3. Wipe existing products using the SQL builder lane
  await db.runtime().execute(db.sql.public.product.delete().build());
  console.log('Cleared existing products.');

  // 4. Bulk insert the sample data by iterating
  for (const p of sampleData.products) {
    const { image, id, ...rest } = p as any;
    await db.orm.public.Product.create({
      ...rest,
      price: String(p.price), // Convert decimal number to string
      rating: String(p.rating),
    });
  }
  
  console.log('Database seeded successfully! 🌱');
}

// 5. Execute the main function and handle potential errors
main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  });
