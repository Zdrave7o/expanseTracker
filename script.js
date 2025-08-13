let money = 0;
let currentCurrency = "euro";
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
    console.log(value);
    if(currentCurrency === "euro"){
        value = value / 0.8560;
        console.log(value + " in Dollars");
        
    } else{
        value = value * 1;
    }
    
    let reason = String(document.getElementById("reason").value);
    console.log(reason);

    console.log(type);
    
    

    entries.push(new Entry(type, value, reason));
    console.log(entries);
    
    updateTotal(value, type);
    closeMenu();
    displayEntries();
}

function updateTotal(value, type){
    let exchangeRate = 1;
    switch(currentCurrency){
        case"dollar":
            exchangeRate = 1;
            break;
        case "euro":
            exchangeRate = 0.8560;
            break;
    }
    
    switch(type){
        case "expense":
            money-=value*exchangeRate;
            break;
        case"add":
            money+=value*exchangeRate;
            break;
        default:
            console.log("No Type preovided");
            return;
            
    }

    console.log(money, currentCurrency);
    
    display.textContent=`$${money.toFixed(2)}` 
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
        if(entry.type === "add"){
            html += `<div class="entry col-8 mx-auto bg-light rounded shadow p-3 mt-2">
                    <h5>Reason: ${entry.reason}</h5>
                    <h5 class="entry-sum">+$${entry.value.toFixed(2)}</h5>
                </div>`
        } else if(entry.type === "expense"){
            html += `<div class="entry col-8 mx-auto bg-light rounded shadow p-3 mt-2">
                    <h5>Reason: ${entry.reason}</h5>
                    <h5 class="entry-sum">-$${entry.value.toFixed(2)}</h5>
                </div>`
        }
    })
    entryDisplay.innerHTML = html;
}


//code need to be optimised, polish the function about changing the value