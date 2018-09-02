"use strict";

function Clock(){
    var self = this;
    var myView = null;
    var myGmt = null;
    var myClockGo = true;
    var clockTimer = null;
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

    this.start=function(view, gmt) {
        myView = view;
        myGmt = gmt;
    };

    this.updateView=function(clockHash,field, seconds, minutes, hours) {
        if ( myView )
            myView.clockUpdate(clockHash,field, seconds, minutes, hours);
    };

    this.clockView = function (field){
        function goClock() {
            var date = new Date;
            var seconds = date.getSeconds();
            var minutes = date.getMinutes();
            var hours = date.getHours() + myGmt;
            self.updateView(clockHash,field, seconds, minutes, hours);
        }
        goClock();
        clockTimer = setInterval(goClock, 1000);
    };

    this.myClockGoStart = function(myField){
        if(!myClockGo){
            myClockGo = true;
            self.clockView(myField);
        }
    };

    this.myClockGoStop = function(){
        if(myClockGo){
            myClockGo = false;
            clearInterval(clockTimer);
        }
    };
}

