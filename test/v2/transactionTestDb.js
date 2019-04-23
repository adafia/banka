import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server/server';

chai.use(chaiHttp);
chai.should();



describe('accounts', () => {
    
    describe('GET /transactions', () => {
        it('should get all bank transactions', (done) => {
            chai.request(server)
                .get('/api/v2/transactions')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });

    });

    describe('POST /transactions/:accountNumber/debit', () => {
        it('should allow an admin to debit a bank account', (done) => {
            const staff = {
                    email: 'adafia@gmail.com',
                    password: 'Password-1234',
                    amount: 10
                }
            chai.request(server)
                .post('/api/v2/transactions/3/debit')
                .send(staff)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('should not allow an admin to debit a bank account if input provided does not pass Joi validation', (done) => {
            const staff = {
                    email: 'adafiagmail.com',
                    password: 'Password-1234',
                    amount: 10
                }
            chai.request(server)
                .post('/api/v2/transactions/2/debit')
                .send(staff)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('should not allow an admin to debit a bank account if the account number does not exist', (done) => {
            const staff = {
                    email: 'adafia@gmail.com',
                    password: 'Password-1234',
                    amount: 10
                }
            chai.request(server)
                .post('/api/v2/transactions/2017/debit')
                .send(staff)
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('should not allow an admin to debit a bank account if the funds are insufficient', (done) => {
            const staff = {
                    email: 'adafia@gmail.com',
                    password: 'Password-1234',
                    amount: 10000
                }
            chai.request(server)
                .post('/api/v2/transactions/2/debit')
                .send(staff)
                .end((err, res) => {
                    res.should.have.status(405);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('should not allow an admin to debit a bank account if the password is invalid', (done) => {
            const staff = {
                    email: 'adafia@gmail.com',
                    password: 'Password-1434',
                    amount: 10
                }
            chai.request(server)
                .post('/api/v2/transactions/2/debit')
                .send(staff)
                .end((err, res) => {
                    res.should.have.status(403);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('should not debit a bank account if the user is not authorized', (done) => {
            const staff = {
                    email: 'mark@gmail.com',
                    password: 'Passwor-1mark',
                    amount: 10
                }
            chai.request(server)
                .post('/api/v2/transactions/2/debit')
                .send(staff)
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.be.a('object');
                    done();
                });
        });

    });

    describe('POST /transactions/:accountNumber/credit', () => {
        it('should allow an admin to credit a bank account', (done) => {
            const staff = {
                    email: 'adafia@gmail.com',
                    password: 'Password-1234',
                    amount: 1000
                }
            chai.request(server)
                .post('/api/v2/transactions/2/credit')
                .send(staff)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('should not allow an admin to credit a bank account if input provided does not pass Joi validation', (done) => {
            const staff = {
                    email: 'adafiagmail.com',
                    password: 'Password-1234',
                    amount: 1000
                }
            chai.request(server)
                .post('/api/v2/transactions/1/credit')
                .send(staff)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('should not allow an admin to credit a bank account if the account number does not exist', (done) => {
            const staff = {
                    email: 'adafia@gmail.com',
                    password: 'Password-1234',
                    amount: 1000
                }
            chai.request(server)
                .post('/api/v2/transactions/2017/credit')
                .send(staff)
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('should not allow an admin to credit a bank account if the password is invalid', (done) => {
            const staff = {
                    email: 'adafia@gmail.com',
                    password: 'Password-1434',
                    amount: 10
                }
            chai.request(server)
                .post('/api/v2/transactions/2/credit')
                .send(staff)
                .end((err, res) => {
                    res.should.have.status(403);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('should not credit a bank account if the user is not authorized', (done) => {
            const staff = {
                    email: 'mark@gmail.com',
                    password: 'Passwor-1mark',
                    amount: 10
                }
            chai.request(server)
                .post('/api/v2/transactions/2/credit')
                .send(staff)
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.be.a('object');
                    done();
                });
        });

    });

    describe('GET /accounts/:accountNumber/transactions', () => {
        it('should get all bank transactions for a specific user', (done) => {
            const userDetails = {
                email : 'mark@gmail.com',
                password : 'Passwor-1mark'
            }
            chai.request(server)
                .get('/api/v2/accounts/1/transactions')
                .send(userDetails)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('should not get all bank transactions for a specific user if the user input does not pass Joi validation', (done) => {
            const userDetails = {
                email : 'markgmail.com',
                password : 'Passwor-1mark'
            }
            chai.request(server)
                .get('/api/v2/accounts/1/transactions')
                .send(userDetails)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('should not get all bank transactions for a specific user if the account number provided is not a number', (done) => {
            const userDetails = {
                email : 'mark@gmail.com',
                password : 'Passwor-1mark'
            }
            chai.request(server)
                .get('/api/v2/accounts/trtyt/transactions')
                .send(userDetails)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('should not get all bank transactions for a specific user if there has not been any transactions involving the account number provided', (done) => {
            const userDetails = {
                email : 'mark@gmail.com',
                password : 'Passwor-1mark'
            }
            chai.request(server)
                .get('/api/v2/accounts/6/transactions')
                .send(userDetails)
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('should not get all bank transactions for a specific user if the account number provided does not exist', (done) => {
            const userDetails = {
                email : 'mark@gmail.com',
                password : 'Passwor-1mark'
            }
            chai.request(server)
                .get('/api/v2/accounts/602/transactions')
                .send(userDetails)
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('should not get all bank transactions for a specific user if the user does not have an account', (done) => {
            const userDetails = {
                email : 'adam@gmail.com',
                password : 'Passwor-1mark'
            }
            chai.request(server)
                .get('/api/v2/accounts/602/transactions')
                .send(userDetails)
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('should not get all bank transactions for a specific user if the user is not the owner of the account', (done) => {
            const userDetails = {
                email : 'adafia@gmail.com',
                password : 'Password-1234'
            }
            chai.request(server)
                .get('/api/v2/accounts/1/transactions')
                .send(userDetails)
                .end((err, res) => {
                    res.should.have.status(403);
                    res.body.should.be.a('object');
                    done();
                });
        });

    });

    describe('GET /transactions/:id', () => {
        it('should get a specific transaction by id upon request from the owner of the account', (done) => {
            const userDetails = {
                email : 'mark@gmail.com',
                password : 'Passwor-1mark'
            }
            chai.request(server)
                .get('/api/v2/transactions/8')
                .send(userDetails)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('should not get a specific transaction if the id does not exist', (done) => {
            const userDetails = {
                email : 'mark@gmail.com',
                password : 'Passwor-1mark'
            }
            chai.request(server)
                .get('/api/v2/transactions/10097')
                .send(userDetails)
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('should not get a specific transaction if the client does not have a user account', (done) => {
            const userDetails = {
                email : 'mar@gmail.com',
                password : 'Passwor-1mark'
            }
            chai.request(server)
                .get('/api/v2/transactions/10097')
                .send(userDetails)
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('should not get a specific transaction if the user is not the owner of the account', (done) => {
            const userDetails = {
                email : 'mark@gmail.com',
                password : 'Passwor-1mark'
            }
            chai.request(server)
                .get('/api/v2/transactions/11')
                .send(userDetails)
                .end((err, res) => {
                    res.should.have.status(403);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('should not get a specific transaction if the user input does not pass the Joi validation', (done) => {
            const userDetails = {
                email : 'markgmail.com',
                password : 'Passwor-1mark'
            }
            chai.request(server)
                .get('/api/v2/transactions/11')
                .send(userDetails)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
        });

    });

    

});