
import prisma from '#utils/prisma'

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const search = query?.search as string
  const page = parseInt(query?.page as string) || 1
  const rawLimit = query?.limit;
  const limit = rawLimit !== undefined ? Number(rawLimit) : 10;

  const filters = []

  const categories = Array.isArray(query?.categories) ? query?.categories :
    (query?.categories as string || '').split(',').map(Number).filter((i) => i > 0)

  const colors = Array.isArray(query?.colors) ? query?.colors :
    (query?.colors as string || '').split(',').filter((i) => i !== '')

  const prices = Array.isArray(query?.prices) ? query?.prices :
    (query?.prices as string || '').split(',').map(Number).filter((i) => i > 0)

  if (categories.length > 0) {
    filters.push({ categoryId: { in: categories } })
  }

  if (colors.length > 0) {
    filters.push({ color: { in: colors } })
  }

  if (prices.length === 2) {
    filters.push({ price: { gte: prices[0], lte: prices[1] } })
  }


  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where: filters.length > 0 ?
        { AND: filters }
        : {},

      orderBy: {
        createdAt: 'desc'
      },
      include: {
        category: true,
        images: true,
        stars: true,
        _count: {
            select: {
                reviews: true
            }
        },
      },
      skip: limit === 0 ? undefined : (page - 1) * limit,
      take: limit === 0 ? undefined : limit,
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


  const starRatingParam = Array.isArray(query?.starRating) ? query.starRating[0]: query?.starRating;

  const starRatingFilter = starRatingParam ? parseInt(String(starRatingParam)) : NaN;

  const newProductArray = !Number.isNaN(starRatingFilter) ? products.filter((item) => {
    const totalStars = item.stars?.reduce(
      (acc, star) => acc + Number(star.receivedStars || 0),
      0
    ) || 0;
    const reviews = Number(item._count?.reviews) || 0;

      if (reviews === 0) return false;

      const avg = totalStars / reviews;

      switch (starRatingFilter) {
        case 1:
          return avg < 1.5;
        case 2:
          return avg >= 1.5 && avg < 2.5;
        case 3:
          return avg >= 2.5 && avg < 3.5;
        case 4:
          return avg >= 3.5 && avg < 4.5;
        case 5:
          return avg >= 4.5;
        default:
          return false;
      }
    })
  : products;

  return {
    products: Array.isArray(newProductArray) ? newProductArray : [],
    metadata: {
      total: Array.isArray(newProductArray) ? newProductArray.length : 0,
      page,
      limit,
      totalPages: limit === 0 ? 1 : Math.ceil((newProductArray?.length || 1) / limit),
    },
  };

})