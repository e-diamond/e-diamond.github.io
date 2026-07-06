import p5 from "p5";
import VectorViz from "./vectorviz.esm.min.js";

let container = document.querySelector('#complex-plane');

new p5(function(s) {

    let length;
    let vv, axes;
    let z;

    s.setup = function() {
        let w = container.offsetWidth*0.9;
        let h = s.windowHeight/2;

        let cnv = s.createCanvas(
            w, h, s.WEBGL
        );

        let factor = 0.8;
        if (w > h) {
            length = s.height*factor;
        } else {
            length = s.width*factor;
        }

        vv = VectorViz.init('2D', 'RIGHT', s);
        axes = vv.createAxes([-length/2, length/2], 'white');

        z = vv.createVector(s.createVector(50, 50), '#5D9CEA');
    }

    s.draw = function() {
        s.background(50);
        s.orbitControl(0, 0, 1);

        vv.setup();
        vv.setFont('assets/posts/bloch-sphere/latinmodern-math.otf');
        s.textSize(20);

        axes.draw();
        axes.label(['ℝ', 'Im']);

        s.noStroke();
        s.fill(z.color);
        s.circle(z.vector.x, z.vector.y, 5);
        let re = Math.round(z.vector.x);
        let im = Math.round(z.vector.y);
        z.label(`${re} + ${im}𝒊`);

        if (s.mouseIsPressed && s.mouseButton.left) {
            if ((s.mouseX > 0 && s.mouseX < s.width) && (s.mouseY > 0 && s.mouseY < s.height)) {
                let coords3 = s.screenToWorld(s.mouseX, s.mouseY);
                z.vector = coords3;
            }
        }
    }

}, container);