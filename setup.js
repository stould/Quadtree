/*exported setup*/
/*global QuadTree, Rectangle, document, canvasHandler*/

function setup(width, height, capacity) {

    var qtree = new QuadTree (
        new Rectangle(width / 2, height / 2, width / 2, height / 2),
        capacity
    );

    var canvas = document.getElementById('myCanvas');

    canvas.width = width;
    canvas.height = height;

    canvas.style.display = 'block';

    var drawer = canvasHandler(canvas, qtree);

    drawer.delegate.addPoint = function (x, y) {
        qtree.insert(x, y);
    };
}