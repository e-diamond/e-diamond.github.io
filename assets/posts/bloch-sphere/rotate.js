import p5 from "p5";
import VectorViz from "./vectorviz.esm.min.js";
import ef from "./eigenfunctions.js";
import { Complex } from "./complex.mjs";

let container = document.querySelector('#rotate');

let w = container.offsetWidth*0.9;
let h = window.innerHeight/2;

let a = new Complex({arg: Math.PI/4, abs: 1});
let b = a;

let ground = ef.createInfPotEigen(1, a);
let excite = ef.createInfPotEigen(2, b);

// ground state eigenfunction
new p5(function(s) {
    let width, height;
    let vv;
    let x, re0, im0;

    s.setup = function() {
        s.createCanvas(
            w, h*0.6, s.WEBGL
        );

        width = s.width*0.8;
        height = s.height*0.7;
        vv = VectorViz.init('3D', 'RIGHT', s);

        x = vv.createVector(s.createVector(width, 0, 0), 'white');
        re0 = vv.createVector(s.createVector(0, height, 0), 'white');
        im0 = vv.createVector(s.createVector(0, 0, height), 'white');

        a = new Complex({arg: Math.PI/4, abs: 1});
    }

    s.draw = function() {
        s.background(50);
        s.orbitControl();
        s.rotateY(-1);

        vv.setup();
        vv.setFont('assets/posts/bloch-sphere/latinmodern-math.otf');
        s.textSize(24);

        s.translate(-width/2, -height/2);
        re0.draw();
        re0.label('|0⟩');

        s.translate(0, height/2, -height/2);
        im0.draw();

        s.translate(0, 0, height/2);
        x.draw();
        x.label('x');

        let phase = 0.01;
        ground.amp = new Complex({arg: ground.amp.arg()+phase, abs: 1});
        ground.draw(s, width, height*0.4, 'red', 300);
    }

}, container);

// excited state eigenfunction
new p5(function(s) {
    let width, height;
    let vv;
    let x, re1, im1;

    s.setup = function() {
        s.createCanvas(
            w, h*0.6, s.WEBGL
        );

        width = s.width*0.8;
        height = s.height*0.7;
        vv = VectorViz.init('2D', 'RIGHT', s);

        x = vv.createVector(s.createVector(width, 0, 0), 'white');
        re1 = vv.createVector(s.createVector(0, height, 0), 'white');
        im1 = vv.createVector(s.createVector(0, 0, height), 'white');
    }

    s.draw = function() {
        s.background(50);
        s.orbitControl();
        s.rotateY(-1);

        vv.setup();
        vv.setFont('assets/posts/bloch-sphere/latinmodern-math.otf');
        s.textSize(24);

        s.translate(-width/2, -height/2);
        re1.draw();
        re1.label('|1⟩');

        s.translate(0, height/2, -height/2);
        im1.draw();

        s.translate(0, 0, height/2);
        x.draw();
        x.label('x');

        let phase = 0.04;
        excite.amp = new Complex({arg: excite.amp.arg()+phase, abs: 1});;
        excite.draw(s, width, height*0.4, 'blue', 300);
    }

}, container);