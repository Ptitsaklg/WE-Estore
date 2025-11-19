
import prisma from '#utils/prisma'

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const userId = query?.userId as string;
  const userIdToNumber = parseInt(userId);

  const userOders = await prisma.payment.findMany({
    where: {
      userId: userIdToNumber
    },
    include: {
      product: {
        include: {
          images: true
        }
      },
    },
  })


  return { userOders };
})