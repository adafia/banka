import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server/server';
import transactions from '../../server/models/v1/Transactions'

chai.use(chaiHttp);
chai.should();

describe('transactions', () => {
    describe('GET /transactions', () => {
        it('should get all bank transactions', (done) => {
            chai.request(server)
                .get('/api/v1/transactions')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });

    describe('POST /transactions/:accountNumber/credit', () => {
        it('should credit a bank account', (done) => {
            const newTransaction = {
                id : transactions.length + 1,
                createdOn : new Date(),
                cashier : 3, // cashier who consummated the transaction
                amount : 5000,
                newBalance : 0
            }
            chai.request(server)
                .post('/api/v1//transactions/8365373668/credit')
                .send(newTransaction)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('should not credit a bank account if the cashier id is not a number', (done) => {
            const newTransaction = {
                id : transactions.length + 1,
                createdOn : new Date(),
                cashier : 'three', // cashier who consummated the transaction
                amount : 5000,
                newBalance : 0
            }
            chai.request(server)
                .post('/api/v1//transactions/8365373668/credit')
                .send(newTransaction)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('should not credit a bank account if the amount is not a number', (done) => {
            const newTransaction = {
                id : transactions.length + 1,
                createdOn : new Date(),
                cashier : 3, // cashier who consummated the transaction
                amount : 'five thousand',
                newBalance : 0
            }
            chai.request(server)
                .post('/api/v1//transactions/8365373668/credit')
                .send(newTransaction)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('should not credit a bank account if the cashier id does exist', (done) => {
            const newTransaction = {
                id : transactions.length + 1,
                createdOn : new Date(),
                cashier : 20, // cashier who consummated the transaction
                amount : 5000,
                newBalance : 0
            }
            chai.request(server)
                .post('/api/v1//transactions/8365373668/credit')
                .send(newTransaction)
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('should not credit a bank account if the user is not authorized', (done) => {
            const newTransaction = {
                id : transactions.length + 1,
                createdOn : new Date(),
                cashier : 1, // cashier who consummated the transaction
                amount : 5000,
                newBalance : 0
            }
            chai.request(server)
                .post('/api/v1//transactions/8365373668/credit')
                .send(newTransaction)
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('should not credit a bank account number does not exist', (done) => {
            const newTransaction = {
                id : transactions.length + 1,
                createdOn : new Date(),
                cashier : 3, // cashier who consummated the transaction
                amount : 5000,
                newBalance : 0
            }
            chai.request(server)
                .post('/api/v1//transactions/8365373668111/credit')
                .send(newTransaction)
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a('object');
                    done();
                });
        });

    });

    describe('POST /transactions/:accountNumber/debit', () => {
        it('should debit a bank account', (done) => {
            const newTransaction = {
                id : transactions.length + 1,
                createdOn : new Date(),
                cashier : 3, // cashier who consummated the transaction
                amount : 5000,
                newBalance : 0
            }
            chai.request(server)
                .post('/api/v1//transactions/8365373668/debit')
                .send(newTransaction)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });


        it('should not debit a bank account if the cashier id is not a number', (done) => {
            const newTransaction = {
                id : transactions.length + 1,
                createdOn : new Date(),
                cashier : 'three', // cashier who consummated the transaction
                amount : 5000,
                newBalance : 0
            }
            chai.request(server)
                .post('/api/v1//transactions/8365373668/debit')
                .send(newTransaction)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('should not debit a bank account if the amount is not a number', (done) => {
            const newTransaction = {
                id : transactions.length + 1,
                createdOn : new Date(),
                cashier : 3, // cashier who consummated the transaction
                amount : 'five thousand',
                newBalance : 0
            }
            chai.request(server)
                .post('/api/v1//transactions/8365373668/debit')
                .send(newTransaction)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('should not debit a bank account if the cashier id does exist', (done) => {
            const newTransaction = {
                id : transactions.length + 1,
                createdOn : new Date(),
                cashier : 20, // cashier who consummated the transaction
                amount : 5000,
                newBalance : 0
            }
            chai.request(server)
                .post('/api/v1//transactions/8365373668/debit')
                .send(newTransaction)
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('should not debit a bank account if the user is not authorized', (done) => {
            const newTransaction = {
                id : transactions.length + 1,
                createdOn : new Date(),
                cashier : 1, // cashier who consummated the transaction
                amount : 5000,
                newBalance : 0
            }
            chai.request(server)
                .post('/api/v1//transactions/8365373668/debit')
                .send(newTransaction)
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('should not debit a bank account number does not exist', (done) => {
            const newTransaction = {
                id : transactions.length + 1,
                createdOn : new Date(),
                cashier : 3, // cashier who consummated the transaction
                amount : 5000,
                newBalance : 0
            }
            chai.request(server)
                .post('/api/v1//transactions/8365373668111/debit')
                .send(newTransaction)
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('should not debit a bank account if the account has in sufficient account', (done) => {
            const newTransaction = {
                id : transactions.length + 1,
                createdOn : new Date(),
                cashier : 3, // cashier who consummated the transaction
                amount : 5009900000,
                newBalance : 0
            }
            chai.request(server)
                .post('/api/v1//transactions/8365373668/debit')
                .send(newTransaction)
                .end((err, res) => {
                    res.should.have.status(405);
                    res.body.should.be.a('object');
                    done();
                });
        });

    });


});