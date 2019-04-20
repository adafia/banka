import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server/server';
import users from '../../server/models/v1/Users'

chai.use(chaiHttp);
chai.should();

describe('users', () => {
    describe('GET /users', () => {
        it('should get all users', (done) => {
            chai.request(server)
                .get('/api/v1/users')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
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
                .post('/api/v1/auth/signin')
                .send(userDetails)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('should not sign-in a user if email input field is empty', (done) => {
            const userDetails = {
                email : '',
                password : 'Password-456'
            };
            chai.request(server)
                .post('/api/v1/auth/signin')
                .send(userDetails)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('should not sign-in a user if password input field is empty', (done) => {
            const userDetails = {
                email : 'mark@gmail.com',
                password : ''
            };
            chai.request(server)
                .post('/api/v1/auth/signin')
                .send(userDetails)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('should not sign-in a user if email input is a number', (done) => {
            const userDetails = {
                email : 123,
                password : 'Password-456'
            };
            chai.request(server)
                .post('/api/v1/auth/signin')
                .send(userDetails)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('should not sign-in a user if the email provided does not follow the standard email format', (done) => {
            const userDetails = {
                email : 'markgmailcom',
                password : 'Password-456'
            };
            chai.request(server)
                .post('/api/v1/auth/signin')
                .send(userDetails)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('should not sign-in a user if the password provided does have an uppercase letter', (done) => {
            const userDetails = {
                email : 'mark@gmail.com',
                password : 'password-456'
            };
            chai.request(server)
                .post('/api/v1/auth/signin')
                .send(userDetails)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('should not sign-in a user if the password provided does have an lowercase letter', (done) => {
            const userDetails = {
                email : 'mark@gmail.com',
                password : 'PASSWORD-456'
            };
            chai.request(server)
                .post('/api/v1/auth/signin')
                .send(userDetails)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('should not sign-in a user if the password provided does have a special character', (done) => {
            const userDetails = {
                email : 'mark@gmail.com',
                password : 'Password456'
            };
            chai.request(server)
                .post('/api/v1/auth/signin')
                .send(userDetails)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('should not sign-in a user if the password provided does have a number', (done) => {
            const userDetails = {
                email : 'mark@gmail.com',
                password : 'Password-'
            };
            chai.request(server)
                .post('/api/v1/auth/signin')
                .send(userDetails)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('should not sign-in a user if the password length is less done 8 characters', (done) => {
            const userDetails = {
                email : 'mark@gmail.com',
                password : 'Pas-12'
            };
            chai.request(server)
                .post('/api/v1/auth/signin')
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
                .post('/api/v1/auth/signin')
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
                .post('/api/v1/auth/signup')
                .send(newUser)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('should not sign-up a user if email field is empty', (done) => {
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
                .post('/api/v1/auth/signup')
                .send(newUser)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('should not sign-up a user if first name field is empty', (done) => {
            const newUser = {
                id : users.length + 1 ,
                email : 'ama@gmail.com',
                firstName : '',
                lastName : 'Silver',
                password : 'Password-967811',
                type : 'client' ,
                isAdmin : false , 
                createdOn : new Date()
            }
            chai.request(server)
                .post('/api/v1/auth/signup')
                .send(newUser)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('should not sign-up a user if last name field is empty', (done) => {
            const newUser = {
                id : users.length + 1 ,
                email : 'ama@gmail.com',
                firstName : 'Ama',
                lastName : '',
                password : 'Password-967811',
                type : 'client' ,
                isAdmin : false , 
                createdOn : new Date()
            }
            chai.request(server)
                .post('/api/v1/auth/signup')
                .send(newUser)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('should not sign-up a user if password field is empty', (done) => {
            const newUser = {
                id : users.length + 1 ,
                email : 'ama@gmail.com',
                firstName : 'Ama',
                lastName : 'Silver',
                password : '',
                type : 'client' ,
                isAdmin : false , 
                createdOn : new Date()
            }
            chai.request(server)
                .post('/api/v1/auth/signup')
                .send(newUser)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('should not sign-up a user if the first name provided is a number', (done) => {
            const newUser = {
                id : users.length + 1 ,
                email : 'ama@gmail.com',
                firstName : 1234,
                lastName : 'Silver',
                password : 'Password-967811',
                type : 'client' ,
                isAdmin : false , 
                createdOn : new Date()
            }
            chai.request(server)
                .post('/api/v1/auth/signup')
                .send(newUser)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('should not sign-up a user if the last name provided is a number', (done) => {
            const newUser = {
                id : users.length + 1 ,
                email : 'ama@gmail.com',
                firstName : 'Ama',
                lastName : 1234,
                password : 'Password-967811',
                type : 'client' ,
                isAdmin : false , 
                createdOn : new Date()
            }
            chai.request(server)
                .post('/api/v1/auth/signup')
                .send(newUser)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('should not sign-up a user if the email provided does not follow the standard email format', (done) => {
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
                .post('/api/v1/auth/signup')
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
                .post('/api/v1/auth/signup')
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
                .post('/api/v1/auth/signup')
                .send(newUser)
                .end((err, res) => {
                    res.should.have.status(409);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });
});