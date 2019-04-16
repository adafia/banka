import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server/server';
import transactions from '../server/models/Transactions'

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

    describe('POST /transactions', () => {
        it('should credit a bank account', (done) => {
            const newTransaction = {
                id : transactions.length + 1,
                createdOn : new Date(),
                type : 'credit', // credit or debit
                accountNumber : 8365373668,
                cashier : 3, // cashier who consummated the transaction
                amount : 5000,
                newBalance : 0
            }
            chai.request(server)
                .post('/api/v1/transactions')
                .send(newTransaction)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('should debit a bank account', (done) => {
            const newTransaction = {
                id : transactions.length + 1,
                createdOn : new Date(),
                type : 'debit', // credit or debit
                accountNumber : 9364573798,
                cashier : 3, // cashier who consummated the transaction
                amount : 5000,
                newBalance : 0
            }
            chai.request(server)
                .post('/api/v1/transactions')
                .send(newTransaction)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('should neither debit or credit a bank account if the transaction type is not debit or credit', (done) => {
            const newTransaction = {
                id : transactions.length + 1,
                createdOn : new Date(),
                type : 'something else', // credit or debit
                accountNumber : 9364573798,
                cashier : 3, // cashier who consummated the transaction
                amount : 5000,
                newBalance : 0
            }
            chai.request(server)
                .post('/api/v1/transactions')
                .send(newTransaction)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('should neither debit or credit a bank account if the account number is not a number', (done) => {
            const newTransaction = {
                id : transactions.length + 1,
                createdOn : new Date(),
                type : 'credit', // credit or debit
                accountNumber : 'I am not a number',
                cashier : 3, // cashier who consummated the transaction
                amount : 5000,
                newBalance : 0
            }
            chai.request(server)
                .post('/api/v1/transactions')
                .send(newTransaction)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('should neither debit or credit a bank account if the cashier id is not a number', (done) => {
            const newTransaction = {
                id : transactions.length + 1,
                createdOn : new Date(),
                type : 'credit', // credit or debit
                accountNumber : 9364573798,
                cashier : 'not a number', // cashier who consummated the transaction
                amount : 5000,
                newBalance : 0
            }
            chai.request(server)
                .post('/api/v1/transactions')
                .send(newTransaction)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('should neither debit or credit a bank account if the amount is not a number', (done) => {
            const newTransaction = {
                id : transactions.length + 1,
                createdOn : new Date(),
                type : 'credit', // credit or debit
                accountNumber : 9364573798,
                cashier : 3, // cashier who consummated the transaction
                amount : 'not a number',
                newBalance : 0
            }
            chai.request(server)
                .post('/api/v1/transactions')
                .send(newTransaction)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('should neither debit or credit a bank account if the cashier id does not exist', (done) => {
            const newTransaction = {
                id : transactions.length + 1,
                createdOn : new Date(),
                type : 'credit', // credit or debit
                accountNumber : 9364573798,
                cashier : 8, // cashier who consummated the transaction
                amount : 5000,
                newBalance : 0
            }
            chai.request(server)
                .post('/api/v1/transactions')
                .send(newTransaction)
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('should neither debit or credit a bank account if the cashier id provided does not have and user type of staff', (done) => {
            const newTransaction = {
                id : transactions.length + 1,
                createdOn : new Date(),
                type : 'credit', // credit or debit
                accountNumber : 9364573798,
                cashier : 1, // cashier who consummated the transaction
                amount : 5000,
                newBalance : 0
            }
            chai.request(server)
                .post('/api/v1/transactions')
                .send(newTransaction)
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('should neither debit or credit a bank account if the account number does not exist', (done) => {
            const newTransaction = {
                id : transactions.length + 1,
                createdOn : new Date(),
                type : 'credit', // credit or debit
                accountNumber : 9364573791118,
                cashier : 3, // cashier who consummated the transaction
                amount : 5000,
                newBalance : 0
            }
            chai.request(server)
                .post('/api/v1/transactions')
                .send(newTransaction)
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('should not debit a bank account if the amount to be debited is greater than the account balance', (done) => {
            const newTransaction = {
                id : transactions.length + 1,
                createdOn : new Date(),
                type : 'debit', // credit or debit
                accountNumber : 9364573798,
                cashier : 3, // cashier who consummated the transaction
                amount : 50000000,
                newBalance : 0
            }
            chai.request(server)
                .post('/api/v1/transactions')
                .send(newTransaction)
                .end((err, res) => {
                    res.should.have.status(405);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });


});