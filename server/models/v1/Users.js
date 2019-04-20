const users = [
    {
        id : 1 ,
        email : 'jac@gmail.com' ,
        firstName : 'Jacob' ,
        lastName : 'Black' ,
        password : 'Password-4567' ,
        type : 'client' , // client or staff
        isAdmin : false , // must be a staff user account
        createdOn : new Date()
    },
    {
        id : 2 ,
        email : 'mark@gmail.com' ,
        firstName : 'Mark' ,
        lastName : 'Brown' ,
        password : 'Password-456' ,
        type : 'client' , // client or staff
        isAdmin : false , // must be a staff user account
        createdOn : new Date()
    },
    {
        id : 3 ,
        email : 'snow@gmail.com' ,
        firstName : 'Snow' ,
        lastName : 'White' ,
        password : 'Password-789' ,
        type : 'staff' , // client or staff
        isAdmin : true , // must be a staff user account
        createdOn : new Date()
    }
];


export default users;