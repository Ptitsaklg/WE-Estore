
import prisma from '#utils/prisma'
import { generateSlug } from "./modules/slugifyProductName";

export default defineEventHandler(async (event) => {
  const { id, name, color, categoryId, price } = await readBody(event);

  const product = await prisma.product.update({
    where: {
      id: id
    },
    data: {
      name: name,
      slug:generateSlug(name),
      color: color,
      categoryId: categoryId,
      price: price
    }
  })
  return { message: 'Продукт успешно обновлен ', product };
  })