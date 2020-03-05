
const Users = `CREATE TABLE IF NOT EXISTS
        users(
            id SERIAL PRIMARY KEY,
            firstName VARCHAR(50) NOT NULL,
            lastName VARCHAR(50) NOT NULL,
            email VARCHAR(225) NOT NULL,
            password VARCHAR(1000) NOT NULL,
            type VARCHAR(6) NOT NULL,
            isCashier BOOLEAN DEFAULT FALSE,
            isAdmin BOOLEAN DEFAULT FALSE,
            createdOn VARCHAR(50) NOT NULL
        )`;

module.exports = Users;
