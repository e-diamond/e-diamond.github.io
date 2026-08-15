import p5 from "p5";
import VectorViz from "./vectorviz.esm.min.js";

let container = document.querySelector('#circle-1');

new p5(function(s){
    let vv, axes, psi;
    let length, size;
    let angle = 0;

    s.setup = function() {
        let w = container.offsetWidth*0.9;
        let h = s.windowHeight/2;

        s.createCanvas(
            w, h, s.WEBGL
        );

        if (w > h) {
            length = s.height*0.8;
        } else {
            length = s.width*0.8;
        }
        size = length*0.4;

        vv = VectorViz.init('2D', 'RIGHT', s);
        axes = vv.createAxes([-length/2, length/2], 'white');
        psi = vv.createVector(s.createVector(size, 0), '#5D9CEA');
    }

    s.draw = function() {
        s.background(50);
        vv.setup();
        vv.setFont('assets/posts/bloch-sphere/latinmodern-math.otf');
        s.textSize(24);

        axes.draw();
        axes.label();

        psi.draw();
        psi.label('|ψ⟩');

        s.stroke(255, 0, 0)
        s.noFill();
        s.circle(0, 0, size*2);

        angle = angle+0.05;
        psi.vector.x = size*s.cos(angle);
        psi.vector.y = size*s.sin(angle);
    }
}, container)