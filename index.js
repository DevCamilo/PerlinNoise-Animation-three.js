
var camera, scene, renderer, geometry, material;
var terrain, noise, mesh, data, vertices;
var timer;

var worldWidth = 32, worldDepth = 32,
    worldHalfWidth = worldWidth / 2, worldHalfDepth = worldDepth / 2;

init();
animate();


function generateHeight(width, height) {
    //good seed values :

    var size = width * height, data = new Uint8Array(size), quality = Math.random() * 10, z = Math.random() * 100;
    console.log(quality);

    for (var j = 0; j < 4; j++) {

        for (var i = 0; i < size; i++) {

            var x = i % width, y = ~~(i / width);
            data[i] += Math.abs(improvedPerlinNoise(x / quality, y / quality, z) * quality * 1.75) * 0.35;

        }

        quality *= 5;

    }

    return data;

}

function init() {
    data = generateHeight(worldWidth, worldDepth);
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 100000);
    //camera.position.y = data[worldHalfWidth + worldHalfDepth * worldWidth] * 10 + 500;
    camera.position.y = 5000;
    scene.add(camera);

    var light = new THREE.AmbientLight(0x404040);
    scene.add(light);

    geometry = new THREE.CubeGeometry(200, 200, 200);
    material = new THREE.MeshNormalMaterial();
    material.wireframe = true;

    mesh = new THREE.Mesh(geometry, material);
    //scene.add(mesh);

    terrain = new THREE.PlaneBufferGeometry(7500, 7500, worldWidth - 1, worldDepth - 1);
    terrain.dynamic = true;
    terrain.verticesNeedUpdate = true;
    terrain.rotateX(- Math.PI / 2);


    //var terrain = new THREE.PlaneBufferGeometry(100, 100, 100);
    vertices = terrain.attributes.position.array;


    for (var i = 0, j = 0; i < vertices.length; i++ , j += 3) {
        vertices[j + 1] = data[i] * 10;
    }

    noise = new THREE.Mesh(terrain, material);
    noise.geometry.dynamic = true;

    scene.add(noise);
    camera.lookAt(noise);


    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);

}

function animate() {


    requestAnimationFrame(animate);
    render();
}

//Redraw the current map
function redraw() {
    console.log("REDRAW");
    data = [];
    data = generateHeight(worldWidth, worldDepth);
    vertices = new Array(terrain.attributes.position.array.length);

    //for (var i = 0, j = 0; i < vertices.length; i++ , j += 3) {
    //    vertices[j + 1] = data[i] * 10;
    //}

    for (var i = 0, j = 0; i < terrain.attributes.position.array.length; i++ , j += 3) {
        //terrain.attributes.position.array[j + 1] = data[i] * Math.cos(timer/ 1000);   
        terrain.attributes.position.array[j + 1] = Math.cos(0.0000000000005 * timer) + data[i];
        terrain.attributes.position.needsUpdate = true;
        terrain.computeBoundingSphere();
        mesh.geometry.verticesNeedUpdate = true;

    }

    scene.remove(noise);
    noise = new THREE.Mesh(terrain, material);
    scene.add(noise);
}

function render() {


    // *** Update the scene ***

    // Set the camera to always point to the centre of our scene, i.e. at vector 0, 0, 0
    camera.lookAt(scene.position);

    // Move the camera in a circle with the pivot point in the centre of this circle...
    // ...so that the pivot point, and focus of the camera is on the centre of our scene.
    timer = new Date().getTime() * 0.00005;

    camera.position.x = Math.floor(Math.cos(timer) * 7500);
    camera.position.z = Math.floor(Math.sin(timer) * 7500);
    //redraw();


    renderer.render(scene, camera);
}
