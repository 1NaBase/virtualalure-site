const canvas = document.getElementById('hero-canvas');
const ctx = canvas.getContext('2d');
let animationId;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

let lines = [];
class Line {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.length = Math.random() * 100 + 50;
    this.speed = Math.random() * 2 + 0.5;
    this.color = Math.random() > 0.5 ? '#3b82f6' : '#8b5cf6';
    this.angle = Math.random() * Math.PI * 2;
  }
  update() {
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed;
    if (this.x > canvas.width + this.length) this.x = -this.length;
    if (this.y > canvas.height + this.length) this.y = -this.length;
    if (this.x < -this.length) this.x = canvas.width;
    if (this.y < -this.length) this.y = canvas.height;
  }
  draw() {
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x + Math.cos(this.angle) * this.length, this.y + Math.sin(this.angle) * this.length);
    ctx.stroke();
  }
}

function initLines() {
  lines = [];
  for (let i = 0; i < 20; i++) {
    lines.push(new Line());
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  lines.forEach(line => {
    line.update();
    line.draw();
  });
  animationId = requestAnimationFrame(animate);
}
initLines();
animate();
