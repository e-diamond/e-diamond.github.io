
class DiamondCubic {
    constructor(sketch, unit_size, color, max_units=1) {
        this.s = sketch;

        this.usize = unit_size;
        this.half = this.s.createVector(unit_size, unit_size, unit_size).mult(0.5);
        this.rad = unit_size/5;
        this.stroke = unit_size/10;

        this.color = color;
        this.max_units = max_units;

        this.shape = this.s.buildGeometry(this.make.bind(this));
    }

    set layers(layers) {
        this.max_units = layers;
        this.shape = this.s.buildGeometry(this.make.bind(this));
    }

    draw() {
        let s = this.s;

        s.push(); 
        s.stroke(this.color);
        s.strokeWeight(this.stroke);
        s.model(this.shape);
        s.pop();
    }

    make() {
        let s = this.s;
        
        s.rotateX(3 * s.QUARTER_PI)
        s.rotate(s.atan(1/s.sqrt(2)), [0, -1, 1]);
        let move = this.usize * 0.8;
        s.translate(move, move, move);
        s.noStroke();
        s.fill(this.color);
        s.sphere(this.rad);
        this.makeUnit(1);
    }

    makeUnit(unit_level) {
        let s = this.s;

        if (unit_level > this.max_units) {
            return true;
        } else {
            let vector = p5.Vector;

            let neg_half = vector.mult(this.half, -1);

            s.translate(neg_half);
            s.noStroke();
            s.sphere(this.rad);

            s.push(); 
            s.stroke(this.color);
            s.line(0, 0, 0, this.half.x, this.half.y, this.half.z);
            s.pop(); 

            for (let i=0; i<3; i++) {
                let axis = [1, 1, 1];
                axis[i] = -axis[i];

                s.push();
                let coord = vector.mult(neg_half, axis);
                s.translate(coord);
                s.sphere(this.rad);

                s.push();
                s.stroke(this.color); 
                s.line(0, 0, 0, -coord.x, -coord.y, -coord.z);
                s.pop();

                this.makeUnit(unit_level+1);

                s.pop();
            }
        }
    }
}

export { DiamondCubic };