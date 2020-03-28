import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const secret = process.env.PRIVATE_KEY;

const auth = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token)
    return res
      .status(401)
      .send({ measage: 'Access denied. No token provided' });

  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    return next();
  } catch (e) {
    return res.status(400).send({ message: 'Invalid token' });
  }
};

export default auth;
