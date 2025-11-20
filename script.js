// localStorage.clear();
let money = Number(localStorage.getItem("money")) || 0;
console.log(money);

let currentCurrency = localStorage.getItem("currentCurrency") || "dollar";
let symbol = "$";
let exchangeRate = 1;
let filter = "none";
let dateFilter = "none";
const entries = JSON.parse(localStorage.getItem("entries")) || [];
let filterDisplay = document.getElementById("currentFilter");

window.addEventListener("DOMContentLoaded", () => {
    filterDisplay.textContent = `Current Filter: ${filter}`;
    checkCurrency();
    updateTotal(0, "");
    displayEntries(filter, entries);
    
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
    const menus = document.querySelectorAll(".menu");

    for(let i = 0; i <= menus.length - 1; i++){
        const currentMenu = menus[i];
        currentMenu.classList.remove("d-flex");
        currentMenu.classList.add("d-none");
    }
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
        window.alert("Value cannot be less than 1");
        return;
    } else if(reason.length >= 20 || reason.trim() == ""){
        window.alert("Reason should be less than 15 symbols and more than 0 symbols");
        return;
    }
    console.log(reason);
    console.log(type);

    let date = new Date();
    date = String(`${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`)
    
    entries.push(new Entry(type, value, reason, date));
    localStorage.setItem("entries", JSON.stringify(entries));

    console.log(entries);
    
    filter = "none";
    updateTotal(value, type);
    displayEntries(filter, entries);
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
    displayEntries(filter, entries);
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
        this.date = date,
        this.typeSymbol 
        if(type === "add"){
            this.typeSymbol = "+"
        } else{
            this.typeSymbol = "-"
        }
    }
}

function displayEntries(filter, entryArr) {
    filterDisplay.textContent = `Current Filter: ${filter}`;
    
    let index = 0;
    let html = "";
    const entriesDisplay = document.getElementById("Entries");
    if(filter === "none"){
         entryArr.forEach(entry => {
            const entryValue = entry.value * exchangeRate;
            const entryDate = entry.date;
            const typeSymbol = entry.typeSymbol;
            html += `<div class="entry col-12 mx-auto bg-light rounded shadow p-3 mt-2">
                    <h6>Date: ${entryDate}</h6>
                    <h5>Reason: ${entry.reason}</h5>
                    <h5 class="entry-sum">${typeSymbol}${symbol}${entryValue.toFixed(2)}</h5>
                    <button class="btn btn-danger p-1 rounded" onclick="removeEntry(${index})">Delete</button>
                </div>`

            index++;
        })
    } else{
        entryArr.forEach(entry => {
            if(entry.type === filter){
            const entryValue = entry.value * exchangeRate;
            const entryDate = entry.date;
            const typeSymbol = entry.typeSymbol;
            html += `<div class="entry col-12 mx-auto bg-light rounded shadow p-3 mt-2">
                    <h6>Date: ${entryDate}</h6>
                    <h5>Reason: ${entry.reason}</h5>
                    <h5 class="entry-sum">${typeSymbol}${symbol}${entryValue.toFixed(2)}</h5>
                    <button class="btn btn-danger p-1 rounded" onclick="removeEntry(${index})">Delete</button>'
                </div>`;
            }
            
            index++;
        });
    }

    entriesDisplay.innerHTML = html;
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
    displayEntries(filter, entries);
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

const filterBtns = document.querySelectorAll("#filterBtn");

filterBtns.forEach(button =>{
    button.addEventListener("click", () =>{
        filter = button.getAttribute("filter");
        displayEntries(filter, entries);
    })
})

function toggleDateFilter(){
    const dateFilterMenu = document.querySelector(".date-filter-menu");
    if(dateFilterMenu.classList.contains("d-none")){
        dateFilterMenu.classList.remove("d-none");
        dateFilterMenu.classList.add("d-flex");
    } else{
         dateFilterMenu.classList.remove("d-flex");
         dateFilterMenu.classList.add("d-none");
    }
}

const filterDatesBtn = document.getElementById("filterDatesBtn");

filterDatesBtn.addEventListener("click", function(){
    filterDate(entries);
    toggleDateFilter();
})

function filterDate(entriesArr){
    filterDisplay.textContent = `Current Filter: ${filter}`;
    
    let filterDate = String(document.getElementById("start-date").value);
    filterDate = filterDate.replaceAll(".", "/").trim();
    
    let index = 0;
    let html = "";
    entriesArr.forEach(entry =>{
        const entryDate = String(entry.date);
        if(entryDate.includes(filterDate)){
            const entryValue = entry.value * exchangeRate;
            const typeSymbol = entry.typeSymbol;
            html += `<div class="entry col-12 mx-auto bg-light rounded shadow p-3 mt-2">
                    <h6>Date: ${entryDate}</h6>
                    <h5>Reason: ${entry.reason}</h5>
                    <h5 class="entry-sum">${typeSymbol}${symbol}${entryValue.toFixed(2)}</h5>
                    <button class="btn btn-danger p-1 rounded" onclick="removeEntry(${index})">Delete</button>
                    <button class="btn btn-primary p-1 rounded" onclick="edit(${index})">Edit</button>
                </div>`;
        }

        index++;
    })

    const entriesDisplay = document.getElementById("Entries");
    entriesDisplay.innerHTML = html;
}




//code need to be optimised, polish the function about changing the value