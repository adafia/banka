const devKeys = require('./devKeys');
const testKeys = require('./testKeys');
const prodKeys = require('./prodKeys');

if (process.env.NODE_ENV === 'production'){
    module.exports = prodKeys;
}


if(process.env.NODE_ENV === 'test'){
    module.exports = testKeys;
} else {
    module.exports = devKeys;
}

console.log(process.env.DATABASE_URL);
console.log(process.env.NODE_ENV);

