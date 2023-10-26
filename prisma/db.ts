/* eslint-disable import/prefer-default-export */
import { Category, PrismaClient } from '@prisma/client';
import { hash } from "bcrypt";

const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined
};

export const prisma = globalForPrisma.prisma
  ?? new PrismaClient({
    log: ['query'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

async function main() {  
  // const password = await hash("test", 12)
  //  const user = await prisma.user.upsert({
  //   where: { email: "test1@test.com" },
  //   update: {},
  //   create: {
  //     email: "test1@test.com",
  //     name: "Test1 User",
  //     password: password
  //   }
  //  })

  // const task = await prisma.task.create({
  //   data: {
  //     uItems: [],
  //     doneItems: [],
  //     todoItems: [],
  //     inprogressItems: [],
  //     name: "Aug",
  //     user: {
  //       connect: {
  //         id: "650ed3a277fb3a088c71e1ca"
  //       }
  //     }
  //   }
  // })
}
  
  main()
    .catch(async (e) => {
      console.error(e)
      process.exit(1)
    })
    .finally(async () => {
      await prisma.$disconnect()
    })