"use strict";

function ClockControllerButtons(){
    var myField = null;
    var myView = null;

    this.start=function(field,view) {
        myField=field;
        myView = view;

        var buttonStart=myField.querySelector('.start');
        buttonStart.addEventListener('click',this.clockButtonStart);
        var buttonStop=myField.querySelector('.stop');
        buttonStop.addEventListener('click',this.clockButtonStop);
    };
    this.clockButtonStart = function(){
        myView.myClockGoStart(myField);
    };
    this.clockButtonStop = function(){
        myView.myClockGoStop();
    };
}
