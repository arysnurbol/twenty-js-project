const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');

const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

async function getRandomUser() {
    const res = await fetch(`https://randomuser.me/api`);
    const data = await res.json();
    console.log(data);

    const user = data.results[0];
    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000),
    }
    addData(newUser);
}

// Double money
function doubleMoney() {
    data = data.map(item =>  {
        return {...item, money: item.money * 2}
    });
    
    updateDOM();
}

// Sort by Richest 
function sortByRichest() {
    data = data.sort((a, b) => a.money - b.money);
    updateDOM();
}

// Show millionaires
function showMillionaires() {
    data = data.filter(item => item.money > 1000000);
    updateDOM()
}

// Calculate wealth
function calculateWealth() {
    const wealth = data.reduce((acc, curr) => acc += curr.money, 0);

    const wealthEl = document.createElement('div');
    wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong>`;
    main.append(wealthEl);
}

// Add user
function addData(obj) {
    data.push(obj);

    updateDOM();
}

// Update DOM
function updateDOM(providedData = data) {
    main.innerHTML = '<h2><strong>Persion</strong> Wealth</h2>';

    providedData.forEach(item => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
        main.appendChild(element);
    });
}

// Format number as money
function formatMoney(number) {
    return '$' + (number).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');  // 12,345.67
}

// Event listeners
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionairesBtn.addEventListener('click', showMillionaires);
calculateWealthBtn.addEventListener('click', calculateWealth);
