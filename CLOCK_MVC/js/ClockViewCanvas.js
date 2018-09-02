"use strict";

function ClockViewCanvas(){
    this.clockUpdate = function(clockHash, field,seconds, minutes, hours){
        clockHash.myField = field;
        var clockCanvas = clockHash.myField.querySelector(".clockCanvas");
        var context = clockCanvas.getContext('2d');

        context.beginPath();
        context.arc(clockHash.clockRadius, clockHash.clockRadius, clockHash.clockRadius, 0 ,Math.PI*2, false);
        context.fillStyle = 'yellow';
        context.fill();

        var txtClockNumber = '';
        for (var i = 0; i <= clockHash.countNumber; i++ ){
            context.beginPath();
            context.arc(clockHash.clockRadius - (clockHash.clockRadius - clockHash.clockNumberRadius - clockHash.sizeClockNumber/5) * Math.sin( 2 / clockHash.countNumber * i * Math.PI), clockHash.clockRadius - (clockHash.clockRadius - clockHash.clockNumberRadius - clockHash.sizeClockNumber/5) * Math.cos( 2 / clockHash.countNumber * i * Math.PI), clockHash.clockNumberRadius, 0 ,Math.PI*2, false);
            context.fillStyle = 'green';
            context.fill();
            txtClockNumber = String(clockHash.countNumber - i);
            if(i == clockHash.countNumber)
                txtClockNumber =  String(i);
            context.beginPath();
            context.fillStyle = 'black';
            if(i == 0){
                context.fillStyle = 'yellow';
            }
            context.font = 'normal ' + clockHash.sizeClock/20 + 'px Arial';
            context.fillText(txtClockNumber, clockHash.clockRadius - (clockHash.clockRadius - clockHash.clockNumberRadius - clockHash.sizeClockNumber/5) * Math.sin( 2 / clockHash.countNumber * i * Math.PI), clockHash.clockRadius - (clockHash.clockRadius - clockHash.clockNumberRadius - clockHash.sizeClockNumber/5) * Math.cos( 2 / clockHash.countNumber * i * Math.PI));
            context.textBaseline = 'middle';
            context.textAlign = 'center';
        }

        context.lineCap = 'round';
        context.beginPath();
        context.strokeStyle = 'black';
        context.lineWidth = clockHash.clockSecWidth;
        context.moveTo(clockHash.clockRadius + (clockHash.clockSecHeight - clockHash.clockNumberRadius/2) * Math.cos((seconds*6-90)*Math.PI/180), clockHash.clockRadius + (clockHash.clockSecHeight - clockHash.clockNumberRadius/2) * Math.sin((seconds*6-90)*Math.PI/180));
        context.lineTo(clockHash.clockRadius - (clockHash.clockNumberRadius/2)  * Math.cos((seconds*6-90)*Math.PI/180), clockHash.clockRadius - (clockHash.clockNumberRadius/2)  * Math.sin((seconds*6-90)*Math.PI/180));
        context.stroke();

        context.lineCap = 'round';
        context.beginPath();
        context.strokeStyle = 'black';
        context.lineWidth = clockHash.clockMinWidth;
        context.moveTo(clockHash.clockRadius + (clockHash.clockMinHeight - clockHash.clockNumberRadius/2) * Math.cos((minutes*6-90)*Math.PI/180), clockHash.clockRadius + (clockHash.clockMinHeight - clockHash.clockNumberRadius/2) * Math.sin((minutes*6-90)*Math.PI/180));
        context.lineTo(clockHash.clockRadius - (clockHash.clockNumberRadius/2)  * Math.cos((minutes*6-90)*Math.PI/180), clockHash.clockRadius - (clockHash.clockNumberRadius/2)  * Math.sin((minutes*6-90)*Math.PI/180));
        context.stroke();

        context.lineCap = 'round';
        context.beginPath();
        context.strokeStyle = 'black';
        context.lineWidth = clockHash.clockHourWidth;
        context.moveTo(clockHash.clockRadius + (clockHash.clockHourHeight - clockHash.clockNumberRadius/2) * Math.cos(((hours * 30 + (minutes / 2))-90)*Math.PI/180), clockHash.clockRadius + (clockHash.clockHourHeight - clockHash.clockNumberRadius/2) * Math.sin(((hours * 30 + (minutes / 2))-90)*Math.PI/180));
        context.lineTo(clockHash.clockRadius - (clockHash.clockNumberRadius/2)  * Math.cos(((hours * 30 + (minutes / 2))-90)*Math.PI/180), clockHash.clockRadius - (clockHash.clockNumberRadius/2)  * Math.sin(((hours * 30 + (minutes / 2))-90)*Math.PI/180));
        context.stroke();
    }
}
