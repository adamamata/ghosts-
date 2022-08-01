document.addEventListener('keydown', (e) => { //Event listener to control player
    switch (e.keyCode){
        case 39: //right arrow
            if (player1.x < 900){
                player1.x += 20;
                player1.img = playerRight;
                setTimeout(function(){
                    player1.img = playerRight2;
                }, 50);
                setTimeout(function(){
                    player1.img = playerImg;
                }, 100);
            }
            break;
        case 37: //left arrow
            if (player1.x > -40){
                player1.x -= 20;
                player1.img = playerLeft;
                setTimeout(function(){
                    player1.img = playerLeft2;
                }, 100);
            }
            break;
        case 32:  //spacebar 
            soundArr[1].volume = 0.2;
            soundArr[1].play();
            player1.img = playerAttack;
            setTimeout(function(){
                player1.img = playerAttack2;
            }, 50)
            break;
    }
});

document.addEventListener('keyup', (e) => { //reseting player1.img after keyup 
    switch (e.keyCode){
        case 39: //right arrow 
            player1.img = playerImg;
            break;
        case 37: //left arrow
            player1.img = playerImg;
            break;
        case 32: //spacebar
            player1.img = playerImg;
            break;
    }
});

