import { PrismaClient } from '@prisma/client';
import { datas } from './thread.seed';
const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.createManyAndReturn({
    data: datas,
  });

  console.log(users);
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
