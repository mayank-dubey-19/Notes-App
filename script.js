let notes_number = 0;
let selecteddiv = null;

let Add = document.querySelector(".notes-add-btn");
let all_notes = document.querySelector(".all-notes-btn");
let trash = document.querySelector(".trash-btn");
let save = document.querySelector(".save-btn");

let titleInput = document.querySelector(".notes-title-input");
let textarea = document.querySelector("textarea");


function saveNotesToLocalStorage() { 
    let notes = []; 
    let allNotes = document.querySelectorAll(".div1-style"); 
    allNotes.forEach(function (note) { 
        notes.push({ title: note.dataset.title, content: note.dataset.content }); 
    }); 

    localStorage.setItem("notes", JSON.stringify(notes)); 
}

function loadNotesFromLocalStorage() { 
    let notes = JSON.parse(localStorage.getItem("notes")) || []; 
    notes.forEach(function (note) { 
        createNote(note.title, note.content); 
    }); 
    notes_number = notes.length; 
    document.querySelector(".notes-counter").innerHTML = "Total Notes : " + String(notes_number).padStart(2, 0);
}

function createNote(tittle, content) {
    let div0 = document.querySelector(".middle-sidebar");

    let div1 = document.createElement("div");
    div1.classList.add("div1-style");

    let div2 = document.createElement("div");
    div2.classList.add("div2tittle");
    let bold = document.createElement("b");
    bold.innerHTML = tittle;
   

    let div3 = document.createElement("div");
    div3.classList.add("div3-style");
    div3.innerHTML = content;

    div1.dataset.title = tittle;
    div1.dataset.content = content;

    div0.appendChild(div1);
    div1.appendChild(div2);
    div1.appendChild(div3);
    div2.appendChild(bold);

    div1.addEventListener("click", function () {
        selecteddiv = this ;
        titleInput.value = this.dataset.title;
        textarea.value = this.dataset.content;

    });
    
    return;
}

Add.addEventListener("click", function () {

    titleInput.value = "";
    textarea.value = "";

    titleInput.focus();

});


save.addEventListener("click", function () {

    // Current title and content

    let tittle = titleInput.value.trim();
    let content = textarea.value.trim();

    if (tittle === "") {

        alert("Please enter a note title.");
        titleInput.focus();
        return;

    }

    let existingNotes = document.querySelectorAll(".div1-style");

    for (let note of existingNotes) {

        if (note.dataset.title.toLowerCase() === tittle.toLowerCase() ) {

            note.dataset.content = content;
            let div3 = note.querySelector(".div3-style");
            div3.innerHTML = content;
            saveNotesToLocalStorage();
            return;

        }

    }

    createNote(tittle, content);
    
    notes_number++ ; 
    document.querySelector(".notes-counter").innerHTML ="Total Notes : "+String(notes_number).padStart(2,0);

    saveNotesToLocalStorage();

});

document.querySelector(".delete-btn").addEventListener("click",function(){

    if (selecteddiv !== null) {
        
        notes_number--;
        selecteddiv.remove();
        selecteddiv = null;
        titleInput.value = "";
        textarea.value = "";
        document.querySelector(".notes-counter").innerHTML ="Total Notes : "+String(notes_number).padStart(2,0);
        saveNotesToLocalStorage();

    }

});

document.querySelector(".all-notes-btn").addEventListener("click",function(){

    document.querySelectorAll(".div1-style").forEach(function(note) {
       note.remove();
    });

    loadNotesFromLocalStorage();

});

let searchtittle = document.querySelector(".searchbar-input");


searchtittle.addEventListener("input",function(){
    
    let alldivtittle = document.querySelectorAll(".div2tittle");

    alldivtittle.forEach(function(title){

      if(title.innerHTML.toLowerCase().includes(searchtittle.value.toLowerCase())){
         title.parentElement.style.display = "block";
      }
      else{
          title.parentElement.style.display = "none";
      }

        if(searchtittle.value.trim()===""){
          alldivtittle.forEach(function(title){
              title.parentElement.style.display = "";
          });
      }
    
   });
});