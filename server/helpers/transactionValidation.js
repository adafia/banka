import Joi from 'joi';

const transactionSchema = Joi.object().keys({
    account_number: Joi.number().required(),
    amount: Joi.number().required(),
});

export default transactionSchema;