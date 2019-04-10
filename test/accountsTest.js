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
                    res.body.should.be.a('array');
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
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });
});