const bcrypt = require('bcrypt');
const { query, pool } = require('./index');
const users = require('../models/users');
const accounts = require('../models/accounts');
const transactions = require('../models/transactions');
require('dotenv').config();

const createUserTable = async () => await query(users);

const createAccountTable = async () => await query(accounts);

const createTransactionTable = async () => await query(transactions);

const addAdmin = async () => {
    const adminPassword = process.env.ADMIN_PASSWORD
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(adminPassword, salt);
    const text = `INSERT INTO users(firstName, lastName, email, password, type, isCashier, isAdmin, createdOn) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`;
    const values = ['Samuel', 'Adafia', 'adafia@gmail.com', hash, 'staff', false, true, new Date()];
    await query(text, values);
}

const dropTables = async () => {
    const deleteTables = 'DROP TABLE IF EXISTS users, accounts, transactions';
    await query(deleteTables);
};

const setup = async () => {
    await createUserTable();
    await createAccountTable();
    await createTransactionTable();
};


const exit = pool.on('remove', () => process.exit(0));

module.exports = {
    setup,
    addAdmin,
    dropTables,
    exit
};

require('make-runnable');
