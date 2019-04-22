import Joi from 'joi';

const activateSchema = Joi.object().keys({
    account_number: Joi.number().required(),
    status: Joi.string().trim().alphanum().equal(['active','dormant','draft']).required(),
});

export default activateSchema;