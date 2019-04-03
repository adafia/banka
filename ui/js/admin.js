let modalBtn = document.querySelector('.modal-btn');
let modal = document.querySelector('.modal');

let approvalsM = document.querySelector('.approvals-m');
let adminM = document.querySelector('.admin-m');
let staffM = document.querySelector('.staff-m');
let bankM = document.querySelector('.bank-m');
let transactM = document.querySelector('.transact-m');

let approvalsContent = document.querySelector('.approvals');
let adminContent = document.querySelector('.admin-accounts');
let staffContent = document.querySelector('.staff-accounts');
let bankContent = document.querySelector('.bank-accounts');
let transactionsContent = document.querySelector('.transactions');

let close = document.querySelector('.close');
let userAccount = document.querySelector('.user-account');
let tr = document.getElementsByClassName('tr');
console.log(tr);


modalBtn.addEventListener('click', function() {
    // modal.style.display = 'none';
    modal.classList.add('hide');
});

approvalsM.addEventListener('click', function() {
    approvalsContent.classList.remove('hide');
    adminContent.classList.add('hide');
    staffContent.classList.add('hide');
    bankContent.classList.add('hide');
    transactionsContent.classList.add('hide');
});

adminM.addEventListener('click', function() {
    approvalsContent.classList.add('hide');
    adminContent.classList.remove('hide');
    staffContent.classList.add('hide');
    bankContent.classList.add('hide');
    transactionsContent.classList.add('hide');
});

staffM.addEventListener('click', function() {
    approvalsContent.classList.add('hide');
    adminContent.classList.add('hide');
    staffContent.classList.remove('hide');
    bankContent.classList.add('hide');
    transactionsContent.classList.add('hide');
});

bankM.addEventListener('click', function() {
    approvalsContent.classList.add('hide');
    adminContent.classList.add('hide');
    staffContent.classList.add('hide');
    bankContent.classList.remove('hide');
    transactionsContent.classList.add('hide');
});

transactM.addEventListener('click', function() {
    approvalsContent.classList.add('hide');
    adminContent.classList.add('hide');
    staffContent.classList.add('hide');
    bankContent.classList.add('hide');
    transactionsContent.classList.remove('hide');
});


for (let i = 0; i < tr.length; i++) {
    tr[i].addEventListener('click', function() {
        userAccount.classList.remove('hide')
    });
};

close.addEventListener('click', function() {
    userAccount.classList.add('hide');
});
