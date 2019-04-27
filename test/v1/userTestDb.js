import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server/server';
import jwt from 'jsonwebtoken';
import keys from '../../server/config/keys';



chai.use(chaiHttp);
const token = jwt.sign({ email: 'adafia@gmail.com', type: 'staff' , is_cashier: false, is_admin: true }, keys.SECRET_OR_KEY, { expiresIn: '1hr' });
const invalidToken = jwt.sign({ email: 'noaccount@gmail.com', type: 'client', is_cashier: false, is_admin: false }, keys.SECRET_OR_KEY, { expiresIn: '1hr' });
const unAuthToken = jwt.sign({ email: 'job@gmail.com', type: 'client' , is_cashier: false, is_admin: false}, keys.SECRET_OR_KEY, { expiresIn: '1hr' });

describe('users', () => {
    describe('POST /auth/signup', () => {
        it('should not create duplicate users', (done) => {
            chai.request(server)
                .post('/api/v2/auth/signup')
                .send({
                    first_name : 'Steve',
                    last_name : 'Jobs',
                    email : 'job@gmail.com',
                    password : 'Password-1job'
                })
                .end((err, res) => {
                    expect(res.body).to.be.an('object');
                    expect(res.body.status).to.be.equal(409);
                    expect(res.body.message).to.be.equal('Sorry email: job@gmail.com is already in use');
                    done();
                });
        });

        it('should not create a users with an invalid first name input', (done) => {
            chai.request(server)
                .post('/api/v2/auth/signup')
                .send({
                    first_name : 567,
                    last_name : 'Jobs',
                    email : 'job@gmail.com',
                    password : 'Password-1job'
                })
                .end((err, res) => {
                    expect(res.body).to.be.an('object');
                    expect(res.body.status).to.be.equal(400);
                    expect(res.body.message).to.be.equal('\"first_name\" must be a string');
                    done();
                });
        });

        it('should not create a user with an invalid last name input', (done) => {
            chai.request(server)
                .post('/api/v2/auth/signup')
                .send({
                    first_name : 'Steven',
                    last_name : 453,
                    email : 'job@gmail.com',
                    password : 'Password-1job'
                })
                .end((err, res) => {
                    expect(res.body).to.be.an('object');
                    expect(res.body.status).to.be.equal(400);
                    expect(res.body.message).to.be.equal('\"last_name\" must be a string');
                    done();
                });
        });

        it('should not create a users with an invalid email input', (done) => {
            chai.request(server)
                .post('/api/v2/auth/signup')
                .send({
                    first_name : 'Steven',
                    last_name : 'Jobs',
                    email : 'jobail.com',
                    password : 'Password-1job'
                })
                .end((err, res) => {
                    expect(res.body).to.be.an('object');
                    expect(res.body.status).to.be.equal(400);
                    expect(res.body.message).to.be.equal('"email" must be a valid email');
                    done();
                });
        });

        it('should not create a users with an invalid password input', (done) => {
            chai.request(server)
                .post('/api/v2/auth/signup')
                .send({
                    first_name : 'Steven',
                    last_name : 'Jobs',
                    email : 'job@gmail.com',
                    password : 'assword-1job'
                })
                .end((err, res) => {
                    expect(res.body).to.be.an('object');
                    expect(res.body.status).to.be.equal(400);
                    expect(res.body.message).to.be.equal('Your password is required and it should have at least one upper case English letter, one lower case English letter, one digit, one special character and a Minimum eight characters');
                    done();
                });
        });

        it('should not create a users with a required field empty', (done) => {
            chai.request(server)
                .post('/api/v2/auth/signup')
                .send({
                    first_name : '',
                    last_name : 'Jobs',
                    email : 'job@gmail.com',
                    password : 'Password-1job',
                })
                .end((err, res) => {
                    expect(res.body).to.be.an('object');
                    expect(res.body.status).to.be.equal(400);
                    expect(res.body.message).to.deep.equal('"first_name" is not allowed to be empty');
                    done();
                });
        });

    });

    describe('POST /auth/signin', () => {
        it('Should login a user', (done) => {
            chai
              .request(server)
              .post('/api/v2/auth/signin')
              .send({email:'adafia@gmail.com', password: 'Password-1234'})
              .end((err, res) => {
                expect(res.body).to.be.an('object');
                expect(res.body.status).to.equal(200);
                expect(res.body.message).to.be.a('string');
                expect(res.body.data).to.be.an('object');
                expect(res.body.message).to.deep.equal('You have logged in successfully')
                done();
              });
        })

        it('Should not login a user if the password does not match', (done) => {
            chai
              .request(server)
              .post('/api/v2/auth/signin')
              .send({email:'adafia@gmail.com', password: 'Password-1734'})
              .end((err, res) => {
                expect(res.body).to.be.an('object');
                expect(res.body.status).to.equal(403);
                expect(res.body.message).to.be.a('string');
                expect(res.body.message).to.deep.equal('Invalid password')
                done();
              });
        })

        it('Should not login a user that does not have an account', (done) => {
            chai
              .request(server)
              .post('/api/v2/auth/signin')
              .send({email:'noaccount@gmail.com', password: 'Noword-12no'})
              .end((err, res) => {
                expect(res.body).to.be.an('object');
                expect(res.body.status).to.equal(403);
                expect(res.body.message).to.be.a('string');
                expect(res.body.message).to.deep.equal('Sorry you do not have an account, please sign up');
                done();
              });
        })
 
    })

    describe('POST /admin', () => {
        it('Should allow an admin to create a user', (done) => {
            chai
              .request(server)
              .post('/api/v2/admin')
              .set('Authorization', `Bearer ${token}`)
              .send({
                first_name : 'Ama',
                last_name : 'Leko',
                email : 'ama@mail.com',
                password : 'Password-4321',
                type: 'staff',
                is_cashier: true,
                is_admin: false
            })
              .end((err, res) => {
                expect(res.body).to.be.an('object');
                expect(res.body.status).to.equal(201);
                expect(res.body.message).to.be.a('string');
                expect(res.body.data).to.be.an('object');
                expect(res.body.message).to.deep.equal('staff account has been created successfully')
                expect(res.body.data.firstName).to.deep.equal('Ama')
                done();
              });
        })

        it('Should not allow an admin to create a duplicate user', (done) => {
            chai
              .request(server)
              .post('/api/v2/admin')
              .set('Authorization', `Bearer ${token}`)
              .send({
                first_name : 'Ama',
                last_name : 'Leko',
                email : 'ama@mail.com',
                password : 'Password-4321',
                type: 'staff',
                is_cashier: true,
                is_admin: false
            })
              .end((err, res) => {
                expect(res.body).to.be.an('object');
                expect(res.body.status).to.equal(409);
                expect(res.body.message).to.be.a('string');
                expect(res.body.message).to.deep.equal('Sorry email: ama@mail.com is already in use')
                done();
              });
        })

        it('Should not allow an admin to create a user if input values are invalid', (done) => {
            chai
              .request(server)
              .post('/api/v2/admin')
              .set('Authorization', `Bearer ${token}`)
              .send({
                first_name : 'Ama',
                last_name : 'Leko',
                email : 'amamail.com',
                password : 'Password-4321',
                type: 'staff',
                is_cashier: true,
                is_admin: false
            })
              .end((err, res) => {
                expect(res.body).to.be.an('object');
                expect(res.body.status).to.equal(400);
                expect(res.body.message).to.be.a('string');
                expect(res.body.message).to.deep.equal('"email" must be a valid email')
                done();
              });
        })

        it('Should not allow a user who is not an admin to create another account', (done) => {
            chai
              .request(server)
              .post('/api/v2/admin')
              .set('Authorization', `Bearer ${unAuthToken}`)
              .send({
                first_name : 'Ama',
                last_name : 'Leko',
                email : 'ama@mail.com',
                password : 'Password-4321',
                type: 'staff',
                is_cashier: true,
                is_admin: false
            })
              .end((err, res) => {
                expect(res.body).to.be.an('object');
                expect(res.body.status).to.equal(401);
                expect(res.body.message).to.be.a('string');
                expect(res.body.message).to.deep.equal('You are not authorized');
                done();
              });
        })
 
    })
    
});