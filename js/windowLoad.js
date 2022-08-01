//Window onload 
window.onload = () => {   
    startButton.onclick = () => {
        gameArea.start();
    }
    gameOverRestart.onclick = () => {
        gameArea.frames = 0;
        gameArea.score = 0;
        gameArea.lives = 3;
        gameArea.start();
        clearGhosts();
    }
    restartButton.onclick = () => {
        gameArea.restart();
        clearGhosts();
    }
}