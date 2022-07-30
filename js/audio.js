//splash-screen button audio
const startButton = document.getElementById('start-button');
const soundArr = document.getElementsByTagName('audio');
startButton.addEventListener('mouseenter', () => {
    soundArr[0].play();
});
startButton.addEventListener('click', () => {
    soundArr[1].play();
})
