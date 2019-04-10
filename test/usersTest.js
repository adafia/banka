import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server/server';
import users from '../server/models/Users'

chai.use(chaiHttp);
chai.should();

describe('users', () => {
    describe('GET /users', () => {
        it('should get all users', (done) => {
            chai.request(server)
                .get('/api/v1/users')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });
    });

    describe('POST /users', () => {
        it('should sign-in a user', (done) => {
            const userDetails = {
                email : 'mark@gmail.com',
                password : 'Password-456'
            };
            chai.request(server)
                .post('/api/v1/users')
                .send(userDetails)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });

    describe('POST /users', () => {
        it('should sign-up a user', (done) => {
            const newUser = {
                id : users.length + 1 ,
                email : 'ama@gmail.com',
                firstName : 'Ama',
                lastName : 'Silver',
                password : 'Password-967811',
                type : 'client' ,
                isAdmin : false , 
                createdOn : new Date()
            }
            chai.request(server)
                .post('/api/v1/users/user')
                .send(newUser)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });
});