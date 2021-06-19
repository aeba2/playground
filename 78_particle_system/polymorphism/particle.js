// Polymorphism in JavaScript
// The Coding Train / Daniel Shiffman
// https://youtu.be/8a5BkwuZRK0
// https://thecodingtrain.com/Tutorials/16-javascript-es6/16.18-polymorphism.html
// https://editor.p5js.org/codingtrain/sketches/7MhdISflX

class Particle extends p5.Vector{
  constructor(x, y) {
    super(x,y);
    this.vel = p5.Vector.random2D();
  }

  update() {
    this.add(this.vel);
  }

  show() {
    stroke(255);
    strokeWeight(24);
    point(this.x, this.y);
  }
}
j
