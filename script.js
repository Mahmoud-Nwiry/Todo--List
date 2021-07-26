// creat Varibauls
let input = document.querySelector(".input-box input");
let btn = document.querySelector(".input-box button");
let list = document.querySelector(".list-body ul");

// get all value from localstorage
let liArr = localStorage.getItem('liArr');
// localStorage.clear('liArr');

// chick localStorage if not find
// creat new
if(liArr === null){
    localStorage.setItem('liArr',"");
    location.reload();
}
// creat list item from localstorage
let liEements = liArr.split("^");
liEements.forEach(el=>{
    if(el === "finIshed"){
        el="";
    }
    if(el.trim() !== "" && el !== "null" && el !== null){
        creatlistItem(el, true);
    }
})

// when clicked in the add button
// will start function and creat new li elemints
btn.addEventListener("click", ()=>{
    if(input.value.trim() !== ""){
        creatlistItem(input.value.trim(),false)
        input.value = "";
    }
});

// creat li element function
// text => the text it will added to li
// old => to chick if this text new or old couse add it to localstorage
function creatlistItem(text, old = true){
    // create li
    let li = document.createElement("li");

    // create checkbox input
    let checkbox = document.createElement("input");
    checkbox.setAttribute('type','checkbox');

    if(text.includes('finIshed')){
        text = text.replace(/finIshed/g,'');
        li.classList.add("check");
        checkbox.checked = true;
    }
    
    // creat span and add text to it
    let spanLi = document.createElement('span');
    spanLi.textContent = text;
    
    // creat x button
    let x = document.createElement("a");
    x.textContent = "x";
    x.classList.add("remove");
    
    // add elements to li
    li.appendChild(checkbox);
    li.appendChild(spanLi);
    li.appendChild(x);
    // add li to list
    list.appendChild(li);

    // chick the value if new or old
    if(!old){
        liArr += "^" + text;
        localStorage.setItem('liArr',liArr);
    }

    // function add event listen to remove button
    removeElem(x);

    finishedItem(checkbox);
}

// creat array and include to it the all remove button
let remove = document.querySelectorAll(".remove");
// loop to all elemints inside remove button's array
remove.forEach(remove=>{
    // function add event listen to all remove button
    removeElem(remove);
})

// function add event listen to remove button
function removeElem(remove, finish = true){
    // remove event
    remove.addEventListener('click', ()=>{

        // remove text from local storage
        liArr = liArr.replace("^"+remove.parentElement.querySelector('span').textContent,'');

        // remove li (the x button's perant)
        remove.parentElement.remove();

        // update localStorage
        localStorage.setItem('liArr',liArr);
    })
}

let finishChick = document.querySelectorAll('input[type = "checkbox"]');
finishChick.forEach(el=>{
    finishedItem(el);
})

function finishedItem(finish){
    finish.addEventListener("click", ()=>{
        if(finish.checked){
            finish.parentElement.classList.add("check");
            let str = "^"+finish.parentElement.querySelector('span').textContent;
            liArr = liArr.replace(str, `${str}finIshed`);
            localStorage.setItem('liArr',liArr);
        }else{
            finish.parentElement.classList.remove("check");
            let str = "^"+finish.parentElement.querySelector('span').textContent;
            liArr = liArr.replace(`${str}finIshed`, str);
            localStorage.setItem('liArr',liArr);
        }
    });
}