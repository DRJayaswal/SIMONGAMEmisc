// Define array of colors
const colors = ["red", "blue", "green", "khaki"];
// Initialize arrays to store game sequence and user sequence
var game_sequence = [];
var user_sequence = [];

// Function to generate a random sequence of colors
const generateSequence = (level) => {
    for (let i = 0; i < level; i++) {
        // Generate a random color from the colors array
        var random_color = colors[Math.floor(Math.random() * colors.length)];
        // Add the random color to the game sequence
        game_sequence.push(random_color);
    }
};

// Function to show the sequence of colors to the player
const showSequence = (sequence, speed) => {
    sequence.forEach((color, index) => {
        setTimeout(() => {
            // Show color by setting opacity to 1
            document.getElementById(color).style.opacity = 1;
            // Revert color after 'speed' milliseconds by setting opacity back to 0.5
            setTimeout(() => {
                document.getElementById(color).style.opacity = 0.5;
                // If it's the last color, enable user input
                if (index === sequence.length - 1) {
                    // Call the reverb function to show all colors simultaneously
                    reverb();
                    // Enable user input
                    enableInput();
                }
            }, speed);
        }, index * (speed * 2)); // Change each color after 'speed' milliseconds
    });
};

// Function to enable user input after showing the sequence
const enableInput = () => {
    // Add event listeners to colors for user input
    colors.forEach(color => {
        document.getElementById(color).addEventListener("click", () => {
            // Add clicked color to user sequence
            user_sequence.push(color);
            console.log(user_sequence);
            // If user sequence length equals game sequence length, check the sequence
            if (user_sequence.length === game_sequence.length) {
                checkSequence();
            }
        });
    });
};

// Function to check if user sequence matches game sequence
const checkSequence = () => {
    for (let i = 0; i < game_sequence.length; i++) {
        if (game_sequence[i] !== user_sequence[i]) {
            // Alert if the sequence is incorrect
            alert("Wrong sequence!");
            return;
        }
    }
    // Alert if the sequence is correct
    alert("Correct sequence!");
};

// Function to show all colors simultaneously
const reverb = () => {
    // Set opacity to 1 for all colors in the game sequence
    for (let color of game_sequence) {
        document.getElementById(color).style.opacity = 1;
    }
};

// Function to start the game
const startGame = () => {
    // Generate a level game
    const level = prompt("Level...?");
    document.querySelector(".level").innerHTML+=level;
    generateSequence(level);
    console.log(game_sequence);
    // Show the generated sequence with a speed of 1000 milliseconds
    showSequence(game_sequence, 1000);
};

// Call the startGame function to start the game
startGame();
