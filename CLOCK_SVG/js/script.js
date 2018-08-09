"use strict";

window.onload = function (){
    var countNumber = 12; //кол-во чисел на циферблате
    var sizeClock = parseInt(prompt("Введите размер часов в пикселях")); //размер часов
    var sizeClockNumber = sizeClock/10; //размер области с цифрами
    var clockRadius = sizeClock/2; //радиус часов
    var clockNumberRadius = sizeClockNumber/2; //радиус радиус области с цифрами
    var clockSecWidth = sizeClockNumber/16; //ширина секундной стрелки
    var clockSecHeight = sizeClock/100*45; //высота секундной стрелки
    var clockMinWidth = sizeClockNumber/8; //ширина минутной стрелки
    var clockMinHeight = sizeClock/100*40; //высота минуной стрелки
    var clockHourWidth = sizeClockNumber/4; //ширина часовой стрелки
    var clockHourHeight = sizeClock/100*30; //высота часовой стрелки

    document.body.innerHTML ='<svg id=clockSvg width="' + sizeClock + '" height="' + sizeClock + '"><svg>'; //добовляем svg
    var clockSvg = document.getElementById("clockSvg");

    //рисуем часы
    var clock = document.createElementNS("http://www.w3.org/2000/svg",'ellipse');
    clock.setAttribute("fill","yellow");
    clock.setAttribute("rx",clockRadius );
    clock.setAttribute("ry",clockRadius );
    clock.setAttribute("cx",clockRadius);
    clock.setAttribute("cy",clockRadius);
    clockSvg.appendChild(clock);

    //рисуем цифры и позиционируем
    for (var i = 1; i <= countNumber; i++ ){
        var clockNumber = document.createElementNS("http://www.w3.org/2000/svg",'ellipse');
        clockNumber.setAttribute("fill","green");
        clockNumber.setAttribute("rx",clockNumberRadius );
        clockNumber.setAttribute("ry",clockNumberRadius );
        clockNumber.setAttribute("cx",clockRadius - (clockRadius - clockNumberRadius - sizeClockNumber/5) * Math.sin( 2 / countNumber * i * Math.PI));
        clockNumber.setAttribute("cy",clockRadius - (clockRadius - clockNumberRadius - sizeClockNumber/5) * Math.cos( 2 / countNumber * i * Math.PI));
        clockSvg.appendChild(clockNumber);

        var txtClockNumber = document.createElementNS("http://www.w3.org/2000/svg",'text');
        txtClockNumber.style.fontSize = sizeClock/ 20 + 'px';
        txtClockNumber.textContent = countNumber - i ;
        if(i == countNumber ){
            txtClockNumber.textContent = i;
        }
        clockSvg.appendChild(txtClockNumber);
        txtClockNumber.setAttribute("x",clockRadius - txtClockNumber.getBoundingClientRect().width/2 - (clockRadius - clockNumberRadius - sizeClockNumber/5) * Math.sin( 2 / countNumber * i * Math.PI));
        txtClockNumber.setAttribute("y",clockRadius + txtClockNumber.getBoundingClientRect().height/4 - (clockRadius - clockNumberRadius - sizeClockNumber/5) * Math.cos( 2 / countNumber * i * Math.PI));
    }

    var clockDigital = document.createElementNS("http://www.w3.org/2000/svg",'text');
    clockDigital.style.fontSize = sizeClock/ 10 + 'px';
    clockSvg.appendChild(clockDigital);

    //рисуем и позиционируем часовую стрелку
    var clockHour = document.createElementNS("http://www.w3.org/2000/svg",'rect');
    clockHour.setAttribute("fill","black");
    clockHour.setAttribute("height",clockHourHeight);
    clockHour.setAttribute("width",clockHourWidth);
    clockHour.setAttribute("x",clockRadius - clockHourWidth/2);
    clockHour.setAttribute("y",clockRadius - clockHourHeight  + clockNumberRadius/2);
    clockHour.setAttribute("rx",10);
    clockHour.setAttribute("ry",10);
    clockSvg.appendChild(clockHour);
    clockHour.style.position = "absolute";
    clockHour.style.transformOrigin = '50% 50% ';

    //рисуем и позиционируем минутную стрелку
    var clockMin = document.createElementNS("http://www.w3.org/2000/svg",'rect');
    clockMin.setAttribute("fill","black");
    clockMin.setAttribute("height",clockMinHeight );
    clockMin.setAttribute("width",clockMinWidth);
    clockMin.setAttribute("x",clockRadius - clockMinWidth/2);
    clockMin.setAttribute("y",clockRadius - clockMinHeight  + clockNumberRadius/2);
    clockMin.setAttribute("rx",10);
    clockMin.setAttribute("ry",10);
    clockSvg.appendChild(clockMin);
    clockMin.style.position = "absolute";
    clockMin.style.transformOrigin = '50% 50% ';

    //рисуем и позиционируем секундную стрелку
    var clockSec = document.createElementNS("http://www.w3.org/2000/svg",'rect');
    clockSec.setAttribute("fill","black");
    clockSec.setAttribute("height",clockSecHeight );
    clockSec.setAttribute("width",clockSecWidth );
    clockSec.setAttribute("x",clockRadius - clockSecWidth/2);
    clockSec.setAttribute("y",clockRadius - clockSecHeight + clockNumberRadius/2);
    clockSec.setAttribute("rx",10);
    clockSec.setAttribute("ry",10);
    clockSvg.appendChild(clockSec);
    clockSec.style.position = "absolute";
    clockSec.style.transformOrigin = '50% 50% ';

    requestAnimationFrame(goClock);

    //функция для поворота стрелок и заполнения цифровых часов
    function goClock() {
        //получение текущей даты
        var date = new Date;
        var seconds = date.getSeconds();
        var minutes = date.getMinutes();
        var hours = date.getHours();

        //поворачиваем стрелки
        clockSec.style.transform = 'rotate(' + seconds*6 +'deg)';
        clockMin.style.transform = 'rotate(' + minutes*6 +'deg)';
        clockHour.style.transform = 'rotate(' + (hours * 30 + (minutes / 2)) +'deg)';

        //заполняем цифровые часы
        clockDigital.textContent = hours + ':' + minutes + ':' + seconds;
        if(hours < 10){
            clockDigital.textContent = '0' + hours + ':' + minutes + ':' + seconds;
        }
        if(minutes < 10){
            clockDigital.textContent = hours + ':0' + minutes + ':' + seconds;
        }
        if(seconds < 10){
            clockDigital.textContent = hours + ':' + minutes + ':0' + seconds;
        }

        //позиционируем цифровые часы;
        clockDigital.setAttribute("x",clockRadius - clockDigital.getBoundingClientRect().width/2);
        clockDigital.setAttribute("y",clockRadius/2 + clockDigital.getBoundingClientRect().height);

        //задаем таймер для выполнения функции
        requestAnimationFrame(goClock);
    }
};