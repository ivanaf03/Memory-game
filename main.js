// Button numbers
let numbers = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];

// Unsort
numbers = numbers.sort(() => Math.random() - 0.5);

// Variables for tracking the game state
let cnt = 0;
let card1 = null;
let card2 = null;
let result1 = null;
let result2 = null;
let moves = 0;
let successes = 0;
let timer = false;
let seconds = 30;
let secondsId = null;

// DOM elements for displaying moves and successes
let movesText = document.getElementById("moves");
let successText = document.getElementById("successes");
let timeText = document.getElementById("time");

// Function to show a card
function show(buttonId) {

    if(timer == false) {
        crono();
        timer = true;
    }

    cnt++;
    
    if (cnt == 1) {
        // First card reveal
        card1 = document.getElementById(buttonId);
        result1 = numbers[buttonId];
        card1.querySelector('span').innerHTML = result1;
        card1.disabled = true;
    } else if (cnt == 2) {
        // Second card reveal
        card2 = document.getElementById(buttonId);
        result2 = numbers[buttonId];
        card2.querySelector('span').innerHTML = result2;
        card2.disabled = true;

        // Increase move count
        moves++;
        movesText.innerHTML = `Movements: ${moves}`;

        // Check if cards match
        if (result1 == result2) {
            // Cards match
            cnt = 0;
            successes++;
            successText.innerHTML = `Successes: ${successes}`;

            if (successes == 8) {
                clearInterval(secondsId);
                successText.innerHTML = `GG`;
                timeText.innerHTML = `You have won in ${30 - seconds} seconds!`
            }

        } else {
            // Cards don't match: flip back after 1.5 seconds
            setTimeout(() => {
                card1.querySelector('span').innerHTML = ` `;
                card2.querySelector('span').innerHTML = ` `;
                card1.disabled = false;
                card2.disabled = false;
                cnt = 0;
            }, 600);
        }
    }
}

// Timer
function crono() {
    secondsId = setInterval(() => {
        seconds--;
        timeText.innerHTML = `Time remaining: ${seconds} s`;
        if(seconds == 0) {
            clearInterval(secondsId);
            showCards();
        }
    }, 1000);
}

// Show all cards
function showCards() {
    for(let i = 0; i <= 15; i++) {
        let card = document.getElementById(i);
        card.querySelector('span').innerHTML = numbers[i];
        card.disabled = true;
    }
}
