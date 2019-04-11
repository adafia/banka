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
    });


});