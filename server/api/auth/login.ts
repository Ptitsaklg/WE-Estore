
import prisma from '#utils/prisma'
import { signAccessToken, signRefreshToken } from '~/utils/jwtToken';
import { comparePassword } from './modules/bcrypt';

export default defineEventHandler(async (event) => {
  const {email, password} = await readBody(event);

  const userExist = await prisma.user.findUnique({
    where: {
      email: email
    }
  });

  if (!userExist) {
    throw createError({statusCode: 400, message: 'Пользователь не найден'})
  }

  const isMatch = await comparePassword(password, userExist?.password)

  if (isMatch) {
    const [accessToken, refreshToken] = await Promise.all([
      signAccessToken(userExist?.id),
      signRefreshToken(userExist?.id)
    ])
    const data = {
      token: {
        accessToken: accessToken,
        refreshToken: refreshToken
      },
      user: { 
        name: userExist?.name, 
        email: userExist?.email, 
        // role : userExist?.role, 
        id: userExist?.id 
      },

    }
    return { message: 'Пользователь авторизовался', data };
    } else {
      throw createError({ statusCode: 422, message: 'Неправильный пароль' })
    }
})