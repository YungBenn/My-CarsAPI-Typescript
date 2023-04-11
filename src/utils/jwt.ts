import jwt from 'jsonwebtoken';
import config from '../config/env';

export function signJWT(
  payload: Object,
  options?: jwt.SignOptions | undefined,
) {
  return jwt.sign(payload, <string>config.private_key, {
    ...(options && options),
    algorithm: 'RS256',
  });
}

export function verifyJWT(token: string) {
  try {
    const decoded: any = jwt.verify(token, <string>config.public_key);
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
