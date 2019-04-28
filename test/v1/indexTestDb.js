import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server/server';
import jwt from 'jsonwebtoken';
import keys from '../../server/config/keys';

chai.use(chaiHttp);

const adminToken = jwt.sign({ email: 'adafia@gmail.com', type: 'staff' , is_cashier: false, is_admin: true }, keys.SECRET_OR_KEY, { expiresIn: '1d' });
const cashierToken = jwt.sign({ email: 'ama@mail.com', type: 'staff' , is_cashier: true, is_admin: false }, keys.SECRET_OR_KEY, { expiresIn: '1d' });
const clientToken1 = jwt.sign({ email: 'job@gmail.com', type: 'client' , is_cashier: false, is_admin: false }, keys.SECRET_OR_KEY, { expiresIn: '1d' });
const clientToken2 = jwt.sign({ email: 'apple@gmail.com', type: 'client' , is_cashier: false, is_admin: false }, keys.SECRET_OR_KEY, { expiresIn: '1d' });







describe('transactions', () => {
    
});

describe('transactions', () => {
    
});