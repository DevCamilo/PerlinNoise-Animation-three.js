var vx = 0, rx = 0;
var vy = 0, ry = 0;
var vz = 0, rz = 0;

var acceleration = 0.1;
var ra = 0.01;
const MAX_VELOCITY = 0.1;

var map = {};

//Controls the camera movement
function control(camera) {
    var map = {};
    camera.translateZ(vz);
    camera.translateX(vx);
    camera.translateY(vy);

    camera.rotateZ(rz);
    camera.rotateX(rx);
    camera.rotateY(ry);

    //Forward
    if (map[83]) {
        if (vz < MAX_VELOCITY) vz += acceleration;
    } else if (map[87]) {
        if (vz > - MAX_VELOCITY) vz -= acceleration;
    } else if (!map[87] && !map[83]) {
        if (vz > 0) vz -= acceleration;
        if (vz < 0) vz += acceleration;
    }

    //Side
    if (map[65]) {
        if (vz > -MAX_VELOCITY) vx -= acceleration;
    } else if (map[68]) {
        if (vx < MAX_VELOCITY) vx += acceleration;
    }

    //Up
    if (map[32]) {
        if (vx < MAX_VELOCITY) vy += acceleration;
    } else if (map[16]) {
        if (vx > -MAX_VELOCITY) vy -= acceleration;
    }

    if (map[38]) {
        if (rx < MAX_VELOCITY / 100) rx += ra;
    } else if (map[40]) {
        if (rx > -MAX_VELOCITY / 100) rx -= ra;
    }

    if (map[37]) {
        if (ry < MAX_VELOCITY / 100) ry += ra;
    } else if (map[39]) {
        if (ry > -MAX_VELOCITY / 100) ry -= ra;
    }
}

onkeydown = onkeyup = function (e) {
    e = e || event; // to deal with IE
    map[e.keyCode] = e.type == 'keydown';

    document.addEventListener('keydown', function (e) {

    function checkRotation(camera) {
        //camera.translateZ(vz);
        //camera.translateX(vx);
        //camera.translateY(vy);

        //camera.rotateZ(rz);
        //camera.rotateX(rx);
        //camera.rotateY(ry);


        //Side
        if (map[65]) {
            camera.position.x = x * Math.cos(rotSpeed) + z * Math.sin(rotSpeed);
            camera.position.z = z * Math.cos(rotSpeed) - x * Math.sin(rotSpeed);
        } else if (map[68]) {
            camera.position.x = x * Math.cos(rotSpeed) - z * Math.sin(rotSpeed);
            camera.position.z = z * Math.cos(rotSpeed) + x * Math.sin(rotSpeed);
        }


        camera.lookAt(scene.position);
    }
});
}