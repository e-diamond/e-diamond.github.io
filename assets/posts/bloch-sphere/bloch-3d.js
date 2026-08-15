import p5 from "p5";
import VectorViz from "./vectorviz.esm.min.js";

let container = document.querySelector('#bloch-3d');

new p5(function(s) {

    let vv, axes, psi;
    let label;
    let matrix;
    let length, size;

    s.setup = function() {
        let w = container.offsetWidth*0.9;
        let h = s.windowHeight/2;

        let cnv = s.createCanvas(
            w, h, s.WEBGL
        );

        if (w > h) {
            length = s.height*0.8;
        } else {
            length = s.width*0.8;
        }
        size = length*0.4;

        matrix = [
            1, 0, 0, 0,
            0, 0, -1, 0,
            0, 1, 0, 0,
            0, 0, 0, 1
        ];

        vv = VectorViz.init('3D', 'RIGHT', s);
        axes = vv.createAxes([-length/2, length/2], 'white');
    }

    s.draw = function() {
        s.background(50);
        s.orbitControl();
        s.rotateY(-s.PI/4);

        vv.setup();
        vv.applyMatrix(matrix);
        
        vv.setFont('assets/posts/bloch-sphere/latinmodern-math.otf');

        s.fill(0, 0, 0, 255);
        axes.draw();
        s.textSize(20);
        axes.label(['x', 'y', '|0⟩']);

        if (vv.current_font) {
            s.stroke('white');
            s.fill('white');
            s.textFont(vv.current_font);
            s.translate(length/3, length/3, 0);
            s.rotateX(s.PI);
            s.text('|1⟩', 0, 0);
        }
        
    }

}, container);