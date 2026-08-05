
export default class EigenFunction {

    static createInfPotEigen(n, amp) {
        const form = function(x) {
            let base = (x*Math.PI);
            return this.amp.mul(Math.sin(n*base));
        }

        return new EigenFunction(amp, form);
    }

    constructor(amp, func) {
        this.amp = amp;
        this.form = func;
    }

    draw(s, w, h, color, pts) {
        s.push();
        s.noStroke();
        s.fill(color);

        let dx = 1/pts;
        for (let i = 0; i < pts; i++) {
            let x = i*dx;
            let phi = this.form(x).mul(h);
            s.push();
            s.translate(x*w, phi.re, phi.im);
            s.sphere(2);
            s.pop();
        }
        s.pop();
    }
}