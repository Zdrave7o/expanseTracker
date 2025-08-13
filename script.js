let money = localStorage.getItem("money") || 0;
console.log(money);

let currentCurrency = "dollar";
let symbol = "$";
let exchangeRate = 1;
const entries = [];

const display = document.getElementById("budget-display");

const addMoneyBtn = document.getElementById("add-money");
const addExpenseBtn = document.getElementById("add-expense");

function openEntryMenu(type){
    type = String(type);

    const entryMenu = document.querySelector(".entry-menu");

    entryMenu.classList.remove("d-none");
    entryMenu.classList.add("d-flex");

    const submitBtn = document.getElementById("submitBtn");

    submitBtn.onclick= function(){
        createEntry(type)
    };
}

function closeMenu(){
    const entryMenu = document.querySelector(".entry-menu");

    entryMenu.classList.remove("d-flex");
    entryMenu.classList.add("d-none");
}

function createEntry(type){
    console.log("create entry executed");
    
    let value = Number(document.getElementById("amount").value);
    checkCurrency();
    value /= exchangeRate;
    console.log(value, symbol);
    
    let reason = String(document.getElementById("reason").value);
    console.log(reason);

    console.log(type);
    
    

    entries.push(new Entry(type, value, reason));
    console.log(entries);
    
    updateTotal(value, type);
    closeMenu();
}

function updateTotal(value, type){
    switch(type){
        case "expense":
            money-=value;
            break;
        case"add":
            money+=value;
            break;
        default:
            console.log("No Type preovided");
            
    }

    console.log(money, currentCurrency);
    
    display.innerHTML = `${symbol}${money.toFixed(2)*exchangeRate.toFixed(2)}`;

    displayEntries();
}

class Entry{
    constructor(type, value, reason){
        this.type = type,
        this.value = value,
        this.reason = reason
    }
}

function displayEntries(){
    const entryDisplay = document.querySelector("#Entries");
    let html="";
    entries.forEach(entry => {
        const entryValue = entry.value*exchangeRate;
        if(entry.type === "add"){
            html += `<div class="entry col-8 mx-auto bg-light rounded shadow p-3 mt-2">
                    <h5>Reason: ${entry.reason}</h5>
                    <h5 class="entry-sum">+${symbol}${entryValue.toFixed(2)}</h5>
                </div>`
        } else if(entry.type === "expense"){
            html += `<div class="entry col-8 mx-auto bg-light rounded shadow p-3 mt-2">
                    <h5>Reason: ${entry.reason}</h5>
                    <h5 class="entry-sum">-${symbol}${entryValue.toFixed(2)}</h5>
                </div>`
        }
    })
    entryDisplay.innerHTML = html;
}

function changeCurrency(){
    if (currentCurrency ==="euro"){
        currentCurrency = "dollar";
    } else{
        currentCurrency = "euro";
    }
    checkCurrency();
    updateTotal(0, "");
}

function checkCurrency(){
    if(currentCurrency ==="euro"){
        exchangeRate = 0.8560;
        symbol = "€";
    } else{
        exchangeRate = 1;
        symbol = "$";
    }
}
//code need to be optimised, polish the function about changing the value