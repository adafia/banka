import { sign } from '../../src/helpers/tokens';

export const admin = {
  id: 1,
  firstName: 'Admin',
  lastName: 'Admin',
  email: 'admin@gmail.com',
  type: 'staff',
  isCashier: false,
  isAdmin: true
}

export const adminToken = async () => await sign(admin);

export const cashier = {
  id: 2,
  firstName: 'Cashier',
  lastName: 'Cashier',
  email: 'cashier@gmail.com',
  type: 'staff',
  isCashier: true,
  isAdmin: false
}

export const cashierToken = async () => await sign(cashier);

export const client = {
  id: 3,
  firstName: 'Client',
  lastName: 'Client',
  email: 'client@gmail.com',
  type: 'client',
  isCashier: false,
  isAdmin: false
}

export const clientToken = async () => await sign(client);


export const nonExist = {
  id: 404,
  firstName: 'Not',
  lastName: 'Found',
  email: 'notFound@gmail.com',
  type: 'client',
  isCashier: false,
  isAdmin: false
}

export const nonExistToken = async () => await sign(nonExist);

export const invalidToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZmlyc3ROYW1lIjoiQnJhdmUiLCJsYXN0TmFtZSI6IkhlYXJ0IiwiZW1haWwiOiJicmF2ZS5oZWFydEBnbWFpbC5jb20iLCJ0eXBlIjoiY2xpZW50IiwiaXNDYXNoaWVyIjpmYWxzZSwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU4NTMxNDkxNSwiZXhwIjoxNTg1NDAxMzE1fQ.afg5OoOiuB0Q8cc6IXQpcu5DbqnHg9WDQO4gTsgcXiQ'
