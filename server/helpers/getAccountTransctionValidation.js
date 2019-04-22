import Joi from 'joi';

const accountTransactions = Joi.object().keys({
    account_number: Joi.number().required(),
    email: Joi.string().email().regex(/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/).required(),
    password: Joi.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/).required().error( errors => {
        return {
            message: 'Your password is required and it should have at least one upper case English letter, one lower case English letter, one digit, one special character and a Minimum eight characters'
        }
    })
});

export default accountTransactions;