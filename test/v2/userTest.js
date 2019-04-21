import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server/server';

chai.use(chaiHttp);
chai.should();

describe('users', () => {

    describe('POST /users', () => {
        it('should sign-up a user', (done) => {
            const user = {
                email : 'ama@gmail.com',
                first_name : 'Ama',
                last_name : 'Silver',
                password : 'Password-967811',
                type : 'client' , 
                createdOn : new Date()
            }
            chai.request(server)
                .post('/api/v2/auth/signup')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('should not sign-up a user if user email already exist', (done) => {
            const user = {
                email : 'ama@gmail.com',
                first_name : 'Ama',
                last_name : 'Silver',
                password : 'Password-967811',
                type : 'client' , 
                createdOn : new Date()
            }
            chai.request(server)
                .post('/api/v2/auth/signup')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(409);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('should not sign-up a user if email is empty', (done) => {
            const user = {
                email : '',
                first_name : 'Ama',
                last_name : 'Silver',
                password : 'Password-967811',
                type : 'client' , 
                createdOn : new Date()
            }
            chai.request(server)
                .post('/api/v2/auth/signup')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('should not sign-up a user if email is a number', (done) => {
            const user = {
                email : 123,
                first_name : 'John',
                last_name : 'Diamond',
                password : 'Password-967811',
                type : 'client' , 
                createdOn : new Date()
            }
            chai.request(server)
                .post('/api/v2/auth/signup')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('should not sign-up a user if first name is a number', (done) => {
            const user = {
                email : 'sam@gmail.com',
                first_name : 2453,
                last_name : 'Gold',
                password : 'Goldword-967811',
                type : 'client', 
                createdOn : new Date()
            }
            chai.request(server)
                .post('/api/v2/auth/signup')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('should not sign-up a user if password is shorter than 8 characters', (done) => {
            const user = {
                email : 'jack@gmail.com',
                first_name : 'Jack',
                last_name : 'Jones',
                password : 'Jo-54',
                type : 'client', 
                createdOn : new Date()
            }
            chai.request(server)
                .post('/api/v2/auth/signup')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
        });

    });
});