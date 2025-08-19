// localStorage.clear();
let money = Number(localStorage.getItem("money")) || 0;
console.log(money);

let currentCurrency = localStorage.getItem("currentCurrency") || "dollar";
let symbol = "$";
let exchangeRate = 1;
const entries = JSON.parse(localStorage.getItem("entries")) || [];

window.addEventListener("DOMContentLoaded", () => {
    checkCurrency();
    updateTotal(0, "");
    displayEntries();
})

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
    const valueInput = document.getElementById("amount");
    const reasonInput = document.getElementById("reason");
    
    let value = Number(valueInput.value);
    checkCurrency();

    value /= exchangeRate;
    console.log(value, symbol);
    
    let reason = String(reasonInput.value);

    if(isNaN(value) || value <= 0){
        window.alert("Value cannot be less than 0");
        return;
    } else if(reason.length >= 20 || reason.trim() == ""){
        window.alert("Reason should be less than 15 symbols");
        return;
    }
    console.log(reason);
    console.log(type);

    let date = new Date();
    date = String(`${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`)
    
    entries.push(new Entry(type, value, reason, date));
    localStorage.setItem("entries", JSON.stringify(entries));

    console.log(entries);
    
    updateTotal(value, type);
    displayEntries();
    closeMenu();

    valueInput.value = "";
    reasonInput.value = "";

}

function removeEntry(index){
    const removingValue = entries[index].value;
    let entryType = entries[index].type;
    console.log(entryType);
    

    entries.splice(index, 1);
    localStorage.setItem("entries", JSON.stringify(entries));

    if(entryType === "expense"){
        entryType = "add";
    } else{
        entryType = "expense";
    }

    updateTotal(removingValue, entryType);
    displayEntries();
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
    localStorage.setItem("money", String(money.toFixed(2)));

    const displayMoney = `${symbol}${(money*exchangeRate).toFixed(2)}`
    display.innerHTML = displayMoney;

}

class Entry{
    constructor(type, value, reason, date){
        this.type = type,
        this.value = value,
        this.reason = reason
        this.date = date;
    }
}

function displayEntries() {
    let index = 0;
    const entryDisplay = document.querySelector("#Entries");
    let html = "";
    const displayingEntries = true;
    if (entries) {
        entries.forEach(entry => {
            const entryValue = entry.value * exchangeRate;
            const entryDate = entry.date;
            if (entry.type === "add") {
                html += `<div class="entry col-8 mx-auto bg-light rounded shadow p-3 mt-2">
                    <h6>Date: ${entryDate}</h6>
                    <h5>Reason: ${entry.reason}</h5>
                    <h5 class="entry-sum">+${symbol}${entryValue.toFixed(2)}</h5>
                    <button class="btn btn-danger p-1 rounded" onclick="removeEntry(${index})">Delete</button>
                </div>`
            } else if (entry.type === "expense") {
                html += `<div class="entry col-8 mx-auto bg-light rounded shadow p-3 mt-2">
                    <h6>Date: ${entryDate}</h6>
                    <h5>Reason: ${entry.reason}</h5>
                    <h5 class="entry-sum">-${symbol}${entryValue.toFixed(2)}</h5>
                    <button class="btn btn-danger p-1 rounded" onclick="removeEntry(${index})">Delete</button>
                </div>`
            }

            index++;
        })
        entryDisplay.innerHTML = html;
        console.log("index ", index);
    }
}

function changeCurrency(){
    if (currentCurrency ==="euro"){
        currentCurrency = "dollar";
    } else{
        currentCurrency = "euro";
    }

    localStorage.setItem("currentCurrency", currentCurrency);
    checkCurrency();
    updateTotal(0, "");
    displayEntries();
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

function filterEntries(filter){
    checkCurrency();
    let index = 0;
    const entryDisplay = document.querySelector("#Entries");
    let html = "";
    for(let i = 0; i<= entries.length - 1; i++){
        if(filter==="expense" && entries[i].type ==="expense"){
            html+=`<div class="entry col-8 mx-auto bg-light rounded shadow p-3 mt-2">
                    <h6>Date: ${entries[i].date}</h6>
                    <h5>Reason: ${entries[i].reason}</h5>
                    <h5 class="entry-sum">-${symbol}${(entries[i].value*exchangeRate).toFixed(2)}</h5>
                    <button class="btn btn-danger p-1 rounded" onclick="removeEntry(${index})">Delete</button>
                </div>`
        } else if(filter==="add" && entries[i].type ==="add"){
            html+=`<div class="entry col-8 mx-auto bg-light rounded shadow p-3 mt-2">
                    <h6>Date: ${entries[i].date}</h6>
                    <h5>Reason: ${entries[i].reason}</h5>
                    <h5 class="entry-sum">+${symbol}${(entries[i].value*exchangeRate).toFixed(2)}</h5>
                    <button class="btn btn-danger p-1 rounded" onclick="removeEntry(${index})">Delete</button>
                </div>`
        }

        index++;
    }

    entryDisplay.innerHTML = html;
}

//code need to be optimised, polish the function about changing the value