import p5 from "p5";
import VectorViz from "./vectorviz.esm.min.js";

let container = document.querySelector('#bloch-sphere');

new p5(function(s) {

    let vv, axes, psi;
    let label;
    let matrix;

    s.setup = function() {
        let w = container.offsetWidth*0.9;
        let h = s.windowHeight/2;

        let cnv = s.createCanvas(
            w, h, s.WEBGL
        );

        if (w > h) {
            length = s.height*0.7;
        } else {
            length = s.width*0.7;
        }

        // matrix = [
        //     0.71, 0, 0.71, 0,
        //     -0.71, 0, -0.71, 0,
        //     0, -1, 0, 0,
        //     0, 0, 0, 1
        // ];
        matrix = [
            1, 0, 0, 0,
            0, 0, -1, 0,
            0, 1, 0, 0,
            0, 0, 0, 1
        ];

        vv = VectorViz.init('3D', 'RIGHT', s);
        axes = vv.createAxes([-180, 180], 'white');
        label = vv.createVector(p5.Vector.mult(axes.axes[2].vector, -0.5), 'white');

    }

    s.draw = function() {
        s.background(50);
        s.orbitControl();

        vv.setup();
        vv.applyMatrix(matrix);
        
        vv.setFont('assets/posts/bloch-sphere/latinmodern-math.otf');

        s.fill(0, 0, 0, 255);
        axes.draw();
        s.textSize(20);
        axes.label(['', '', '|0⟩']);
        s.textAlign(s.LEFT, s.CENTER);
        label.label('|1⟩');

        s.fill(255, 0, 0, 100);
        s.noStroke();
        s.sphere(100);
    }
}, container);