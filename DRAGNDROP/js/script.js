"use strict";

(function dragndrop(){
    window.onload = function(){
        var imgPos = document.getElementsByClassName("dragImg");
        var cord = [];
        for(var i = 0; i < imgPos.length; i++){
            cord.push(imgPos[i].getBoundingClientRect().left);
        }
        for(i = 0; i < imgPos.length; i++){
            imgPos[i].style.position = 'absolute';
            imgPos[i].style.left = cord[i] + 'px';
        }
    };

    document.onmousedown = function(element) {
        var dragElement = element.target;
        var shiftX, shiftY;

        if (!dragElement.classList.contains('dragImg'))
            return;

        startDrag(element.clientX, element.clientY);

        document.onmousemove = function(element) {
            moveAt(element.clientX, element.clientY);
        };

        dragElement.onmouseup = function() {
            finishDrag();
        };

        function startDrag(clientX, clientY) {
            shiftX = clientX - dragElement.getBoundingClientRect().left;
            shiftY = clientY - dragElement.getBoundingClientRect().top;
            dragElement.style.position = 'fixed';
            dragElement.style.cursor = 'move';
            document.body.appendChild(dragElement);
            moveAt(clientX, clientY);
        }

        function finishDrag() {
            dragElement.style.position = 'absolute';
            dragElement.style.cursor = 'default';
            document.onmousemove = null;
            dragElement.onmouseup = null;
        }

        function moveAt(clientX, clientY) {
            var newX = clientX - shiftX;
            var newY = clientY - shiftY;
            dragElement.style.left = newX + 'px';
            dragElement.style.top = newY + 'px';
        }

        return false;
    };
})();

