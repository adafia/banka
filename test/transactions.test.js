import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../src';
import { adminToken, cashierToken, clientToken, invalidToken } from './utils/tokens';
import { userList2 } from './utils/userUtils';

chai.use(chaiHttp);
const { expect, request } = chai;


describe('TRANSACTIONS', () => {
  let userFour, userFive, userSix
  let userFourAccount, userFiveAccount, userSixAccount

  const createUser = async (obj) => await request(server).post('/api/auth/signup').send(obj);
  const createAccount = async (token) => await request(server).post('/api/accounts').set('x-auth-token', token).send({ type: 'savings' })
  const activateAccount = async (accountNumber) => {
    const token = await adminToken()
    await request(server).patch(`/api/accounts/${accountNumber}`).set('x-auth-token', token).send({ status: 'active' });
  }
  const creditAccount = async (accountNumber, amount) => {
    const token = await cashierToken()
    await request(server).post(`/api/transactions/${accountNumber}/credit`).set('x-auth-token', token).send({ amount });
  }

  before(async () => {
    userFour = await createUser(userList2[0]);
    userFive = await createUser(userList2[1]);
    userSix = await createUser(userList2[2]);
    userFourAccount = await createAccount(userFour.body.token)
    userFiveAccount = await createAccount(userFive.body.token)
    userSixAccount = await createAccount(userSix.body.token)
    await activateAccount(userFourAccount.body.account.accountnumber)
    await activateAccount(userFiveAccount.body.account.accountnumber)
    await creditAccount(userFourAccount.body.account.accountnumber, 50000)
  })

  describe('GET /', () => {
    it('Should fetch all bank transactions', async () => {
      const token = await adminToken()
      const res = await request(server).get(`/api/transactions`).set('x-auth-token', token);
      expect(res.status).to.be.equal(200);
    })

    it('Should not allow a client to fetch all bank transactions', async () => {
      const token = await clientToken()
      const res = await request(server).get(`/api/transactions`).set('x-auth-token', token);
      expect(res.status).to.be.equal(403);
    })

    it('Should return 401 if no token is provided', async () => {
      const token = ''
      const res = await request(server).get(`/api/transactions`).set('x-auth-token', token);
      expect(res.status).to.be.equal(401);
    })

    it('Should return 400 if an invalid token is provided', async () => {
      const res = await request(server).get(`/api/transactions`).set('x-auth-token', invalidToken);
      expect(res.status).to.be.equal(400);
    })

    it('Should fetch a bank transaction by id', async () => {
      const token = await adminToken()
      const id = 1
      const res = await request(server).get(`/api/transactions/${id}`).set('x-auth-token', token);
      expect(res.status).to.be.equal(200);
    })

    it('Should return a 400 if an invalid transaction id is provided', async () => {
      const token = await adminToken()
      const id = 'string'
      const res = await request(server).get(`/api/transactions/${id}`).set('x-auth-token', token);
      expect(res.status).to.be.equal(400);
    })
  });

  describe('POST /', () => {
    it('Should allow a cashier to debit an active bank account', async () => {
      const token = await cashierToken()
      const accountNumber = userFourAccount.body.account.accountnumber;
      const res = await request(server).post(`/api/transactions/${accountNumber}/debit`).set('x-auth-token', token).send({ amount: 100 });
      expect(res.status).to.be.equal(201);
    })

    it('Should return a 400 if an invalid amount is provided', async () => {
      const token = await cashierToken()
      const accountNumber = userFourAccount.body.account.accountnumber;
      const res = await request(server).post(`/api/transactions/${accountNumber}/debit`).set('x-auth-token', token).send({ amount: 'string' });
      expect(res.status).to.be.equal(400);
    })

    it('Should not allow an admin to debit an active bank account', async () => {
      const token = await adminToken()
      const accountNumber = userFourAccount.body.account.accountnumber;
      const res = await request(server).post(`/api/transactions/${accountNumber}/debit`).set('x-auth-token', token).send({ amount: 100 });
      expect(res.status).to.be.equal(403);
    })
  
    it('Should not allow a cashier to debit an active bank account with insufficient funds', async () => {
      const token = await cashierToken()
      const accountNumber = userFourAccount.body.account.accountnumber;
      const res = await request(server).post(`/api/transactions/${accountNumber}/debit`).set('x-auth-token', token).send({ amount: 10000000 });
      expect(res.status).to.be.equal(400);
    })

    it('Should not allow a cashier to debit an inactive bank account', async () => {
      const token = await cashierToken()
      const accountNumber = userSixAccount.body.account.accountnumber;
      const res = await request(server).post(`/api/transactions/${accountNumber}/debit`).set('x-auth-token', token).send({ amount: 10000000 });
      expect(res.status).to.be.equal(400);
    })

    it('Should allow a cashier to credit an active bank account', async () => {
      const token = await cashierToken()
      const accountNumber = userFiveAccount.body.account.accountnumber;
      const res = await request(server).post(`/api/transactions/${accountNumber}/credit`).set('x-auth-token', token).send({ amount: 20000 });
      expect(res.status).to.be.equal(201);
    })

    it('Should not allow a cashier to credit an inactive bank account', async () => {
      const token = await cashierToken()
      const accountNumber = userSixAccount.body.account.accountnumber;
      const res = await request(server).post(`/api/transactions/${accountNumber}/credit`).set('x-auth-token', token).send({ amount: 20000 });
      expect(res.status).to.be.equal(400);
    })

    it('Should return 404 if the bank account does not exist', async () => {
      const token = await cashierToken()
      const accountNumber = 1500000
      const res = await request(server).post(`/api/transactions/${accountNumber}/credit`).set('x-auth-token', token).send({ amount: 20000 });
      expect(res.status).to.be.equal(404);
    })
  });

});
