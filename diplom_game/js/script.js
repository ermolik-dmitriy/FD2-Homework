"use strict";

window.onload = function () {
    var backgroundHash = {
        width : 790,
        height : 650,
        speed : 10,
        top : 0
    };
    var carPlayerHash = {
        width : backgroundHash.width/11,
        height : backgroundHash.height/5,
        top : backgroundHash.height - backgroundHash.height/5,
        left : backgroundHash.width/2 +backgroundHash.width/22 ,
        speed : 0
    };
    var coinHash = {
        width : 50,
        height : 50,
        speed : 10

    };
    var carHash = {
        width : backgroundHash.width/11,
        height : backgroundHash.height/5,
        speed : 5
    };

    function getKey(){
        var namePlayer = decodeURIComponent(location.search.substr(1)).split('&');
        namePlayer.splice(0, 1);
        return namePlayer[0];
    }
    function getValue(){
        var scoreDiv = document.querySelector('.scoreNumber');
        return scoreDiv.textContent;
    }

    function AjaxStorage() {
        var self = this;

        var urlScript="https://fe.it-academy.by/AjaxStringStorage2.php";
        var updatePassword;
        var stringName='ERMOLIK_DIPLOM_HASH_SCORE';
        var hash = {};

        $.ajax(
            {
                url : urlScript, type : 'POST', cache : false, dataType:'json',
                data : { f : 'READ', n : stringName },
                success : readReady
            }
        );
        function readReady(callresult) {
            hash =  JSON.parse(callresult.result);
        }

        self.addValue = function (key, value){
            hash[key] = value;

            updatePassword = Math.random();
            $.ajax( {
                    url : urlScript, type : 'POST', cache : false, dataType:'json',
                    data : { f : 'LOCKGET', n : stringName, p : updatePassword },
                    success : lockGetReady
                }
            );

            function lockGetReady(callresult) {
                $.ajax( {
                        url : urlScript, type : 'POST', cache : false, dataType:'json',
                        data : { f : 'UPDATE', n : stringName, v : JSON.stringify(hash), p : updatePassword }
                    }
                );
            }

        };

        self.getValue = function (key){
            if(key in hash)
                return hash[key];
            return undefined;
        };
    }
    var saveData = new AjaxStorage();

    var score = 0;

    var gameCanvas = document.getElementById("gameCanvas");
    var context = gameCanvas.getContext('2d');

    var coinSound = new Audio();
    var boomSound = new Audio();
    coinSound.src = "audio/coin.ogg";
    boomSound.src = "audio/boom.ogg";

    var coin = new Image();
    var boom = new Image();
    var carPlayer = new Image();
    var carImg = new Image();
    var backgroundImg = new Image();

    coin.src = "img/coin.png";
    boom.src = "img/boooom.png";
    carPlayer.src = "img/carPlayer.png";
    carImg.src = "img/car.png";
    backgroundImg.src = "img/background.png";

    var coins = [];

    coins[0] = {
        x : 180,
        y : -coinHash.height
    };

    var car1 = [];

    car1[0] = {
        x : backgroundHash.width - carHash.width - 130 -carHash.width/2,
        y : -backgroundHash.height -carHash.height
    };

    var car = [];

    car[0] = {
        x : carPlayerHash.left,
        y : carPlayerHash.top
    };

    addEventListener("keydown", buttonDown);
    addEventListener("keyup", buttonUp);

    function buttonDown(event){
        if (event.keyCode == 37){
            carPlayerHash.speed = -5;
        }
        if (event.keyCode == 39){
            carPlayerHash.speed = 5;
        }
    }
    function buttonUp(event){
        if (event.keyCode == 37){
            carPlayerHash.speed = 0;
        }
        if (event.keyCode == 39){
            carPlayerHash.speed = 0;
        }
    }

    var scoreDiv = document.querySelector('.scoreNumber');

    var linkGoMenu = document.querySelector('.gameButtonMenu');
    var linkGoRecord = document.querySelector('.gameButtonRecords');
    var linkGoRestart = document.querySelector('.gameButtonRestart');

    linkGoMenu.onclick = goMenu;
    linkGoRecord.onclick = goRecords;
    linkGoRestart.onclick = goRestart;

    function goMenu() {
        window.open('start_page.html');
        window.close();
    }
    function goRecords() {
        window.open('records.html');
        window.close();
    }
    function goRestart() {
        location.reload();
    }

    function backgroundMov() {
        context.drawImage(backgroundImg, 0, backgroundHash.top);
        context.drawImage(backgroundImg,0 ,backgroundHash.top -backgroundHash.height);

        for(var i = 0; i < coins.length; i++){
            context.drawImage(coin, coins[i].x, coins[i].y, coinHash.width, coinHash.height);
            coins[i].y +=coinHash.speed;
            if(coins[i].y == 450) {
                coins.push({
                    x : Math.floor(Math.random() * (400 - 180 + 180)) + 180,
                    y : -carHash.height
                });
            }
            if(coins[i].y < backgroundHash.height && coins[i].y  > backgroundHash.height - carPlayerHash.height - coinHash.height && coins[i].x + coinHash.width > car[0].x && coins[i].x < car[0].x + carPlayerHash.width){
                coins.splice(i,1);
                coinSound.play();
                score++;
                scoreDiv.innerHTML = score;
            }
        }

        context.drawImage(carPlayer, car[0].x,  car[0].y,carPlayerHash.width,carPlayerHash.height);


        for( i = 0; i < car1.length; i++){
            context.drawImage(carImg, car1[i].x, car1[i].y, carHash.width, carHash.height);
            car1[i].y += carHash.speed;
            var rand = Math.floor(Math.random() * (4 - 1 + 1)) + 1;
            if(car1[i].y == 400 && rand == 1) {
                car1.push({
                    x : 130 + carHash.width/2,
                    y : -carHash.height
                });
            }
            if(car1[i].y == 400 && rand == 2) {
                car1.push({
                    x : backgroundHash.width - carHash.width - 130 -carHash.width/2,
                    y : -carHash.height
                });
            }
            if(car1[i].y == 400 && rand == 3) {
                car1.push({
                    x : 145 + carHash.width/2 +carHash.width + carHash.width/2,
                    y : -carHash.height
                });
            }
            if(car1[i].y == 400 && rand == 4) {
                car1.push({
                    x : backgroundHash.width - carHash.width - 145 -carHash.width/2 -carHash.width -carHash.width/2,
                    y : -carHash.height
                });
            }
            if(car1[i].y < backgroundHash.height && car1[i].y  > backgroundHash.height - carPlayerHash.height - carHash.height && car1[i].x + carHash.width > car[0].x && car1[i].x < car[0].x + carPlayerHash.width){
                boomSound.play();
                backgroundHash.speed = 0;
                coinHash.speed = 0;
                carHash.speed = 0;
                saveData.addValue(getKey(),getValue());
                context.drawImage(boom, 118 ,0, 118, 116,car[0].x -carPlayerHash.width/2, car[0].y,118,116 );
                return;

            }
        }

        backgroundHash.top += backgroundHash.speed;

        if (Math.abs(backgroundHash.top) > backgroundHash.height) {
            backgroundHash.top = 0;
        }

        (function moveCarPlayer (){
            car[0].x += carPlayerHash.speed;
            if(car[0].x  < 125){
                car[0].x  = 125;
            }
            if(car[0].x  > backgroundHash.width - 125-carPlayerHash.width){
                car[0].x  = backgroundHash.width - 125-carPlayerHash.width;
            }

        })();


        requestAnimationFrame(backgroundMov);
    }

    backgroundImg.onload = backgroundMov;

};

