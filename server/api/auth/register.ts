
import prisma from '#utils/prisma'
import { hashPassword } from './modules/bcrypt';
import { USER_ROLE } from "./modules/user.constant";


export default defineEventHandler(async (event) => {
  const {name, email, password} = await readBody(event);

  const userExist = await prisma.user.findUnique({
    where: {
      email: email
    }
  });

  if (userExist) {
    throw createError({statusCode: 400, message: 'Такой email уже существует'})
  }

  const hashPwd = await hashPassword(password)

  const user = await prisma.user.create({
    data: {
      name: name,
      email: email,
      password: hashPwd,
      role: USER_ROLE.CUSTOMER
    }
  })
  return { message: 'Пользователь успешно создан ', user };
  })