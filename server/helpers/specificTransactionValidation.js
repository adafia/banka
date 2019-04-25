import Joi from 'joi';

const specificTransactionsSchema = Joi.object().keys({
    id: Joi.number().required(),
});

export default specificTransactionsSchema;