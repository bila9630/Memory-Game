/*
 * Create a list that holds all of your cards
 */

let cards = [
  "fa-diamond",
  "fa-diamond",
  "fa fa-paper-plane-o",
  "fa fa-paper-plane-o",
  "fa-anchor",
  "fa-anchor",
  "fa-bolt",
  "fa-bolt",
  "fa-cube",
  "fa-cube",
  "fa-leaf",
  "fa-leaf",
  "fa-bicycle",
  "fa-bicycle",
  "fa-bomb",
  "fa-bomb"
];

function generateCard(card) {
  return `<li class="card" data-card="${card}"><i class="fa ${card}"></i></li>`;
}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

var star = document.querySelectorAll("ul.stars li");
//matched cards is an array to indicate later, when the game should end
let matchedCards = [];

//restart
let restart = function () {
  initGame();
  // restart some standards
  move = 0;
  matchedCards = [];
  time = 0;
  starsTotal = 3;
  clearTimer();
  star[0].style.display = "inline";
  star[1].style.display = "inline";
  document.querySelector(".moves").innerHTML = move;
  modal.style.display = "none";
};
document.querySelector(".fa-repeat").addEventListener("click", restart);

//setTimer
var time = 0;
var timer;

function setTimer() {
  timer = setInterval(function () {
    time++;
    document.querySelector(".timer").innerHTML = time;
  }, 1000);
}

function clearTimer() {
  clearInterval(timer);
  timer = setInterval(function () {}, 1000);
}

function initGame() {
  setTimer();
  var deck = document.querySelector(".deck");
  var cardHTML = shuffle(cards).map(function (card) {
    return generateCard(card);
  });

  deck.innerHTML = cardHTML.join("");
  var allCards = document.querySelectorAll(".card");
  var openCards = []; //openCards.length

  //moves
  var move = 0;
  const countmoves = function () {
    move += 1;
    document.querySelector(".moves").innerHTML = move;

    /*removing stars*/
    starsTotal = 3;

    if (move > 20 && move < 26) {
      star[0].style.display = "none";
      starsTotal = 2;
    } else if (move > 27) {
      star[1].style.display = "none";
      starsTotal = 1;
    }
  };

  //modal
  modal = document.querySelector(".modal");
  showModal = () => {
    modal.style.display = "block";
    document.querySelector(".ModalTimer").innerHTML = time;
    document.querySelector(".ModalMoves").innerHTML = move;
    document.querySelector(".ModalStars").innerHTML = starsTotal;
  };

  //each card wil get an event listener
  const addListener = allCards.forEach(function (card) {
    card.addEventListener("click", () => {
      if (
        !card.classList.contains("open") &&
        !card.classList.contains("show") &&
        !card.classList.contains("match")
      ) {
        openCards.push(card);
        card.classList.add("open", "show");

        // Check if they match
        var firstCardType = openCards[0].dataset.card;

        // If cards don't match - go away

        if (openCards.length == 2) {
          countmoves(); //countMoves will be called here
          if (openCards[0].dataset.card == openCards[1].dataset.card) {
            openCards.forEach(function (card) {
              card.classList.add("match");
              //if the cards matched, they will be pushed to matchedcards
              matchedCards.push(card);
              setTimeout(() => {
                //if all cards are open, show modal
                if (matchedCards.length == 16) {
                  showModal();
                }
              }, 1000);
            });
            openCards = [];
          } else {
            //If no match, hide
            setTimeout(() => {
              openCards.forEach(function (card) {
                card.classList.remove("open", "show");
              });
              openCards = [];
            }, 1000);
          }
        } else if (openCards.length >= 3) {
          //if you click too fast, all unmatched cards will be closed first
          openCards.forEach(function (card) {
            card.classList.remove("open", "show");
          });
          openCards = [];
        }
      }
    });
  });
}

initGame();

/**
 * some external sources that I got inspired from:
 * https://www.youtube.com/watch?time_continue=2943&v=x47oLiTpIVk
 * https://www.youtube.com/watch?v=oECVwum-7Zc
 * https://codepen.io/andreablgh/pen/MGraPY?editors=0010
 */