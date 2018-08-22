"use strict";

window.onload = function () {
    var countNumber = 12; //кол-во чисел на циферблате
    var sizeClock = parseInt(prompt("Введите размер часов в пикселях")); //размер часов
    var sizeClockNumber = sizeClock / 10; //размер области с цифрами
    var clockRadius = sizeClock / 2; //радиус часов
    var clockNumberRadius = sizeClockNumber / 2; //радиус радиус области с цифрами
    var clockSecWidth = sizeClockNumber / 16; //ширина секундной стрелки
    var clockSecHeight = sizeClock / 100 * 45; //высота секундной стрелки
    var clockMinWidth = sizeClockNumber / 8; //ширина минутной стрелки
    var clockMinHeight = sizeClock / 100 * 40; //высота минуной стрелки
    var clockHourWidth = sizeClockNumber / 4; //ширина часовой стрелки
    var clockHourHeight = sizeClock / 100 * 30; //высота часовой стрелки

    //область для часов
    document.body.innerHTML ='<canvas id=clockCanvas width="' + sizeClock + '" height="' + sizeClock + '"></canvas>'; //добовляем svg
    var clockCanvas = document.getElementById("clockCanvas");
    var context = clockCanvas.getContext('2d');

    goClock();

    setInterval(goClock, 1000);

    //функция для поворота стрелок и заполнения цифровых часов
    function goClock() {
        //рисуем часы
        context.beginPath();
        context.arc(clockRadius, clockRadius, clockRadius, 0 ,Math.PI*2, false);
        context.fillStyle = 'yellow';
        context.fill();

        //рисуем цифры и позиционируем
        var txtClockNumber = '';
        for (var i = 0; i <= countNumber; i++ ){
            context.beginPath();
            context.arc(clockRadius - (clockRadius - clockNumberRadius - sizeClockNumber/5) * Math.sin( 2 / countNumber * i * Math.PI), clockRadius - (clockRadius - clockNumberRadius - sizeClockNumber/5) * Math.cos( 2 / countNumber * i * Math.PI), clockNumberRadius, 0 ,Math.PI*2, false);
            context.fillStyle = 'green';
            context.fill();
            txtClockNumber = String(countNumber - i);
            if(i == countNumber)
                txtClockNumber =  String(i);
            context.beginPath();
            context.fillStyle = 'black';
            if(i == 0){
                context.fillStyle = 'yellow';
            }
            context.font = 'normal ' + sizeClock/20 + 'px Arial';
            context.fillText(txtClockNumber, clockRadius - (clockRadius - clockNumberRadius - sizeClockNumber/5) * Math.sin( 2 / countNumber * i * Math.PI), clockRadius - (clockRadius - clockNumberRadius - sizeClockNumber/5) * Math.cos( 2 / countNumber * i * Math.PI));
            context.textBaseline = 'middle';
            context.textAlign = 'center';
        }

        //получение текущей даты
        var date = new Date;
        var seconds = date.getSeconds();
        var minutes = date.getMinutes();
        var hours = date.getHours();

        //рисуем и позиционируем цифровые часы
        var textDigitalClock = hours + ':' + minutes + ':' + seconds;
        if(hours < 10){
            textDigitalClock = '0' + hours + ':' + minutes + ':' + seconds;
        }
        if(minutes < 10){
            textDigitalClock = hours + ':0' + minutes + ':' + seconds;
        }
        if(seconds < 10){
            textDigitalClock = hours + ':' + minutes + ':0' + seconds;
        }
        context.beginPath();
        context.fillStyle = 'black';
        context.font = 'normal ' + sizeClock/10 + 'px Arial';
        context.fillText(textDigitalClock, clockRadius, clockRadius - clockRadius/3);

        //рисуем секундную срелку и позиционируем
        context.lineCap = 'round';
        context.beginPath();
        context.strokeStyle = 'black';
        context.lineWidth = clockSecWidth;
        context.moveTo(clockRadius + (clockSecHeight - clockNumberRadius/2) * Math.cos((seconds*6-90)*Math.PI/180), clockRadius + (clockSecHeight - clockNumberRadius/2) * Math.sin((seconds*6-90)*Math.PI/180));
        context.lineTo(clockRadius - (clockNumberRadius/2)  * Math.cos((seconds*6-90)*Math.PI/180), clockRadius - (clockNumberRadius/2)  * Math.sin((seconds*6-90)*Math.PI/180));
        context.stroke();

        //рисуем минутную стрелку и позиционируем
        context.lineCap = 'round';
        context.beginPath();
        context.strokeStyle = 'black';
        context.lineWidth = clockMinWidth;
        context.moveTo(clockRadius + (clockMinHeight - clockNumberRadius/2) * Math.cos((minutes*6-90)*Math.PI/180), clockRadius + (clockMinHeight - clockNumberRadius/2) * Math.sin((minutes*6-90)*Math.PI/180));
        context.lineTo(clockRadius - (clockNumberRadius/2)  * Math.cos((minutes*6-90)*Math.PI/180), clockRadius - (clockNumberRadius/2)  * Math.sin((minutes*6-90)*Math.PI/180));
        context.stroke();

        //рисуем часовю стрелку и позиционируем
        context.lineCap = 'round';
        context.beginPath();
        context.strokeStyle = 'black';
        context.lineWidth = clockHourWidth;
        context.moveTo(clockRadius + (clockHourHeight - clockNumberRadius/2) * Math.cos(((hours * 30 + (minutes / 2))-90)*Math.PI/180), clockRadius + (clockHourHeight - clockNumberRadius/2) * Math.sin(((hours * 30 + (minutes / 2))-90)*Math.PI/180));
        context.lineTo(clockRadius - (clockNumberRadius/2)  * Math.cos(((hours * 30 + (minutes / 2))-90)*Math.PI/180), clockRadius - (clockNumberRadius/2)  * Math.sin(((hours * 30 + (minutes / 2))-90)*Math.PI/180));
        context.stroke();
    }
};
