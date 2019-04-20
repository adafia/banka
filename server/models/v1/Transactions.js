const transactions = [
    {
        id : 1,
        createdOn : new Date(),
        type : 'debit', // credit or debit
        accountNumber : Math.floor(Math.random() * 10000000000),
        cashier : 1, // cashier who consummated the transaction
        amount : 400.00,
        oldBalance : 1000.00,
        newBalance : 600.00
    },
    {
        id : 2,
        createdOn : new Date(),
        type : 'debit', // credit or debit
        accountNumber : Math.floor(Math.random() * 10000000000),
        cashier : 2, // cashier who consummated the transaction
        amount : 700.00,
        oldBalance : 1000.00,
        newBalance : 300.00
    },
    {
        id : 3,
        createdOn : new Date(),
        type : 'credit', // credit or debit
        accountNumber : Math.floor(Math.random() * 10000000000),
        cashier : 3, // cashier who consummated the transaction
        amount : 500.00,
        oldBalance : 1000.00,
        newBalance : 1500.00
    }
];


export default transactions;