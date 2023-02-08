import bcrypt from 'bcrypt';

export function hashing(password: string) {
  return bcrypt.hashSync(password, 10);
}

export function checkPassword(password: string, userPassword: string) {
  return bcrypt.compareSync(password, userPassword)
}
