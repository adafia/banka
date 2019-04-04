let modalBtn = document.querySelector('.modal-btn');
let modal = document.querySelector('.modal');

let approvalsMTop = document.querySelector('.approvals-m-top');
let adminMTop = document.querySelector('.admin-m-top');
let staffMTop = document.querySelector('.staff-m-top');
let bankMTop = document.querySelector('.bank-m-top');
let transactMTop = document.querySelector('.transact-m-top');

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

approvalsMTop.addEventListener('click', function() {
    approvalsContent.classList.remove('hide');
    adminContent.classList.add('hide');
    staffContent.classList.add('hide');
    bankContent.classList.add('hide');
    transactionsContent.classList.add('hide');
});

adminMTop.addEventListener('click', function() {
    approvalsContent.classList.add('hide');
    adminContent.classList.remove('hide');
    staffContent.classList.add('hide');
    bankContent.classList.add('hide');
    transactionsContent.classList.add('hide');
});

staffMTop.addEventListener('click', function() {
    approvalsContent.classList.add('hide');
    adminContent.classList.add('hide');
    staffContent.classList.remove('hide');
    bankContent.classList.add('hide');
    transactionsContent.classList.add('hide');
});

bankMTop.addEventListener('click', function() {
    approvalsContent.classList.add('hide');
    adminContent.classList.add('hide');
    staffContent.classList.add('hide');
    bankContent.classList.remove('hide');
    transactionsContent.classList.add('hide');
});

transactMTop.addEventListener('click', function() {
    approvalsContent.classList.add('hide');
    adminContent.classList.add('hide');
    staffContent.classList.add('hide');
    bankContent.classList.add('hide');
    transactionsContent.classList.remove('hide');
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
