import Joi from 'joi';

const statusSchema = Joi.object().keys({
    status: Joi.string().trim().alphanum().equal(['draft','active','dormant']).required()
});

export default statusSchema;