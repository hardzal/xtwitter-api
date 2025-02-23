import { PrismaClient } from '@prisma/client';
import { datas } from './thread.seed';
const prisma = new PrismaClient();

async function main() {
  const threads = await prisma.thread.createManyAndReturn({
    data: datas,
  });

  console.log(threads);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
