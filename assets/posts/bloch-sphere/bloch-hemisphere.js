import p5 from "p5";
import VectorViz from "./vectorviz.esm.min.js";

let container = document.querySelector('#bloch-hemisphere');

new p5(function(s) {

    let vv, axes, psi;
    let label;
    let matrix;
    let length, size;

    function hemisphere(r, lat, lon) {
      
        // Upper hemisphere: theta from 0..PI/2
        for (let i = 0; i < lat; i++) {
          const theta1 = s.map(i, 0, lat, 0, s.PI / 2);
          const theta2 = s.map(i + 1, 0, lat, 0, s.PI / 2);
      
          for (let j = 0; j < lon; j++) {
            const phi1 = s.map(j, 0, lon, 0, s.TWO_PI);
            const phi2 = s.map(j + 1, 0, lon, 0, s.TWO_PI);
      
            const p1 = spherePoint(r, theta1, phi1);
            const p2 = spherePoint(r, theta1, phi2);
            const p3 = spherePoint(r, theta2, phi1);
            const p4 = spherePoint(r, theta2, phi2);
      
            s.beginShape(s.TRIANGLES);
            s.vertex(p1.x, p1.y, p1.z);
            s.vertex(p2.x, p2.y, p2.z);
            s.vertex(p3.x, p3.y, p3.z);
      
            s.vertex(p2.x, p2.y, p2.z);
            s.vertex(p4.x, p4.y, p4.z);
            s.vertex(p3.x, p3.y, p3.z);
            s.endShape();
          }
        }
      }
      
      function spherePoint(r, theta, phi) {
        return {
          x: r * s.sin(theta) * s.cos(phi),
          y: r * s.cos(theta),
          z: r * s.sin(theta) * s.sin(phi)
        };
      }

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
        // psi = vv.createVector(s.createVector(size*s.cos(s.PI/4), size*s.sin(s.PI/4), 0), '#5D9CEA');
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

        // psi.draw(3);
        // psi.label('|ψ⟩');

        s.noStroke();
        s.fill(255, 0, 0, 100);
        s.push();
        s.rotateX(s.HALF_PI);
        hemisphere(length*0.4, 24, 16);
        s.pop();

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