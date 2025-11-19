
import prisma from '#utils/prisma'
import slugify from 'slugify';

export default defineEventHandler(async (event) => {
  const { name, color, categoryId, price } = await readBody(event);

  const product = await prisma.product.create({
    data: {
      name: name,
      slug: slugify(name),
      color: color,
      categoryId: categoryId,
      price: price
    }
  })

  return { message: 'Продукт успешно создан ', product };
})