import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server/server';

chai.use(chaiHttp);
chai.should();


describe('accounts', () => {
    
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
});