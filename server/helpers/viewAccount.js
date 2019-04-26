import Joi from 'joi';

const viewaccountSchema = Joi.object().keys({
    account_number: Joi.number().required()
});

export default viewaccountSchema;