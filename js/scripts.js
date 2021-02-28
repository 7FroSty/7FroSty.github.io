const cards=document.querySelectorAll(".card");
let htmlPoints=document.querySelector("#points");
let htmlTime=document.querySelector("#time");
let bgmusic=new Audio("audio/forsenbajs.mp3");
let notmatch=new Audio("audio/unlucky.mp3");
let match=new Audio("audio/godgamer.mp3");
let victory=new Audio("audio/doubters.mp3");
bgmusic.volume=0.15;
notmatch.volume=0.035;
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

cards.forEach(card=>card.addEventListener("click", flipCard));

function shuffleCards() {
    cards.forEach(card=>card.style.order=Math.floor(Math.random() * 14));
}

shuffleCards();

function flipCard(){
    if(firstClick){
        timer=setInterval(function(){
            time++;
            htmlTime.innerHTML=time;
        }, 1000);
        bgmusic.play();
        firstClick=false;
    }

    if(!canFlip) return;

    if(firstCard===this) return;

    this.classList.toggle("flipped");

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
        if(correctPicks==8){
            clearTimeout(timer);
            bgmusic.pause();
            victory.play();
        }
    }

    if(!itMatches){
        notmatch.play();
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

