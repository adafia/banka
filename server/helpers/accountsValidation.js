import Joi from 'joi';

const createAccountSchema = Joi.object().keys({
    account_number: Joi.number().required(),
    status: Joi.string().trim().alphanum().equal(['draft','active','dormant']).required(),
    type: Joi.string().trim().alphanum().equal(['savings','current']).required(),
    balance: Joi.number().required(),
    created_on: Joi.required()
});

export default createAccountSchema;