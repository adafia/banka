import Joi from 'joi';

const createAccountSchema = Joi.object().keys({
    first_name: Joi.string().trim().alphanum().min(3).max(30).required(),
    last_name: Joi.string().trim().alphanum().min(3).max(30).required(),
    email: Joi.string().email().regex(/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/).required(),
    status: Joi.string().trim().alphanum().equal(['active','dormant','draft']).required(),
    type: Joi.string().trim().alphanum().equal(['savings','current']).required(),
    balance: Joi.number().required(),
    created_on: Joi.required()
});

export default createAccountSchema;