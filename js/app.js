/*
 * Create a list that holds all of your cards
 */

var cards = [ "fa-diamond", 'fa-diamond',
              "fa fa-paper-plane-o", "fa fa-paper-plane-o",
              "fa-anchor", "fa-anchor",
              "fa-bolt", "fa-bolt",
              "fa-cube", "fa-cube",
              "fa-leaf", "fa-leaf",
              "fa-bicycle", "fa-bicycle",
              "fa-bomb", "fa-bomb"
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
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

//move counter
var star = document.querySelectorAll("ul.stars li");
let matchedCards = [];


 
 //restart
let restart = function() {
    initGame();
    // restart score
    move = 0
    matchedCards = [];
    time = 0;
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
    timer = setInterval(function(){
        time++;
        document.querySelector(".timer").innerHTML = time;
    }, 1000);
};

function clearTimer() {
    clearInterval(timer);
    timer = setInterval(function(){
    }, 1000);
}

//modal
modal = document.querySelector(".modal");
showModal = () => {
    modal.style.display = "block";
    document.querySelector(".ModalTimer").innerHTML = time;
    document.querySelector(".ModalMoves").innerHTML = move;
}


function initGame() {
    setTimer();
    var deck = document.querySelector(".deck");
    var cardHTML = shuffle(cards).map(function(card) {
        return generateCard(card);
    });

    deck.innerHTML = cardHTML.join("");
    var allCards = document.querySelectorAll(".card");
    var openCards = []; //openCards.length

    
    var move = 0;
    const countmoves = function () {
        move += 1;
        document.querySelector(".moves").innerHTML = move;

        /*removing stars*/
        
        if(move > 15 && move < 26) {
            star[0].style.display = "none";
        } else if ( move > 27) {
            star[1].style.display = "none";
        }
    }



    //each card
    const addListener = allCards.forEach(function(card){
        card.addEventListener('click', () => {
            if (!card.classList.contains("open") && 
                !card.classList.contains("show") && 
                !card.classList.contains('match') ) {
                countmoves(); //countMoves will be called here
                openCards.push(card);
                card.classList.add('open', 'show');

                // Check if they match            
                var firstCardType = openCards[0].dataset.card;

                // If cards don't match - go away
                
                if (openCards.length == 2){
                    if (openCards[0].dataset.card == openCards[1].dataset.card) {
                        openCards.forEach(function(card){
                            card.classList.add("match");
                            matchedCards.push(card);
                            console.log("Anzahl matchedCards"+ matchedCards.length);
                            setTimeout( () => {
                                if (matchedCards.length == 16) {
                                    showModal();
                                }
                            }, 1000);
                        });
                        openCards = [];
                    } else {
                    //If no match, hide
                        setTimeout( () =>{
                            openCards.forEach(function(card){
                                card.classList.remove('open', 'show');
                            });
                            openCards = [];
                        }, 1000);
                    }
                } else if (openCards.length >= 3) {
                    openCards.forEach(function(card) {
                        card.classList.remove("open", "show");
                    });
                    openCards = [];
                }
            }
        });
    });


}


initGame();

