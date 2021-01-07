"use strict";
import * as THREE from "three";
import { initLight } from "../public/helpers";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GUI } from "three/examples/jsm/libs/dat.gui.module.js";

import { Cube } from "./cube";

let cameraAngle = 60;
let cubeCameraDistance = 1.75;

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

const gridSize = 100;
const divisions = 10;
const gridHelper = new THREE.GridHelper( gridSize, divisions );
mainScene.add( gridHelper );


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

function animate() {
  mainCameraCtrl.update();
  mainCamera.updateProjectionMatrix();
  mainRenderer.render(mainScene, mainCamera);

  cubeCameraCtrl.update();
  cubeCamera.updateProjectionMatrix();
  cubeRenderer.render(cubeScene, cubeCamera);

  updateCubeCamera();

  requestAnimationFrame(animate);
}

function updateCubeCamera() {
  cubeCamera.rotation.copy(mainCamera.rotation);
  let dir = mainCamera.position.clone().sub(mainCameraCtrl.target).normalize();
  cubeCamera.position.copy(dir.multiplyScalar(cubeCameraDistance));
}
