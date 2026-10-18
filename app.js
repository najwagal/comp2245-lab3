const fruits = [
    { name: "apple", symbol: "🍎" },
    { name: "banana", symbol: "🍌" },
    { name: "cherry", symbol: "🍒" },
    { name: "coconut", symbol: "🥥" },
    { name: "grapes", symbol: "🍇" },
    { name: "mango", symbol: "🥭" },
    { name: "pineapple", symbol: "🍍" },
    { name: "watermelon", symbol: "🍉" }
];

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

let deck = [];

function buildBoard() {
    const board = document.getElementById("board");
    
    deck = shuffle([...fruits, ...fruits]);

    deck.forEach((fruit, i) => {
        const button = document.createElement("button");
        button.type = "button";
        button.classList.add("card");
        button.setAttribute("aria-label", `Card ${i + 1}, face down`);
        button.dataset.index = i;
        board.appendChild(button);
    });
}

buildBoard();

let turnedCards = [];
let moves = 0;
let waiting = false;
let matchedPairs = 0;

const board = document.getElementById("board");
const movesDisplay = document.getElementById("moves");
const statusDisplay = document.getElementById("status");

board.addEventListener("click", (event) => {
    const card = event.target.closest("button");

    if (waiting || !card || card.classList.contains("flipped") || card.classList.contains("matched")) {
        return;
    }

    const index = card.dataset.index;
    const fruit = deck[index];

    card.textContent = fruit.symbol;
    card.classList.add("flipped");
    card.setAttribute("aria-label", `Card ${parseInt(index) + 1}, ${fruit.name}`);

    turnedCards.push({ card, fruit });

    if (turnedCards.length === 2) {
        moves++;
        movesDisplay.textContent = moves;

        const [card1, card2] = turnedCards;

        if (card1.fruit.name === card2.fruit.name) {
            card1.card.classList.add("matched");
            card2.card.classList.add("matched");
            card1.card.disabled = true;
            card2.card.disabled = true;
            
            matchedPairs++;
            turnedCards = [];

            if (matchedPairs === 8) {
                statusDisplay.textContent = `You found all the pairs in ${moves} moves!`;
                statusDisplay.classList.add("you-won");
            } else {
                statusDisplay.textContent = "That's a pair!";
            }
        } else {
            statusDisplay.textContent = "Not a pair. Try again.";
            waiting = true;

            setTimeout(() => {
                card1.card.textContent = "";
                card1.card.classList.remove("flipped");
                card1.card.setAttribute("aria-label", `Card ${parseInt(card1.card.dataset.index) + 1}, face down`);

                card2.card.textContent = "";
                card2.card.classList.remove("flipped");
                card2.card.setAttribute("aria-label", `Card ${parseInt(card2.card.dataset.index) + 1}, face down`);

                turnedCards = [];
                waiting = false;
            }, 1000);
        }
    }
});