# prog1-2025 Project Report

## Project Overview
This project demonstrates how to render simple 2D projections and pixel-based drawings of 3D primitives—**ellipsoids, triangles, and boxes**—using JavaScript and HTML5 Canvas.  

The code includes:  
- A `Color` class for RGBA values.  
- Utility functions to fetch geometric objects (ellipsoids, triangles, boxes) from JSON files.  
- Pixel-based rasterization methods (randomized points).  
- Path/arc-based 2D projection drawing.  
- A simple ray-tracing approach for shaded box rendering.  

---

## Image 1: Random Pixel Rendering of Boxes (Black Background)
**Description:**  
This rendering uses random pixel sampling to represent **only boxes** projected onto 2D space.  

- **Boxes:** Random pixels are generated via ray-box intersection tests, with **Phong lighting** applied (ambient, diffuse, specular).  

**Expected Look:**  
- The background is **black**.  
- Only **colored boxes** are visible (grainy and pixelated).  
- This style helps **debug projection and shading** of boxes before implementing smooth fills.  

**Example Output:**  
<img width="512" height="512" alt="image" src="https://github.com/user-attachments/assets/5b35da22-c29d-4100-8428-65453cd081ec" />

---

## Image 2: 2D Projection Rendering (Shaded Scene with Multiple Shapes)
**Description:**  
This rendering projects all objects—**ellipsoids, triangles, and boxes**—as continuous filled shapes using Canvas drawing methods and shading models.  

- **Ellipsoids:** Rendered as smooth circles/ovals filled with diffuse colors.  
- **Triangles:** Drawn as solid polygons with filled interiors.  
- **Boxes:** Rendered as solid 2D projections with shading.  
- **Lighting:** Implements **Phong shading** for realism (ambient, diffuse, specular).  

**Expected Look:**  
- The background is **blue sky over a white ground plane**.  
- Objects appear **smooth, shaded, and realistic**, with visible shadows.  
- This produces a **final rendered scene** compared to the grainy Image 1.  

**Example Output:**  
<img width="512" height="512" alt="image" src="https://github.com/user-attachments/assets/af6a4be0-afe4-4272-b2ab-84a3b09f3bed" />

---

## Technical Notes
- **Color Validation:** Ensures RGBA values remain between `0–255`.  
- **drawPixel():** Handles individual pixel placement in the image buffer.  
- **Lighting Model (Boxes):** Implements **Phong reflection model** (ambient, diffuse, specular).  
- **Error Handling:** Uses `try–catch` blocks for invalid inputs.  
- **Input Files:** JSON files are loaded from `https://ncsucgclass.github.io/prog1/`.  

---

## Usage
1. Load the script into an HTML file with a `<canvas>` element.  
2. Call one of the rendering functions, e.g.:  
   ```javascript
   drawRandPixelsInInputBoxes(context);        // Produces Image 1 (pixelated boxes only)
   drawInputEllipsoidsUsingArcs(context);      // Produces Image 2 (smooth with all shapes)
