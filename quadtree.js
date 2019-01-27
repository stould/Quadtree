/* exported QuadTree */

class Rectangle {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    contains(x, y) {
        return x >= this.x - this.w &&
            x <= this.x + this.w &&
            y >= this.y - this.h &&
            y <= this.y + this.h;
            
    }
}

class QuadTree {

    constructor(boundary, capacity) {
        this.boundary = boundary;
        this.capacity = capacity;
        
        this.hasDivided = false;
        this.points = [];

        this.neRect = null;
        this.nwRect = null;

        this.seRect = null;
        this.swRect = null;

    }

    subDivide() {
        this.hasDivided = true;

        const x = this.boundary.x;
        const y = this.boundary.y;
        const w = this.boundary.w;
        const h = this.boundary.h;

        var ne = new Rectangle(x + w / 2, y + h / 2, w / 2, h / 2);
        this.neRect = new QuadTree(ne, this.capacity);

        var nw = new Rectangle(x - w / 2, y + h / 2, w / 2, h / 2);
        this.nwRect = new QuadTree(nw, this.capacity);

        var se = new Rectangle(x + w / 2, y - h / 2, w / 2, h / 2);
        this.seRect = new QuadTree(se, this.capacity);

        var sw = new Rectangle(x - w / 2, y - h / 2, w / 2, h / 2);
        this.swRect = new QuadTree(sw, this.capacity);
    }

    insert(x, y) {
        if(!this.boundary.contains(x, y)) {
            return false;
        }else{
            if (this.points.length < this.capacity) {
                var found = this.points.find(function (element) {
                    return element.x == x && element.y == y;
                });

                if(!found) {
                    this.points.push({ x: x, y: y, });
                }

                return true;
            }else{
                if (!this.hasDivided) {
                    this.subDivide();
                }

                return this.neRect.insert(x, y) ||
                    this.nwRect.insert(x, y) ||
                    this.seRect.insert(x, y) ||
                    this.swRect.insert(x, y);
            }
        }
    }

    walk() {
        if (this !== null) {
            var ans = [];
            const x = this.boundary.x;
            const y = this.boundary.y;
            const w = this.boundary.w;
            const h = this.boundary.h;

            if(this.hasDivided) {
                ans.push({
                    type: 'line',
                    xs: x - w, 
                    ys: y,
                    xe: x + w,
                    ye: y,
                });
                ans.push({
                    type: 'line',
                    xs: x,
                    ys: y + h,
                    xe: x,
                    ye: y - h,
                });
            }

            for(var i = 0; i < this.points.length; i++) {
                ans.push({
                    type: 'point',
                    x: this.points[i].x,
                    y: this.points[i].y,
                });
            }            

            if (this.neRect !== null) {
                ans.push(this.neRect.walk());
            }
            if (this.nwRect !== null) {
                ans.push(this.nwRect.walk());
            }
            if (this.seRect !== null) {
                ans.push(this.seRect.walk());
            }
            if (this.swRect !== null) {
                ans.push(this.swRect.walk());
            }
            return ans;
        } else {
            return [];
        }
    }
}