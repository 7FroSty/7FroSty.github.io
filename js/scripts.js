const cards=document.querySelectorAll(".card");
let htmlPoints=document.querySelector("#points");
let htmlTime=document.querySelector("#time");
let stats=document.querySelector(".stats");
let scoreBoard=document.querySelector(".scoreBoard");
let bgMusic=new Audio("audio/forsenbajs.mp3");
let notMatch=new Audio("audio/unlucky.mp3");
let match=new Audio("audio/godgamer.mp3");
let victory=new Audio("audio/doubters.mp3");
bgMusic.volume=0.1;
notMatch.volume=0.035;
match.volume=0.25;
victory.volume=0.25;
let canFlip=true;
let hasFlipped=false;
let firstCard, secondCard;
let points=0;
let time=0;
let correctPicks=0;
let firstClick=true;
let timer;
let username;

document.addEventListener("DOMContentLoaded", function(){
    username=prompt("Give me a username!");
})

cards.forEach(card=>card.addEventListener("click", flipCard));

function shuffleCards() {
    cards.forEach(card=>card.style.order=Math.floor(Math.random() * 14));
}

shuffleCards();

if (typeof bgMusic.loop=="boolean"){
    bgMusic.loop=true;
}
else{
    bgMusic.addEventListener("ended", function(){
        this.currentTime=0;
        this.play();
    }, false);
}

function flipCard(){
    if(firstClick){
        timer=setInterval(function(){
            time++;
            htmlTime.innerHTML=time;
        }, 1000);
        firstClick=false;
    }

    bgMusic.play();

    if(!canFlip) return;

    if(firstCard===this) return;

    this.classList.add("flipped");

    if(!hasFlipped){
        hasFlipped=true;
        firstCard=this;
        return;
    }

    secondCard=this;

    doesItMatch();
}

function doesItMatch(){
    let itMatches=firstCard.dataset.framework===secondCard.dataset.framework;

    if(itMatches){
        if(correctPicks<7) match.play();
        blockCards();
        points+=10;
        htmlPoints.innerHTML=points;
        correctPicks+=1;
        if(correctPicks===8){
            localStorage.setItem("user", username);
            localStorage.setItem("score", points);
            localStorage.setItem("seconds", time);
            clearTimeout(timer);
            stats.innerHTML="Username: "+localStorage.getItem("user")+"<br /> Score: "+localStorage.getItem("score")+" points<br />Time: "+localStorage.getItem("seconds")+" seconds";
            scoreBoard.classList.remove("hidden");
            bgMusic.pause();
            victory.play();
        }
    }

    if(!itMatches){
        notMatch.play();
        unflipCards();
        if(points>0) points-=2;
        htmlPoints.innerHTML=points;
    }
}

function blockCards(){
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);

    resetBoard();
}

function unflipCards(){
    canFlip=false;

    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');

        resetBoard();
    }, 1000);
}

function resetBoard(){
    canFlip=true;
    hasFlipped=false;
    firstCard=null;
    secondCard=null;
}

function refreshPage(){
    window.location.reload();
}

