const dotenv = require('dotenv');
dotenv.config();
const { Pool } = require('pg');

const pool = new Pool({connectionString: process.env.DATABASE_URL});

pool.on('connect', () => {
    console.log('connected to the Database');
});


const createUserTables = () => {
    const userTable = `CREATE TABLE IF NOT EXISTS
        users(
            id SERIAL PRIMARY KEY,
            first_name VARCHAR(50) NOT NULL,
            last_name VARCHAR(50) NOT NULL,
            email VARCHAR(225) NOT NULL,
            password VARCHAR(1000) NOT NULL,
            type VARCHAR(6) NOT NULL,
            is_admin BOOLEAN DEFAULT FALSE,
            created_on FLOAT
        )`;
    pool.query(userTable)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });
};

const createAccountTables = () => {
    const accountsTable = `CREATE TABLE IF NOT EXISTS
        accounts(
            id SERIAL PRIMARY KEY,
            account_number BIGSERIAL,
            owner INT NOT NULL,
            first_name VARCHAR(50) NOT NULL,
            last_name VARCHAR(50) NOT NULL,
            email VARCHAR(225) NOT NULL,
            type VARCHAR(7) NOT NULL,
            status VARCHAR(7),
            balance INT,
            created_on FLOAT,
            FOREIGN KEY (owner) REFERENCES users(id) ON DELETE NO ACTION
        )`;
    pool.query(accountsTable)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });
};

const createTransactionTables = () => {
    const transactionsTable = `CREATE TABLE IF NOT EXISTS
        transactions(
            id SERIAL PRIMARY KEY,
            account_number BIGSERIAL,
            cashier INT NOT NULL,
            type VARCHAR(7) NOT NULL,
            old_balance FLOAT,
            new_balance FLOAT,
            created_on FLOAT
        )`;
    pool.query(transactionsTable)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });
};


const dropTables = () => {
    const deleteTables = 'DROP TABLE IF EXISTS users, accounts, transactions';
    pool.query(deleteTables)
      .then((res) => {
        console.log(res);
        pool.end();
      })
      .catch((err) => {
        console.log(err);
        pool.end();
      });
  };

pool.on('remove', () => {
    console.log('client removed');
    process.exit(0);
});

module.exports = {
    createUserTables,
    createAccountTables,
    createTransactionTables,
    dropTables,
    pool,
};

require('make-runnable');

