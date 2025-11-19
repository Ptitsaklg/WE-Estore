
import prisma from '#utils/prisma'

export default defineEventHandler(async (event) => {
  const { id, name } = await readBody(event);

  const category = await prisma.category.update({
    where: {
      id: id
    },
    data: {
      name: name,
    }
  })
  
  return { message: 'Категория успешно обновлена ', category };
})