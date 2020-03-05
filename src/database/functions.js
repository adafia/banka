const { query } = require('./index');

const Functions = {
  async createUser(obj) {
    let result;
    if (typeof obj !== 'object') return result = { error: 'Parameter for the createUser method should be an object' };
    
    const { firstName, lastName, email, type, password, createdOn} = obj;
    const text = `INSERT INTO users(firstName, lastName, email, type, password, createdOn) VALUES($1, $2, $3, $4, $5, $6) RETURNING *`;
    const values = [firstName, lastName, email, type, password, createdOn];
    result = await query(text, values);
    return result.rows[0];
  },

  async createAccount(obj) {
    let result;
    if (typeof obj !== 'object') return result = { error: 'Parameter for the createAccount method should be an object' };
    
    const { accountNumber, firstName, lastName, email, owner, type,  status, balance, createdOn } = obj;
    const text = `INSERT INTO accounts(accountNumber, firstName, lastName, email, owner, type, status, balance, createdOn) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`;
    const values = [accountNumber, firstName, lastName, email, owner, type,  status, balance, createdOn];
    result = await query(text, values);
    return result.rows[0];
  },

  async createTransaction(obj) {
    let result;
    if (typeof obj !== 'object') return result = { error: 'Parameter for the createAccount method should be an object' };
    
    const { accountNumber, cashier, owner, type,  amount, oldBalance, newBalance, createdOn } = obj;
    const text = `INSERT INTO transactions(accountNumber, cashier, owner, type, amount, oldBalance, newBalance, createdOn) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`;
    const values = [accountNumber, cashier, owner, type, amount, oldBalance, newBalance, createdOn];
    result = await query(text, values);
    return result.rows[0];
  },

  async fetchById(tableName, id) {
    let result
    if (typeof tableName !== 'string') return result = { error: 'Parameter: tableName for the fetchById method should be a string' };
    if (typeof id !== 'number') return result = { error: 'Parameter for the fetchById method should be a number' };
    const text = `SELECT * FROM ${tableName} WHERE id = '${id}'`;
    result = await query(text);
    return result.rows;
  },

  async fetch(tableName, obj) {
    let result
    if (typeof tableName !== 'string') return result = { error: 'Parameter: tableName for the fetch method should be a string' };
    if (typeof obj !== 'object') return result = { error: 'Parameter: obj for the fetch method should be an object' };
    const key = Object.keys(obj)[0];
    const val = obj[key];
    const text = `SELECT * FROM ${tableName} WHERE ${key} = '${val}'`;
    result = await query(text);
    return result.rows;
  },

  async fetchAll(tableName) {
    let result;
    if (typeof tableName !== 'string') return result = { error: 'Parameter for the fetchAll method should be a string' };
    const text = `SELECT * FROM ${tableName}`;
    result = await query(text);
    return result.rows;
  },

  async update(tableName, obj) {
    let result
    if (typeof tableName !== 'string') return result = { error: 'Parameter: tableName for the update method should be a string' };
    if (typeof obj !== 'object') return result = { error: 'Parameter: obj for the update method should be an object' };

    const columnName = Object.keys(obj)[0];
    const rowName = Object.keys(obj)[1];
    const ColumnValue = obj[columnName];
    const rowValue = obj[rowName];

    const text = `UPDATE ${tableName} SET ${columnName} = $1 WHERE ${rowName} = $2 RETURNING *`;
    const values = [ColumnValue, rowValue];
    result = await query(text, values);
    return result.rows[0];
  },

  async remove(tableName, obj) {
    let result
    if (typeof tableName !== 'string') return result = { error: 'Parameter: tableName for the remove method should be a string' };
    if (typeof obj !== 'object') return result = { error: 'Parameter: obj for the remove method should be an object' };

    const columnName = Object.keys(obj)[0];
    const ColumnValue = obj[columnName];

    const text = `DELETE FROM ${tableName} WHERE ${columnName} = $1 RETURNING *`;
    result = await query(text, [ColumnValue]);
    return result.rows;
  }
}

module.exports = Functions;
