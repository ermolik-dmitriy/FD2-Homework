"use strict";

function ClockViewSvg(){
    var clockMin = document.createElementNS("http://www.w3.org/2000/svg",'rect');
    var clockHour = document.createElementNS("http://www.w3.org/2000/svg",'rect');
    var clockSec = document.createElementNS("http://www.w3.org/2000/svg",'rect');
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

        clockSec.style.transform = 'rotate(' + seconds*6 +'deg)';
        clockMin.style.transform = 'rotate(' + minutes*6 +'deg)';
        clockHour.style.transform = 'rotate(' + (hours * 30 + (minutes / 2)) +'deg)';
    };

    this.clockDraw = function(field){
        clockHash.myField = field;
        var clockSvg =clockHash.myField.querySelector(".clockSvg");

        var clock = document.createElementNS("http://www.w3.org/2000/svg",'ellipse');
        clock.setAttribute("fill","yellow");
        clock.setAttribute("rx",clockHash.clockRadius );
        clock.setAttribute("ry",clockHash.clockRadius );
        clock.setAttribute("cx",clockHash.clockRadius);
        clock.setAttribute("cy",clockHash.clockRadius);
        clockSvg.appendChild(clock);

        for (var i = 1; i <= clockHash.countNumber; i++ ){
            var clockNumber = document.createElementNS("http://www.w3.org/2000/svg",'ellipse');
            clockNumber.setAttribute("fill","green");
            clockNumber.setAttribute("rx",clockHash.clockNumberRadius );
            clockNumber.setAttribute("ry",clockHash.clockNumberRadius );
            clockNumber.setAttribute("cx",clockHash.clockRadius - (clockHash.clockRadius - clockHash.clockNumberRadius - clockHash.sizeClockNumber/5) * Math.sin( 2 / clockHash.countNumber * i * Math.PI));
            clockNumber.setAttribute("cy",clockHash.clockRadius - (clockHash.clockRadius - clockHash.clockNumberRadius - clockHash.sizeClockNumber/5) * Math.cos( 2 / clockHash.countNumber * i * Math.PI));
            clockSvg.appendChild(clockNumber);

            var txtClockNumber = document.createElementNS("http://www.w3.org/2000/svg",'text');
            txtClockNumber.style.fontSize = clockHash.sizeClock/ 20 + 'px';
            txtClockNumber.textContent = clockHash.countNumber - i ;
            if(i == clockHash.countNumber ){
                txtClockNumber.textContent = i;
            }
            clockSvg.appendChild(txtClockNumber);
            txtClockNumber.setAttribute("x",clockHash.clockRadius - txtClockNumber.getBoundingClientRect().width/2 - (clockHash.clockRadius - clockHash.clockNumberRadius - clockHash.sizeClockNumber/5) * Math.sin( 2 / clockHash.countNumber * i * Math.PI));
            txtClockNumber.setAttribute("y",clockHash.clockRadius + txtClockNumber.getBoundingClientRect().height/4 - (clockHash.clockRadius - clockHash.clockNumberRadius - clockHash.sizeClockNumber/5) * Math.cos( 2 / clockHash.countNumber * i * Math.PI));
        }

        clockHour = document.createElementNS("http://www.w3.org/2000/svg",'rect');
        clockHour.setAttribute("fill","black");
        clockHour.setAttribute("height",clockHash.clockHourHeight);
        clockHour.setAttribute("width",clockHash.clockHourWidth);
        clockHour.setAttribute("x",clockHash.clockRadius - clockHash.clockHourWidth/2);
        clockHour.setAttribute("y",clockHash.clockRadius - clockHash.clockHourHeight  + clockHash.clockNumberRadius/2);
        clockHour.setAttribute("rx",10);
        clockHour.setAttribute("ry",10);
        clockSvg.appendChild(clockHour);
        clockHour.style.position = "absolute";
        clockHour.style.transformOrigin = '50% 50% ';

        clockMin = document.createElementNS("http://www.w3.org/2000/svg",'rect');
        clockMin.setAttribute("fill","black");
        clockMin.setAttribute("height",clockHash.clockMinHeight );
        clockMin.setAttribute("width",clockHash.clockMinWidth);
        clockMin.setAttribute("x",clockHash.clockRadius - clockHash.clockMinWidth/2);
        clockMin.setAttribute("y",clockHash.clockRadius - clockHash.clockMinHeight  + clockHash.clockNumberRadius/2);
        clockMin.setAttribute("rx",10);
        clockMin.setAttribute("ry",10);
        clockSvg.appendChild(clockMin);
        clockMin.style.position = "absolute";
        clockMin.style.transformOrigin = '50% 50% ';

        clockSec = document.createElementNS("http://www.w3.org/2000/svg",'rect');
        clockSec.setAttribute("fill","black");
        clockSec.setAttribute("height",clockHash.clockSecHeight );
        clockSec.setAttribute("width",clockHash.clockSecWidth );
        clockSec.setAttribute("x",clockHash.clockRadius - clockHash.clockSecWidth/2);
        clockSec.setAttribute("y",clockHash.clockRadius - clockHash.clockSecHeight + clockHash.clockNumberRadius/2);
        clockSec.setAttribute("rx",10);
        clockSec.setAttribute("ry",10);
        clockSvg.appendChild(clockSec);
        clockSec.style.position = "absolute";
        clockSec.style.transformOrigin = '50% 50% ';
    }
}
