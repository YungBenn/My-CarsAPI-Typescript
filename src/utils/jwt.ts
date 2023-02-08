import jwt from 'jsonwebtoken';

export function signJWT(
  payload: Object,
  options?: jwt.SignOptions | undefined,
) {
  return jwt.sign(payload, <string>process.env.PRIVATE_KEY, {
    ...(options && options),
    algorithm: 'RS256',
  });
}

export function verifyJWT(token: string) {
  try {
    const decoded: any = jwt.verify(token, <string>process.env.PUBLIC_KEY);
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (error) {
    return {
      valid: false,
      expired: 'jwt is expired',
      decoded: null,
    };
  }
}
