"use strict";

window.onload = function (){
    // параметры поля
    var fieldHash = {
        backgroundColor : 'yellow',
        height : 450,
        width : 750
    };
    // параметры мяча
    var ballHash = {
        backgroundColor : 'red',
        radius : fieldHash.height/30,
        top : fieldHash.height/2 - fieldHash.height/30,
        left : fieldHash.width/2 - fieldHash.height/30,
        ballSpeedX : 0,
        ballSpeedY : 0
    };
    // параметры левой ракетки
    var leftRacketHash = {
        backgroundColor : 'green',
        height : fieldHash.height/4,
        width : fieldHash.width/80,
        top : fieldHash.height/2 - fieldHash.height/8,
        left : 0,
        leftRacketSpeed : 0
    };
    // параметры правой ракетки
    var rightRacketHash = {
        backgroundColor : 'purple',
        height : fieldHash.height/4,
        width : fieldHash.width/80,
        top : fieldHash.height/2 - fieldHash.height/8,
        left : fieldHash.width - fieldHash.width/80,
        rightRacketSpeed : 0
    };
    // параметры кнопки
    var buttonHash = {
        fontSize : fieldHash.height/25,
        backgroundColor : 'light-grey',
        padding : fieldHash.height/20
    };
    // параметры счёта
    var accountHash = {
        fontSize :  fieldHash.height/10,
        accountLeft : 0,
        accountRight : 0
    };

    //рисуем, стилизуем и позиционируем шапку с кнопкой и счётом
    document.body.innerHTML +='<div id = "headerField"></div>';
    var headerField = document.getElementById('headerField');
    headerField.innerHTML += '<input id="button" type="button" value="старт!">';
    headerField.innerHTML += '<span id="account">' + accountHash.accountLeft + ':' + accountHash.accountRight + '</span>';
    var buttonHeader = document.getElementById('button');
    buttonHeader.style.fontSize = buttonHash.fontSize + 'px';
    buttonHeader.style.backgroundColor = buttonHash.backgroundColor;
    buttonHeader.style.paddingLeft = buttonHash.padding + 'px';
    buttonHeader.style.paddingRight = buttonHash.padding + 'px';
    buttonHeader.style.border = 'none';
    buttonHeader.style.display = 'inline-block';
    buttonHeader.style.verticalAlign = 'middle';
    var account = document.getElementById('account');
    account.style.fontSize = accountHash.fontSize + 'px';
    account.style.display = 'inline-block';
    account.style.verticalAlign = 'middle';
    account.style.paddingLeft = fieldHash.width/2 - buttonHeader.offsetWidth - account.offsetWidth/2 + 'px';

    //рисуем, стилизуем поле
    document.body.innerHTML += '<div id="field"></div>';
    var field = document.getElementById('field');
    field.style.height = fieldHash.height + 'px';
    field.style.width = fieldHash.width + 'px';
    field.style.backgroundColor = fieldHash.backgroundColor;
    field.style.border= 'solid 1px black';
    field.style.position = 'absolute';

    //добовляем контейнеры для мяча и ракеток
    field.innerHTML += '<div id="ball"></div><div id="leftRacket"></div><div id="rightRacket"></div>';

    //стилизуем и позиуионируем мяч
    var ball = document.getElementById('ball');
    ball.style.height = ballHash.radius*2 + 'px';
    ball.style.width = ballHash.radius*2 + 'px';
    ball.style.backgroundColor = ballHash.backgroundColor;
    ball.style.borderRadius = '50%';
    ball.style.position = 'absolute';
    ball.style.left = ballHash.left + 'px';
    ball.style.top = ballHash.top + 'px';

    //стилизуем и позиуионируем левую ракетку
    var leftRacket = document.getElementById('leftRacket');
    leftRacket.style.height = leftRacketHash.height + 'px';
    leftRacket.style.width = leftRacketHash.width + 'px';
    leftRacket.style.backgroundColor = leftRacketHash.backgroundColor;
    leftRacket.style.position = 'absolute';
    leftRacket.style.left = leftRacketHash.left + 'px';
    leftRacket.style.top = leftRacketHash.top + 'px';

    //стилизуем и позиуионируем правую ракетку
    var rightRacket = document.getElementById('rightRacket');
    rightRacket.style.height = rightRacketHash.height + 'px';
    rightRacket.style.width = rightRacketHash.width + 'px';
    rightRacket.style.backgroundColor = rightRacketHash.backgroundColor;
    rightRacket.style.position = 'absolute';
    rightRacket.style.left = rightRacketHash.left + 'px';
    rightRacket.style.top = rightRacketHash.top + 'px';

    requestAnimationFrame(ballMove);

    button.addEventListener('click', start);

    //позиционируем мяч по центру и задаём ему скорость и направление
    function start(){
        ballHash.top = fieldHash.height/2 - fieldHash.height/30;
        ballHash.left =  fieldHash.width/2 - fieldHash.height/30;
        ballHash.ballSpeedX = 4;
        ballHash.ballSpeedY = 2;

        var sign = Math.floor(Math.random() * (4 - 1 + 1)) + 1;
        if(sign == 1){
            ballHash.ballSpeedX = - ballHash.ballSpeedX;
        }
        if(sign == 2){
            ballHash.ballSpeedY = - ballHash.ballSpeedY;
        }
        if(sign == 3){
            ballHash.ballSpeedY = - ballHash.ballSpeedY;
            ballHash.ballSpeedX = - ballHash.ballSpeedX;
        }
    }

    //движение ракеток, мяча
    function ballMove() {
        account = document.getElementById('account');

        //движение мяча по горизонали и условия отскока и изменения счёта
        ballHash.left += ballHash.ballSpeedX;

        if (ballHash.left + ballHash.radius*2 > fieldHash.width - rightRacketHash.width ) {
            var centerBall = ballHash.top + ballHash.radius*2;
            if(centerBall > rightRacketHash.top &&  ballHash.top < rightRacketHash.top + rightRacketHash.height){
                ballHash.ballSpeedX = -ballHash.ballSpeedX;
                ballHash.left = fieldHash.width - ballHash.radius*2  - rightRacketHash.width;
            }
        }
        if (ballHash.left + ballHash.radius*2 > fieldHash.width){
            ballHash.ballSpeedY = 0;
            ballHash.ballSpeedX = 0;
            accountHash.accountLeft ++;
            ballHash.left = fieldHash.width - ballHash.radius*2;
            account.textContent = accountHash.accountLeft + ':' + accountHash.accountRight;
        }
        if ( ballHash.left < leftRacketHash.width ) {
            centerBall = ballHash.top + ballHash.radius;
            if(centerBall > leftRacketHash.top && centerBall < leftRacketHash.top + leftRacketHash.height){
                ballHash.ballSpeedX = -ballHash.ballSpeedX;
                ballHash.left = leftRacketHash.width;
            }
        }
        if ( ballHash.left < 0 ) {
            ballHash.ballSpeedY = 0;
            ballHash.ballSpeedX = 0;
            accountHash.accountRight ++;
            ballHash.left = 0;
            account.textContent = accountHash.accountLeft + ':' + accountHash.accountRight;
        }

        //движение мяча по вертикали и условия отскока от верха и низа
        ballHash.top += ballHash.ballSpeedY;

        if (ballHash.top + ballHash.radius*2 > fieldHash.height ) {
            ballHash.ballSpeedY = - ballHash.ballSpeedY;
            ballHash.top = fieldHash.height - ballHash.radius*2;
        }
        if (ballHash.top < 0 ) {
            ballHash.ballSpeedY = - ballHash.ballSpeedY;
            ballHash.top = 0;
        }

        ball.style.left = ballHash.left + 'px';
        ball.style.top = ballHash.top + 'px';

        //движение правой ракетки
        (function rightRacketMove (){
            rightRacketHash.top += rightRacketHash.rightRacketSpeed;
            if(rightRacketHash.top < 0)
                rightRacketHash.top = 0;
            if(rightRacketHash.top > fieldHash.height - rightRacketHash.height)
                rightRacketHash.top = fieldHash.height - rightRacketHash.height;
            rightRacket.style.top = rightRacketHash.top + 'px';
        })();
        //движение левой ракетки
        (function leftRacketMove (){
            leftRacketHash.top += leftRacketHash.leftRacketSpeed;
            if(leftRacketHash.top < 0)
                leftRacketHash.top = 0;
            if(leftRacketHash.top > fieldHash.height - leftRacketHash.height)
                leftRacketHash.top = fieldHash.height - leftRacketHash.height;
            leftRacket.style.top = leftRacketHash.top + 'px';
        })();

        //обрабатываем события нажатия клавишь
        addEventListener("keydown", function(event) {
            if (event.keyCode == 38){
                rightRacketHash.rightRacketSpeed = -5;
            }
            if (event.keyCode == 40){
                rightRacketHash.rightRacketSpeed = 5;
            }
            if (event.keyCode == 16){
                leftRacketHash.leftRacketSpeed = -5;
            }
            if (event.keyCode == 17){
                leftRacketHash.leftRacketSpeed = 5;
            }
        });
        //обрабатываем события отжатия клавишь
        addEventListener("keyup", function(event) {
            if (event.keyCode == 38){
                rightRacketHash.rightRacketSpeed = 0;
            }
            if (event.keyCode == 40){
                rightRacketHash.rightRacketSpeed = 0;
            }
            if (event.keyCode == 16){
                leftRacketHash.leftRacketSpeed = 0;
            }
            if (event.keyCode == 17){
                leftRacketHash.leftRacketSpeed = 0;
            }
        });

        requestAnimationFrame(ballMove);
    }
};







