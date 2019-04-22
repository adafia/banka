import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server/server';

chai.use(chaiHttp);
chai.should();


describe('accounts', () => {
    
    describe('GET /accounts', () => {
        it('should get all bank accounts', (done) => {
            chai.request(server)
                .get('/api/v2/accounts')
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
                createdOn : Date.now(),
                first_name : 'Mark',
                last_name : 'Brown',
                email : 'mark@gmail.com',
                type : 'current',
                status : 'draft',
                balance : 0.0 
            }
            chai.request(server)
                .post('/api/v2/accounts')
                .send(newAccount)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('should not create an account for a user if any of the fields do not pass the Joi validation schema', (done) => {
            const newAccount = {
                createdOn : Date.now(),
                first_name : 'Mark',
                last_name : 'Brown',
                email : 'markgmail.com',
                type : 'current',
                status : 'draft',
                balance : 0.0 
            }
            chai.request(server)
                .post('/api/v2/accounts')
                .send(newAccount)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('should not create a bank account for a user if the user does not have a user account', (done) => {
            const newAccount = {
                createdOn : Date.now(),
                first_name : 'Otis',
                last_name : 'Kwak',
                email : 'otis@gmail.com',
                type : 'current',
                status : 'draft',
                balance : 0.0 
            }
            chai.request(server)
                .post('/api/v2/accounts')
                .send(newAccount)
                .end((err, res) => {
                    res.should.have.status(403);
                    res.body.should.be.a('object');
                    done();
                });
        });

    });

    describe('PATCH /accounts', () => {
        it('should allow an admin to update a bank account', (done) => {
            const staff = {
                email: 'adafia@gmail.com',
                password: 'Password-1234',
                status: 'active'
            }
            chai.request(server)
                .patch('/api/v2/accounts/1')
                .send(staff)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
        
        it('should not allow an admin to update a bank account if the input provided does not pass Joi validation', (done) => {
            const staff = {
                email: 'adafiagmail.com',
                password: 'Password-1234',
                status: 'active'
            }
            chai.request(server)
                .patch('/api/v2/accounts/1')
                .send(staff)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('should not update a bank account if the user is not an admin', (done) => {
            const staff = {
                email: 'mark@gmail.com',
                password: 'Passwor-1mark',
                status: 'active'
            }
            chai.request(server)
                .patch('/api/v2/accounts/1')
                .send(staff)
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('should not update a bank account if the password provided is not valid', (done) => {
            const staff = {
                email: 'adafia@gmail.com',
                password: 'Passwor-1mark',
                status: 'active'
            }
            chai.request(server)
                .patch('/api/v2/accounts/1')
                .send(staff)
                .end((err, res) => {
                    res.should.have.status(403);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('should not update a bank account if account number does not exist', (done) => {
            const staff = {
                email: 'adafia@gmail.com',
                password: 'Password-1234',
                status: 'active'
            }
            chai.request(server)
                .patch('/api/v2/accounts/1190')
                .send(staff)
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a('object');
                    done();
                });
        });

    });

    describe('DELETE /accounts', () => {
        it('should allow an admin to delete a bank account', (done) => {
            const staff = {
                email: 'adafia@gmail.com',
                password: 'Password-1234',
            }
            chai.request(server)
                .delete('/api/v2/accounts/1')
                .send(staff)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('should not allow an admin to delete a bank account if the account does not exist', (done) => {
            const staff = {
                email: 'adafia@gmail.com',
                password: 'Password-1234',
            }
            chai.request(server)
                .delete('/api/v2/accounts/190')
                .send(staff)
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('should not allow an admin to delete a bank account if the input provided does not pass joi validation', (done) => {
            const staff = {
                email: 'adafiagmail.com',
                password: 'Password-1234',
            }
            chai.request(server)
                .delete('/api/v2/accounts/2')
                .send(staff)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('should not allow an admin to delete a bank account if the password is invalid', (done) => {
            const staff = {
                email: 'adafia@gmail.com',
                password: 'Password-1434',
            }
            chai.request(server)
                .delete('/api/v2/accounts/2')
                .send(staff)
                .end((err, res) => {
                    res.should.have.status(403);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('should not delete a bank account if user is not authorized', (done) => {
            const staff = {
                email: 'mark@gmail.com',
                password: 'Passwor-1mark',
            }
            chai.request(server)
                .delete('/api/v2/accounts/2')
                .send(staff)
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.be.a('object');
                    done();
                });
        });

    });

});