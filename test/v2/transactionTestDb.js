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

    

});