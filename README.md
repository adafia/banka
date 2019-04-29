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
1. User sign up. [done] ```POST``` on ```localhost:5000/api/v2/auth/signup```
2. User sign in. [done] ```POST``` on ```localhost:5000/api/v2/auth/signin```
3. Create bank account. [done] ```POST``` on ```localhost:5000/api/v2/accounts```
4. Admin / Staff can activate or deactivate an account. [done] ```PATCH``` on ```localhost:5000/api/v2/accounts/:accountNumber```
5. Admin / Staff can delete an account. [done] ```DELETE``` on ```localhost:5000/api/v2/accounts/:accountNumber```
6. Staff (cashier) can credit an account. [done] ```POST``` on ```localhost:5000/api/v2/transactions/:accountNumber/credit```
7. Staff (cashier) can debit an account. [done] ```POST``` on ```localhost:5000/api/v2/transactions/:accountNumber/debit```
8. User can view account transaction history. [done] ```GET``` on ```localhost:5000/api/v2/accounts/6517194/transactions```
9. User can view a specific account transaction. [done] ```GET``` on ``` localhost:5000/api/v2/transactions/:id ```
10. User can view account details. [done] ```GET``` on ```localhost:5000/api/v2/accounts/:accountNumber```
11. Admin/staff can view a list of accounts owned by a specific user. [done] ```GET``` on ```localhost:5000/api/v2/accounts```
12. Staff/Admin can view all bank accounts. [done] ```GET``` on ```localhost:5000/api/v2/accounts```
13. Staff/Admin can view all active bank accounts. [done] ```GET``` on ```localhost:5000/api/v2/account/:status```
14. Staff/Admin can view all dormant bank accounts. [done] ```GET``` on ```localhost:5000/api/v2/account/:status```

## How to use test
 1. ```git clone ssh:https://github.com/adafia/banka.git```
 2. ```npm install```
 3. To test locally run ```npm run drop``` followed by ```npm run create``` and finally ```npm run dev```
 4. Test them on them on thier respective routes.