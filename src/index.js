"use strict";
import * as THREE from "three";
import { initLight } from "../public/helpers";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import { Cube } from "./cube";

let cameraAngle = 60;
let cubeCameraDistance = 1.75;
let activePlane = null;
let newPosition = new THREE.Vector3();


// Main
let mainCanvasContainer = document.getElementById("maincanvas");
let mainRenderer = new THREE.WebGLRenderer();
mainRenderer.setSize(window.innerWidth, window.innerHeight);
mainCanvasContainer.append(mainRenderer.domElement);

let mainScene = new THREE.Scene();
mainScene.background = new THREE.Color(0xb0b0b0);
// Light
let lightArr = initLight();
mainScene.add(...lightArr);

// Camera and control
let mainCamera = new THREE.PerspectiveCamera(
  cameraAngle,
  window.innerWidth / window.innerHeight,
  1,
  1000
);
mainCamera.position.set(0, 2, 5);
let mainCameraCtrl = new OrbitControls(mainCamera, mainRenderer.domElement);

// Helpers
const gridSize = 100;
const divisions = 10;
const gridHelper = new THREE.GridHelper( gridSize, divisions );
mainScene.add( gridHelper );
const axesHelper = new THREE.AxesHelper( 5 );
mainScene.add( axesHelper );


// Cube
let cubeCanvasContainer = document.getElementById("cubecanvas");
let cubeRenderer = new THREE.WebGLRenderer();
cubeRenderer.setSize(window.innerWidth/6, window.innerHeight/6);
cubeCanvasContainer.append(cubeRenderer.domElement);

let cubeScene = new THREE.Scene();
cubeScene.background = new THREE.Color(0xb0b0b0);
// Light
cubeScene.add(...lightArr);

let cubeCamera = new THREE.PerspectiveCamera(
  cameraAngle,
  window.innerWidth / window.innerHeight,
  1,
  100
);
// cubeCamera.position.set(0, 2, 1);
let cubeCameraCtrl = new OrbitControls(cubeCamera, cubeRenderer.domElement);
cubeCameraCtrl.enablePan = false;
cubeCameraCtrl.enableZoom = false;
cubeCameraCtrl.rotateSpeed = 0.125;

let cube = new Cube(cubeScene);

animate();

// Highlight cube planes
cubeRenderer.domElement.onmousemove = function(evt) {
  if (activePlane) {
    activePlane.material.opacity = 0;
    activePlane.material.needsUpdate = true;
    activePlane = null;
  }
  let x = evt.offsetX;
  let y = evt.offsetY;
  let size = cubeRenderer.getSize(new THREE.Vector2());
  let mouse = new THREE.Vector2(x / size.width * 2 - 1, -y / size.height * 2 + 1);
  let raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(mouse, cubeCamera);
  // let intersects = raycaster.intersectObjects(cube.planes.concat(cube.cube));
  let intersects = raycaster.intersectObjects(cube.planes);
  if (intersects.length > 0 && intersects[0].object != cube) {
    activePlane = intersects[0].object;
    // console.log("activePlane:",activePlane);
    activePlane.material.opacity = 0.2;
    activePlane.material.needsUpdate = true;
  }
}

cubeRenderer.domElement.onclick = function(evt) {

		if (!activePlane) {
			return false;
		}

  let distance = mainCamera.position.clone().sub(mainCameraCtrl.target).length(); //distance from mainCamera to target
  newPosition.copy(mainCameraCtrl.target); // mainCamera: target position

  if (activePlane.position.x !== 0) {
    newPosition.x += activePlane.position.x < 0 ? -distance : distance;
  } else if (activePlane.position.y !== 0) {
    newPosition.y += activePlane.position.y < 0 ? -distance : distance;
    newPosition.z += activePlane.position.z < 0 ? -distance : distance;
  } else if (activePlane.position.z !== 0) {
    newPosition.z += activePlane.position.z < 0 ? -distance : distance;
  }
  console.log("newPosition:",newPosition);

  mainCamera.position.copy(newPosition);
}


function animate() {
  updateCubeCamera();
  cubeRenderer.render(cubeScene, cubeCamera);

  mainCameraCtrl.update();
  mainCamera.updateProjectionMatrix();
  mainRenderer.render(mainScene, mainCamera);


  requestAnimationFrame(animate);
}

function updateCubeCamera() {
  cubeCamera.rotation.copy(mainCamera.rotation);
  let dir = mainCamera.position.clone().sub(mainCameraCtrl.target).normalize();
  cubeCamera.position.copy(dir.multiplyScalar(cubeCameraDistance));
}
