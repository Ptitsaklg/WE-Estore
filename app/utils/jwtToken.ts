import jwt from 'jsonwebtoken'

function jwtPayload(userId: number) {
  const payload = {
    iss: "userName",
    sub: userId,
    aud: userId,
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
    iat: Math.floor(Date.now() / 1000),

  };

  return payload;
}


export function signAccessToken(userId: number) {
  const payload = jwtPayload(userId);
  const key = process.env.JWT_TOKEN_KEY;

  if (!key) {
    throw new Error('JWT_TOKEN_KEY is not defined in environment variables');
  }

  return new Promise((resolve, reject) => {
    jwt.sign(payload, key, (error, token) => {
      if (error) {
        reject(error)
      }
      resolve(token)
    })
  })
}


export function signRefreshToken(userId: number) {
  const payload = jwtPayload(userId);
  const key = process.env.REFRESH_TOKEN_KEY;

  if (!key) {
    throw new Error('REFRESH_TOKEN_KEY is not defined in environment variables');
  }

  return new Promise((resolve, reject) => {
    jwt.sign(payload, key, (error, token) => {
      if (error) {
        reject(error)
      }
      resolve(token)
    })
  })
}


export function verifyToken(accessToken: string) {
  return new Promise<{message:string}|any>((resolve) => {
    const key = process.env.JWT_TOKEN_KEY;

    if (!key) {
    throw new Error('JWT_TOKEN_KEY is not defined in environment variables');
  }

    jwt.verify(accessToken, key, (error:any, payload:any) => {
      if (error) {
        resolve({message:"invalid_token"})
      } else {
        resolve(payload)
      }
    });
  })
}