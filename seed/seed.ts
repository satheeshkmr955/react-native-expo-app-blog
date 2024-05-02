const { faker } = require("@faker-js/faker");
const { PrismaClient, Post } = require("@prisma/client");

const prisma = new PrismaClient();

const POST_COUNT = 50;

async function main() {
  const jsonArray: (typeof Post)[] = new Array(POST_COUNT).fill("a").map(() => {
    return {
      title: faker.commerce.product(),
      content: faker.commerce.productDescription(),
    };
  });

  await prisma.post.createMany({ data: jsonArray });
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
