//splash-screen button audio
const startButton = document.getElementById('start-button');
const soundArr = document.getElementsByTagName('audio');
const muteButton = document.getElementById('mute-button');
startButton.addEventListener('mouseenter', () => {
    soundArr[0].play();
});
startButton.addEventListener('click', () => {
    soundArr[1].play();
    soundArr[2].play();
    soundArr[2].setAttribute('controls', "");
    soundArr[2].setAttribute('loop', "");
    soundArr[2].style.display = 'none';
});
muteButton.addEventListener('click', () => {
    if (soundArr[2].paused){
        muteButton.innerText = 'MUTE';
        soundArr[2].play()
    } else {
        muteButton.innerText = 'UNMUTE';
        soundArr[2].pause();
    }
});
