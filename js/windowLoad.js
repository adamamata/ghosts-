//Window onload 
window.onload = () => {   
    startButton.onclick = () => {
        gameArea.start();
    }
    gameOverRestart.onclick = () => {
        splashScreen.style.display = 'flex';
        gameBoard.style.display = 'none';
        endScreen.style.display = 'none';
        gameArea.restart();
        window.location.reload();
    }
    restartButton.onclick = () => {
        gameArea.restart();
    }
}