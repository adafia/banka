import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../src';
import { adminToken } from './utils/tokens';
import { makeCashier } from './utils/userUtils';

chai.use(chaiHttp);
const { expect, request } = chai;

describe('ADMIN', () => {
  describe('POST /', () => {
    let user;
    before(async() => {
      const res = await request(server).post('/api/auth/signup').send(makeCashier)
      user = res.body.data
    })


    it('Should allow an admin to make a user a cashier', async () => {
      const {id} = user
      const token = await adminToken();
      const res = await request(server).patch(`/api/users/makecashier/${id}`).set('x-auth-token', token);
      expect(res.status).to.be.equal(200);
    })

    it('should return a 400 if an invalid id is provided', async () => {
      const id = 'string'
      const token = await adminToken();
      const res = await request(server).patch(`/api/users/makecashier/${id}`).set('x-auth-token', token);
      expect(res.status).to.be.equal(400);
    })

    it('should return a 404 if the id provided does not exist', async () => {
      const id = 9000
      const token = await adminToken();
      const res = await request(server).patch(`/api/users/makecashier/${id}`).set('x-auth-token', token);
      expect(res.status).to.be.equal(404);
    })

    it('Should allow an admin to make a user an admin', async () => {
      const {id} = user
      const token = await adminToken();
      const res = await request(server).patch(`/api/users/makeadmin/${id}`).set('x-auth-token', token);
      expect(res.status).to.be.equal(200);
    })

    it('Should return a 400 if an invalid id is provided', async () => {
      const id = 'string'
      const token = await adminToken();
      const res = await request(server).patch(`/api/users/makeadmin/${id}`).set('x-auth-token', token);
      expect(res.status).to.be.equal(400);
    })

    it('Should return a 404 if the id provided does not exist', async () => {
      const id = 9000
      const token = await adminToken();
      const res = await request(server).patch(`/api/users/makeadmin/${id}`).set('x-auth-token', token);
      expect(res.status).to.be.equal(404);
    })
  })
})