function generateDifficultColor() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
  }
  
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  const colors = Array.from({ length: 6 }, generateDifficultColor);
  const colorBox = document.querySelector(".color-box");
  const colorOptions = document.querySelectorAll(".color-option");
  const gameInstructions = document.querySelector("[data-testid='gameInstructions']");
  const scoreDisplay = document.querySelector("[data-testid='score']");
  const newGameButton = document.querySelector(".new-game");
  let targetColor = "";
  let score = 0;
  
  function resetGame() {
    for (let i = 0; i < colors.length; i++) {
      colors[i] = generateDifficultColor();
    }
    shuffleArray(colors);
    targetColor = colors[Math.floor(Math.random() * colors.length)];
    colorBox.style.backgroundColor = targetColor;
    colorBox.style.transform = "scale(1.1)";
    setTimeout(() => colorBox.style.transform = "scale(1)" , 200);
    gameInstructions.textContent = "Match the Color!";
    colorOptions.forEach((btn, index) => {
      btn.style.backgroundColor = colors[index];
      btn.onclick = () => handleGuess(colors[index]);
    });
  }
  
  function handleGuess(color) {
    if (color === targetColor) {
      score++;
      gameInstructions.textContent = "Correct! 🎉";
    } else {
      gameInstructions.textContent = "Try Again! ❌";
    }
    scoreDisplay.textContent = `Score: ${score}`;
  }
  
  newGameButton.addEventListener("click", resetGame);
  resetGame();
  