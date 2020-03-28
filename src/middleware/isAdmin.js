
const isAdmin = (req, res, next) => {
  if (!req.user.isAdmin) return res.status(403).send({ message: 'Forbidden' });
  return next();
};

export default isAdmin;
