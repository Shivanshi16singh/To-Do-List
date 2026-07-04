let addBtn= document.querySelector("#addEntryBtn");
let newDiv= document.querySelector(".enterNew");
let form= document.querySelector(".enterNew form");
let textInput= document.querySelector("#text");
let dateInput= document.querySelector("#date");
let subCont= document.querySelector("#submtCont");
let logoutBtn= document.querySelector("#logoutBtn");
let currentUser= localStorage.getItem("loggedInUser");
let entries= JSON.parse(localStorage.getItem("entries_" + currentUser)) || [];
renderEntries();
addBtn.addEventListener("click",()=>{
    newDiv.classList.toggle("show");
});
form.addEventListener("submit",(e)=>{
    e.preventDefault();
    let txt= textInput.value.trim();
    let date= dateInput.value;
    if (txt === ""|| date=== ""){
        alert("Please fill in both text and date.");
        return;
    }
    entries.push({ text: txt, date: date, completed: false });
    saveEntries();
    textInput.value = "";
    dateInput.value = "";
    newDiv.classList.remove("show");
    renderEntries();
});
function renderEntries(){
    subCont.innerHTML = "";
    entries.forEach((entry, index)=>{
        let card = document.createElement("div");
        card.classList.add("entryCard");
        if (entry.completed) card.classList.add("completed");
        card.innerHTML = `
            <div class="newValue">
                <div class="showDate">${entry.date}</div>
                <div class="showTxt">${entry.text}</div>
            </div>
            <div class="btnGp">
                <label for="completed-${index}">Completed</label>
                <input type="checkbox" class="completeCheckbox" id="completed-${index}" data-index="${index}" ${entry.completed ? "checked" : ""}>
                <button class="newBtn deleteBtn" data-index="${index}">Delete</button>
            </div>
        `;
        subCont.appendChild(card);
    });
}
subCont.addEventListener("click",(e)=>{
    if (e.target.classList.contains("deleteBtn")){
        let index = e.target.dataset.index;
        entries.splice(index, 1);
        saveEntries();
        renderEntries();
    }
});
subCont.addEventListener("change",(e)=>{
    if (e.target.classList.contains("completeCheckbox")){
        let index = e.target.dataset.index;
        entries[index].completed = e.target.checked;
        saveEntries();
        renderEntries();
    }
});
function saveEntries(){
    localStorage.setItem("entries_" + currentUser, JSON.stringify(entries));
}
logoutBtn.addEventListener("click",()=>{
    localStorage.removeItem("loggedInUser");
    window.location.href = "index.html";
});