// creat Varibauls
let input = document.querySelector('.input-box input[type="text"]');
let btn = document.querySelector('.input-box button');
let list = document.querySelector('.list-body ul');

// get all value from localstorage
let liArr = localStorage.getItem('liArr');
// localStorage.clear('liArr');

// chick localStorage if not find
// creat new and reload page
if(liArr === null){
    localStorage.setItem('liArr',"");
    location.reload();
}
// creat list item from localstorage
let liEements = liArr.split("^");
liEements.forEach(el=>{
    // change the item to array has text and time
    let element = el.split('$$');

    if(el.trim() !== "" && el !== "null" && el !== null){

        creatlistItem(element[0], element[1], true);
    }
})

// when clicked in the add button
// will start function and creat new li elemints
btn.addEventListener("click", ()=>{
    if(input.value.trim() !== ""){
        // Add Time from input number and select box(Day,Hour,Minute)
        let timeNow = Date.now();
        let timeSelectid = document.querySelector('input[type="number"]').value;
        let timeLong = document.querySelector('select').selectedIndex;
        // add the selected time to now time
        let time = timeNow + timeChoose(timeSelectid, timeLong);

        creatlistItem(input.value.trim(), time, false);
        input.value = "";
    }
});

// creat li element function
// text => the text it will added to li
// old => to chick if this text new or old couse add it to localstorage
function creatlistItem(text, time, old = true){
    // create li
    let li = document.createElement("li");

    // create checkbox input
    let checkbox = document.createElement("input");
    checkbox.setAttribute('type','checkbox');

    // if user finiched it will add class check
    if(text.includes('finIshed')){
        text = text.replace(/finIshed/g,'');
        li.classList.add("check");
        checkbox.checked = true;
    }
    
    // creat span and add text to it
    let spanLi = document.createElement('span');
    spanLi.textContent = text;

    // create small tag and add time to it
    let timeEl = document.createElement('small');
    timeEl.textContent = calcTime(time);
    if(timeEl.textContent === 'Finished')
        li.classList.add('finish');
    
    // creat x button
    let x = document.createElement("a");
    x.textContent = "x";
    x.classList.add("remove");
    
    // add elements to li
    li.appendChild(checkbox);
    li.appendChild(spanLi);
    li.appendChild(timeEl)
    li.appendChild(x);
    // add li to list
    list.appendChild(li);
    // chick the value if new or old
    if(!old){
        liArr += "^" + text +"$$"+time;
        localStorage.setItem('liArr',liArr);
    }
    // function add event listen to remove button
    removeElem(x,time);
    // function add event listen to check(finish) button
    finishedItem(checkbox);
}

// create array and include to it the all remove button
let remove = document.querySelectorAll(".remove");
// loop to all elemints inside remove button's array
remove.forEach(remove=>{
    // function add event listen to all remove button
    removeElem(remove);
})

// function add event listen to remove button
function removeElem(remove,time, finish = true){
    // remove event
    remove.addEventListener('click', ()=>{
        if(liArr.includes("^"+remove.parentElement.querySelector('span').textContent+"finIshed"))
            liArr = liArr.replace("^"+remove.parentElement.querySelector('span').textContent+"finIshed$$"+time,'');
        else
            liArr = liArr.replace("^"+remove.parentElement.querySelector('span').textContent+"$$"+time,'');
        // remove text from local storage

        // remove li (the x button's perant)
        remove.parentElement.remove();

        // update localStorage
        localStorage.setItem('liArr',liArr);
    })
}

// create array and include to it the all checkbox
let finishChick = document.querySelectorAll('input[type = "checkbox"]');
// loop to all elemints inside checkbox's array
finishChick.forEach(el=>{
    // function add event listen to all checkbox
    finishedItem(el);
})

function finishedItem(finish){
    finish.addEventListener("click", ()=>{
        // if user select true 
        if(finish.checked){
            // add class
            finish.parentElement.classList.add("check");
            // get li text
            let str = "^"+finish.parentElement.querySelector('span').textContent;
            // edit the text in the storage and add to it finIshed word
            liArr = liArr.replace(str, `${str}finIshed`);
            // save the values
            localStorage.setItem('liArr',liArr);

        }
        // if user select true 
        else{
            // remove class
            finish.parentElement.classList.remove("check");
            // get li text
            let str = "^"+finish.parentElement.querySelector('span').textContent;
            // remove finIshed word from the storage
            liArr = liArr.replace(`${str}finIshed`, str);
            // save the values
            localStorage.setItem('liArr',liArr);
        }
    });
}

function timeChoose(timeinput, timelong){
    // change the selected number to seconds
    // Minutes
    if(timelong === 0)
        return timeinput *= 1000 * 60 ;
    // Hours
    if(timelong === 1)
        return timeinput *= 1000 * 60 * 60;
    // Days
    if(timelong === 2)
        return timeinput *= 1000 * 60 * 60 * 24;
}


function calcTime(time){
    // calc the time
    let now = Date.now();
    time = (time - now);

    // change seconds to (Days,Hours,Minutes,Seconds,Finished)
    if(time > 86400000){
        return `${Math.floor(time / 86400000)} Days`;
    }else if(time > 3600000){
        return `${Math.floor(time / 3600000)} Hours`;
    }else if(time > 60000){
        return `${Math.floor(time / 60000)} Minutes`;
    }else if(time > 0){
        return `${Math.floor(time / 1000)} Seconds`
    }else{
        return `Finished`;
    }
}