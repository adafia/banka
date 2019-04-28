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
const invalidToken = jwt.sign({ email: 'noaccount@gmail.com', type: 'client', is_cashier: false, is_admin: false }, keys.SECRET_OR_KEY, { expiresIn: '1d' });


let accountNumber1;
let accountNumber2;

describe('transactions', () => {
    before('Before testing transactions routes, create a bank account for user 2', (done) => {
      chai
          .request(server)
          .post('/api/v2/accounts')
          .set('Authorization', `Bearer ${clientToken2}`)
          .send({type: 'current'})
          .end((err, res) => {
              // console.log(res.body)
              expect(res.body).to.be.an('object');
              expect(res.body.status).to.deep.equal(201);
              expect(res.body.message).to.deep.equal('Your account has been created successfully');
              expect(res.body.data).to.be.an('object');
              accountNumber2 = res.body.data.accountNumber
              done();
        });
    });
    describe('POST /api/v2/transactions/:accountNumber/credit', () => {
        before('Bank account for user 2 should be activated by the administrator before transaction tests', (done) => {
          chai
            .request(server)
            .patch(`/api/v2/accounts/${accountNumber2}`)
            .set('Authorization', `Bearer ${adminToken}`)
            .send({status: 'active'})
            .end((err, res) => {
              // console.log(res.body)
              expect(res.body).to.be.an('object');
              expect(res.body.status).to.deep.equal(200);
              expect(res.body.message).to.deep.equal(`Account with number ${accountNumber2} has been made active`);
              expect(res.body.data.status).to.deep.equal('active');
              expect(res.body.data).to.be.an('object');
              done();
            });
        });

        it('should credit a bank account of an existing user', (done) => {
          chai
            .request(server)
            .post(`/api/v2/transactions/${accountNumber2}/credit`)
            .set('Authorization', `Bearer ${cashierToken}`)
            .send({amount: 20000})
            .end((err, res) => {
            //   console.log(res.body)
              expect(res.body).to.be.an('object');
              expect(res.body.status).to.deep.equal(200);
              expect(res.body.message).to.deep.equal(`Account with number ${accountNumber2} has been credited with 20000 the new balance is 20000`);
              expect(res.body.data).to.be.an('object');
              done();
            });
        });
        
        before('Before testing transactions routes, create a bank account for user 1', (done) => {
          chai
              .request(server)
              .post('/api/v2/accounts')
              .set('Authorization', `Bearer ${clientToken1}`)
              .send({type: 'current'})
              .end((err, res) => {
                  // console.log(res.body)
                  expect(res.body).to.be.an('object');
                  expect(res.body.status).to.deep.equal(201);
                  expect(res.body.message).to.deep.equal('Your account has been created successfully');
                  expect(res.body.data).to.be.an('object');
                  accountNumber1 = res.body.data.accountNumber
                  done();
              });
        });

        it('should not credit an inactive bank account', (done) => {
          chai
            .request(server)
            .post(`/api/v2/transactions/${accountNumber1}/credit`)
            .set('Authorization', `Bearer ${cashierToken}`)
            .send({amount: 20000})
            .end((err, res) => {
            //   console.log(res.body)
              expect(res.body).to.be.an('object');
              expect(res.body.status).to.deep.equal(400);
              expect(res.body.message).to.deep.equal(`Account with number ${accountNumber1} is not yet active`);
              done();
            });
        });

        it('An admin should not be able to credit a bank account', (done) => {
          chai
            .request(server)
            .post(`/api/v2/transactions/${accountNumber2}/credit`)
            .set('Authorization', `Bearer ${adminToken}`)
            .send({amount: 20000})
            .end((err, res) => {
            //   console.log(res.body)
              expect(res.body).to.be.an('object');
              expect(res.body.status).to.deep.equal(401);
              expect(res.body.message).to.deep.equal('You are not authorized');
              done();
            });
        });

        it('A user should not be able to credit a bank account', (done) => {
          chai
            .request(server)
            .post(`/api/v2/transactions/${accountNumber2}/credit`)
            .set('Authorization', `Bearer ${clientToken1}`)
            .send({amount: 20000})
            .end((err, res) => {
            //   console.log(res.body)
              expect(res.body).to.be.an('object');
              expect(res.body.status).to.deep.equal(401);
              expect(res.body.message).to.deep.equal('You are not authorized');
              done();
            });
        });
        
    });

    describe('POST /api/v2/transactions/:accountNumber/debit', () => {
        it('should debit a bank account of an existing user', (done) => {
          chai
            .request(server)
            .post(`/api/v2/transactions/${accountNumber2}/debit`)
            .set('Authorization', `Bearer ${cashierToken}`)
            .send({amount: 10000})
            .end((err, res) => {
            //   console.log(res.body)
              expect(res.body).to.be.an('object');
              expect(res.body.status).to.deep.equal(200);
              expect(res.body.message).to.deep.equal(`Account with number ${accountNumber2} has been debited with 10000 the new balance is 10000`);
              expect(res.body.data).to.be.an('object');
              done();
            });
        });
        it('An unauthorized user should not be able to debit a bank account.', (done) => {
          chai
            .request(server)
            .post(`/api/v2/transactions/${accountNumber2}/debit`)
            .set('Authorization', `Bearer ${clientToken1}`)
            .send({amount: 10000})
            .end((err, res) => {
            //   console.log(res.body)
              expect(res.body).to.be.an('object');
              expect(res.body.status).to.deep.equal(401);
              expect(res.body.message).to.deep.equal('You are not authorized');
              done();
            });
        });

        it('should not be able to debit a bank account, if the amount specified is negative.', (done) => {
          chai
            .request(server)
            .post(`/api/v2/transactions/${accountNumber2}/debit`)
            .set('Authorization', `Bearer ${cashierToken}`)
            .send({amount: -10000})
            .end((err, res) => {
            //   console.log(res.body)
              expect(res.body).to.be.an('object');
              expect(res.body.status).to.deep.equal(400);
              expect(res.body.message).to.deep.equal('"amount" must be a positive number');
              done();
            });
        });

        it('An invalid user should not be able to debit a bank account, if the amount', (done) => {
          chai
            .request(server)
            .post(`/api/v2/transactions/${accountNumber2}/debit`)
            .set('Authorization', `Bearer ${invalidToken}`)
            .send({amount: 10000})
            .end((err, res) => {
            //   console.log(res.body)
              expect(res.body).to.be.an('object');
              expect(res.body.status).to.deep.equal(401);
              expect(res.body.message).to.deep.equal('You are not authorized');
              done();
            });
        });
        
    });


    describe('GET /api/v2/accounts/:accountNumber/transactions', () => {
        it('should allow a user to fetch all bank transactions histrory for his/her account', (done) => {
          chai
            .request(server)
            .get(`/api/v2/accounts/${accountNumber2}/transactions`)
            .set('Authorization', `Bearer ${clientToken2}`)
            .end((err, res) => {
              console.log(res.body)
              expect(res.body).to.be.an('object');
              expect(res.body.status).to.deep.equal(200);
              expect(res.body.message).to.deep.equal(`Transactions for account with number ${accountNumber2} have been fetched successfully`);
              expect(res.body.data).to.be.an('array');
              done();
            });
        });

        // it('should not allow a user to fetch all bank transactions histrory if they do not own the account', (done) => {
        //   chai
        //     .request(server)
        //     .get(`/api/v2/accounts/${accountNumber2}/transactions`)
        //     .set('Authorization', `Bearer ${clientToken1}`)
        //     .end((err, res) => {
        //       console.log(res.body)
        //       expect(res.body).to.be.an('object');
        //       expect(res.body.status).to.deep.equal(403);
        //       expect(res.body.message).to.deep.equal('Sorry you can only view transactions of accounts you own');
        //       expect(res.body.data).to.be.an('object');
        //       done();
        //     });
        // });
        
    });
    
});