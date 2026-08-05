import p5 from "p5";
import VectorViz from "./vectorviz.esm.min.js";
import ef from "./eigenfunctions.js";
import { Complex } from "./complex.mjs";

let container = document.querySelector('#wavefunction');
let eigencontainer = document.querySelector('#eigenfunctions');

let w = container.offsetWidth*0.9;
let h = window.innerHeight/2;

let a = new Complex({arg: Math.PI/4, abs: 1});
let b = a;

let ground = ef.createInfPotEigen(1, a);
let excite = ef.createInfPotEigen(2, b);
let superpos = new ef(1, function(x) {
    let e1 = ground.form(x);
    let e2 = excite.form(x);
    return e1.add(e2);
});

// ground state eigenfunction
new p5(function(s) {
    let width, height;
    let vv;
    let ket0, x;

    s.setup = function() {
        s.createCanvas(
            w/2, h*0.6, s.WEBGL
        );

        width = s.width*0.8;
        height = s.height*0.7;
        vv = VectorViz.init('2D', 'RIGHT', s);

        x = vv.createVector(s.createVector(width, 0), 'white');
        ket0 = vv.createVector(s.createVector(0, height), 'white');

        a = new Complex({arg: Math.PI/4, abs: 1});
    }

    s.draw = function() {
        s.background(50);
        s.orbitControl();

        vv.setup();
        vv.setFont('assets/posts/bloch-sphere/latinmodern-math.otf');
        s.textSize(24);

        s.translate(-width/2, -height/2);
        ket0.draw();
        ket0.label('|0⟩');

        s.translate(0, height/2);
        x.draw();
        x.label('x');

        ground.amp = new Complex({arg: sliders[0].value, abs: 1});
        ground.draw(s, width, height*0.4, 'red', 300);
    }

}, eigencontainer);

// excited state eigenfunction
new p5(function(s) {
    let width, height;
    let vv;
    let ket1, x;
    let b;

    s.setup = function() {
        s.createCanvas(
            w/2, h*0.6, s.WEBGL
        );

        width = s.width*0.8;
        height = s.height*0.7;
        vv = VectorViz.init('2D', 'RIGHT', s);

        x = vv.createVector(s.createVector(width, 0), 'white');
        ket1 = vv.createVector(s.createVector(0, height), 'white');

        b = new Complex({arg: Math.PI/4, abs: 1});
    }

    s.draw = function() {
        s.background(50);
        s.orbitControl();

        vv.setup();
        vv.setFont('assets/posts/bloch-sphere/latinmodern-math.otf');
        s.textSize(24);

        s.translate(-width/2, -height/2);
        ket1.draw();
        ket1.label('|1⟩');

        s.translate(0, height/2);
        x.draw();
        x.label('x');

        excite.amp = new Complex({arg: sliders[1].value, abs: 1});
        excite.draw(s, width, height*0.4, 'blue', 300);
    }

}, eigencontainer);

// superposition function 
new p5(function(s) {
    let width, height;
    let vv;
    let psi, r;

    s.setup = function() {
        s.createCanvas(
            w, h*0.6, s.WEBGL
        );

        width = s.width*0.8;
        height = s.height*0.8;
        vv = VectorViz.init('2D', 'RIGHT', s);

        r = vv.createVector(s.createVector(width, 0), 'white');
        psi = vv.createVector(s.createVector(0, height), 'white');
    }

    s.draw = function() {
        s.background(50);
        s.orbitControl();

        vv.setup();
        vv.setFont('assets/posts/bloch-sphere/latinmodern-math.otf');
        s.textSize(24);

        s.translate(-width/2, -height/2);
        psi.draw();
        psi.label('ψ');

        s.translate(0, height/2);
        r.draw();
        r.label('x');

        superpos.draw(s, width, height*0.4, '#f0f', 300);
    }

}, container);

function normalise(event) {
    let target = event.target;
    let new_val = Math.PI/2 - target.value;
    if (target === sliders[0]) {
        sliders[1].value = new_val;
    } else {
        sliders[0].value = new_val;
    }
}

let amps = document.querySelectorAll('.amplitudes');
let sliders = [document.createElement('input'), document.createElement('input')];
let labels = [document.createElement('label'), document.createElement('label')];
sliders.forEach((sld, i) => {
    let name = `input-${i}`;

    amps[i].appendChild(sld);
    sld.type = 'range';
    sld.min = 0;
    sld.max = Math.PI/2;
    sld.step = 0.01;
    sld.value = Math.PI/4;
    sld.name = name;
    sld.addEventListener('input', normalise);

    amps[i].appendChild(labels[i]);
    labels[i].for = name;
});

labels[0].appendChild(document.createTextNode("a"));
labels[1].appendChild(document.createTextNode("b"));
