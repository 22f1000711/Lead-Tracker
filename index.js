import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js"
import { getDatabase,
         ref,
         push,
         onValue,
         remove } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-database.js"

const firebaseConfig = {
    databaseURL: "https://choreslist-86076-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const referenceInDB = ref(database, "chores")

const urlInputEl = document.getElementById("input-el")
const addButtonEl = document.getElementById("input-btn")
const deleteAllButtonEl = document.getElementById("delete-btn")
const ulEl = document.getElementById("ul-el")

function render(chores) {
    let listItems = ""
    for (let i = 0; i < chores.length; i++) {
        listItems += `
            <li>${chores[i]}</li>
        `
    }
    ulEl.innerHTML = listItems
}

onValue(referenceInDB, function(snapshot) {
    const snapshotDoesExist = snapshot.exists()
    if (snapshotDoesExist) {
        const snapshotValues = snapshot.val()
        const chores = Object.values(snapshotValues)
        render(chores)
    } 
})

deleteAllButtonEl.addEventListener("dblclick", function() {
    remove(referenceInDB)
    ulEl.innerHTML = ""
})

addButtonEl.addEventListener("click", function() {
    push(referenceInDB, urlInputEl.value)
    urlInputEl.value = ""
})