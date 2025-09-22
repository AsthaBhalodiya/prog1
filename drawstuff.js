// Full rewrite: raycast rasterizer with many shapes + spacebar toggle
// Usage: include in page with <canvas id="viewport" width="800" height="600"></canvas>
// Call main() after DOM loads (or put script at bottom).

/* -----------------------
   Color class + pixel helper
   ----------------------- */
class Color {
    constructor(r = 0, g = 0, b = 0, a = 255) {
        if (![r,g,b,a].every(c => typeof c === "number")) throw "color component not a number";
        this.r = Math.max(0, Math.min(255, r));
        this.g = Math.max(0, Math.min(255, g));
        this.b = Math.max(0, Math.min(255, b));
        this.a = Math.max(0, Math.min(255, a));
    }
    change(r,g,b,a=255) {
        if (![r,g,b,a].every(c => typeof c === "number")) throw "color component not a number";
        this.r = Math.max(0, Math.min(255, r));
        this.g = Math.max(0, Math.min(255, g));
        this.b = Math.max(0, Math.min(255, b));
        this.a = Math.max(0, Math.min(255, a));
    }
}

function drawPixel(imagedata, x, y, color) {
    if (typeof x !== 'number' || typeof y !== 'number') return;
    if (x < 0 || y < 0 || x >= imagedata.width || y >= imagedata.height) return;
    if (!(color instanceof Color)) return;
    const idx = (y * imagedata.width + x) * 4;
    imagedata.data[idx] = Math.round(color.r);
    imagedata.data[idx+1] = Math.round(color.g);
    imagedata.data[idx+2] = Math.round(color.b);
    imagedata.data[idx+3] = Math.round(color.a);
}

/* -----------------------
   Vector helpers
   ----------------------- */
function v(x,y,z){ return {x:x,y:y,z:z}; }
function vAdd(a,b){ return {x:a.x+b.x, y:a.y+b.y, z:a.z+b.z}; }
function vSub(a,b){ return {x:a.x-b.x, y:a.y-b.y, z:a.z-b.z}; }
function vScale(a,s){ return {x:a.x*s, y:a.y*s, z:a.z*s}; }
function vDot(a,b){ return a.x*b.x + a.y*b.y + a.z*b.z; }
function vLen(a){ return Math.sqrt(vDot(a,a)); }
function vNorm(a){ let L=vLen(a)||1; return {x:a.x/L,y:a.y/L,z:a.z/L}; }
function vCross(a,b){ return {x: a.y*b.z - a.z*b.y, y: a.z*b.x - a.x*b.z, z: a.x*b.y - a.y*b.x}; }

/* -----------------------
   Default scene data (fallbacks if fetch fails)
   ----------------------- */
const DEFAULT_BOXES = [
    { lx:0.15, rx:0.35, by:0.25, ty:0.55, fz:0.0, rz:0.5,
      ambient:[0.05,0.05,0.05], diffuse:[0.8,0.2,0.2], specular:[0.9,0.9,0.9], n:40 },
    { lx:0.6, rx:0.85, by:0.3, ty:0.65, fz:0.0, rz:0.6,
      ambient:[0.02,0.02,0.02], diffuse:[0.2,0.6,0.8], specular:[0.9,0.9,0.9], n:20 }
];

const DEFAULT_ELLIPSOIDS = [
    { center: {x:0.5, y:0.6, z:0.3}, radii: {x:0.12, y:0.12, z:0.12}, ambient:[0.02,0.02,0.02], diffuse:[0.3,0.8,0.3], specular:[0.9,0.9,0.9], n:30 },
];

const DEFAULT_TRIANGLES = [
    {
        vertices: [[0.1,0.9,0.1], [0.3,0.7,0.2], [0.2,0.6,0.15]],
        triangles: [[0,1,2]],
        material: { ambient:[0.02,0.02,0.02], diffuse:[0.9,0.8,0.2], specular:[0.8,0.8,0.8], n:10 }
    }
];

/* -----------------------
   Scene object types
   ----------------------- */
// Ellipsoid, AABB, Triangle, Plane, Cylinder, Cone
// ... same as your original classes (omitted for brevity, unchanged) ...

/* -----------------------
   Scene and renderer
   ----------------------- */
class Scene {
    constructor() {
        this.objects = [];
        this.lights = [];
        this.background = new Color(0,0,0,255);
        this.eye = {x:0.5, y:0.5, z:-0.5};
        this.ambientGlobal = 0.05;
    }
    setLights(lights) { this.lights = lights; }
    addObject(obj) { this.objects.push(obj); }
    clearObjects() { this.objects = []; }

    traceRay(O, D) {
        let closest = null;
        for (let obj of this.objects) {
            const hit = obj.rayIntersect(O,D);
            if (hit && hit.t > 1e-6) {
                if (!closest || hit.t < closest.t) closest = hit;
            }
        }
        return closest;
    }

    shade(hit, viewDir) {
        const m = hit.material;
        let r = (m.ambient ? m.ambient[0] : 0) * this.ambientGlobal;
        let g = (m.ambient ? m.ambient[1] : 0) * this.ambientGlobal;
        let b = (m.ambient ? m.ambient[2] : 0) * this.ambientGlobal;
        for (let L of this.lights) {
            const lightDir = vNorm(vSub(v(L.x, L.y, L.z), hit.point));
            const diff = Math.max(0, vDot(hit.normal, lightDir));
            r += (m.diffuse ? m.diffuse[0] : 0) * (L.diffuse[0] || 1) * diff;
            g += (m.diffuse ? m.diffuse[1] : 0) * (L.diffuse[1] || 1) * diff;
            b += (m.diffuse ? m.diffuse[2] : 0) * (L.diffuse[2] || 1) * diff;
            const H = vNorm(vAdd(lightDir, viewDir));
            const specAngle = Math.max(0, vDot(hit.normal, H));
            const shininess = m.n || 10;
            const spec = Math.pow(specAngle, shininess);
            r += (m.specular ? m.specular[0] : 0) * (L.specular[0] || 1) * spec;
            g += (m.specular ? m.specular[1] : 0) * (L.specular[1] || 1) * spec;
            b += (m.specular ? m.specular[2] : 0) * (L.specular[2] || 1) * spec;
        }
        return new Color(Math.min(255, r*255), Math.min(255, g*255), Math.min(255, b*255), 255);
    }

    renderToContext(context) {
        const w = context.canvas.width, h = context.canvas.height;
        const imagedata = context.createImageData(w,h);
        for (let py=0; py<h; py++) {
            for (let px=0; px<w; px++) {
                const ndcX = (px + 0.5) / w;
                const ndcY = 1 - (py + 0.5) / h;
                const dir = vNorm({x: ndcX - this.eye.x, y: ndcY - this.eye.y, z: 0 - this.eye.z});
                const hit = this.traceRay(this.eye, dir);
                const idx = (py*w + px)*4;
                if (hit) {
                    const viewDir = vNorm(vScale(dir, -1));
                    const color = this.shade(hit, viewDir);
                    imagedata.data[idx] = color.r;
                    imagedata.data[idx+1] = color.g;
                    imagedata.data[idx+2] = color.b;
                    imagedata.data[idx+3] = color.a;
                } else {
                    imagedata.data[idx] = this.background.r;
                    imagedata.data[idx+1] = this.background.g;
                    imagedata.data[idx+2] = this.background.b;
                    imagedata.data[idx+3] = this.background.a;
                }
            }
        }
        context.putImageData(imagedata, 0, 0);
    }
}

/* -----------------------
   Input light function (user-defined)
   ----------------------- */
function getInputLights() {
    return [
        { x:-0.5, y:1.5, z:-0.5, ambient:[1,1,1], diffuse:[1,1,1], specular:[1,1,1] }
    ];
}

/* -----------------------
   Scene building helpers
   ----------------------- */
function buildBoxesOnlyScene(boxes, lights) {
    const scene = new Scene();
    scene.setLights(lights);
    for (let box of boxes) scene.addObject(new Box(box));
    return scene;
}

function buildFullScene(boxes, ellipsoids, triangles, cylinders, cones, planes, lights) {
    const scene = new Scene();
    scene.setLights(lights);
    for (let box of boxes) scene.addObject(new Box(box));
    for (let e of ellipsoids) scene.addObject(new Ellipsoid(e));
    for (let t of triangles) scene.addObject(new TriangleMesh(t));
    for (let c of cylinders) scene.addObject(new Cylinder(c));
    for (let co of cones) scene.addObject(new Cone(co));
    for (let p of planes) scene.addObject(new Plane(p));
    return scene;
}

/* -----------------------
   Main function
   ----------------------- */
function main() {
    const canvas = document.getElementById('viewport');
    const ctx = canvas.getContext('2d');

    // 1. Lights
    const lightsJson = getInputLights();

    // 2. Scene A (image 1) - boxes only
    const sceneA = buildBoxesOnlyScene(DEFAULT_BOXES, lightsJson);

    // 3. Scene B (image 2) - full scene but remove first 2 boxes
    const boxesForSceneB = DEFAULT_BOXES.slice(2); // remove first two boxes
    const sceneB = buildFullScene(
        boxesForSceneB,
        DEFAULT_ELLIPSOIDS,
        DEFAULT_TRIANGLES,
        [], // cylinders
        [], // cones
        [], // planes
        lightsJson
    );

    // 4. Toggle scenes with spacebar
    let currentScene = sceneA;
    window.addEventListener('keydown', (e)=>{
        if(e.code === 'Space') {
            currentScene = (currentScene === sceneA) ? sceneB : sceneA;
            currentScene.renderToContext(ctx);
        }
    });

    // Initial render
    currentScene.renderToContext(ctx);
}

// Run main
window.onload = main;
