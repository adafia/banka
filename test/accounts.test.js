import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../src';
import { adminToken } from './utils/tokens';
import { userList } from './utils/userUtils';

chai.use(chaiHttp);
const { expect, request } = chai;

describe('ACCOUNTS', () => {
  let userOne, userTwo, userThree
  let userOneAccount, userTwoAccount, userThreeAccount

  const createUser = async (obj) => await request(server).post('/api/auth/signup').send(obj);
  const createAccount = async (token) => await request(server).post('/api/accounts').set('x-auth-token', token).send({ type: 'savings' })
  
  before(async () => {
    userOne = await createUser(userList[0]);
    userTwo = await createUser(userList[1]);
    userThree = await createUser(userList[2]);
    userOneAccount = await createAccount(userOne.body.token)
    userTwoAccount = await createAccount(userTwo.body.token)
    userThreeAccount = await createAccount(userThree.body.token)
  })

  describe('GET /', () => {
    it('Should fetch all bank accounts', async () => {
      const token = await adminToken()
      const res = await request(server).get(`/api/accounts`).set('x-auth-token', token);
      expect(res.status).to.be.equal(200);
    })

    it('Should fetch bank accounts by status', async () => {
      const token = await adminToken()
      const status = 'draft'
      const res = await request(server).get(`/api/admin/accounts/${status}`).set('x-auth-token', token);
      expect(res.status).to.be.equal(200);
    })

    it('Should return 404 if there are no accounts with the specified status', async () => {
      const token = await adminToken()
      const status = 'dormant'
      const res = await request(server).get(`/api/admin/accounts/${status}`).set('x-auth-token', token);
      expect(res.status).to.be.equal(404);
    })

    it('Should fetch a users bank accounts', async () => {
      const res = await request(server).get(`/api/user/accounts`).set('x-auth-token', userOne.body.token);
      expect(res.status).to.be.equal(200);
    })

    it('Should fetch a single bank account of a user', async () => {
      const res = await request(server).get(`/api/accounts/${userOneAccount.body.account.accountnumber}`).set('x-auth-token', userOne.body.token);
      expect(res.status).to.be.equal(200);
    })

    it('Should return a 403 if user does not own the account', async () => {
      const res = await request(server).get(`/api/accounts/${userOneAccount.body.account.accountnumber}`).set('x-auth-token', userTwo.body.token);
      expect(res.status).to.be.equal(403);
    })

    it('Should return a 404 if the account does not exist', async () => {
      const accountNumber = 1234567890;
      const res = await request(server).get(`/api/accounts/${accountNumber}`).set('x-auth-token', userOne.body.token);
      expect(res.status).to.be.equal(404);
    })
  });

  describe('PATCH /', () => {
    it('should allow an admin to chnage the status of an account', async () => {
      const token = await adminToken()
      const res = await request(server).patch(`/api/accounts/${userTwoAccount.body.account.accountnumber}`).set('x-auth-token', token).send({ status: 'active' });
      expect(res.status).to.be.equal(200);
    })

    it('should return a 400 if an invalid status is provided', async () => {
      const token = await adminToken()
      const res = await request(server).patch(`/api/accounts/${userTwoAccount.body.account.accountnumber}`).set('x-auth-token', token).send({ status: 'fish' });
      expect(res.status).to.be.equal(400);
    })

    it('should return a 404 if the account number does not exist', async () => {
      const token = await adminToken()
      const accountNumber = 1234567890;
      const res = await request(server).patch(`/api/accounts/${accountNumber}`).set('x-auth-token', token).send({ status: 'active' });
      expect(res.status).to.be.equal(404);
    })
  })

  describe('DELETE /', () => {
    it('should allow an admin to delete an account', async () => {
      const token = await adminToken()
      const res = await request(server).delete(`/api/accounts/${userThreeAccount.body.account.accountnumber}`).set('x-auth-token', token);
      expect(res.status).to.be.equal(200);
    })

    it('should return a 404 if the account number doesnt exist', async () => {
      const token = await adminToken()
      const accountNumber = 1234567890
      const res = await request(server).delete(`/api/accounts/${accountNumber}`).set('x-auth-token', token);
      expect(res.status).to.be.equal(404);
    })
  })

  describe('POST /', () => {
    it('should allow a user to create an account', async () => {
      const res = await request(server).post(`/api/accounts`).set('x-auth-token', userTwo.body.token).send({ type: 'savings' });
      expect(res.status).to.be.equal(201);
    })

    it('should return a 400 if an invalid account type is specified', async () => {
      const res = await request(server).post(`/api/accounts`).set('x-auth-token', userTwo.body.token).send({ type: 'solo' });
      expect(res.status).to.be.equal(400);
    })

  })
});
