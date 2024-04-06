// Game variables
let targetColor;
let lives = 3;
let score = 0;

// DOM elements
const targetColorDisplay = document.getElementById('targetColor');
const colorOptionsContainer = document.getElementById('colorOptions');
const messageDisplay = document.getElementById('message');
const livesDisplay = document.getElementById('lives');
const restartButton = document.getElementById('restartButton');

// Function to generate a random RGB color
function generateRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

// Function to set up the game
function setupGame() {
    // Reset variables and UI
    lives = 3;
    score = 0;
    livesDisplay.textContent = lives;
    messageDisplay.textContent = '';
    restartButton.style.display = 'none';

    // Generate target color
    targetColor = generateRandomColor();
    targetColorDisplay.textContent = targetColor.toUpperCase();

    // Generate color options
    colorOptionsContainer.innerHTML = '';
    for (let i = 0; i < 3; i++) {
        const colorOption = document.createElement('div');
        colorOption.classList.add('colorOption');
        colorOption.style.backgroundColor = i === 0 ? targetColor : generateRandomColor();
        colorOption.addEventListener('click', function() {
            checkColor(this.style.backgroundColor);
        });
        colorOptionsContainer.appendChild(colorOption);
    }

    // Randomize the position of the correct color
    const options = Array.from(colorOptionsContainer.children);
    colorOptionsContainer.appendChild(options.splice(Math.floor(Math.random() * options.length), 1)[0]);
}

// Function to check if the selected color is correct
function checkColor(selectedColor) {
    if (selectedColor === targetColor) {
        messageDisplay.textContent = 'Correct!';
        score++;
        setupGame();
    } else {
        lives--;
        livesDisplay.textContent = lives;
        messageDisplay.textContent = 'Try Again!';
        if (lives === 0) {
            endGame();
        }
    }
}

// Function to end the game
function endGame() {
    messageDisplay.textContent = `Game Over! Your score: ${score}`;
    restartButton.style.display = 'block';
}

// Event listener for the restart button
restartButton.addEventListener('click', setupGame);

// Initialize the game
setupGame();
