
import prisma from '#utils/prisma'
import fs from 'fs';
import path from 'path';

export default defineEventHandler(async (event) => {
  const { id } = await readBody(event);

  try {
    const images = await prisma.image.findMany({
      where: {
        productId: id
      }
    });

    for (const image of images) {
      const imagePath = path.join(process.cwd(), 'public', image.url);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
        console.log("Удалён файл:", imagePath);
      } else {
        console.warn("Файл не найден для удаления:", imagePath);
      }
    }

    await prisma.image.deleteMany({
      where: {
        productId: id
      }
    });

    const product = await prisma.product.delete({
      where: {
        id: id
      }
    });

    return { message: 'Продукт и его изображения удалены', product };

  } catch (error: any) {
    console.error("Ошибка при удалении продукта и изображений:", error);
    throw createError({
      statusCode: 500,
      message: error.message || "Ошибка при удалении продукта"
    });
  }
});