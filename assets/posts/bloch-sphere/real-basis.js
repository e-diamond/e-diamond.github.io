import p5 from "p5";
import VectorViz from "./vectorviz.esm.min.js";

let container1 = document.querySelector('#real-basis');
let container2 = document.querySelector('#real-basis-2');

function generatep5func(query_string, container) {
     return function(s) {
        let length;
    
        let vv, axes;
        let psi, px, py;
    
        let co_a, co_b;
    
        function calcPsi(angle, length) {
            let x = s.cos(angle) * length;
            let y = s.sin(angle) * length;
            return s.createVector(x, y);
        }
    
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
            
    
            let color = s.color('#5D9CEA');
            let c_light = s.color('#94c3fc');
    
            vv = VectorViz.init('2D', 'RIGHT', s);
            axes = vv.createAxes([0, length], 'white');
    
            psi = vv.createVector(calcPsi(s.HALF_PI/3, length), color);
    
            let dotx = axes.axes[0].vector.dot(psi.vector)/length;
            let doty = axes.axes[1].vector.dot(psi.vector)/length;
    
            px = vv.createVector(s.createVector(dotx, 0), c_light, false);
            py = vv.createVector(s.createVector(0, doty), c_light, false);
    
            co_a = document.querySelector(`${query_string} #co-a`);
            co_b = document.querySelector(`${query_string} #co-b`);
        }
    
        s.draw = function() {
            s.background(50);
            s.orbitControl(0, 0, 1);
    
            vv.setup();
            s.translate(-length/2, -length/2);
            vv.setFont('assets/posts/bloch-sphere/latinmodern-math.otf');
            s.textSize(24);
    
            axes.draw();
            axes.label(['|1⟩', '|0⟩']);
    
            psi.draw();
            psi.label('|ψ⟩');
    
            py.draw(2.1);
            s.push();
            s.translate(-20, -py.vector.mag()/2);
            py.label('a', 0);
            s.pop();
    
            px.draw(2.1);
            s.push();
            s.translate(-px.vector.mag()/2, -20);
            px.label('b', 0);
            s.pop();
    
            if (s.mouseIsPressed && s.mouseButton.left) {
                if ((s.mouseX > 0 && s.mouseX < s.width) && (s.mouseY > 0 && s.mouseY < s.height)) {
                    let coords3 = s.screenToWorld(s.mouseX, s.mouseY);
                    let angle = s.atan2(Math.max(0, coords3.y), Math.max(0, coords3.x));
                    psi.vector = calcPsi(angle, length);
                    px.vector.x = axes.axes[0].vector.dot(psi.vector)/length;
                    py.vector.y = axes.axes[1].vector.dot(psi.vector)/length;
        
                    co_a.innerText = (py.vector.y/length).toFixed(2);
                    co_b.innerText = (px.vector.x/length).toFixed(2);   
                }
            }
        }
    
    }
}

new p5(generatep5func('#real-basis', container1), container1);

new p5(generatep5func('#real-basis-2', container2), container2);
