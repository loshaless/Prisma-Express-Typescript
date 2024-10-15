import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
let password = process.env.JWT_SECRET

function generateToken(payLoad: any) {
  return jwt.sign(payLoad, password as string);
}

function verifyToken(token: string) {
  return jwt.verify(token, password as string);
}

export {generateToken, verifyToken}