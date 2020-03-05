# BANKA

## Badges
[![Build Status](https://travis-ci.com/adafia/banka.svg?branch=develop)](https://travis-ci.com/adafia/banka)  [![Coverage Status](https://coveralls.io/repos/github/adafia/banka/badge.svg?branch=develop)](https://coveralls.io/github/adafia/banka?branch=develop)

## Project Overview
Banka is a light-weight core banking application that powers banking operations like account creation, customer deposit and withdrawals. This app is meant to support a single bank, where users can signup and create bank accounts online, but must visit the branch to withdraw or deposit money

## Features (UI)
1. User (client) can sign up. [done]
2. User (client) can login. [done]
3. User (client) can create an account. [done]
4. User (client) can view account transaction history. [done]
5. User (client) can view a specific account transaction. [done]
6. Staff (cashier) can debit user (client) account. [done]
7. Staff (cashier) can credit user (client) account. [done]
8. Admin/staff can view all user accounts. [done]
9. Admin/staff can view a specific user account. [done]
10. Admin/staff can activate or deactivate an account. [done]
11. Admin/staff can delete a specific user account. [done]
12. Admin can create staff and admin user accounts. [done]


## Features (API - Endpoints)
| Verb     | Endpoint         | Description            |
| ---------|:----------------:| ----------------------:|
| POST     | /api/auth/signup | Register client        |
| POST     | /api/auth/signin | Client login           |
| POST     | /api/accounts    | Client create account  |


## How to use test
 1. ```git clone ssh:https://github.com/adafia/banka.git```
 2. ```npm install```
 3. To test locally run ```npm run drop``` followed by ```npm run create``` and finally ```npm run dev```
 4. Test the API enpoints with thier respective routes on postman.
 