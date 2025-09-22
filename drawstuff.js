<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Canvas Images - Toggle with Spacebar</title>
  <style>
    body { margin: 0; background: #111; display:flex; height:100vh; align-items:center; justify-content:center; }
    canvas { border: 1px solid #333; background: #000; }
    #hint { position: fixed; bottom: 12px; left: 12px; color: #ddd; font-family: sans-serif; font-size: 13px; }
  </style>
</head>
<body>
  <canvas id="viewport" width="800" height="500"></canvas>
  <div id="hint">Press <b>Spacebar</b> to toggle image</div>

<script>
/* classes */ 

// Color constructor
class Color {
    constructor(r,g,b,a) {
        try {
            if ((typeof(r) !== "number") || (typeof(g) !== "number") || (typeof(b) !== "number") || (typeof(a) !== "number"))
                throw "color component not a number";
            else if ((r<0) || (g<0) || (b<0) || (a<0)) 
                throw "color component less than 0";
            else if ((r>255) || (g>255) || (b>255) || (a>255)) 
                throw "color component bigger than 255";
            else {
                this.r = r; this.g = g; this.b = b; this.a = a; 
            }
        } // end try
        
        catch (e) {
            console.log(e);
        }
    } // end Color constructor

        // Color change method
    change(r,g,b,a) {
        try {
            if ((typeof(r) !== "number") || (typeof(g) !== "number") || (typeof(b) !== "number") || (typeof(a) !== "number"))
                throw "color component not a number";
            else if ((r<0) || (g<0) || (b<0) || (a<0)) 
                throw "color component less than 0";
            else if ((r>255) || (g>255) || (b>255) || (a>255)) 
                throw "color component bigger than 255";
            else {
                this.r = r; this.g = g; this.b = b; this.a = a; 
            }
        } // end throw
        
        catch (e) {
            console.log(e);
        }
    } // end Color change method
} // end color class


/* utility functions */
function getInputLights() {
    // const INPUT_LIGHTS_URL = "https://ncsucgclass.github.io/prog1/lights.json";
    // var httpReq = new XMLHttpRequest();
    // httpReq.open("GET",INPUT_LIGHTS_URL,false);
    // httpReq.send(null);
    // var startTime = Date.now();
    // while ((httpReq.status !== 200) && (httpReq.readyState !== XMLHttpRequest.DONE)) {
    //     if ((Date.now()-startTime) > 3000) break;
    // }
    // if ((httpReq.status !== 200) || (httpReq.readyState !== XMLHttpRequest.DONE)) {
    //     console.log("Unable to open input lights file!");
    //     return null;
    // } else
    //     return JSON.parse(httpReq.response);
	const light = [
        {"x": -0.5, "y": 1.5, "z": -0.5, "ambient": [1,1,1], "diffuse": [1,1,1], "specular": [1,1,1]},
        // {"x": 2.5, "y": 0, "z": -0.5, "ambient": [1,1,1], "diffuse": [1,1,1], "specular": [1,1,1]}
    ];
    return light;
}

// draw a pixel at x,y using color
function drawPixel(imagedata,x,y,color) {
    try {
        if ((typeof(x) !== "number") || (typeof(y) !== "number"))
            throw "drawpixel location not a number";
        else if ((x<0) || (y<0) || (x>=imagedata.width) || (y>=imagedata.height))
            throw "drawpixel location outside of image";
        else if (color instanceof Color) {
            var pixelindex = (y*imagedata.width + x) * 4;
            imagedata.data[pixelindex] = color.r;
            imagedata.data[pixelindex+1] = color.g;
            imagedata.data[pixelindex+2] = color.b;
            imagedata.data[pixelindex+3] = color.a;
        } else 
            throw "drawpixel color is not a Color";
    } // end try
    
    catch(e) {
        console.log(e);
    }
} // end drawPixel
    
// draw random pixels
function drawRandPixels(context) {
    var c = new Color(0,0,0,0); // the color at the pixel: black
    var w = context.canvas.width;
    var h = context.canvas.height;
    var imagedata = context.createImageData(w,h);
    const PIXEL_DENSITY = 0.01;
    var numPixels = (w*h)*PIXEL_DENSITY; 
    
    // Loop over 1% of the pixels in the image
    for (var x=0; x<numPixels; x++) {
        c.change(Math.random()*255,Math.random()*255,
            Math.random()*255,255); // rand color
        drawPixel(imagedata,
            Math.floor(Math.random()*w),
            Math.floor(Math.random()*h),
                c);
    } // end for x
    context.putImageData(imagedata, 0, 0);
} // end draw random pixels

// get the input ellipsoids from the standard class URL
function getInputEllipsoids() {
    const INPUT_ELLIPSOIDS_URL = 
        "https://ncsucgclass.github.io/prog1/ellipsoids.json";
        
    // load the ellipsoids file
    var httpReq = new XMLHttpRequest(); // a new http request
    httpReq.open("GET",INPUT_ELLIPSOIDS_URL,false); // init the request
    httpReq.send(null); // send the request
    var startTime = Date.now();
    while ((httpReq.status !== 200) && (httpReq.readyState !== XMLHttpRequest.DONE)) {
        if ((Date.now()-startTime) > 3000)
            break;
    } // until its loaded or we time out after three seconds
    if ((httpReq.status !== 200) || (httpReq.readyState !== XMLHttpRequest.DONE)) {
        console.log("Unable to open input ellipses file!");
        return null;
    } else
        return JSON.parse(httpReq.response); 
} // end get input ellipsoids

//get the input triangles from the standard class URL
function getInputTriangles() {
    const INPUT_TRIANGLES_URL = 
        "https://ncsucgclass.github.io/prog1/triangles.json";
        
    // load the triangles file
    var httpReq = new XMLHttpRequest(); // a new http request
    httpReq.open("GET",INPUT_TRIANGLES_URL,false); // init the request
    httpReq.send(null); // send the request
    var startTime = Date.now();
    while ((httpReq.status !== 200) && (httpReq.readyState !== XMLHttpRequest.DONE)) {
        if ((Date.now()-startTime) > 3000)
            break;
    } // until its loaded or we time out after three seconds
    if ((httpReq.status !== 200) || (httpReq.readyState !== XMLHttpRequest.DONE)) {
        console.log("Unable to open input triangles file!");
        return null;
    } else
        return JSON.parse(httpReq.response); 
} // end get input triangles

//get the input boxex from the standard class URL
function getInputBoxes() {
    const INPUT_BOXES_URL = 
        "https://ncsucgclass.github.io/prog1/boxes.json";
        
    // load the boxes file
    var httpReq = new XMLHttpRequest(); // a new http request
    httpReq.open("GET",INPUT_BOXES_URL,false); // init the request
    httpReq.send(null); // send the request
    var startTime = Date.now();
    while ((httpReq.status !== 200) && (httpReq.readyState !== XMLHttpRequest.DONE)) {
        if ((Date.now()-startTime) > 3000)
            break;
    } // until its loaded or we time out after three seconds
    if ((httpReq.status !== 200) || (httpReq.readyState !== XMLHttpRequest.DONE)) {
        console.log("Unable to open input boxes file!");
        return null;
    } else
        return JSON.parse(httpReq.response); 
} // end get input boxes

// put random points in the ellipsoids from the class github
function drawRandPixelsInInputEllipsoids(context) {
    var inputEllipsoids = getInputEllipsoids();
    var w = context.canvas.width;
    var h = context.canvas.height;
    var imagedata = context.createImageData(w,h);
    const PIXEL_DENSITY = 0.1;
    var numCanvasPixels = (w*h)*PIXEL_DENSITY; 
    
    if (inputEllipsoids != null) { 
        var x = 0; var y = 0; // pixel coord init
        var cx = 0; var cy = 0; // init center x and y coord
        var ellipsoidXRadius = 0; // init ellipsoid x radius
        var ellipsoidYRadius = 0; // init ellipsoid y radius
        var numEllipsoidPixels = 0; // init num pixels in ellipsoid
        var c = new Color(0,0,0,0); // init the ellipsoid color
        var n = inputEllipsoids.length; // the number of input ellipsoids
        //console.log("number of ellipses: " + n);

        // Loop over the ellipsoids, draw rand pixels in each
        for (var e=0; e<n; e++) {
            cx = w*inputEllipsoids[e].x; // ellipsoid center x
            cy = h*inputEllipsoids[e].y; // ellipsoid center y
            ellipsoidXRadius = Math.round(w*inputEllipsoids[e].a); // x radius
            ellipsoidYRadius = Math.round(h*inputEllipsoids[e].b); // y radius
            numEllipsoidPixels = ellipsoidXRadius*ellipsoidYRadius*Math.PI; // projected ellipsoid area
            numEllipsoidPixels *= PIXEL_DENSITY; // percentage of ellipsoid area to render to pixels
            numEllipsoidPixels = Math.round(numEllipsoidPixels);
            //console.log("ellipsoid x radius: "+ellipsoidXRadius);
            //console.log("ellipsoid y radius: "+ellipsoidYRadius);
            //console.log("num ellipsoid pixels: "+numEllipsoidPixels);
            c.change(
                inputEllipsoids[e].diffuse[0]*255,
                inputEllipsoids[e].diffuse[1]*255,
                inputEllipsoids[e].diffuse[2]*255,
                255); // ellipsoid diffuse color
            for (var p=0; p<numEllipsoidPixels; p++) {
                do {
                    x = Math.random()*2 - 1; // in unit square 
                    y = Math.random()*2 - 1; // in unit square
                } while (Math.sqrt(x*x + y*y) > 1) // a circle is also an ellipse
                drawPixel(imagedata,
                    cx+Math.round(x*ellipsoidXRadius),
                    cy+Math.round(y*ellipsoidYRadius),c);
                //console.log("color: ("+c.r+","+c.g+","+c.b+")");
                //console.log("x: "+Math.round(w*inputEllipsoids[e].x));
                //console.log("y: "+Math.round(h*inputEllipsoids[e].y));
            } // end for pixels in ellipsoid
        } // end for ellipsoids
        context.putImageData(imagedata, 0, 0);
    } // end if ellipsoids found
} // end draw rand pixels in input ellipsoids

// draw 2d projections read from the JSON file at class github
function drawInputEllipsoidsUsingArcs(context) {
    var inputEllipsoids = getInputEllipsoids();
    
    
    if (inputEllipsoids != null) { 
        var c = new Color(0,0,0,0); // the color at the pixel: black
        var w = context.canvas.width;
        var h = context.canvas.height;
        var n = inputEllipsoids.length; 
        //console.log("number of ellipsoids: " + n);

        // Loop over the ellipsoids, draw each in 2d
        for (var e=0; e<n; e++) {
            context.fillStyle = 
                "rgb(" + Math.floor(inputEllipsoids[e].diffuse[0]*255)
                +","+ Math.floor(inputEllipsoids[e].diffuse[1]*255)
                +","+ Math.floor(inputEllipsoids[e].diffuse[2]*255) +")"; // diffuse color
            context.save(); // remember previous (non-) scale
            context.scale(1, inputEllipsoids[e].b/inputEllipsoids[e].a); // scale by ellipsoid ratio 
            context.beginPath();
            context.arc(
                Math.round(w*inputEllipsoids[e].x),
                Math.round(h*inputEllipsoids[e].y),
                Math.round(w*inputEllipsoids[e].a),
                0,2*Math.PI);
            context.restore(); // undo scale before fill so stroke width unscaled
            context.fill();
            //console.log(context.fillStyle);
            //console.log("x: "+Math.round(w*inputEllipsoids[e].x));
            //console.log("y: "+Math.round(h*inputEllipsoids[e].y));
            //console.log("a: "+Math.round(w*inputEllipsoids[e].a));
            //console.log("b: "+Math.round(h*inputEllipsoids[e].b));
        } // end for ellipsoids
    } // end if ellipsoids found
} // end draw input ellipsoids

//put random points in the triangles from the class github
function drawRandPixelsInInputTriangles(context) {
    var inputTriangles = getInputTriangles();
    var w = context.canvas.width;
    var h = context.canvas.height;
    var imagedata = context.createImageData(w,h);
    const PIXEL_DENSITY = 0.1;
    var numCanvasPixels = (w*h)*PIXEL_DENSITY; 
    
    if (inputTriangles != null) { 
        var x = 0; var y = 0; // pixel coord init
        var cx = 0; var cy = 0; // init center x and y coord
        var numTrianglePixels = 0; // init num pixels in triangle
        var c = new Color(0,0,0,0); // init the triangle color
        var n = inputTriangles.length; // the number of input files
        //console.log("number of files: " + n);

        // Loop over the triangles, draw rand pixels in each
        for (var f=0; f<n; f++) {
        	var tn = inputTriangles[f].triangles.length;
        	//console.log("number of triangles in this files: " + tn);
        	
        	// Loop over the triangles, draw each in 2d
        	for(var t=0; t<tn; t++){
        		var vertex1 = inputTriangles[f].triangles[t][0];
        		var vertex2 = inputTriangles[f].triangles[t][1];
        		var vertex3 = inputTriangles[f].triangles[t][2];

        		var vertexPos1 = inputTriangles[f].vertices[vertex1];
        		var vertexPos2 = inputTriangles[f].vertices[vertex2];
        		var vertexPos3 = inputTriangles[f].vertices[vertex3];
        		//console.log("vertexPos1 " + vertexPos1);
        		//console.log("vertexPos2 " + vertexPos2);
        		//console.log("vertexPos3 " + vertexPos3);
        		
        		// triangle position on canvas
        		
        		var v1 = [w*vertexPos1[0], h*vertexPos1[1]];
        		var v2 = [w*vertexPos2[0], h*vertexPos2[1]];
        		var v3 = [w*vertexPos3[0], h*vertexPos3[1]];
        		
        		// calculate triangle area on canvas (shoelace formula)
        		var triangleArea = 0.5*Math.abs(v1[0]*v2[1]+v2[0]*v3[1]+v3[0]*v1[1]-v2[0]*v1[1]-v3[0]*v2[1]-v1[0]*v3[1]);
        		var numTrianglePixels = triangleArea; // init num pixels in triangle
            	//console.log("triangle area " + triangleArea);
            	numTrianglePixels *= PIXEL_DENSITY; // percentage of triangle area to render to pixels
            	numTrianglePixels = Math.round(numTrianglePixels);
            	// console.log("numTrianglePixels " + numTrianglePixels);
            	c.change(
            		inputTriangles[f].material.diffuse[0]*255,
                	inputTriangles[f].material.diffuse[1]*255,
                	inputTriangles[f].material.diffuse[2]*255,
                	255); // triangle diffuse color
            	for (var p=0; p<numTrianglePixels; p++) {
                    var point; // on canvas plane
            		var triangleTest = 0;
            		while (triangleTest == 0 ){ //if the pixel outside the triangle
                  	  
            			point = [Math.floor(Math.random()*w), Math.floor(Math.random()*h)];
                    	// plane checking
            			
                    	var t1 = ((point[0]-v2[0]) * (v1[1] - v2[1]) - (v1[0] - v2[0]) * (point[1] - v2[1])) < 0.0;
                    	var t2 = ((point[0]-v3[0]) * (v2[1] - v3[1]) - (v2[0] - v3[0]) * (point[1] - v3[1])) < 0.0;
                    	var t3 = ((point[0]-v1[0]) * (v3[1] - v1[1]) - (v3[0] - v1[0]) * (point[1] - v1[1])) < 0.0;
                    	
                    	if((t1==t2)&&(t2==t3)) // draw the pixel if inside the triangle
                    		triangleTest = 1;
            		}
            		drawPixel(imagedata,point[0],point[1],c);
                	//console.log("color: ("+c.r+","+c.g+","+c.b+")");
                	//console.log("x: "+ x);
                	//console.log("y: "+ y);
            	} // end for pixels in triangle
        	} // end for triangles
    	} // end for files
        context.putImageData(imagedata, 0, 0);
    } // end if triangle file found
} // end draw rand pixels in input triangles

//draw 2d projections traingle from the JSON file at class github
function drawInputTrainglesUsingPaths(context) {
    var inputTriangles = getInputTriangles();
    
    if (inputTriangles != null) { 
        var c = new Color(0,0,0,0); // the color at the pixel: black
        var w = context.canvas.width;
        var h = context.canvas.height;
        var n = inputTriangles.length; 
        //console.log("number of files: " + n);

        // Loop over the input files
        for (var f=0; f<n; f++) {
        	var tn = inputTriangles[f].triangles.length;
        	//console.log("number of triangles in this files: " + tn);
        	
        	// Loop over the triangles, draw each in 2d
        	for(var t=0; t<tn; t++){
        		var vertex1 = inputTriangles[f].triangles[t][0];
        		var vertex2 = inputTriangles[f].triangles[t][1];
        		var vertex3 = inputTriangles[f].triangles[t][2];

        		var vertexPos1 = inputTriangles[f].vertices[vertex1];
        		var vertexPos2 = inputTriangles[f].vertices[vertex2];
        		var vertexPos3 = inputTriangles[f].vertices[vertex3];
        		//console.log("vertexPos1 " + vertexPos1);
        		//console.log("vertexPos2 " + vertexPos2);
        		//console.log("vertexPos3 " + vertexPos3);
        		
            	context.fillStyle = 
            	    "rgb(" + Math.floor(inputTriangles[f].material.diffuse[0]*255)
            	    +","+ Math.floor(inputTriangles[f].material.diffuse[1]*255)
            	    +","+ Math.floor(inputTriangles[f].material.diffuse[2]*255) +")"; // diffuse color
            
            	var path=new Path2D();
            	path.moveTo(w*vertexPos1[0],h*vertexPos1[1]);
            	path.lineTo(w*vertexPos2[0],h*vertexPos2[1]);
            	path.lineTo(w*vertexPos3[0],h*vertexPos3[1]);
            	path.closePath();
            	context.fill(path);

        	} // end for triangles
        } // end for files
    } // end if triangle files found
} // end draw input triangles

function drawRandPixelsInInputBoxes(context) {
    var inputBoxes = getInputBoxes();
    var inputLights = getInputLights();
    var w = context.canvas.width;
    var h = context.canvas.height;
    var imagedata = context.createImageData(w,h);

    // initialize black background
    for (let i = 0; i < imagedata.data.length; i += 4) {
        imagedata.data[i]   = 0;
        imagedata.data[i+1] = 0;
        imagedata.data[i+2] = 0;
        imagedata.data[i+3] = 255;
    }

    if (inputBoxes != null && inputLights != null) { 
        var n = inputBoxes.length;
        var eye = {x:0.5, y:0.5, z:-0.5};    // camera position

        // normalize vector
        function normalize(v) {
            let len = Math.sqrt(v.x*v.x + v.y*v.y + v.z*v.z);
            return {x:v.x/len, y:v.y/len, z:v.z/len};
        }

        // dot product
        function dot(a,b) { return a.x*b.x + a.y*b.y + a.z*b.z; }

        // Loop over every pixel
        for (let py = 0; py < h; py++) {
            for (let px = 0; px < w; px++) {
                
                // normalized coords [0,1], flip y-axis
                let ndcX = px / w;
                let ndcY = 1 - (py / h);

                // ray direction
                let dx = ndcX - eye.x;
                let dy = ndcY - eye.y;
                let dz = 0 - eye.z;
                let len = Math.sqrt(dx*dx + dy*dy + dz*dz);
                dx /= len; dy /= len; dz /= len;

                let closestT = Infinity;
                let hitBox = null;
                let hitPoint = null;
                let hitNormal = null;

                // check each box
                for (let b=0; b<n; b++) {
                    let box = inputBoxes[b];
                    let result = rayIntersectBox(eye, {x:dx,y:dy,z:dz}, box);
                    if (result && result.t < closestT) {
                        closestT = result.t;
                        hitBox = box;
                        hitPoint = result.point;
                        hitNormal = result.normal;
                    }
                }

                if (hitBox) {
                    let N = hitNormal;
                    let V = normalize({x:eye.x-hitPoint.x, y:eye.y-hitPoint.y, z:eye.z-hitPoint.z});

                    // material properties
                    let ka = hitBox.ambient;
                    let kd = hitBox.diffuse;
                    let ks = hitBox.specular;
                    let shininess = hitBox.n;

                    // final color accumulators
                    let r=0,g=0,b=0;

                    // compute per-light contribution
                    for (let l=0; l<inputLights.length; l++) {
                        let Lraw = {x:inputLights[l].x-hitPoint.x, 
                                    y:inputLights[l].y-hitPoint.y, 
                                    z:inputLights[l].z-hitPoint.z};
                        let L = normalize(Lraw);
                        let H = normalize({x:L.x+V.x, y:L.y+V.y, z:L.z+V.z});

                        // contributions
                        let diff = Math.max(dot(N,L),0);
                        let spec = Math.pow(Math.max(dot(N,H),0), shininess);

                        // ambient
                        r += ka[0]*inputLights[l].ambient[0];
                        g += ka[1]*inputLights[l].ambient[1];
                        b += ka[2]*inputLights[l].ambient[2];

                        // diffuse
                        r += kd[0]*inputLights[l].diffuse[0]*diff;
                        g += kd[1]*inputLights[l].diffuse[1]*diff;
                        b += kd[2]*inputLights[l].diffuse[2]*diff;

                        // specular
                        r += ks[0]*inputLights[l].specular[0]*spec;
                        g += ks[1]*inputLights[l].specular[1]*spec;
                        b += ks[2]*inputLights[l].specular[2]*spec;
                    }

                    let idx = (py*w + px) * 4;
                    imagedata.data[idx]   = Math.min(255,r*255);
                    imagedata.data[idx+1] = Math.min(255,g*255);
                    imagedata.data[idx+2] = Math.min(255,b*255);
                    imagedata.data[idx+3] = 255;
                }

            }
        }
        context.putImageData(imagedata, 0, 0);
    }

    // ray-box intersection with normal output
    function rayIntersectBox(rayOrigin, rayDir, box) {
        let tmin = -Infinity, tmax = Infinity;
        let hitNormal = null;

        let slabs = [
            {lo: box.lx, hi: box.rx, origin: rayOrigin.x, dir: rayDir.x, axis:"x"},
            {lo: box.by, hi: box.ty, origin: rayOrigin.y, dir: rayDir.y, axis:"y"},
            {lo: box.fz, hi: box.rz, origin: rayOrigin.z, dir: rayDir.z, axis:"z"}
        ];

        for (let s of slabs) {
            if (s.dir === 0) {
                // Ray parallel to slab; if origin outside slab, no hit
                if (s.origin < s.lo || s.origin > s.hi) return null;
                continue;
            }
            let t1 = (s.lo - s.origin)/s.dir;
            let t2 = (s.hi - s.origin)/s.dir;
            if (t1 > t2) [t1,t2] = [t2,t1];
            if (t1 > tmin) {
                tmin = t1;
                hitNormal = {x:0,y:0,z:0};
                hitNormal[s.axis] = (s.dir>0?-1:1);
            }
            if (t2 < tmax) tmax = t2;
            if (tmax < tmin) return null;
        }

        if (tmin < 0) return null;
        let hitPoint = {
            x: rayOrigin.x + tmin*rayDir.x,
            y: rayOrigin.y + tmin*rayDir.y,
            z: rayOrigin.z + tmin*rayDir.z
        };
        return {t:tmin, point:hitPoint, normal:hitNormal};
    }
}

//draw 2d projections boxes from the JSON file at class github
function drawInputBoxesUsingPaths(context) {
    var inputBoxes = getInputBoxes();
    var n = inputBoxes.length; // the number of input boxes
	
    if (inputBoxes != null) { 
		var w = context.canvas.width;
        var h = context.canvas.height;
        var c = new Color(0,0,0,0); // the color at the pixel: black
        var x  = 0; var y  = 0; // pixel coord init
        var lx = 0; var rx = 0; // input lx, rx from boxes.json
        var by = 0; var ty = 0; // input by, ty from boxes.json
        var fz = 0; var rz = 0; // input fz, rz from boxes.json
        //console.log("number of files: " + n);

        // Loop over the input files
        for (var b=0; b<n; b++) {
				
			// input lx,rx,by,ty on canvas
			lx = w*inputBoxes[b].lx;
			rx = w*inputBoxes[b].rx;
			by = h*inputBoxes[b].by;
			ty = h*inputBoxes[b].ty; 
        		
            context.fillStyle = 
            	"rgb(" + Math.floor(inputBoxes[b].diffuse[0]*255)
            	+","+ Math.floor(inputBoxes[b].diffuse[1]*255)
            	+","+ Math.floor(inputBoxes[b].diffuse[2]*255) +")"; // diffuse color
            
            var path=new Path2D();
            path.moveTo(lx,ty);
            path.lineTo(lx,by);
            path.lineTo(rx,by);
			path.lineTo(rx,ty);
            path.closePath();
            context.fill(path);

        } // end for files
    } // end if box files found
} // end draw input boxes

/* main -- here is where execution begins after window load */

function main() {

    // Get the canvas and context
    var canvas = document.getElementById("viewport"); 
    var context = canvas.getContext("2d");
 
    // Create the image
    //drawRandPixels(context);
      // shows how to draw pixels
    
    //drawRandPixelsInInputEllipsoids(context);
      // shows how to draw pixels and read input file
      
    //drawInputEllipsoidsUsingArcs(context);
      // shows how to read input file, but not how to draw pixels
    
    //drawRandPixelsInInputTriangles(context);
      // shows how to draw pixels and read input file
    
    //drawInputTrainglesUsingPaths(context);
      // shows how to read input file, but not how to draw pixels
    
    drawRandPixelsInInputBoxes(context);
      // shows how to draw pixels and read input file
    
    //drawInputBoxesUsingPaths(context);
      // shows how to read input file, but not how to draw pixels

    // ----- ADDED: Image 2 support and toggle via spacebar -----
    // State to track which image is shown: 1 (original) or 2 (new)
    let currentImage = 1;

    // function to clear canvas
    function clearCanvas() {
        context.clearRect(0,0,canvas.width,canvas.height);
    }

    // Compose Image 2 using the available shapes (ellipsoids, triangles, boxes)
    // We keep this reasonably fast: use Canvas 2D primitives + shadows + gradients.
    function drawImage2(ctx) {
        const w = ctx.canvas.width;
        const h = ctx.canvas.height;

        // Background gradient (soft sky to deep)
        let bgGrad = ctx.createLinearGradient(0,0,0,h);
        bgGrad.addColorStop(0, "#1b2a4a");
        bgGrad.addColorStop(0.5, "#2b5a8a");
        bgGrad.addColorStop(1, "#0b1020");
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0,0,w,h);

        // Ground plane - soft glow
        let groundGrad = ctx.createLinearGradient(0,h*0.6,0,h);
        groundGrad.addColorStop(0, "rgba(255,255,255,0.02)");
        groundGrad.addColorStop(1, "rgba(0,0,0,0.5)");
        ctx.fillStyle = groundGrad;
        ctx.fillRect(0,h*0.6,w,h*0.4);

        // Add soft vignette using radial gradient
        let vignette = ctx.createRadialGradient(w/2,h/2, Math.min(w,h)*0.2, w/2,h/2, Math.max(w,h));
        vignette.addColorStop(0, "rgba(0,0,0,0)");
        vignette.addColorStop(1, "rgba(0,0,0,0.45)");
        ctx.fillStyle = vignette;
        ctx.fillRect(0,0,w,h);

        // Use ellipsoids.json shapes (if available) to place glossy orbs
        let ellips = getInputEllipsoids();
        if (ellips != null && ellips.length > 0) {
            for (let i=0;i<ellips.length && i<6;i++) {
                let e = ellips[i];
                let cx = Math.round(w*e.x);
                let cy = Math.round(h*e.y);
                let rx = Math.round(w*e.a);
                let ry = Math.round(h*e.b);

                // shadow
                ctx.save();
                ctx.translate(cx, cy + ry*0.4);
                ctx.scale(1, 0.3);
                ctx.fillStyle = "rgba(0,0,0,0.25)";
                ctx.beginPath();
                ctx.ellipse(0,0, rx*0.9, ry*0.9, 0, 0, Math.PI*2);
                ctx.fill();
                ctx.restore();

                // glossy body with radial gradient for shading
                let grad = ctx.createRadialGradient(cx - rx*0.3, cy - ry*0.4, rx*0.05, cx, cy, Math.max(rx,ry));
                let base = `rgb(${Math.floor(e.diffuse[0]*255)}, ${Math.floor(e.diffuse[1]*255)}, ${Math.floor(e.diffuse[2]*255)})`;
                grad.addColorStop(0, "rgba(255,255,255,0.8)");
                grad.addColorStop(0.15, base);
                grad.addColorStop(1, "rgba(0,0,0,0.35)");
                ctx.save();
                ctx.beginPath();
                ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI*2);
                ctx.fillStyle = grad;
                ctx.fill();
                ctx.restore();

                // subtle highlight
                ctx.save();
                ctx.beginPath();
                ctx.ellipse(cx - rx*0.25, cy - ry*0.35, rx*0.25, ry*0.25, 0, 0, Math.PI*2);
                ctx.fillStyle = "rgba(255,255,255,0.15)";
                ctx.fill();
                ctx.restore();
            }
        } else {
            // fallback: draw three decorative glossy orbs
            let palette = ["#ffd97a","#7ad3ff","#b58aff"];
            for (let i=0;i<3;i++) {
                let cx = Math.round(w*(0.25 + i*0.25));
                let cy = Math.round(h*0.45 - i*12);
                let rx = 60 + i*20;
                let ry = rx*0.7;

                ctx.save();
                ctx.translate(cx, cy + ry*0.4);
                ctx.scale(1,0.3);
                ctx.fillStyle = "rgba(0,0,0,0.25)";
                ctx.beginPath();
                ctx.ellipse(0,0, rx*0.9, ry*0.9, 0,0,Math.PI*2);
                ctx.fill();
                ctx.restore();

                let grad = ctx.createRadialGradient(cx - rx*0.3, cy - ry*0.4, 10, cx, cy, rx*1.4);
                grad.addColorStop(0, "rgba(255,255,255,0.9)");
                grad.addColorStop(0.2, palette[i]);
                grad.addColorStop(1, "rgba(0,0,0,0.35)");
                ctx.save();
                ctx.beginPath();
                ctx.ellipse(cx, cy, rx, ry, 0,0,Math.PI*2);
                ctx.fillStyle = grad;
                ctx.fill();
                ctx.restore();
            }
        }

        // Use triangle shapes (if available) to create layered faceted art
        let tris = getInputTriangles();
        ctx.save();
        if (tris != null && tris.length > 0) {
            // render first file's triangles as translucent layered shapes
            for (let f=0; f<Math.min(tris.length, 3); f++) {
                let file = tris[f];
                let tn = file.triangles.length;
                for (let t=0; t<Math.min(tn,50); t++) {
                    let v1 = file.vertices[file.triangles[t][0]];
                    let v2 = file.vertices[file.triangles[t][1]];
                    let v3 = file.vertices[file.triangles[t][2]];
                    // convert to canvas coords
                    let p1 = [w*v1[0], h*v1[1]];
                    let p2 = [w*v2[0], h*v2[1]];
                    let p3 = [w*v3[0], h*v3[1]];
                    // color mixed from material diffuse
                    let mat = file.material ? file.material : {diffuse:[Math.random(),Math.random(),Math.random()]};
                    let color = `rgba(${Math.floor(mat.diffuse[0]*255)},${Math.floor(mat.diffuse[1]*255)},${Math.floor(mat.diffuse[2]*255)},0.22)`;
                    ctx.beginPath();
                    ctx.moveTo(p1[0],p1[1]);
                    ctx.lineTo(p2[0],p2[1]);
                    ctx.lineTo(p3[0],p3[1]);
                    ctx.closePath();
                    ctx.fillStyle = color;
                    ctx.fill();
                }
            }
        } else {
            // fallback triangles: random low-opacity polygons for background interest
            for (let i=0;i<12;i++) {
                ctx.beginPath();
                let cx = (Math.random()*0.8 + 0.1) * w;
                let cy = (Math.random()*0.6 + 0.2) * h;
                ctx.moveTo(cx, cy - 40);
                ctx.lineTo(cx - 60, cy + 20);
                ctx.lineTo(cx + 60, cy + 20);
                ctx.closePath();
                ctx.fillStyle = `rgba(255,255,255,${0.03 + Math.random()*0.07})`;
                ctx.fill();
            }
        }
        ctx.restore();

        // Use boxes (if available) to draw stylized stacked blocks with shadows
        let boxes = getInputBoxes();
        ctx.save();
        if (boxes != null && boxes.length > 0) {
            // draw up to 6 boxes as stacked platforms
            for (let b=0; b<Math.min(boxes.length,6); b++) {
                let B = boxes[b];
                let lx = w*B.lx;
                let rx = w*B.rx;
                let by = h*B.by;
                let ty = h*B.ty;
                let bw = rx - lx;
                let bh = by - ty;
                let cx = lx + bw/2;
                let cy = ty + bh/2;

                // shadow offset depending on depth
                ctx.save();
                ctx.fillStyle = "rgba(0,0,0,0.25)";
                ctx.filter = 'blur(8px)';
                ctx.fillRect(lx+6, by+6, bw, bh*0.08);
                ctx.filter = 'none';
                ctx.restore();

                // top face with linear gradient
                let g = ctx.createLinearGradient(lx, ty, rx, ty+bh);
                g.addColorStop(0, `rgba(${Math.floor(B.diffuse[0]*255)}, ${Math.floor(B.diffuse[1]*255)}, ${Math.floor(B.diffuse[2]*255)}, 1)`);
                g.addColorStop(1, `rgba(0,0,0,0.25)`);
                ctx.fillStyle = g;
                ctx.fillRect(lx, ty, bw, bh);

                // slight side shading (right face)
                ctx.beginPath();
                ctx.moveTo(rx, ty);
                ctx.lineTo(rx + bw*0.06, ty + bh*0.06);
                ctx.lineTo(rx + bw*0.06, ty + bh + bh*0.06);
                ctx.lineTo(rx, ty + bh);
                ctx.closePath();
                ctx.fillStyle = "rgba(0,0,0,0.12)";
                ctx.fill();

                // highlight line
                ctx.beginPath();
                ctx.moveTo(lx + 2, ty + 2);
                ctx.lineTo(rx - 2, ty + 2);
                ctx.strokeStyle = "rgba(255,255,255,0.08)";
                ctx.lineWidth = 1;
                ctx.stroke();
            }
        } else {
            // fallback: draw a stylized platform stack in center
            let cx = w*0.7, cy = h*0.68;
            for (let i=0;i<4;i++) {
                let wbox = 160 - i*20;
                let hbox = 36;
                let lx = cx - wbox/2;
                let ty = cy - (i*24);
                ctx.save();
                ctx.fillStyle = `rgba(40,40,60, ${0.6 - i*0.08})`;
                ctx.fillRect(lx, ty, wbox, hbox);
                ctx.restore();
            }
        }
        ctx.restore();

        // Add foreground contact shadows and a focal glossy ring
        ctx.save();
        ctx.beginPath();
        ctx.ellipse(w*0.5, h*0.85, w*0.25, 18, 0, 0, Math.PI*2);
        ctx.fillStyle = "rgba(0,0,0,0.25)";
        ctx.fill();
        ctx.restore();

        // signature decorative arcs
        ctx.save();
        ctx.strokeStyle = "rgba(255,255,255,0.035)";
        ctx.lineWidth = 2;
        for (let r=1; r<6; r++) {
            ctx.beginPath();
            ctx.arc(w*0.2, h*0.25, r*18 + 40, -0.5, 1.2);
            ctx.stroke();
        }
        ctx.restore();
    }

    // Toggle images on spacebar
    window.addEventListener('keydown', (ev) => {
        if (ev.code === "Space") {
            ev.preventDefault();
            currentImage = (currentImage === 1) ? 2 : 1;
            clearCanvas();
            if (currentImage === 1) {
                drawRandPixelsInInputBoxes(context); // original image 1 unchanged
            } else {
                drawImage2(context); // new image 2
            }
        }
    });

    // also provide a small click to toggle for convenience
    canvas.addEventListener('click', () => {
        currentImage = (currentImage === 1) ? 2 : 1;
        clearCanvas();
        if (currentImage === 1) drawRandPixelsInInputBoxes(context);
        else drawImage2(context);
    });

    // Draw initial image (image 1)
    // Slight delay to ensure any synchronous XHR loads are complete
    setTimeout(() => {
        clearCanvas();
        drawRandPixelsInInputBoxes(context);
    }, 10);
}

// start after load
window.onload = main;

</script>
</body>
</html>
