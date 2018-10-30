"use strict";

var params = {
  buttonNew: document.getElementById("new-game"),
  output: document.getElementById("output"),
  result: document.getElementById("result"),
  roundCounter: document.getElementById("round-count"),
  roundsNumber: "roundsNumber",
  roundCount: "roundCount",
  humanChoice: "humanChoice",
  computerChoice: "computerChoice",
  humanScore: "humanScore",
  computerScore: "computerScore",
  roundInfo: "roundInfo",
  progress: []
};

function init() {
  var playerMoves = document.querySelectorAll(".player-move");
  for (var i = 0; i < playerMoves.length; i++) {
    playerMoves[i].addEventListener("click", choose);
  }
}

init();

function choose(e) {
  var element = e.target;
  params.humanChoice = element.getAttribute("data-move");
  computerChoose();
  gameResult();
}

function computerChoose() {
  params.roundInfo++;
  var p2choice = Math.floor(Math.random() * 3 + 1);
  if (p2choice == 1) {
    params.computerChoice = "Paper";
  } else if (p2choice == 2) {
    params.computerChoice = "Rock";
  } else {
    params.computerChoice = "Scissors";
  }
}

var gameResult = function() {
  var winner;
  if (params.humanChoice == params.computerChoice) {
    params.output.innerHTML = "Tie";
    winner = "Tie";
  } else if (
    (params.humanChoice == "Paper" && params.computerChoice == "Rock") ||
    (params.humanChoice == "Rock" && params.computerChoice == "Scissors") ||
    (params.humanChoice == "Scissors" && params.computerChoice == "Paper")
  ) {
    winner = "Human";
    params.humanScore++;
    params.output.innerHTML =
      "YOU WON: you played " +
      params.humanChoice +
      ", computer played " +
      params.computerChoice;
  } else {
    winner = "Computer";
    params.computerScore++;
    params.output.innerHTML =
      "COMPUTER WON: you played " +
      params.humanChoice +
      ", computer played " +
      params.computerChoice;
  }
  params.result.innerHTML =
    "Human: " + params.humanScore + " " + "Computer: " + params.computerScore;
  params.progress.push({
    roundInfo: params.roundInfo,
    playerMove: params.humanChoice,
    pcMove: params.computerChoice,
    roundWinner: winner,
    scores: params.humanScore + " - " + params.computerScore
  });
  counter();
  console.log(params.progress);
};

function newGame() {
  params.roundsNumber = window.prompt("Choose number of rounds to win");
  if (isNaN(params.roundsNumber) || params.roundsNumber <= 0) {
    params.output.innerHTML = "";
    params.result.innerHTML = "";
    params.roundCounter.innerHTML = "Wrong number";
  } else {
    params.progress = [];
    params.roundCount = params.roundsNumber;
    params.roundInfo = 0;
    params.humanScore = 0;
    params.computerScore = 0;
    params.output.innerHTML = "";
    params.result.innerHTML = "";
    params.roundCounter.innerHTML = "";
    params.buttonNew.classList.add("disabled");
    button1.classList.remove("disabled");
    button2.classList.remove("disabled");
    button3.classList.remove("disabled");
  }
}
params.buttonNew.addEventListener("click", newGame);

function counter() {
  if (
    params.roundCount == params.humanScore ||
    params.roundCount == params.computerScore
  ) {
    params.buttonNew.classList.remove("disabled");
    button1.classList.add("disabled");
    button2.classList.add("disabled");
    button3.classList.add("disabled");
    
    if (params.humanScore > params.computerScore) {
      params.roundCounter.innerHTML = "Human won";
    } else {
      params.roundCounter.innerHTML = "Computer won";
    }
    generateProgress();
    showModal();
  }
}

var showModal = function() {
  console.log("showModal");
  var modals = document.querySelectorAll(".modal");
  for (var i = 0; i < modals.length; i++) {
    modals[i].classList.remove("show");
  }
  document.querySelector("#modal-one").classList.add("show");

  document.querySelector("#modal-overlay").classList.add("show");
}; //end of showModal function

var hideModal = function(event) {
  event.preventDefault();
  document.querySelector("#modal-overlay").classList.remove("show");
};

var closeButtons = document.querySelectorAll(".modal .close");

for (var i = 0; i < closeButtons.length; i++) {
  closeButtons[i].addEventListener("click", hideModal);
}

document.querySelector("#modal-overlay").addEventListener("click", hideModal);

var modals = document.querySelectorAll(".modal");

for (var i = 0; i < modals.length; i++) {
  modals[i].addEventListener("click", function(event) {
    event.stopPropagation();
  });
}

var generateProgress = function(){
  var resultWrapper = document.getElementById("modal-results");
     resultWrapper.innerHTML = "";
  params.progress.forEach(function(elem){
  var content = document.createElement("tr");
  content.innerHTML = '<td>' + elem.roundInfo + '</td><td>' + elem.playerMove + '</td><td>' + elem.pcMove + '</td><td>' + elem.roundWinner + '</td><td>' + elem.scores + '</td>' ;
     resultWrapper.appendChild(content);
   })
}