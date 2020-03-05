import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';

const secret = process.env.PRIVATE_KEY;

const Tokens = {
  async sign(payload) {
    const token = await jwt.sign(payload, secret, { expiresIn: '1d' });
    return token;
  },
}

module.exports = Tokens;
