import Joi from '@hapi/joi';

const Users = {
  validateRegister(user) {
    const schema = Joi.object({
      firstName: Joi.string().alphanum().min(1).required(),
      lastName: Joi.string().alphanum().min(1).required(),
      email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
      password: Joi.string().min(2).required(),
    });

    return schema.validate(user);
  },

  validateLogin(user) {
    const schema = Joi.object({
      email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
      password: Joi.string().min(2).required(),
    });

    return schema.validate(user);
  },
};


module.exports = Users;
