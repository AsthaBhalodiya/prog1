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
    //     return String.null;
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
        console.log*("Unable to open input ellipses file!");
        return String.null;
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
        console.log*("Unable to open input triangles file!");
        return String.null;
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
        console.log*("Unable to open input boxes file!");
        return String.null;
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
    
    if (inputEllipsoids != String.null) { 
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
    
    
    if (inputEllipsoids != String.null) { 
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
    
    if (inputTriangles != String.null) { 
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
    
    if (inputTriangles != String.null) { 
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

    if (inputBoxes != String.null && inputLights != String.null) { 
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
	
    if (inputBoxes != String.null) { 
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

let _rendererMode = 0; // 0 = original boxes renderer, 1 = new design renderer

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

    // Set up spacebar toggle to switch between original and new design
    window.addEventListener('keydown', function(e) {
        if (e.code === 'Space') {
            e.preventDefault();
            _rendererMode = 1 - _rendererMode;
            if (_rendererMode === 0) {
                drawRandPixelsInInputBoxes(context);
            } else {
                newDesignRenderer(context);
            }
        }
    });

    // Also allow clicking canvas to render selected mode
    canvas.addEventListener('click', function() {
        if (_rendererMode === 0) {
            drawRandPixelsInInputBoxes(context);
        } else {
            newDesignRenderer(context);
        }
    });

    // Initially render based on _rendererMode (keeps original behavior)
    if (_rendererMode === 0) drawRandPixelsInInputBoxes(context);
    else newDesignRenderer(context);
}

/* ============ NEW: 3D Ray-Traced "new design" renderer ============

   - lightweight per-pixel ray tracer (no dependencies)
   - spheres, triangle (single), axis-aligned boxes
   - ambient/diffuse/specular (Phong)
   - point light(s), shadows (shadow rays)
   - camera with simple perspective projection
   - toggle using spacebar (wired above)

   It does not rely on external JSON files and renders a procedural scene.
*/

function newDesignRenderer(context) {
    const w = context.canvas.width;
    const h = context.canvas.height;
    const imagedata = context.createImageData(w,h);

    // small optimization: render in blocks? For now render every pixel.
    // scene definition
    const scene = {
        camera: {
            pos: {x:0.5, y:0.5, z:-1.0},
            fov: 60 // degrees
        },
        lights: [
            {pos:{x:0.2, y:1.2, z:-0.2}, intensity: {ambient:0.15, diffuse:1.0, specular:0.9}},
            {pos:{x:1.2, y:0.8, z:-0.7}, intensity: {ambient:0.05, diffuse:0.5, specular:0.4}}
        ],
        objects: [
            // sphere (as ellipsoid with uniform radius)
            {type:'sphere', center:{x:0.35,y:0.45,z:0.2}, radius:0.12, material:{
                ambient: [0.05,0.02,0.08],
                diffuse: [0.4,0.1,0.8],
                specular: [1,1,1],
                shininess: 60,
                reflective: 0.2
            }},
            // another sphere
            {type:'sphere', center:{x:0.75,y:0.4,z:0.0}, radius:0.1, material:{
                ambient: [0.02,0.05,0.02],
                diffuse: [0.1,0.7,0.2],
                specular: [1,1,1],
                shininess: 20,
                reflective: 0.05
            }},
            // floor as large plane via big box
            {type:'box', lx:-10, rx:10, by:-10, ty:0.0, fz:10, rz:20, material:{
                ambient:[0.02,0.02,0.02],
                diffuse:[0.8,0.8,0.8],
                specular:[0.4,0.4,0.4],
                shininess:8,
                reflective: 0.0
            }},
            // small AABB box - centered cube
            {type:'box', lx:0.05, rx:0.25, by:0.15, ty:0.35, fz:0.05, rz:0.25, material:{
                ambient:[0.03,0.03,0.05],
                diffuse:[0.9,0.3,0.2],
                specular:[0.6,0.6,0.6],
                shininess:30,
                reflective: 0.0
            }},
            // triangle in 3D space (single triangle)
            {type:'triangle', v0:{x:0.5,y:0.65,z:0.8}, v1:{x:0.2,y:0.9,z:0.6}, v2:{x:0.8,y:0.9,z:0.6}, material:{
                ambient:[0.02,0.02,0.05],
                diffuse:[0.1,0.2,0.7],
                specular:[0.9,0.9,1.0],
                shininess:50,
                reflective:0.0
            }}
        ]
    };

    // vector utilities
    function vadd(a,b){ return {x:a.x+b.x,y:a.y+b.y,z:a.z+b.z}; }
    function vsub(a,b){ return {x:a.x-b.x,y:a.y-b.y,z:a.z-b.z}; }
    function vmul(a,s){ return {x:a.x*s,y:a.y*s,z:a.z*s}; }
    function vdot(a,b){ return a.x*b.x + a.y*b.y + a.z*b.z; }
    function vlen(a){ return Math.sqrt(vdot(a,a)); }
    function vnorm(a){ let L=vlen(a); if(L===0) return {x:0,y:0,z:0}; return {x:a.x/L,y:a.y/L,z:a.z/L}; }
    function vreflect(I,N){ // reflect I around N (both vectors)
        // R = I - 2*dot(I,N)*N
        let d = 2*vdot(I,N);
        return vsub(I, vmul(N,d));
    }

    // intersection routines
    function intersectSphere(orig, dir, sph) {
        // ray-sphere: (o + t d - c)^2 = r^2
        const L = vsub(orig, sph.center);
        const a = vdot(dir, dir);
        const b = 2 * vdot(dir, L);
        const c = vdot(L,L) - sph.radius*sph.radius;
        const disc = b*b - 4*a*c;
        if (disc < 0) return null;
        const sqrtD = Math.sqrt(disc);
        let t0 = (-b - sqrtD) / (2*a);
        let t1 = (-b + sqrtD) / (2*a);
        if (t0 > t1) [t0,t1] = [t1,t0];
        if (t0 < 1e-4) t0 = t1; // if t0 is negative, use t1
        if (t0 < 1e-4) return null;
        const hitPoint = vadd(orig, vmul(dir, t0));
        const normal = vnorm(vsub(hitPoint, sph.center));
        return {t:t0, point:hitPoint, normal:normal, material:sph.material};
    }

    function intersectAABB(orig, dir, box) {
        // Axis-aligned box intersection (slab method)
        let tmin = -Infinity, tmax = Infinity;
        let hitNormal = {x:0,y:0,z:0};

        const slabs = [
            {lo: box.lx, hi: box.rx, orig: orig.x, dir: dir.x, axis:'x'},
            {lo: box.by, hi: box.ty, orig: orig.y, dir: dir.y, axis:'y'},
            {lo: box.fz, hi: box.rz, orig: orig.z, dir: dir.z, axis:'z'}
        ];
        for (let s of slabs) {
            if (Math.abs(s.dir) < 1e-6) {
                if (s.orig < s.lo || s.orig > s.hi) return null;
            } else {
                let t1 = (s.lo - s.orig) / s.dir;
                let t2 = (s.hi - s.orig) / s.dir;
                if (t1 > t2) [t1,t2] = [t2,t1];
                if (t1 > tmin) {
                    tmin = t1;
                    hitNormal = {x:0,y:0,z:0};
                    hitNormal[s.axis] = (s.dir > 0 ? -1 : 1);
                }
                if (t2 < tmax) tmax = t2;
                if (tmax < tmin) return null;
            }
        }
        if (tmin < 1e-4) {
            if (tmax < 1e-4) return null;
            // use tmax? but tmax is exit; typically we want entering tmin >= 0
            return null;
        }
        const p = vadd(orig, vmul(dir, tmin));
        return {t:tmin, point:p, normal:hitNormal, material:box.material};
    }

    function intersectTriangle(orig, dir, tri) {
        // Moller-Trumbore
        const EPS = 1e-6;
        const e1 = vsub(tri.v1, tri.v0);
        const e2 = vsub(tri.v2, tri.v0);
        const p = {x: dir.y*e2.z - dir.z*e2.y, y: dir.z*e2.x - dir.x*e2.z, z: dir.x*e2.y - dir.y*e2.x};
        const det = vdot(e1, p);
        if (Math.abs(det) < EPS) return null;
        const invDet = 1.0 / det;
        const tvec = vsub(orig, tri.v0);
        const u = vdot(tvec, p) * invDet;
        if (u < 0 || u > 1) return null;
        const q = {x: tvec.y*e1.z - tvec.z*e1.y, y: tvec.z*e1.x - tvec.x*e1.z, z: tvec.x*e1.y - tvec.y*e1.x};
        const v = vdot(dir, q) * invDet;
        if (v < 0 || u + v > 1) return null;
        const t = vdot(e2, q) * invDet;
        if (t < 1e-4) return null;
        const point = vadd(orig, vmul(dir, t));
        const normal = vnorm({x: e1.y*e2.z - e1.z*e2.y, y: e1.z*e2.x - e1.x*e2.z, z: e1.x*e2.y - e1.y*e2.x});
        return {t:t, point:point, normal:normal, material:tri.material};
    }

    // cast a ray and return color (RGB 0..1)
    function castRay(orig, dir, depth) {
        if (depth > 2) return {r:0, g:0, b:0}; // recursion limit for reflections

        let nearest = null;
        // check objects
        for (let obj of scene.objects) {
            let hit = null;
            if (obj.type === 'sphere') hit = intersectSphere(orig, dir, obj);
            else if (obj.type === 'box') hit = intersectAABB(orig, dir, obj);
            else if (obj.type === 'triangle') hit = intersectTriangle(orig, dir, obj);
            if (hit) {
                hit.material = obj.material;
                if (!nearest || hit.t < nearest.t) nearest = hit;
            }
        }

        if (!nearest) {
            // background gradient
            let t = 0.5*(dir.y + 1.0);
            return { r: (1-t)*0.6 + t*0.2, g: (1-t)*0.7 + t*0.6, b: (1-t)*0.9 + t*0.8 };
        }

        const material = nearest.material;
        let color = {r:0,g:0,b:0};

        // ambient contribution from lights (we'll sum ambient factors)
        for (let L of scene.lights) {
            color.r += material.ambient[0] * L.intensity.ambient;
            color.g += material.ambient[1] * L.intensity.ambient;
            color.b += material.ambient[2] * L.intensity.ambient;
        }

        // for each light, compute diffuse + specular + shadow test
        for (let light of scene.lights) {
            const toLight = vsub(light.pos, nearest.point);
            const distToLight = vlen(toLight);
            const Ldir = vnorm(toLight);

            // shadow ray: cast from a tiny offset along normal
            const shadowOrig = vadd(nearest.point, vmul(nearest.normal, 1e-4));
            let inShadow = false;

            // check each object for occlusion
            for (let obj of scene.objects) {
                let shHit = null;
                if (obj.type === 'sphere') shHit = intersectSphere(shadowOrig, Ldir, obj);
                else if (obj.type === 'box') shHit = intersectAABB(shadowOrig, Ldir, obj);
                else if (obj.type === 'triangle') shHit = intersectTriangle(shadowOrig, Ldir, obj);
                if (shHit && shHit.t < distToLight - 1e-4) {
                    inShadow = true;
                    break;
                }
            }

            if (!inShadow) {
                // diffuse
                const NdotL = Math.max(0, vdot(nearest.normal, Ldir));
                color.r += material.diffuse[0] * light.intensity.diffuse * NdotL;
                color.g += material.diffuse[1] * light.intensity.diffuse * NdotL;
                color.b += material.diffuse[2] * light.intensity.diffuse * NdotL;

                // specular (Blinn-Phong)
                const viewDir = vnorm(vsub(scene.camera.pos, nearest.point));
                const half = vnorm(vadd(Ldir, viewDir));
                const NdotH = Math.max(0, vdot(nearest.normal, half));
                const spec = Math.pow(NdotH, material.shininess);
                color.r += material.specular[0] * light.intensity.specular * spec;
                color.g += material.specular[1] * light.intensity.specular * spec;
                color.b += material.specular[2] * light.intensity.specular * spec;
            } else {
                // small ambient-only contribution to avoid full black
                color.r += 0.02 * material.diffuse[0];
                color.g += 0.02 * material.diffuse[1];
                color.b += 0.02 * material.diffuse[2];
            }
        }

        // handle simple reflection
        if (material.reflective && material.reflective > 0.001) {
            const reflectDir = vnorm(vreflect(vmul(dir, -1), nearest.normal));
            const reflectOrig = vadd(nearest.point, vmul(nearest.normal, 1e-4));
            const reflColor = castRay(reflectOrig, reflectDir, depth + 1);
            color.r = (1-material.reflective)*color.r + material.reflective*reflColor.r;
            color.g = (1-material.reflective)*color.g + material.reflective*reflColor.g;
            color.b = (1-material.reflective)*color.b + material.reflective*reflColor.b;
        }

        // clamp
        color.r = Math.min(1, Math.max(0, color.r));
        color.g = Math.min(1, Math.max(0, color.g));
        color.b = Math.min(1, Math.max(0, color.b));

        return color;
    }

    // camera ray setup
    const aspect = w / h;
    const fovAdj = Math.tan((scene.camera.fov * 0.5) * Math.PI / 180);

    // render loop (per pixel)
    for (let py = 0; py < h; py++) {
        for (let px = 0; px < w; px++) {
            // normalized device coordinates (-1 to 1)
            const ndcX = ( (px + 0.5) / w ) * 2 - 1;
            const ndcY = ( (py + 0.5) / h ) * 2 - 1;

            // account for aspect and FOV
            let camX = ndcX * aspect * fovAdj;
            let camY = -ndcY * fovAdj; // flip Y so top of canvas is positive

            // ray direction in world space (camera pointing toward +z)
            const rayDir = vnorm({x: camX, y: camY, z: 1.0});
            const rayOrig = {x: scene.camera.pos.x, y: scene.camera.pos.y, z: scene.camera.pos.z};

            const col = castRay(rayOrig, rayDir, 0);

            const idx = (py * w + px) * 4;
            imagedata.data[idx] = Math.round(col.r * 255);
            imagedata.data[idx+1] = Math.round(col.g * 255);
            imagedata.data[idx+2] = Math.round(col.b * 255);
            imagedata.data[idx+3] = 255;
        }
    }

    context.putImageData(imagedata, 0, 0);
}

/* ============ end new renderer ============ */

/* Note:
   - Press the spacebar to toggle between the original `drawRandPixelsInInputBoxes` rendering
     and this new ray-traced design. Clicking the canvas also redraws the active mode.
   - If you'd like, I can:
       * Fix the `console.log*` syntax errors in the original fetch helpers so everything runs cleanly.
       * Make the ray tracer render faster by downsampling and applying a small bilateral/box blur.
       * Add GUI controls for toggling lights, adjusting shininess, or enabling reflections.
*/

