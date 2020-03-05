import Joi from '@hapi/joi';

const Admin = {
  validaterMakeCashier(user) {
    const schema = Joi.object({
      id: Joi.string().required(),
    });

    return schema.validate(user);
  },

};


module.exports = Admin;
