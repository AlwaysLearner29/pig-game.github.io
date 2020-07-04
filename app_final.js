/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var dice2,dice1,diceScore,scoreSet;
var playerScore=[0,0];//setting initial score of both players zero
var activePlayer=0;//currenty atcie player is "0".second player is marked as "1"
var activePlayerScore=0;

function setupInit(){//funtion for intial web page setup
document.querySelector(".dice-1").style.display="none";
document.querySelector(".dice-2").style.display="none";
//active score initially zero
 dice1=Math.floor((Math.random()*6+1));
 dice2=Math.floor((Math.random()*6+1));
 diceScore=dice1+dice2;

document.querySelector("#current-0").textContent=0;
document.querySelector("#current-1").textContent=0;//generating random number
}
function setupScore(){
    if(activePlayer===0){
        document.querySelector("#score-"+activePlayer).textContent=playerScore[activePlayer];
        document.querySelector("#score-"+(activePlayer+1)).textContent=playerScore[activePlayer+1];  
    }
    else{
        document.querySelector("#score-"+(activePlayer-1)).textContent=playerScore[activePlayer-1];
        document.querySelector("#score-"+activePlayer).textContent=playerScore[activePlayer];
    }
    
}
function setupCurrent(){
   
}
setupInit();
setupScore();
var gameStarter=true;

//click-roll event listener ..

    document.querySelector(".btn-roll").addEventListener("click",function(){
        if(gameStarter){
            setupInit();
            setupScore();
             scoreSet=document.querySelector(".score-set").value;
             console.log(scoreSet);
            if(dice1!==1 && dice2!==1){
                activePlayerScore+=diceScore;
                document.querySelector("#current-"+activePlayer).textContent=activePlayerScore;
                document.querySelector(".dice-1").src="dice-"+dice1+".png";
                document.querySelector(".dice-1").style.display="block";
                document.querySelector(".dice-2").src="dice-"+dice2+".png";
                document.querySelector(".dice-2").style.display="block";
               
            }
            else{
                document.querySelector(".dice-1").src="dice-"+dice1+".png";
                document.querySelector(".dice-1").style.display="block";
                document.querySelector(".dice-2").src="dice-"+dice2+".png";
                document.querySelector(".dice-2").style.display="block";
                activePlayerScore=0;
                playerScore[activePlayer]=activePlayerScore;
                nextPlayer();
            }
        }   
    }) 

function nextPlayer(){
        if(gameStarter){
            activePlayer===0?activePlayer=1:activePlayer=0;
            document.querySelector(".player-0-panel").classList.toggle("active");
            document.querySelector(".player-1-panel").classList.toggle("active");
        }
             
}
//hold event
document.querySelector(".btn-hold").addEventListener("click",function(){
document.querySelector(".dice-1").style.display="none";
document.querySelector(".dice-2").style.display="none";
document.getElementById("current-"+activePlayer).textContent=0;
playerScore[activePlayer]+=activePlayerScore;
  if(playerScore[activePlayer]>=scoreSet){
    document.querySelector("#name-"+activePlayer).textContent="Winner!";
    document.querySelector(".player-"+activePlayer+"-panel").classList.remove("active");
    document.querySelector(".player-"+activePlayer+"-panel").classList.add("winner");
    gameStarter=false;
  }
  activePlayerScore=0;
  setupScore();
  nextPlayer();
})
//new game event
document.querySelector(".btn-new").addEventListener("click",function(){
    document.querySelector("#name-0").textContent="Player 1";
    document.querySelector("#name-1").textContent="Player 2";
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    activePlayer=0;
    playerScore=[0,0];
    activePlayerScore=0;
    gameStarter=true;
    setupInit();
    setupScore();
})