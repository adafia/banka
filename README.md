# BANKA

## Badges
[![Build Status](https://travis-ci.com/adafia/banka.svg?branch=develop)](https://travis-ci.com/adafia/banka)  [![Coverage Status](https://coveralls.io/repos/github/adafia/banka/badge.svg?branch=develop)](https://coveralls.io/github/adafia/banka?branch=develop)

## Project Overview
Banka is a light-weight core banking application that powers banking operations like account creation, customer deposit and withdrawals. This app is meant to support a single bank, where users can signup and create bank accounts online, but must visit the branch to withdraw or deposit money

## Features (API - Endpoints)
| Verb     | Endpoint                                   | Description                                  |
| ---------|:------------------------------------------:| --------------------------------------------:|
| POST     | /api/auth/signup                           | Register client                              |
| POST     | /api/auth/signin                           | Client login                                 |
| GET      | /api/users                                 | Fetch all users                              |
| GET      | /api/user                                  | Fetch a single user                          |
| GET      | /api/accounts                              | Fetch all bank accounts                      |
| GET      | /api/user/accounts                         | Fetch all bank accounts for a specific user  |
| GET      | /api/admin/accounts/:status                | Fetch bank accounts by status                |
| POST     | /api/accounts                              | Client create account                        |
| PATCH    | /api/accounts/:accountNumber               | Activate bank account                        |
| DELETE   | /api/accounts/:accountNumber               | Delete bank account                          |
| GET      | /api/accounts/:accountNumber               | Fetch a single bank account                  |
| GET      | /api/transactions                          | Fetch all transactions                       |
| GET      | /api/transactions/:id                      | Fetch a single transactions                  |
| POST     | /api/transactions/:accountNumber/credit    | Create a credit transaction                  |
| POST     | /api/transactions/:accountNumber/debit     | Create a debit transaction                   |
| GET      | /api/accounts/:accountNumber/transactions  | Fetch all transactions on a bank account     |
| PATCH    | /api/users/makecashier/:id                 | Admin updating user to cashier               |
| PATCH    | /api/users/makeadmin/:id                   | Admin updating user to admin                 |


## How to use test
 1. ```git clone ssh:https://github.com/adafia/banka.git```
 2. ```npm install```
 3. To test locally run ```npm run create``` and finally ```npm run dev```
 4. Test the API enpoints with thier respective routes on postman.
 