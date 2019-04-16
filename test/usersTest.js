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

        it('should not sign-in a user if any input field is empty', (done) => {
            const userDetails = {
                email : '',
                password : 'Password-456'
            };
            chai.request(server)
                .post('/api/v1/users')
                .send(userDetails)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('should not sign-in a user if any email and password input field have type number', (done) => {
            const userDetails = {
                email : 123,
                password : 765
            };
            chai.request(server)
                .post('/api/v1/users')
                .send(userDetails)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('should not sign-in a user if the email and password input do not match', (done) => {
            const userDetails = {
                email : 'snow@gmail.com',
                password : 'Password-456'
            };
            chai.request(server)
                .post('/api/v1/users')
                .send(userDetails)
                .end((err, res) => {
                    res.should.have.status(400);
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
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('should not sign-up a user if any of the required fields are empty', (done) => {
            const newUser = {
                id : users.length + 1 ,
                email : '',
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
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('should not sign-up a user if the first and last name fields are of type number', (done) => {
            const newUser = {
                id : users.length + 1 ,
                email : 'ama@gmail.com',
                firstName : 1234,
                lastName : 1234,
                password : 'Password-967811',
                type : 'client' ,
                isAdmin : false , 
                createdOn : new Date()
            }
            chai.request(server)
                .post('/api/v1/users/user')
                .send(newUser)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('should not sign-up a user if the email filled in does not follow the standard email format', (done) => {
            const newUser = {
                id : users.length + 1 ,
                email : 'amagmailcom',
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
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('should not sign-up a user if the password filled in does not follow the standard password format', (done) => {
            const newUser = {
                id : users.length + 1 ,
                email : 'ama@gmail.com',
                firstName : 'Ama',
                lastName : 'Silver',
                password : 'password967811',
                type : 'client' ,
                isAdmin : false , 
                createdOn : new Date()
            }
            chai.request(server)
                .post('/api/v1/users/user')
                .send(newUser)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('should not sign-up a user if the email provided is already in use', (done) => {
            const newUser = {
                id : users.length + 1 ,
                email : 'snow@gmail.com',
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
                    res.should.have.status(409);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });
});