/**
 * Improved Perlin Noise
 * @author Ken Perlin
 * @version 1.0
 * 
 * Generates improved perlin noise based off of Ken Perlin's original implementation
 */

//Permutation
var p = [151, 160, 137, 91, 90, 15,
    131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140, 36, 103, 30, 69, 142, 8, 99, 37, 240, 21, 10, 23,
    190, 6, 148, 247, 120, 234, 75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32, 57, 177, 33,
    88, 237, 149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175, 74, 165, 71, 134, 139, 48, 27, 166,
    77, 146, 158, 231, 83, 111, 229, 122, 60, 211, 133, 230, 220, 105, 92, 41, 55, 46, 245, 40, 244,
    102, 143, 54, 65, 25, 63, 161, 1, 216, 80, 73, 209, 76, 132, 187, 208, 89, 18, 169, 200, 196,
    135, 130, 116, 188, 159, 86, 164, 100, 109, 198, 173, 186, 3, 64, 52, 217, 226, 250, 124, 123,
    5, 202, 38, 147, 118, 126, 255, 82, 85, 212, 207, 206, 59, 227, 47, 16, 58, 17, 182, 189, 28, 42,
    223, 183, 170, 213, 119, 248, 152, 2, 44, 154, 163, 70, 221, 153, 101, 155, 167, 43, 172, 9,
    129, 22, 39, 253, 19, 98, 108, 110, 79, 113, 224, 232, 178, 185, 112, 104, 218, 246, 97, 228,
    251, 34, 242, 193, 238, 210, 144, 12, 191, 179, 162, 241, 81, 51, 145, 235, 249, 14, 239, 107,
    49, 192, 214, 31, 181, 199, 106, 157, 184, 84, 204, 176, 115, 121, 50, 45, 127, 4, 150, 254,
    138, 236, 205, 93, 222, 114, 67, 29, 24, 72, 243, 141, 128, 195, 78, 66, 215, 61, 156, 180];

//Returns the linear interpolation between v0 and v1 and a percent, t
function lerp(v0, v1, t) {
    return (1 - t) * v0 + t * v1;
}

//Fade function modelled by function 6t^5 - 15t^4 + 10t^3
function fade(t) {
    return 6 * Math.pow(t, 5) - 15 * Math.pow(t, 4) + 10 * Math.pow(t, 3);
}

//Returns the gradient vector
function grad(hash, x, y, z) {
    var h = hash & 15; //Convert 4 bits of hash code into 12 gradient directions
    var u = h < 8 ? x : y;
    var v = h < 4 ? y : h == 12 || h == 14 ? x : z;

    return ((h & 1) == 0 ? u : -u) + ((h & 2) == 0 ? v : -v);
}

//Return the value of noise at coordinates (x, y, z)
function improvedPerlinNoise(x, y, z) {
    //Find unit cube that contains the point
    var X = Math.floor(x) & 255;
    var Y = Math.floor(y) & 255;
    var Z = Math.floor(z) & 255;

    //console.log("X: " + X + " Y: " + Y + " Z: " + Z);

    //Find the relative x, y, z of point in the unit cube
    x -= Math.floor(x);
    y -= Math.floor(y);
    z -= Math.floor(z);

    //console.log("x: " + x + " y: " + y + " z: " + z);

    //Compute the fade curves for x, y, z
    var u = fade(x);
    var v = fade(y);
    var w = fade(z);

    //console.log("u: " + u + " v: " + v + " w: " + w);

    //Hash coordinates of the 8 cube corners
    var A = p[X] + Y;
    var AA = p[A] + Z;
    var AB = p[A + 1] + Z;
    var B = p[X + 1] + Y;
    var BA = p[B] + Z;
    var BB = p[B + 1] + Z;

    //Add blended results from 8 corners of cube
    return lerp(w, lerp(v, lerp(u, grad(p[AA], x, y, z),
        grad(p[BA], x - 1, y, z)),
        lerp(u, grad(p[AB], x, y - 1, z),
            grad(p[BB], x - 1, y - 1, z))),
        lerp(v, lerp(u, grad(p[AA + 1], x, y, z - 1),
            grad(p[BA + 1], x - 1, y, z - 1)),
            lerp(u, grad(p[AB + 1], x, y - 1, z - 1),
                grad(p[BB + 1], x - 1, y - 1, z - 1))));
}

