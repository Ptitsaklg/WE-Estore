
import prisma from '#utils/prisma'

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const search = query?.search as string
  const page = parseInt(query?.page as string) || 1
  const limit = parseInt(query?.limit as string) || 10

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where: search ? {
          name: {
              contains: search,
              mode: 'insensitive'
          }
      } : {},
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        category: true,
        images: true
      },
      skip: (page - 1) * limit,
      take: limit
    }),

    prisma.product.count({
      where: search ? {
          name: {
            contains: search,
            mode: 'insensitive'
            }
      } : {},
    }),
  ])

  return {
    products, metadata: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    }
  };
})