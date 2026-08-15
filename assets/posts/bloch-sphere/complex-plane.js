import p5 from "p5";
import VectorViz from "./vectorviz.esm.min.js";

let container = document.querySelector('#complex-plane');

new p5(function(s) {

    let std_eqn, exp_eqn;
    let btn;
    let std_form = true;

    let dom_real, dom_im;
    let dom_abs, dom_arg;

    let length;
    let vv, im_ax, real_ax;
    let z;
    let real, imag;

    s.setup = function() {

        std_eqn = document.querySelector('#standard-form');
        exp_eqn = document.querySelector('#exp-form');

        btn = document.querySelector('#complex-btn');
        btn.addEventListener('click', () => {
            if (std_form) {
                btn.innerText = "Show standard form";
                std_eqn.style.display = 'none';
                exp_eqn.style.display = 'block';
            } else {
                btn.innerText = "Show exponential form";
                std_eqn.style.display = 'block';
                exp_eqn.style.display = 'none';
            }
            std_form = !std_form;
        });

        let w = container.offsetWidth*0.9;
        let h = s.windowHeight/2;

        s.createCanvas(
            w, h, s.WEBGL
        );

        let factor = 0.8;
        if (w > h) {
            length = s.height*factor;
        } else {
            length = s.width*factor;
        }

        vv = VectorViz.init('2D', 'RIGHT', s);
        real_ax = vv.createVector(s.createVector(s.width*factor), 'white');
        im_ax = vv.createVector(s.createVector(0, s.height*factor), 'white');

        z = vv.createVector(s.createVector(50, 50), '#5D9CEA', false);

        real = vv.createVector(s.createVector(-z.vector.x, 0), '#5D9CEA', false);
        imag = vv.createVector(s.createVector(0, -z.vector.y), '#5D9CEA', false);

        dom_real = document.querySelector('#real-part');
        dom_im = document.querySelector('#im-part');

        dom_abs = document.querySelector('#abs');
        dom_arg = document.querySelector('#arg');
    }

    s.draw = function() {
        s.background(50);
        s.orbitControl(0, 0, 1);

        vv.setup();
        vv.setFont('assets/posts/bloch-sphere/latinmodern-math.otf');
        s.textSize(20);

        s.push();
        s.translate(-s.width*0.4, 0);
        real_ax.draw();
        real_ax.label('Re');
        s.translate(s.width*0.4, -s.height*0.4);
        im_ax.draw();
        im_ax.label('Im');
        s.pop();

        s.noStroke();
        s.fill(z.color);
        s.circle(z.vector.x, z.vector.y, 5);
        z.label('z');

        s.push();
        if (std_form) {
            s.translate(z.vector);
            real.draw();
            imag.draw();
        } else {
            z.draw();
            let pos_angle = z.vector.heading();
            if (pos_angle < 0) {
                pos_angle = s.PI + (s.PI + pos_angle);
            }
            s.arc(0, 0, 50, 50, 0, pos_angle, s.PIE);
        }
        s.pop();
    
        

        if (s.mouseIsPressed && s.mouseButton.left) {
            if ((s.mouseX > 0 && s.mouseX < s.width) && (s.mouseY > 0 && s.mouseY < s.height)) {
                let coords3 = s.screenToWorld(s.mouseX, s.mouseY);
                z.vector = coords3;
            }

            if (std_form) {
                // TODO: place in btn callback
                dom_real.innerText = Math.round(z.vector.x);
                dom_im.innerText = Math.round(z.vector.y);
                real.vector.x = -z.vector.x;
                imag.vector.y = -z.vector.y;
            } else {
                dom_abs.innerText = Math.round(z.vector.mag());
                let pos_angle = z.vector.heading();
                if (pos_angle < 0) {
                    pos_angle = s.PI + (s.PI + pos_angle);
                }
                dom_arg.innerText = pos_angle.toFixed(3);
            }
        }
    }

}, container);