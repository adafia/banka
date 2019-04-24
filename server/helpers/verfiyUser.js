import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';

jwt.verify(req.token, process.env.SECRET_OR_KEY, (err, authrizedData) => {
    if(err){
        return res.status(403).send({
            status: 403,
            message: 'Forbidden access'
        });
    } else {
        console.log(authrizedData);
        req.body.user = authrizedData;
        next();
    }
});