const accounts = [
    {
        id : 1 ,
        accountNumber : Math.floor(Math.random() * 10000000000),
        createdOn : new Date(),
        owner : 1, // user id
        type : 'savings', // savings, current
        status : 'draft', // draft, active, or dormant
        balance : Math.random() * 1000 
    },
    {
        id : 2,
        accountNumber : Math.floor(Math.random() * 10000000000),
        createdOn : new Date(),
        owner : 4, // user id
        type : 'current', // savings, current
        status : 'active', // draft, active, or dormant
        balance : Math.random() * 1000 
    },
    {
        id : 3,
        accountNumber : Math.floor(Math.random() * 10000000000),
        createdOn : new Date(),
        owner : 4, // user id
        type : 'current', // savings, current
        status : 'dormant', // draft, active, or dormant
        balance : Math.random() * 1000 
    }
];

module.exports = accounts;