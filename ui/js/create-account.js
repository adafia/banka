let savings = document.querySelector('.savings');
let savingsB = document.querySelector('.savings-b');
let current = document.querySelector('.current');
let currentB = document.querySelector('.current-b');
let investment = document.querySelector('.investment');
let investmentB = document.querySelector('.investment-b');


savingsB.addEventListener('click', function(){
    savings.classList.toggle('selected');
    current.classList.remove('selected');
    investment.classList.remove('selected');
});

savings.addEventListener('click', function(){
    savings.classList.add('selected');
    current.classList.remove('selected');
    investment.classList.remove('selected');
});

currentB.addEventListener('click', function(){
    savings.classList.remove('selected');
    current.classList.toggle('selected');
    investment.classList.remove('selected');
});

current.addEventListener('click', function(){
    savings.classList.remove('selected');
    current.classList.add('selected');
    investment.classList.remove('selected');
});

investmentB.addEventListener('click', function(){
    savings.classList.remove('selected');
    current.classList.remove('selected');
    investment.classList.toggle('selected');
});

investment.addEventListener('click', function(){
    savings.classList.remove('selected');
    current.classList.remove('selected');
    investment.classList.add('selected');
});

