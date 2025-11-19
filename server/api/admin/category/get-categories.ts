
import prisma from '#utils/prisma'

export default defineEventHandler(async (event) => {
  const categories = await prisma.category.findMany();
  return { categories };
})