"use strict";

function ClockViewDom(){
    var clockHash = {
        countNumber : 12,
        sizeClock : 300,
        sizeClockNumber : 30,
        clockRadius : 150,
        clockNumberRadius : 15,
        clockSecWidth : 2,
        clockSecHeight : 135,
        clockMinWidth : 4,
        clockMinHeight : 120,
        clockHourWidth : 8,
        clockHourHeight : 90,
        myField : null
    };

    this.clockUpdate = function(clockHash, field,seconds, minutes, hours){
        clockHash.myField = field;
        var clockDom=clockHash.myField.querySelector(".clockDom");

        var clockSec = clockDom.querySelector(".clockSec");
        var clockMin = clockDom.querySelector(".clockMin");
        var clockHour = clockDom.querySelector(".clockHour");

        clockSec.style.transform = 'rotate(' + seconds*6 +'deg)';
        clockMin.style.transform = 'rotate(' + minutes*6 +'deg)';
        clockHour.style.transform = 'rotate(' + (hours * 30 + (minutes / 2)) +'deg)';
    };

    this.clockDraw = function(field){
        clockHash.myField = field;
        var clockDom=clockHash.myField.querySelector(".clockDom");

        for(var i = clockHash.countNumber; i >=1; i--) {
            clockDom.innerHTML += '<div class="clockNumber">'+ i + '</div>';
        }
        clockDom.innerHTML += '<div class="clockSec"></div>';
        clockDom.innerHTML += '<div class="clockMin"></div>';
        clockDom.innerHTML += '<div class="clockHour"></div>';

        var clockNumber = document.getElementsByClassName("clockNumber");
        var clockSec = clockDom.querySelector(".clockSec");
        var clockMin = clockDom.querySelector(".clockMin");
        var clockHour = clockDom.querySelector(".clockHour");

        clockDom.style.width = clockHash.sizeClock + 'px';
        clockDom.style.height = clockHash.sizeClock + 'px';
        clockDom.style.borderRadius = 50 + "%";
        clockDom.style.backgroundColor = "yellow";
        clockDom.style.position = "relative";

        for (var i = 0; i < clockNumber.length; i++){
            clockNumber[i].style.width = clockHash.sizeClockNumber + 'px';
            clockNumber[i].style.height =clockHash.sizeClockNumber + 'px';
            clockNumber[i].style.borderRadius = 50 + "%";
            clockNumber[i].style.backgroundColor = "green";
            clockNumber[i].style.textAlign = "center";
            clockNumber[i].style.lineHeight = clockHash.sizeClockNumber + 'px';
            clockNumber[i].style.position = "absolute";
            clockNumber[i].style.fontSize =clockHash.sizeClock/ 20 + 'px';

            var corner = 2 / clockHash.countNumber * i * Math.PI;
            var  left = clockHash.clockRadius - clockHash.clockNumberRadius - (clockHash.clockRadius - clockHash.clockNumberRadius - clockHash.sizeClockNumber/5) * Math.sin(corner);
            var  top = clockHash.clockRadius - clockHash.clockNumberRadius - (clockHash.clockRadius - clockHash.clockNumberRadius - clockHash.sizeClockNumber/5) * Math.cos(corner);

            clockNumber[i].style.left = left + 'px';
            clockNumber[i].style.top = top + 'px';
        }

        clockHour.style.height = clockHash.clockHourHeight + 'px';
        clockHour.style.width = clockHash.clockHourWidth + 'px';
        clockHour.style.backgroundColor = "black";
        clockHour.style.borderRadius = 30 + "px";
        clockHour.style.position = "absolute";
        clockHour.style.left = clockHash.clockRadius - clockHash.clockHourWidth/2 + 'px';
        clockHour.style.top = clockHash.clockRadius - clockHash.clockHourHeight + clockHash.clockNumberRadius/2 + 'px';
        clockHour.style.transformOrigin = '50% 95% ';

        clockMin.style.height = clockHash.clockMinHeight + 'px';
        clockMin.style.width = clockHash.clockMinWidth  + 'px';
        clockMin.style.backgroundColor = "black";
        clockMin.style.borderRadius = 30 + "px";
        clockMin.style.position = "absolute";
        clockMin.style.left = clockHash.clockRadius - clockHash.clockMinWidth/2 + 'px';
        clockMin.style.top = clockHash.clockRadius - clockHash.clockMinHeight + clockHash.clockNumberRadius/2 + 'px';
        clockMin.style.transformOrigin = '50% 95% ';

        clockSec.style.height = clockHash.clockSecHeight + 'px';
        clockSec.style.width = clockHash.clockSecWidth + 'px';
        clockSec.style.backgroundColor = "black";
        clockSec.style.borderRadius = 30 + "px";
        clockSec.style.position = "absolute";
        clockSec.style.left = clockHash.clockRadius - clockHash.clockSecWidth/2 + 'px';
        clockSec.style.top = clockHash.clockRadius - clockHash.clockSecHeight + clockHash.clockNumberRadius/2 + 'px';
        clockSec.style.transformOrigin = '50% 95% ';
    }
}
