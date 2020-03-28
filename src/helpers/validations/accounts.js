import Joi from '@hapi/joi';

const Account = {
  validaterCreate(account) {
    const schema = Joi.object({
      type: Joi.string().trim().alphanum().valid('savings', 'current').required(),
    });

    return schema.validate(account);
  },

  validaterChangeStatus(account) {
    const schema = Joi.object({
      accountNumber: Joi.number().required(),
      status: Joi.string().trim().alphanum().valid('active','dormant','draft').required()
    });

    return schema.validate(account);
  },

};


module.exports = Account;
