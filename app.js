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

const board = document.getElementById("board");
const movesDisplay = document.getElementById("moves");
const statusDisplay = document.getElementById("status");

// ... (keep fruits, shuffle, and buildBoard functions above) ...

board.addEventListener("click", (event) => {
    const card = event.target.closest("button");

    // Check that it is a card and isn't already flipped or matched
    if (!card || card.classList.contains("flipped") || card.classList.contains("matched")) {
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
            statusDisplay.textContent = "That's a pair!";
            turnedCards = [];
        } else {
            statusDisplay.textContent = "Not a pair.";
        }
    }
});