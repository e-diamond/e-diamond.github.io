
import { DiamondCubic } from "./diamondcubic.js";

var diamond_cubic;
var layers = 2;

var count = 0;
var playing = true;
var rangle = 0.005;

// make js-relevant elements visible 
document.getElementsByClassName('js-only').forEach(element => {
    element.style.visibility = 'visible';
});

// identify play/pause button 
var pp_btn = document.getElementById('play-pause-btn');
pp_btn.addEventListener('click', () => {
    const pause_path = "M0 832h192V192H0V832zM320 192v640h192V192H320z";
    const play_path = "M0 192l512 320L0 832V192z";
    let icon = document.getElementById('play-pause-icon');

    if (playing) {
        pp_btn.setAttribute('title', "Play Animation");
        icon.setAttribute('d', play_path);
    } else {
        pp_btn.setAttribute('title', "Pause Animation");
        icon.setAttribute('d', pause_path);
    }
    playing = !playing;
});

// identify content to hide 
var content = document.querySelector('main');
// identify controls to stick to screen 
var controls = document.querySelector('.js-control-panel');
// identify body to remove touch-action 
var body = document.body;

// identify toggle to hide content so user can see animation 
var hide = document.getElementById('hide-content');
hide.addEventListener('change', () => {
    if (hide.checked) {
        content.style.opacity = 0;
        content.style.visibility = 'hidden';
        controls.style.position = 'sticky';
        body.style.touchAction = 'none';

    } else {
        content.style.visibility = 'visible';
        content.style.opacity = 1;
        controls.style.position = 'static';
        body.style.touchAction = 'auto';
    }
});

var add_layer = document.querySelector('button#add-layer');
add_layer.addEventListener('click', () => {
    layers++;
    diamond_cubic.layers = layers;
    if (layers == 1) {
        remove_layer.removeAttribute('disabled');
    } else if (layers == 6) {
        alert("Heads Up! Trying to add more layers might cause your computer to hang. Continue at your own peril.");
    }
});

var remove_layer = document.querySelector('button#remove-layer');
remove_layer.addEventListener('click', () => {
    layers--;
    diamond_cubic.layers = layers;
    if (layers == 0) {
        remove_layer.setAttribute('disabled', "");
    }
});

new p5(function(p5) {
    p5.setup = function() {
        p5.createCanvas(
            p5.windowWidth,
            p5.windowHeight,
            p5.WEBGL,
            document.querySelector('#bg-canvas')
        );

        // draw structure 
        let u_size = p5.height/5;
        let color = 150;
        diamond_cubic = new DiamondCubic(p5, u_size, color, layers);
    }

    p5.draw = function() {
        // make background transparent 
        p5.background(0, 0);
        // stop zooming - allow only x and y movement 
        // unless content is hidden 
        if (hide.checked) {
            p5.orbitControl();
        } else {
            p5.orbitControl(1, 1, 0);
        }
        // increment count 
        if (playing) {
            count++;
        }

        p5.rotateY(count * rangle);
        diamond_cubic.draw();
    }

    p5.windowResized = function() {
        p5.resizeCanvas(
            p5.windowWidth,
            p5.windowHeight,
            true
        );
    }
});