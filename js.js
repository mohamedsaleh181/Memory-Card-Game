const back = document.getElementsByClassName("back");
const images = document.querySelectorAll(".images .image");
const card = document.getElementsByClassName("card");
const content = document.getElementsByClassName("content");
const okCards = document.getElementsByClassName("ok");
const hintBtn = document.getElementById("hint");
const tryBtn = document.getElementById("try");
const newBtn = document.getElementById("new");
const startBtn = document.getElementById("startbtn");
const againBtn = document.getElementById("playagain");
const hintCount = document.getElementById("hintcount");
let contents = Array.from(content);
let cards = Array.from(card);
let backs = Array.from(back);
let clickCounter = 0;
let idCheck = 100;
let cardId;
let timerCounter = 100;
let hintCounter = 0;
let flipCounter = 0;
let correct=0;
let t;
// ########################
cards.forEach((i) => {
    i.addEventListener("click", flip);
})
hintBtn.addEventListener("click", hint);
newBtn.addEventListener("click", newGame);
tryBtn.addEventListener("click", () => {
    hideblur();
    newGame();
})
startBtn.addEventListener("click", () => {
    hideblur();
    newGame();
})
againBtn.addEventListener("click", () => {
    hideblur();
    newGame();
})
// ########################
function newGame(){
    removeOk();
    clearInterval(t);
    timer();
    spreadImages();
    correct = 0;
    timerCounter = 100;
    hintCounter = 3;
    flipCounter = 0;
    idCheck = 100;
    clickCounter = 0;
    hintCount.innerHTML = `0${hintCounter}`;
    document.getElementById("flip-count").innerHTML = flipCounter;
}
// ########################
function spreadImages(){
    let x = 12;
    function rand(){return Math.floor(Math.random() * x)};
    let random;
    let arr = Array.from(images);
    let allImages = arr.concat(arr);
    Array.from(back).forEach((e) => {
        random = rand();
        console.log(random)
        console.log(allImages[random])
        e.append(allImages[random])
        allImages.splice(random,1);
        x--;
    })
}
// ########################
function flip(){
    this.removeEventListener("click", flip);
    this.querySelector(".content").classList.toggle("show");
    clickCounter++;
    if(clickCounter == 1){
        cardId = this.id;
        idCheck = this.querySelector(".image").id;
    };
    check(this);   
}
// ########################
function check(i){
    if(clickCounter == 2){
        if(idCheck != i.querySelector(".image").id){
            diffCards()
        }else {
            identicalCards()
        }
        removeClick();          // remove click from all cards to avoid flip three cards
        addClick();             // add click event to all card except ok cards
        flipIncrement();
    }
}
// ########################
function removeClick(){
    cards.forEach((i) => {
        i.removeEventListener("click", flip);
    })
}
// ########################
function addClick(){
    setTimeout(() => {
        cards.forEach((i) => {
            i.addEventListener("click", flip);
        });
        Array.from(okCards).forEach((i) => {
            i.removeEventListener("click", flip);
        });
    }, 800);
}
// ########################
function identicalCards(){
    document.querySelectorAll(`.card .content #\\3${idCheck} `).forEach((i) => {
        i.parentElement.parentElement.parentElement
        .removeEventListener("click", flip);                //remove click event from identical cards
        i.parentElement.parentElement.classList.add("ok");  // add class ok(show) to still flipped
        correct++;
        getStatus();
    });
    idCheck = 100;
    clickCounter = 0;
}
// ########################
function diffCards(){
    setTimeout(() => {
        contents.forEach((e) => {
            e.classList.remove("show");
        });
    }, 800);
    idCheck = 100;
    clickCounter = 0;
}
// ########################
function hint(){
    hintCounter--;
    hintCount.innerHTML = `0${hintCounter}`;
    if(hintCounter == 0){
        hintBtn.disabled = true;
    }
    contents.forEach((e) => {
        e.classList.add("show")
    });
    setTimeout(() => {
        contents.forEach((e) => {
            e.classList.remove("show")
        });
    }, 800);
}
// ########################
function getStatus(){
    if(hintCounter == 4 || flipCounter == 20 || timerCounter == 0){
        gameover();
    }
    if(correct == 12){
        win();
    }
}
// ########################
function gameover(){
    document.getElementById("over").classList.remove("hide");
}
// ########################
function win(){
    document.getElementById("win").classList.remove("hide");
    clearInterval(t);
    document.getElementById("timer").innerHTML = 00;
}
// ########################
function hideblur(){
    document.getElementById("over").classList.add("hide");
    document.getElementById("start").classList.add("hide");
    document.getElementById("win").classList.add("hide");
}
// ########################
function timer(){
    t = setInterval(() => {
        if(timerCounter < 0){
            gameover();
            clearInterval(t);
            return 0;
        }
        document.getElementById("timer").innerHTML = timerCounter;
        timerCounter--;
    }, 1000);
}
// ########################
function flipIncrement(){
    flipCounter++;
    document.getElementById("flip-count").innerHTML = flipCounter;
    getStatus();
}
// ########################
function removeOk(){
    Array.from(okCards).forEach((i) => {
        i.classList.remove("ok");
        i.classList.remove("show");
        console.log("remove one ok")
    });
}
// ########################