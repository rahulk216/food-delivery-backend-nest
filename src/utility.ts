import * as jwt from 'jsonwebtoken';

export function generateJWT(name: string, id: number, role: string) {
  return jwt.sign(
    {
      name,
      id,
      role,
    },
    process.env.JSON_T0KEN_KEY,
    {
      expiresIn: 3600000,
    },
  );
}
