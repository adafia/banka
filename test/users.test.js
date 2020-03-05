import _ from 'lodash'
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../src';
import { adminToken, nonExistToken } from './utils/tokens';
import { defaultUser, conflictUser, nonExistUser } from './utils/userUtils';

chai.use(chaiHttp);
const { expect, request } = chai;

describe('USERS', () => {
    describe('GET /', () => {
        it('should get all user objects in the database', async () => {
            const token = await adminToken();
            const res = await request(server).get('/api/users').set('x-auth-token', token);
            expect(res.status).to.be.equal(200);
        })

        it('should get a signed in user', async () => {
            const token = await adminToken();
            const res = await request(server).get('/api/user').set('x-auth-token', token);
            expect(res.status).to.be.equal(200);
        })
    
        it('should not fetch a non existent user', async () => {
            const token = await nonExistToken();
            const res = await request(server).get('/api/user').set('x-auth-token', token);
            expect(res.status).to.be.equal(404);
        })
    });

    describe('POST /', () => {
        before(async () => {
            await request(server).post('/api/auth/signup').send(conflictUser)
        })

        const exec = async (path, obj) => await request(server).post(`/api/auth/${path}`).send(obj)

        it('should register a user successfully', async () => {
            const res = await exec('signup', defaultUser)
            expect(res.status).to.be.equal(201);
        })

        it('should not register a user when an user object is provided', async () => {
            const res = await exec('signup', _.pick(defaultUser, 'firstName'));
            expect(res.status).to.be.equal(400);
        })

        it('should not register a user that exists', async () => {
            const res = await exec('signup', conflictUser)
            expect(res.status).to.be.equal(409);
        })

        it('should login a user with an account', async () => {
            const res = await exec('signin', _.pick(conflictUser, 'email', 'password'))
            expect(res.status).to.be.equal(200);
        })
        it('should not login a user without an account', async () => {
            const res = await exec('signin', _.pick(nonExistUser, 'email', 'password'))
            expect(res.status).to.be.equal(404);
        })
    });
});
