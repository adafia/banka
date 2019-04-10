const accounts = [
    {
        id : 1 ,
        accountNumber : Math.floor(Math.random() * 10000000000),
        createdOn : new Date(),
        owner : 1, // user id
        firstName : 'Jack',
        lastName : 'Black',
        email : 'jack@gmail.com',
        type : 'savings', // savings, current
        status : 'draft', // draft, active, or dormant
        balance : Math.random() * 10000 
    },
    {
        id : 2,
        accountNumber : Math.floor(Math.random() * 10000000000),
        createdOn : new Date(),
        owner : 4, // user id
        firstName : 'Snow',
        lastName : 'White',
        email : 'snow@gmail.com',
        type : 'current', // savings, current
        status : 'active', // draft, active, or dormant
        balance : Math.random() * 10000 
    },
    {
        id : 3,
        accountNumber : Math.floor(Math.random() * 10000000000),
        createdOn : new Date(),
        owner : 4, // user id
        firstName : 'Kwaku',
        lastName : 'Red',
        email : 'red@gmail.com',
        type : 'current', // savings, current
        status : 'dormant', // draft, active, or dormant
        balance : Math.random() * 10000 
    }
];

export default accounts;