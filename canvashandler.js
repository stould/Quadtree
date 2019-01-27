/* exported canvasHandler */
/* global requestAnimationFrame, flatten*/

var canvasHandler = function(canvas, qtree) {

    var that = {
        delegate: {},
        
    };

    var isDragging = false;

    function drawLine(xs, ys, xe, ye) {
        var ctx = canvas.getContext('2d');
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.moveTo(xs, ys);
        ctx.lineTo(xe, ye);
        ctx.stroke();
    }

    function drawPoint(x, y, radius = 1.5) {
        var ctx = canvas.getContext('2d');
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.fill();
    }

    function draw() {
        var geometrics = flatten(qtree.walk());
        geometrics.forEach(function myFunction(geometric) {
            if (geometric.type === 'line') {
                drawLine(
                    geometric.xs,
                    geometric.ys,
                    geometric.xe,
                    geometric.ye
                );
            } else if(geometric.type == 'point') {
                drawPoint(geometric.x, geometric.y,);
            }
        });
    }

    function mainLoop() {
        clear();
        draw();
        requestAnimationFrame(mainLoop);
    }

    function clear() {
        var ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    canvas.onmousedown = function (event) {
        const x = event.layerX;
        const y = event.layerY;
        that.delegate.addPoint(x, y);
        isDragging = true;
    };

    canvas.onmouseup = function () {
        isDragging = false;
    };

    canvas.onmousemove = function (event) {
        if (isDragging) {
            const x = event.layerX;
            const y = event.layerY;
            that.delegate.addPoint(x, y);
        }
    };

    requestAnimationFrame(mainLoop);

    return that;
};