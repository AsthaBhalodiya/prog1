/* classes */
class Color {
    constructor(r, g, b, a) {
        try {
            if ((typeof r !== "number") || (typeof g !== "number") || (typeof b !== "number") || (typeof a !== "number"))
                throw "color component not a number";
            else if ((r < 0) || (g < 0) || (b < 0) || (a < 0))
                throw "color component cannot be negative";
            this.r = r;
            this.g = g;
            this.b = b;
            this.a = a;
        } catch (err) {
            console.error("Error in Color:", err);
            this.r = 0; this.g = 0; this.b = 0; this.a = 1;
        }
    }
    rgba() {
        return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
    }
}

class Circle {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }
    draw(ctx) {
        ctx.save();
        ctx.shadowColor = "rgba(0,0,0,0.5)";
        ctx.shadowBlur = 20;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color.rgba();
        ctx.fill();
        ctx.restore();
    }
}

class Rectangle {
    constructor(x, y, w, h, color) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = color;
    }
    draw(ctx) {
        ctx.save();
        ctx.shadowColor = "rgba(0,0,0,0.5)";
        ctx.shadowBlur = 15;
        ctx.fillStyle = this.color.rgba();
        ctx.fillRect(this.x, this.y, this.w, this.h);
        ctx.restore();
    }
}

// initialize canvas
const canvas = document.createElement("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);
const ctx = canvas.getContext("2d");

// IMAGE 1 - original shapes (keep it as it is)
function drawImage1() {
    const c1 = new Circle(200, 200, 100, new Color(255, 100, 50, 0.8));
    const r1 = new Rectangle(300, 150, 200, 150, new Color(50, 150, 255, 0.7));
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    c1.draw(ctx);
    r1.draw(ctx);
}

// IMAGE 2 - new random meaningful shapes
function drawImage2() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Random circles
    for (let i = 0; i < 5; i++) {
        const circle = new Circle(
            Math.random() * canvas.width,
            Math.random() * canvas.height,
            50 + Math.random() * 80,
            new Color(
                Math.random() * 255,
                Math.random() * 255,
                Math.random() * 255,
                0.6 + Math.random() * 0.4
            )
        );
        circle.draw(ctx);
    }

    // Random rectangles
    for (let i = 0; i < 4; i++) {
        const rect = new Rectangle(
            Math.random() * canvas.width,
            Math.random() * canvas.height,
            100 + Math.random() * 200,
            50 + Math.random() * 150,
            new Color(
                Math.random() * 255,
                Math.random() * 255,
                Math.random() * 255,
                0.5 + Math.random() * 0.5
            )
        );
        rect.draw(ctx);
    }

    // Add a large semi-transparent overlay for shading effect
    ctx.save();
    ctx.fillStyle = "rgba(0,0,0,0.1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
}

// initial draw
drawImage1();

// listen for spacebar to generate image 2
window.addEventListener("keydown", (e) => {
    if (e.code === "Space") {
        drawImage2();
    }
});
