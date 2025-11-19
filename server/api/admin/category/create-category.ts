
import prisma from '#utils/prisma'
import { withAuth } from "~/utils/withAuth";

export default withAuth(async (event) => {
  const { name } = await readBody(event);

  const categoryExist = await prisma.category.findUnique({
    where: {
      name: name
    }
  });

  if (categoryExist) {
    throw createError({statusCode: 400, message: 'Такая категория уже существует'})
  }

  const category = await prisma.category.create({
    data: {
      name: name,
    }
  })
  return { message: 'Категория успешно создана ', category };
  })