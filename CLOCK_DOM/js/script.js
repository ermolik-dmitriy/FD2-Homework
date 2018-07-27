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

    document.body.innerHTML ='<div id = "clock"></div>'; //добовляем контейнер для часов

    var clock = document.getElementById("clock");

    for(var i = countNumber; i >=1; i--) {
        clock.innerHTML += '<div class="clockNumber">'+ i + '</div>'; //добовляем контейнеры для цифр
    }
    //добовляем контейнеры для цифровых часов и стрелок
    clock.innerHTML += '<div id="clockDigital"><span id="clockDigitalHours"></span><span>:</span><span id="clockDigitalMinutes"></span><span>:</span><span id="clockDigitalSeconds"></span></div>';
    clock.innerHTML += '<div id="clockSec"></div>';
    clock.innerHTML += '<div id="clockMin"></div>';
    clock.innerHTML += '<div id="clockHour"></div>';

    var clockNumber = document.getElementsByClassName("clockNumber");
    var clockSec = document.getElementById("clockSec");
    var clockMin = document.getElementById("clockMin");
    var clockHour = document.getElementById("clockHour");
    var clockDigitalHours = document.getElementById("clockDigitalHours");
    var clockDigitalMinutes = document.getElementById("clockDigitalMinutes");
    var clockDigitalSeconds = document.getElementById("clockDigitalSeconds");
    var clockDigital = document.getElementById("clockDigital");

    //стилизуем основную область часов
    clock.style.width = sizeClock + 'px';
    clock.style.height = sizeClock + 'px';
    clock.style.borderRadius = 50 + "%";
    clock.style.backgroundColor = "yellow";
    clock.style.position = "absolute";

    //позиционируем и стилизуем цифры
    for (var i = 0; i < clockNumber.length; i++){
        clockNumber[i].style.width = sizeClockNumber + 'px';
        clockNumber[i].style.height =sizeClockNumber + 'px';
        clockNumber[i].style.borderRadius = 50 + "%";
        clockNumber[i].style.backgroundColor = "green";
        clockNumber[i].style.textAlign = "center";
        clockNumber[i].style.lineHeight = sizeClockNumber + 'px';
        clockNumber[i].style.position = "absolute";
        clockNumber[i].style.fontSize =sizeClock/ 20 + 'px';

        //считаем координаты расположения цифр по кругу
        var corner = 2 / countNumber * i * Math.PI;
        var  left = clockRadius - clockNumberRadius - (clockRadius - clockNumberRadius - sizeClockNumber/5) * Math.sin(corner);
        var  top = clockRadius - clockNumberRadius - (clockRadius - clockNumberRadius - sizeClockNumber/5) * Math.cos(corner);

        clockNumber[i].style.left = left + 'px';
        clockNumber[i].style.top = top + 'px';
    }

    //позиционируем и стилизуем часовю срелку
    clockHour.style.height = clockHourHeight + 'px';
    clockHour.style.width = clockHourWidth + 'px';
    clockHour.style.backgroundColor = "black";
    clockHour.style.borderRadius = 30 + "px";
    clockHour.style.position = "absolute";
    clockHour.style.left = clockRadius - clockHourWidth/2 + 'px';
    clockHour.style.top = clockRadius - clockHourHeight + clockNumberRadius/2 + 'px';
    clockHour.style.transformOrigin = '50% 95% ';

    //позиционируем и стилизуем минутную срелку
    clockMin.style.height = clockMinHeight + 'px';
    clockMin.style.width = clockMinWidth  + 'px';
    clockMin.style.backgroundColor = "black";
    clockMin.style.borderRadius = 30 + "px";
    clockMin.style.position = "absolute";
    clockMin.style.left = clockRadius - clockMinWidth/2 + 'px';
    clockMin.style.top = clockRadius - clockMinHeight + clockNumberRadius/2 + 'px';
    clockMin.style.transformOrigin = '50% 95% ';

    //позиционируем и стилизуем секундную срелку
    clockSec.style.height = clockSecHeight + 'px';
    clockSec.style.width = clockSecWidth + 'px';
    clockSec.style.backgroundColor = "black";
    clockSec.style.borderRadius = 30 + "px";
    clockSec.style.position = "absolute";
    clockSec.style.left = clockRadius - clockSecWidth/2 + 'px';
    clockSec.style.top = clockRadius - clockSecHeight + clockNumberRadius/2 + 'px';
    clockSec.style.transformOrigin = '50% 95% ';

    //задаем таймер для выполнения функции
    setInterval(goClock, 1000);

    //функция для поворота стрелок и заполнения цифровых часов
    function goClock(){
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
        clockDigitalHours.textContent = hours;
        clockDigitalMinutes.textContent = minutes;
        clockDigitalSeconds.textContent = seconds ;
        if(hours < 10){
            clockDigitalHours.textContent = '0' + hours;
        }
        if(minutes < 10){
            clockDigitalMinutes.textContent ='0' + minutes;
        }
        if(seconds < 10){
            clockDigitalSeconds.textContent = '0' + seconds ;
        }

        //позиционируем цифровые часы
        clockDigital.style.position = "absolute";
        clockDigital.style.top = clockRadius/2 + 'px';
        clockDigital.style.fontSize = sizeClock/10 + 'px';
        clockDigital.style.left = clockRadius - clockDigital.offsetWidth/2 + 'px';
    }
};

