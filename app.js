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