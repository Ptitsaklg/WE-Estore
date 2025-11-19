
import prisma from '#utils/prisma'

export default defineEventHandler(async (event) => {
  const userOrders = await prisma.payment.findMany({
    include: {
        product: {
            include: {
              images: true
            }
        },
    },
    orderBy: {
      createdAt: 'desc'
    }
  })


  return { userOrders };
})