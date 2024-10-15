import bcrypt from 'bcrypt';
const saltRounds = 10;

function hash(plainPassword: string) {
  return bcrypt.hashSync(plainPassword, saltRounds);
}

function compare(plainPassword: string, encryptedPassword: string) {
  return bcrypt.compareSync(plainPassword, encryptedPassword);
}

export {hash, compare}