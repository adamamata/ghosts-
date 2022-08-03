let defaultSkin = true;

document.addEventListener('keydown', (e) => { //Event listener to control player
    switch (e.keyCode){
        case 39: //right arrow
            if (player1.x < 900){
                player1.x += speed;
                if (defaultSkin){
                    player1.img = playerRight;
                    setTimeout(function(){
                        player1.img = playerRight2;
                    }, 50);
                } else {
                    player1.img = playerRightGreen; 
                    setTimeout(function(){
                        player1.img = playerRightGreen2;
                    }, 50);
                }
            }
            break;
        case 37: //left arrow
            if (player1.x > -40){
                player1.x -= speed;
                if (defaultSkin){
                    player1.img = playerLeft;
                    setTimeout(function(){
                        player1.img = playerLeft2;
                    }, 100);
                } else {
                    player1.img = playerLeftGreen;
                    setTimeout(function(){
                        player1.img = playerLeftGreen2;
                    }, 100);
                }
            }
            break;
        case 32:  //spacebar 
            soundArr[1].volume = 0.2;
            soundArr[1].play();
            player1.img = playerAttack;
            setTimeout(function(){
                player1.img = playerAttack2;
            }, 100);
            break;
    }
});

document.addEventListener('keyup', (e) => { //reseting player1.img after keyup 
    switch (e.keyCode){
        case 39: //right arrow 
            if (defaultSkin){
                setTimeout(() => {
                    player1.img = playerImg;
                    }, 200);
            } else{
                setTimeout(() => {
                    player1.img = playerImgGreen;
                }, 200);
            }
            break;
        case 37: //left arrow
            if (defaultSkin){
                setTimeout(() => {
                    player1.img = playerImg;
                }, 200);
            } else {
                setTimeout(() => {
                    player1.img = playerImgGreen;
                }, 200);
            }
            break;
        case 32: //spacebar
            if (defaultSkin){
                setTimeout(() => {
                    player1.img = playerImg;
                }, 200);
            } else {
                setTimeout(() => {
                    player1.img = playerImgGreen;
                }, 200);
            }
            break;
    }
});

