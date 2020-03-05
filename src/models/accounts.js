
const Accounts = `CREATE TABLE IF NOT EXISTS
        accounts(
            id SERIAL PRIMARY KEY,
            accountNumber INT NOT NULL,
            owner INT,
            firstName VARCHAR(50) NOT NULL,
            lastName VARCHAR(50) NOT NULL,
            email VARCHAR(225) NOT NULL,
            type VARCHAR(7) NOT NULL,
            status VARCHAR(7),
            balance FLOAT,
            createdOn VARCHAR(50) NOT NULL,
            FOREIGN KEY (owner) REFERENCES users(id) ON DELETE NO ACTION
        )`;

module.exports = Accounts
