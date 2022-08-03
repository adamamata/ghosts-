const startButton = document.getElementById('start-button');
const soundArr = document.getElementsByTagName('audio');
const muteButton = document.getElementById('mute-button');
startButton.addEventListener('mouseenter', () => {
    soundArr[0].volume = 0.2;
    soundArr[0].play();
});
startButton.addEventListener('click', () => {
    soundArr[0].play();
    soundArr[2].play();
    soundArr[2].setAttribute('controls', "");
    soundArr[2].setAttribute('loop', "");
    soundArr[2].style.display = 'none';
    soundArr[2].volume = 0.8;
});
muteButton.addEventListener('click', () => {
    if (soundArr[2].paused){
        muteButton.innerText = 'MUTE MUSIC';
        soundArr[2].play()
    } else {
        muteButton.innerText = 'UNMUTE MUSIC';
        soundArr[2].pause();
    }
});