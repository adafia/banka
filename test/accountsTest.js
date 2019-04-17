import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server/server';
import accounts from '../server/models/Account'

chai.use(chaiHttp);
chai.should();

describe('accounts', () => {
    describe('GET /accounts', () => {
        it('should get all bank accounts', (done) => {
            chai.request(server)
                .get('/api/v1/accounts')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });

    describe('POST /accounts', () => {
        it('should create an account for a user', (done) => {
            const newAccount = {
                id : accounts.length + 1,
                accountNumber : Math.floor(Math.random() * 10000000000),
                createdOn : new Date(),
                owner : '',
                firstName : 'Mark',
                lastName : 'Brown',
                email : 'mark@gmail.com',
                type : 'current',
                status : 'draft',
                balance : 0.0 
            }
            chai.request(server)
                .post('/api/v1/accounts')
                .send(newAccount)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('should not create an account for a user if the first name field is empty', (done) => {
            const newAccount = {
                id : accounts.length + 1,
                accountNumber : Math.floor(Math.random() * 10000000000),
                createdOn : new Date(),
                owner : '',
                firstName : '',
                lastName : 'Brown',
                email : 'mark@gmail.com',
                type : 'current',
                status : 'draft',
                balance : 0.0 
            }
            chai.request(server)
                .post('/api/v1/accounts')
                .send(newAccount)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('should not create an account for a user if the last name field is empty', (done) => {
            const newAccount = {
                id : accounts.length + 1,
                accountNumber : Math.floor(Math.random() * 10000000000),
                createdOn : new Date(),
                owner : '',
                firstName : 'Mark',
                lastName : '',
                email : 'mark@gmail.com',
                type : 'current',
                status : 'draft',
                balance : 0.0 
            }
            chai.request(server)
                .post('/api/v1/accounts')
                .send(newAccount)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('should not create an account for a user if the email field is empty', (done) => {
            const newAccount = {
                id : accounts.length + 1,
                accountNumber : Math.floor(Math.random() * 10000000000),
                createdOn : new Date(),
                owner : '',
                firstName : 'Mark',
                lastName : 'Brown',
                email : '',
                type : 'current',
                status : 'draft',
                balance : 0.0 
            }
            chai.request(server)
                .post('/api/v1/accounts')
                .send(newAccount)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('should not create an account for a user if the account type field is empty', (done) => {
            const newAccount = {
                id : accounts.length + 1,
                accountNumber : Math.floor(Math.random() * 10000000000),
                createdOn : new Date(),
                owner : '',
                firstName : 'Mark',
                lastName : 'Brown',
                email : 'mark@gmail.com',
                type : '',
                status : 'draft',
                balance : 0.0 
            }
            chai.request(server)
                .post('/api/v1/accounts')
                .send(newAccount)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('should not create an account for a user if the firstname provided is of type number', (done) => {
            const newAccount = {
                id : accounts.length + 1,
                accountNumber : Math.floor(Math.random() * 10000000000),
                createdOn : new Date(),
                owner : '',
                firstName : 1123,
                lastName : 'Brown',
                email : 'mark@gmail.com',
                type : 'current',
                status : 'draft',
                balance : 0.0 
            }
            chai.request(server)
                .post('/api/v1/accounts')
                .send(newAccount)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('should not create an account for a user if the lastname provided is of type number', (done) => {
            const newAccount = {
                id : accounts.length + 1,
                accountNumber : Math.floor(Math.random() * 10000000000),
                createdOn : new Date(),
                owner : '',
                firstName : 'Mark',
                lastName : 1234,
                email : 'mark@gmail.com',
                type : 'current',
                status : 'draft',
                balance : 0.0 
            }
            chai.request(server)
                .post('/api/v1/accounts')
                .send(newAccount)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('should not create an account for a user if the account type provided is of type number', (done) => {
            const newAccount = {
                id : accounts.length + 1,
                accountNumber : Math.floor(Math.random() * 10000000000),
                createdOn : new Date(),
                owner : '',
                firstName : 'Mark',
                lastName : 'Brown',
                email : 'mark@gmail.com',
                type : 12453,
                status : 'draft',
                balance : 0.0 
            }
            chai.request(server)
                .post('/api/v1/accounts')
                .send(newAccount)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('should not create an account for a user if the email provided does not follow the standard email format', (done) => {
            const newAccount = {
                id : accounts.length + 1,
                accountNumber : Math.floor(Math.random() * 10000000000),
                createdOn : new Date(),
                owner : '',
                firstName : 'Mark',
                lastName : 'Brown',
                email : 'markgmailcom',
                type : 'current',
                status : 'draft',
                balance : 0.0 
            }
            chai.request(server)
                .post('/api/v1/accounts')
                .send(newAccount)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('should not create an account for a client if the client does not have a user account', (done) => {
            const newAccount = {
                id : accounts.length + 1,
                accountNumber : Math.floor(Math.random() * 10000000000),
                createdOn : new Date(),
                owner : '',
                firstName : 'Jac',
                lastName : 'Nija',
                email : 'nija@gmail.com',
                type : 'current',
                status : 'draft',
                balance : 0.0 
            }
            chai.request(server)
                .post('/api/v1/accounts')
                .send(newAccount)
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('should not create an account for a client if the account type is neither current or savings', (done) => {
            const newAccount = {
                id : accounts.length + 1,
                accountNumber : Math.floor(Math.random() * 10000000000),
                createdOn : new Date(),
                owner : '',
                firstName : 'Mark',
                lastName : 'Brown',
                email : 'mark@gmail.com',
                type : 'susu',
                status : 'draft',
                balance : 0.0 
            }
            chai.request(server)
                .post('/api/v1/accounts')
                .send(newAccount)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });

    describe('PATCH /accounts/:accountNumber', () => {
        it('should activate a bank account', (done) => {
            const updAccount = {
                email : 'snow@gmail.com',
                password : 'Password-789',
                status : 'active' 
            }
            chai.request(server)
                .patch('/api/v1/accounts/1985253383')
                .send(updAccount)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('should deactivate a bank account', (done) => {
            const updAccount = {
                email : 'snow@gmail.com',
                password : 'Password-789',
                status : 'dormant' 
            }
            chai.request(server)
                .patch('/api/v1/accounts/1985253379')
                .send(updAccount)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('should neither activate nor deactivate a bank account if the email field empty', (done) => {
            const updAccount = {
                email : '',
                password : 'Password-789',
                status : 'dormant' 
            }
            chai.request(server)
                .patch('/api/v1/accounts/1985253379')
                .send(updAccount)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('should neither activate nor deactivate a bank account if password field empty', (done) => {
            const updAccount = {
                email : 'snow@gmail.com',
                password : '',
                status : 'dormant' 
            }
            chai.request(server)
                .patch('/api/v1/accounts/1985253379')
                .send(updAccount)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('should neither activate nor deactivate a bank account if the email provided is a number', (done) => {
            const updAccount = {
                email : 123,
                password : 'Password-789',
                status : 'dormant' 
            }
            chai.request(server)
                .patch('/api/v1/accounts/1985253379')
                .send(updAccount)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('should neither activate nor deactivate a bank account if the password provided is a number', (done) => {
            const updAccount = {
                email : 'snow@gmail.com',
                password : 4245,
                status : 'dormant' 
            }
            chai.request(server)
                .patch('/api/v1/accounts/1985253379')
                .send(updAccount)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('should neither activate nor deactivate a bank account if the password provided does not follow the right password format', (done) => {
            const updAccount = {
                email : 'snow@gmail.com',
                password : 'password789',
                status : 'dormant' 
            }
            chai.request(server)
                .patch('/api/v1/accounts/1985253379')
                .send(updAccount)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('should neither activate nor deactivate a bank account if the email provided does not follow the right email format', (done) => {
            const updAccount = {
                email : 'snowgmailcom',
                password : 'Password-789',
                status : 'dormant' 
            }
            chai.request(server)
                .patch('/api/v1/accounts/1985253379')
                .send(updAccount)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('should neither activate nor deactivate a bank account if the consummator of the activity is not authorized', (done) => {
            const updAccount = {
                email : 'mark@gmail.com',
                password : 'Password-456',
                status : 'dormant' 
            }
            chai.request(server)
                .patch('/api/v1/accounts/1985253379')
                .send(updAccount)
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('should neither activate nor deactivate a bank account if the status provided is not dormant or active', (done) => {
            const updAccount = {
                email : 'snow@gmail.com',
                password : 'Password-789',
                status : 'somthing else' 
            }
            chai.request(server)
                .patch('/api/v1/accounts/1985253379')
                .send(updAccount)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('should neither activate nor deactivate a bank account if the account number provided does not exist', (done) => {
            const updAccount = {
                email : 'snow@gmail.com',
                password : 'Password-789',
                status : 'active' 
            }
            chai.request(server)
                .patch('/api/v1/accounts/1985253379111')
                .send(updAccount)
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });

    describe('DELETE /accounts/:accountNumber', () => {
        it('should delete a bank account', (done) => {
            const userDetails = {
                email : 'snow@gmail.com',
                password : 'Password-789',
            }
            chai.request(server)
                .delete('/api/v1/accounts/1985253383')
                .send(userDetails)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('should not delete a bank account if the email field is empty', (done) => {
            const userDetails = {
                email : '',
                password : 'Password-789',
            }
            chai.request(server)
                .delete('/api/v1/accounts/1985253383')
                .send(userDetails)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('should not delete a bank account if the password field is empty', (done) => {
            const userDetails = {
                email : 'snow@gmail.com',
                password : '',
            }
            chai.request(server)
                .delete('/api/v1/accounts/1985253383')
                .send(userDetails)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('should not delete a bank account if the email provided does not follow the standard email format', (done) => {
            const userDetails = {
                email : 'snowgmailcom',
                password : 'Password-789',
            }
            chai.request(server)
                .delete('/api/v1/accounts/1985253383')
                .send(userDetails)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('should not delete a bank account if the password provided does not follow the standard format', (done) => {
            const userDetails = {
                email : 'snow@gmail.com',
                password : 'password789',
            }
            chai.request(server)
                .delete('/api/v1/accounts/1985253383')
                .send(userDetails)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('should not delete a bank account if any of the bank account provided does not exist', (done) => {
            const userDetails = {
                email : 'snow@gmail.com',
                password : 'Password-789',
            }
            chai.request(server)
                .delete('/api/v1/accounts/1985253383111')
                .send(userDetails)
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('should not delete a bank account if any of the the consummator of the activity is not authorized', (done) => {
            const userDetails = {
                email : 'mark@gmail.com',
                password : 'Password-456',
            }
            chai.request(server)
                .delete('/api/v1/accounts/1985253383')
                .send(userDetails)
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });
});