import crypto from 'crypto';

export function generateSalt(length: number) {
  return crypto.randomBytes(length).toString('hex');
}