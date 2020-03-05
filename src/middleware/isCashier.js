const isCashier = (req, res, next) => {
  if (!req.user.isCashier) return res.status(403).send({ message: 'Forbidden' });
  return next();
};

export default isCashier;
