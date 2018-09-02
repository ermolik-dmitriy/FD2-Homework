"use strict";

window.onload = function () {
    var fieldClockCanvas1 = document.getElementById('divClockCanvas1');
    var fieldClockCanvas2= document.getElementById('divClockCanvas2');
    var canvasView1 = new ClockViewCanvas();
    var canvasView2 = new ClockViewCanvas();
    var canvasModel1 = new Clock();
    var canvasModel2  = new Clock();
    var canvasController1 = new ClockControllerButtons();
    var canvasController2 = new ClockControllerButtons();
    canvasModel1.start(canvasView1,4);
    canvasModel2.start(canvasView2,0);
    canvasModel1.clockView(fieldClockCanvas1);
    canvasModel2.clockView(fieldClockCanvas2);
    canvasController1.start(fieldClockCanvas1, canvasModel1);
    canvasController2.start(fieldClockCanvas2, canvasModel2);

    var fieldClockSvg1 = document.getElementById('divClockSvg1');
    var fieldClockSvg2= document.getElementById('divClockSvg2');
    var svgView1 = new ClockViewSvg();
    var svgView2 = new ClockViewSvg();
    var svgModel1 = new Clock();
    var svgModel2  = new Clock();
    var svgController1 = new ClockControllerButtons();
    var svgController2 = new ClockControllerButtons();
    svgModel1.start(svgView1,9);
    svgModel2.start(svgView2,6);
    svgView1.clockDraw(fieldClockSvg1);
    svgView2.clockDraw(fieldClockSvg2);
    svgModel1.clockView(fieldClockSvg1);
    svgModel2.clockView(fieldClockSvg2);
    svgController1.start(fieldClockSvg1, svgModel1);
    svgController2.start(fieldClockSvg2, svgModel2);

    var fieldClockDom1 = document.getElementById('divClockDom1');
    var fieldClockDom2= document.getElementById('divClockDom2');
    var domView1 = new ClockViewDom();
    var domView2 = new ClockViewDom();
    var domModel1 = new Clock();
    var domModel2  = new Clock();
    var domController1 = new ClockControllerButtons();
    var domController2 = new ClockControllerButtons();
    domModel1.start(domView1,10);
    domModel2.start(domView2,7);
    domView1.clockDraw(fieldClockDom1);
    domView2.clockDraw(fieldClockDom2);
    domModel1.clockView(fieldClockDom1);
    domModel2.clockView(fieldClockDom2);
    domController1.start(fieldClockDom1, domModel1);
    domController2.start(fieldClockDom2, domModel2);
};


