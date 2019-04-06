const users = [
    {
        id : 1 ,
        email : 'jac@gmail.com' ,
        firstName : 'Jacob' ,
        lastName : 'Black' ,
        password : 'password1234' ,
        type : 'client' , // client or staff
        isAdmin : false , // must be a staff user account
    },
    {
        id : 2 ,
        email : 'mark@gmail.com' ,
        firstName : 'Mark' ,
        lastName : 'Brown' ,
        password : 'password456' ,
        type : 'client' , // client or staff
        isAdmin : false , // must be a staff user account
    },
    {
        id : 3 ,
        email : 'snow@gmail.com' ,
        firstName : 'Snow' ,
        lastName : 'White' ,
        password : 'password789' ,
        type : 'staff' , // client or staff
        isAdmin : true , // must be a staff user account
    }
];


module.exports = users;