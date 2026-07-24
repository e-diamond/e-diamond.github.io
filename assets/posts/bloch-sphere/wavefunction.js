import p5 from "p5";
import VectorViz from "./vectorviz.esm.min.js";

let container = document.querySelector('#wavefunction');
let eigencontainer = document.querySelector('#eigenfunctions');

let w = container.offsetWidth*0.9;
let h = window.innerHeight/2;

function eigenFactory(n, amp) {
    return function(w, h, x) {
        let scale = amp*h*0.4;
        let base = x*Math.PI/w;

        return scale*Math.sin(n*base);
    }
}

function drawFunction(s, width, height, func) {
    let points = 300;
    let dx = width/points;
    for (let i = 0; i < points; i++) {
        let x = i*dx;
        s.circle(x, func(width, height, x), 5);
    }
}

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
    }

    s.draw = function() {
        s.background(50);

        vv.setup();
        vv.setFont('assets/posts/bloch-sphere/latinmodern-math.otf');
        s.textSize(24);

        s.translate(-width/2, -height/2);
        ket0.draw();
        ket0.label('|0⟩');

        s.translate(0, height/2);
        x.draw();
        x.label('x');

        s.noStroke();
        s.fill('red');
        const ground = eigenFactory(1, sliders[0].value);
        drawFunction(s, width, height, ground);
    }

}, eigencontainer);

// excited state eigenfunction
new p5(function(s) {
    let width, height;
    let vv;
    let ket1, x;

    s.setup = function() {
        s.createCanvas(
            w/2, h*0.6, s.WEBGL
        );

        width = s.width*0.8;
        height = s.height*0.7;
        vv = VectorViz.init('2D', 'RIGHT', s);

        x = vv.createVector(s.createVector(width, 0), 'white');
        ket1 = vv.createVector(s.createVector(0, height), 'white');
    }

    s.draw = function() {
        s.background(50);

        vv.setup();
        vv.setFont('assets/posts/bloch-sphere/latinmodern-math.otf');
        s.textSize(24);

        s.translate(-width/2, -height/2);
        ket1.draw();
        ket1.label('|1⟩');

        s.translate(0, height/2);
        x.draw();
        x.label('x');

        s.noStroke();
        s.fill('blue');
        const excite = eigenFactory(2, sliders[1].value);
        drawFunction(s, width, height, excite);
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

        vv.setup();
        vv.setFont('assets/posts/bloch-sphere/latinmodern-math.otf');
        s.textSize(24);

        s.translate(-width/2, -height/2);
        psi.draw();
        psi.label('ψ');

        s.translate(0, height/2);
        r.draw();
        r.label('x');

        // draw sine waves 
        s.noStroke();
        s.fill('#f0f');
        function superposition(w, h, x) {
            const ground = eigenFactory(1, sliders[0].value);
            const excite = eigenFactory(2, sliders[1].value);
            return ground(w, h, x) + excite(w, h, x);
        }
        drawFunction(s, width, height, superposition);
    }

}, container);

function normalise(event) {
    let target = event.target;
    let new_val = Math.sqrt(1 - target.value**2);
    if (target === sliders[0]) {
        sliders[1].value = new_val;
    } else {
        sliders[0].value = new_val;
    }
}

let controls = document.querySelector('#wavefunction .controls');
let amps = document.querySelectorAll('.amplitudes');
console.log(amps);
let sliders = [document.createElement('input'), document.createElement('input')];
sliders.forEach((sld, i) => {
    amps[i].appendChild(sld);
    sld.type = 'range';
    sld.min = 0;
    sld.max = 1;
    sld.step = 0.01;
    sld.value = 0.7071;
    sld.addEventListener('input', normalise);
    console.log(sld);
});
