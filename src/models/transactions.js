
const Transactions = `CREATE TABLE IF NOT EXISTS
        transactions(
            id SERIAL PRIMARY KEY,
            accountNumber INT NOT NULL,
            cashier INT NOT NULL,
            owner INT NOT NULL,
            type VARCHAR(7) NOT NULL,
            amount FLOAT NOT NULL,
            oldBalance FLOAT NOT NULL,
            newBalance FLOAT NOT NULL,
            createdOn VARCHAR(50) NOT NULL,
            FOREIGN KEY (owner) REFERENCES users(id) ON DELETE NO ACTION
        )`;

module.exports = Transactions
