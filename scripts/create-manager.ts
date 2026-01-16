import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("admin123", 10);
  
  const manager = await prisma.manager.upsert({
    where: { email: "admin@kigalicarhire.com" },
    update: {},
    create: {
      email: "admin@kigalicarhire.com",
      password: hashedPassword,
      name: "Admin Manager",
      role: "super_admin",
    },
  });

  console.log("Manager created:", { id: manager.id, email: manager.email, name: manager.name });
  console.log("\nLogin credentials:");
  console.log("Email: admin@kigalicarhire.com");
  console.log("Password: admin123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
