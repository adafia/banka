import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server/server';
import jwt from 'jsonwebtoken';
import keys from '../../server/config/keys';



chai.use(chaiHttp);
const adminToken = jwt.sign({ email: 'adafia@gmail.com', type: 'staff' , is_cashier: false, is_admin: true }, keys.SECRET_OR_KEY, { expiresIn: '1hr' });
const clientToken1 = jwt.sign({ email: 'job@gmail.com', type: 'client' , is_cashier: false, is_admin: false }, keys.SECRET_OR_KEY, { expiresIn: '1hr' });
const clientToken2 = jwt.sign({ email: 'apple@gmail.com', type: 'client' , is_cashier: false, is_admin: false }, keys.SECRET_OR_KEY, { expiresIn: '1hr' });
const invalidToken = jwt.sign({ email: 'noaccount@gmail.com', type: 'client', is_cashier: false, is_admin: false }, keys.SECRET_OR_KEY, { expiresIn: '1hr' });


describe('accounts', () => {
  it('Before testing accounts routes, user 1 should be signed up', (done) => {
    chai
      .request(server)
      .post('/api/v2/auth/signup')
      .send({
        first_name : 'Steve',
        last_name : 'Jobs',
        email : 'job@gmail.com',
        password : 'Password-1job'
          })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.be.equal(201);
        expect(res.body.message).to.be.equal('User account has been created successfully');
        expect(res.body.data).to.be.an('object');
        done();
      });
  });
});

describe('Accounts', () => {
  it('Before testing accounts routes, user 2 should be signed up', (done) => {
      chai
        .request(server)
        .post('/api/v2/auth/signup')
        .send({
          first_name : 'Adam',
          last_name : 'Apple',
          email : 'apple@gmail.com',
          password : 'Password-1app'
      })
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.body.status).to.be.equal(201);
          expect(res.body.message).to.be.equal('User account has been created successfully');
          expect(res.body.data).to.be.an('object');
          done();
        });
  });
});

let accountNumber1;
let accountNumber2;
describe('accounts', () => {
    describe('POST /api/v2/accounts', () => {
        it('should create a bank account for a signed in user', (done) => {
          chai
            .request(server)
            .post('/api/v2/accounts')
            .set('Authorization', `Bearer ${clientToken1}`)
            .send({type: 'current'})
            .end((err, res) => {
              expect(res.body).to.be.an('object');
              expect(res.body.status).to.deep.equal(201);
              expect(res.body.message).to.deep.equal('Your account has been created successfully');
              expect(res.body.data).to.be.an('object');
              accountNumber1 = res.body.data.accountNumber
              done();
            });
        });

        it('should create a bank account for a signed in user', (done) => {
          chai
            .request(server)
            .post('/api/v2/accounts')
            .set('Authorization', `Bearer ${clientToken2}`)
            .send({type: 'savings'})
            .end((err, res) => {
              expect(res.body).to.be.an('object');
              expect(res.body.status).to.deep.equal(201);
              expect(res.body.message).to.deep.equal('Your account has been created successfully');
              expect(res.body.data).to.be.an('object');
              accountNumber2 = res.body.data.accountNumber
              done();
            });
        });

        it('should not create a bank account for a signed in user if the type of account is not specified', (done) => {
          chai
            .request(server)
            .post('/api/v2/accounts')
            .set('Authorization', `Bearer ${clientToken1}`)
            .send({type: ''})
            .end((err, res) => {
              expect(res.body).to.be.an('object');
              expect(res.body.status).to.deep.equal(400);
              expect(res.body.message).to.deep.equal('"type" is not allowed to be empty');
              done();
            });
        });

        it('should not create a bank account for a user without a user account', (done) => {
          chai
            .request(server)
            .post('/api/v2/accounts')
            .set('Authorization', `Bearer ${invalidToken}`)
            .send({type: 'savings'})
            .end((err, res) => {
              expect(res.body).to.be.an('object');
              expect(res.body.status).to.deep.equal(404);
              expect(res.body.message).to.deep.equal('Sorry, you can only create a bank account if you are a user');
              done();
            });
        });
    });
    
    describe('GET /api/v2/accounts/:accountNumber', () => {
        it('should allow a user to view all accounts they own', (done) => {
        chai
            .request(server)
            .get(`/api/v2/accounts/${accountNumber1}`)
            .set('Authorization', `Bearer ${clientToken1}`)
            .end((err, res) => {
            expect(res.body).to.be.an('object');
            expect(res.body.status).to.deep.equal(200);
            expect(res.body.message).to.deep.equal(`Account with number ${accountNumber1} has been fetched successfully`);
            done();
            });
        });

        it('should not allow a user to view an accounts if the account number inputed is a string', (done) => {
        chai
            .request(server)
            .get('/api/v2/accounts/two')
            .set('Authorization', `Bearer ${clientToken1}`)
            .end((err, res) => {
            expect(res.body).to.be.an('object');
            expect(res.body.status).to.deep.equal(400);
            expect(res.body.message).to.deep.equal('"account_number" must be a number');
            done();
            });
        });

        it('should not allow a user to view details of accounts they do not own', (done) => {
        chai
            .request(server)
            .get(`/api/v2/accounts/${accountNumber2}`)
            .set('Authorization', `Bearer ${clientToken1}`)
            .end((err, res) => {
            expect(res.body).to.be.an('object');
            expect(res.body.status).to.deep.equal(403);
            expect(res.body.message).to.deep.equal('You can only view details of accounts you own');
            done();
            });
        });

        it('should not allow a user to view details of accounts that do not exist', (done) => {
        chai
            .request(server)
            .get('/api/v2/accounts/2022123')
            .set('Authorization', `Bearer ${clientToken1}`)
            .end((err, res) => {
            expect(res.body).to.be.an('object');
            expect(res.body.status).to.deep.equal(404);
            expect(res.body.message).to.deep.equal('Account with number 2022123 does not exist');
            done();
            });
        });
       
    });

    describe('GET /api/v2/user/:email/accounts', () => {
        it('should allow an admin to view all bank accounts of a particular user', (done) => {
        chai
            .request(server)
            .get(`/api/v2/user/job@gmail.com/accounts`)
            .set('Authorization', `Bearer ${adminToken}`)
            .end((err, res) => {
            expect(res.body).to.be.an('object');
            expect(res.body.data).to.be.an('object');
            expect(res.body.status).to.deep.equal(200);
            expect(res.body.message).to.deep.equal('Bank account(s) for user with email job@gmail.com has(have) been retrieved successfully');
            done();
            });
        });

        it('should allow an unauthorised user to view all bank accounts of a particular user', (done) => {
        chai
            .request(server)
            .get(`/api/v2/user/job@gmail.com/accounts`)
            .set('Authorization', `Bearer ${clientToken1}`)
            .end((err, res) => {
            expect(res.body).to.be.an('object');
            expect(res.body.status).to.deep.equal(401);
            expect(res.body.message).to.deep.equal('You are not authorized');
            done();
            });
        });

        it('should deny an invalid user from viewing all bank accounts of a particular user', (done) => {
        chai
            .request(server)
            .get(`/api/v2/user/job@gmail.com/accounts`)
            .set('Authorization', `Bearer ${invalidToken}`)
            .end((err, res) => {
            expect(res.body).to.be.an('object');
            expect(res.body.status).to.deep.equal(401);
            expect(res.body.message).to.deep.equal('You are not authorized');
            done();
            });
        });
       
    });
    
    describe('PATCH /api/v2/accounts/:accountNumber', () => {
      
      it('should not allow an unauthorized user to activate an account', (done) => {
        chai
          .request(server)
          .patch(`/api/v2/accounts/${accountNumber1}`)
          .set('Authorization', `Bearer ${clientToken1}`)
          .send({status: 'active'})
          .end((err, res) => {
            expect(res.body).to.be.an('object');
            expect(res.body.status).to.deep.equal(401);
            expect(res.body.message).to.deep.equal('You are not authorized');
            done();
          });
      });

        it('should allow a user with administrator privilages to activate an account', (done) => {
          chai
            .request(server)
            .patch(`/api/v2/accounts/${accountNumber1}`)
            .set('Authorization', `Bearer ${adminToken}`)
            .send({status: 'active'})
            .end((err, res) => {
              expect(res.body).to.be.an('object');
              expect(res.body.status).to.deep.equal(200);
              expect(res.body.message).to.deep.equal(`Account with number ${accountNumber1} has been made active`);
              expect(res.body.data.status).to.deep.equal('active');
              expect(res.body.data).to.be.an('object');
              done();
            });
        });

        it('should not allow a user with administrator privilages to activate an account if status is not specified', (done) => {
          chai
            .request(server)
            .patch(`/api/v2/accounts/${accountNumber1}`)
            .set('Authorization', `Bearer ${adminToken}`)
            .send({status: ''})
            .end((err, res) => {
              expect(res.body).to.be.an('object');
              expect(res.body.status).to.deep.equal(400);
              expect(res.body.message).to.deep.equal('"status" is not allowed to be empty');
              done();
            });
        }); 
    });

    describe('DELETE /api/v2/accounts/:accountNumber', () => {
        it('should not allow an unauthorized user to delete an account', (done) => {
            chai
                .request(server)
                .delete(`/api/v2/accounts/${accountNumber2}`)
                .set('Authorization', `Bearer ${clientToken1}`)
                .end((err, res) => {
                expect(res.body).to.be.an('object');
                expect(res.body.status).to.deep.equal(401);
                expect(res.body.message).to.deep.equal('You are not authorized');
                done();
                });
            });
          
        it('should allow a user with administrator privilages to delete an account', (done) => {
          chai
            .request(server)
            .delete(`/api/v2/accounts/${accountNumber2}`)
            .set('Authorization', `Bearer ${adminToken}`)
            .end((err, res) => {
              expect(res.body).to.be.an('object');
              expect(res.body.status).to.deep.equal(200);
              expect(res.body.message).to.deep.equal(`Account with number: ${accountNumber2} has been deleted`);
              done();
            });
        });

        it('should not allow a user with administrator privilages to delete an account if the account does not exist', (done) => {
          chai
            .request(server)
            .delete(`/api/v2/accounts/${accountNumber2}`)
            .set('Authorization', `Bearer ${adminToken}`)
            .end((err, res) => {
              expect(res.body).to.be.an('object');
              expect(res.body.status).to.deep.equal(404);
              expect(res.body.message).to.deep.equal(`Account with number: ${accountNumber2} does not exist`);
              done();
            });
        });
       
    });
    
});