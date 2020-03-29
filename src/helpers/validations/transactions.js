import Joi from '@hapi/joi';

const Transactions = {
  validateGetTransaction(transaction) {
    const schema = Joi.object({
      id: Joi.number().required()
    });

    return schema.validate(transaction);
  },

  validateCreate(transaction) {
    const schema = Joi.object({
      accountNumber: Joi.number().required(),
      amount: Joi.number().positive().allow(0).required()
    });

    return schema.validate(transaction);
  }
};

module.exports = Transactions;
