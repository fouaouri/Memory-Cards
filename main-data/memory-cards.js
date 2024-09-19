
let cards, firstCard, secondCard, lockBoard = false, score = 0;

// fill the data
document.querySelector('.score').textContent = score;
const gridContainer = document.querySelector(".cards-flip");
fetch('cards.json')
    .then((res) => res.json())
    .then((data) => {
        cards = [...data, ...data];
        add_cards();
    });

// Shuffle cards
function ShuffleCards(){
    let index = cards.length, randomindex;

    while(index != 0){
        randomindex = Math.floor(Math.random() * index);
        index -= 1;
        [cards[index], cards[randomindex]] = [cards[randomindex], cards[index]];
    }

    return cards;
}

//add the cards elements in the html doc

function add_cards(){
    for (let card of cards) {
        const cardElement = document.createElement("div");
        cardElement.classList.add("card");
        cardElement.setAttribute("data-name", card.name);
        cardElement.innerHTML = `
          <div class="front">
            <img class="front-image" src=${card.image} />
          </div>
          <div class="back"></div>
        `;
        gridContainer.appendChild(cardElement);
        cardElement.addEventListener('click', flipcard);
      }
}



// flip card function

function flipcard() {
    if(lockBoard) return;
    if(this === firstCard) return;

    this.classList.add('flipped');
    if(!firstCard)
        firstCard = this;
    else{
        secondCard = this;
        isMatch();
    }
}


// After flip the two cards check for the matching cards

function isMatch(){
    if(firstCard.getAttribute('data-name') === secondCard.getAttribute('data-name'))
        itsAMatch();
    else
        itsNotMatch();
}


// if its a Match

function itsAMatch(){
    firstCard.removeEventListener("click", flipcard);
    secondCard.removeEventListener("click", flipcard);
    score++;
    document.querySelector('.score').textContent = score;
    if(score === cards.length / 2)
        restart();
    resetBoard();
}

// if its not the match

function itsNotMatch(){
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");
        resetBoard();
    }, 1000);
}


// restart the game

document.getElementById('restart').addEventListener('click', function restart() {
    resetBoard();
    ShuffleCards();
    score = 0;
    document.querySelector(".score").textContent = score;
    gridContainer.innerHTML = "";
    add_cards();
});

// reset

function resetBoard(){
    [firstCard, secondCard, lockBoard] = [null, null, false];
}