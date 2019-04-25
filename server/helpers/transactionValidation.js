import Joi from 'joi';

const transactionSchema = Joi.object().keys({
    account_number: Joi.number().required(),
    amount: Joi.number().positive().allow(0).required(),
});

export default transactionSchema;