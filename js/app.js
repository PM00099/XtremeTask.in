showNotes();
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
    let addTitle = document.getElementById("addTitle");
    let adddesc = document.getElementById("adddesc");
    let adddate = document.getElementById("adddate");
    let addpr = document.getElementById("addpr");
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let myObj = {
        title:addTitle.value,
        text:adddesc.value,
        date:adddate.value,
        priority:addpr.value.default="Normal"
    }
    notesObj.push(myObj);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTitle.value = "";
    adddesc.value = "";
    adddate.value = "";
    addpr.value = "";
    showNotes();
});

function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
            <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">Title : ${element.title}</h5>
                        <p class="card-text"> <b>Description : </b>${element.text}</p>
                        <p class="card-text"> <b>Created Date : </b>${element.date}</p>
                        <p class="card-text"><b>Priority : </b> ${element.priority}</p>
                        <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Task</button>
                    </div>
                </div>`;
    });
    let notesElm = document.getElementById("notes");
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    } else {
        notesElm.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`;
    }
}

function deleteNote(index) {

    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index,1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}

let search = document.getElementById('searchTxt');
search.addEventListener("input",function(){
    
    let inputVal = search.value.toLowerCase();
    // console.log("Input event fired!",inputVal);
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if(cardTxt.includes(inputVal)){
            element.style.display = 'block';
        }
        else{
            element.style.display = 'none';
        }
    });
});
