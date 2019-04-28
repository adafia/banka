const keys = require('./config/keys')
const bcrypt = require('bcrypt');
const { Pool } = require('pg');

const pool = new Pool({connectionString: keys.DATABASE_URL});

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
            is_cashier BOOLEAN DEFAULT FALSE,
            is_admin BOOLEAN DEFAULT FALSE,
            created_on VARCHAR(50) NOT NULL
        )`;
    pool.query(userTable)
        .then((res) => {
            // console.log(res);
            pool.end();
        })
        .catch((err) => {
            // console.log(err);
            pool.end();
        });
};

const createAccountTables = () => {
    const accountsTable = `CREATE TABLE IF NOT EXISTS
        accounts(
            account_number INT NOT NULL,
            owner INT,
            first_name VARCHAR(50) NOT NULL,
            last_name VARCHAR(50) NOT NULL,
            email VARCHAR(225) NOT NULL,
            type VARCHAR(7) NOT NULL,
            status VARCHAR(7),
            balance FLOAT,
            created_on VARCHAR(50) NOT NULL,
            FOREIGN KEY (owner) REFERENCES users(id) ON DELETE NO ACTION
        )`;
    pool.query(accountsTable)
        .then((res) => {
            // console.log(res);
            pool.end();
        })
        .catch((err) => {
            // console.log(err);
            pool.end();
        });
};

const createTransactionTables = () => {
    const transactionsTable = `CREATE TABLE IF NOT EXISTS
        transactions(
            id SERIAL PRIMARY KEY,
            account_number INT NOT NULL,
            cashier INT NOT NULL,
            type VARCHAR(7) NOT NULL,
            amount FLOAT NOT NULL,
            old_balance FLOAT NOT NULL,
            new_balance FLOAT NOT NULL,
            created_on VARCHAR(50) NOT NULL
        )`;
    pool.query(transactionsTable)
        .then((res) => {
            // console.log(res);
            pool.end();
        })
        .catch((err) => {
            // console.log(err);
            pool.end();
        });
};

const addAdmin = () => {
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync('Password-1234', salt);
    const text = `INSERT INTO users(first_name, last_name, email, password, type, is_cashier, is_admin, created_on) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`;
    const values = ['Samuel', 'Adafia', 'adafia@gmail.com', hash, 'staff', false, true, new Date()];

    pool.query(text, values)
        .then((res) => {
            // console.log(res);
            pool.end();
        })
        .catch((err) => {
            // console.log(err);
            pool.end();
        });
}


const dropTables = () => {
    const deleteTables = 'DROP TABLE IF EXISTS users, accounts, transactions';
    pool.query(deleteTables)
      .then((res) => {
        // console.log(res);
        pool.end();
      })
      .catch((err) => {
        // console.log(err);
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
    addAdmin,
    pool,
};

require('make-runnable');

