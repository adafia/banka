const accounts = [
    {
        id : 1 ,
        accountNumber : 1985253383,
        createdOn : new Date(),
        owner : 1, // user id
        firstName : 'Jack',
        lastName : 'Black',
        email : 'jack@gmail.com',
        type : 'savings', // savings, current
        status : 'draft', // draft, active, or dormant
        balance : 7027.77 
    },
    {
        id : 2,
        accountNumber : 1985253379,
        createdOn : new Date(),
        owner : 4, // user id
        firstName : 'Snow',
        lastName : 'White',
        email : 'snow@gmail.com',
        type : 'current', // savings, current
        status : 'active', // draft, active, or dormant
        balance : 55875.67 
    },
    {
        id : 3,
        accountNumber : 8365373668,
        createdOn : new Date(),
        owner : 4, // user id
        firstName : 'Kwaku',
        lastName : 'Red',
        email : 'red@gmail.com',
        type : 'current', // savings, current
        status : 'dormant', // draft, active, or dormant
        balance : 70000.67 
    },
    {
        id : 4,
        accountNumber : 9364573798,
        createdOn : new Date(),
        owner : 5, // user id
        firstName : 'Kwame',
        lastName : 'Blue',
        email : 'blue@gmail.com',
        type : 'current', // savings, current
        status : 'active', // draft, active, or dormant
        balance : 70000.67 
    }
];

export default accounts;