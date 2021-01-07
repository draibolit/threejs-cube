"use strict";
import * as THREE from "three";
import { initLight } from "../public/helpers";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls";
import { GUI } from "three/examples/jsm/libs/dat.gui.module.js";

import { Cube } from "./cube";

let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
let scene = new THREE.Scene();
scene.background = new THREE.Color(0xb0b0b0);
// Light
let lightArr = initLight();
scene.add(...lightArr);

// Camera and control
let camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  1,
  100
);
camera.position.set(0, 2, 5);
let cameraCtrl = new TrackballControls(camera, renderer.domElement);

const gridSize = 100;
const divisions = 10;
const gridHelper = new THREE.GridHelper( gridSize, divisions );
scene.add( gridHelper );

// Cube

  let cubeRenderer = renderer;
  let cubeScene = scene;

  let cube = new Cube(cubeScene);

renderer.setAnimationLoop(() => {
  cameraCtrl.update();
  camera.updateProjectionMatrix();
  renderer.render(scene, camera);
});


// event listeners
//
	// function updateCubeCamera() {
	// 	cubeCamera.rotation.copy(camera.rotation);
	// 	let dir = camera.position.clone().sub(controller.target).normalize();
	// 	cubeCamera.position.copy(dir.multiplyScalar(cubeCameraDistance));
	// }

	// let activePlane = null;



	//cubeRenderer.domElement.onmousemove = function(evt) {

	//	if (activePlane) {
	//		activePlane.material.opacity = 0;
	//		activePlane.material.needsUpdate = true;
	//		activePlane = null;
	//	}

	//	let x = evt.offsetX;
	//	let y = evt.offsetY;
	//	let size = cubeRenderer.getSize(new THREE.Vector2());
	//	let mouse = new THREE.Vector2(x / size.width * 2 - 1, -y / size.height * 2 + 1);

	//	let raycaster = new THREE.Raycaster();
	//	raycaster.setFromCamera(mouse, cubeCamera);
	//	let intersects = raycaster.intersectObjects(planes.concat(cube));

	//	if (intersects.length > 0 && intersects[0].object != cube) {
	//		activePlane = intersects[0].object;
	//		activePlane.material.opacity = 0.2;
	//		activePlane.material.needsUpdate = true;
	//	}
	//}

	//let startTime = 0;
	//let duration = 500;
	//let oldPosition = new THREE.Vector3();
	//let newPosition = new THREE.Vector3();
	//let play = false;

	//cubeRenderer.domElement.onclick = function(evt) {

	//	cubeRenderer.domElement.onmousemove(evt);

	//	if (!activePlane || hasMoved) {
	//		return false;
	//	}

	//	oldPosition.copy(camera.position);

	//	let distance = camera.position.clone().sub(controller.target).length();
	//	newPosition.copy(controller.target);

	//	if (activePlane.position.x !== 0) {
	//		newPosition.x += activePlane.position.x < 0 ? -distance : distance;
	//	} else if (activePlane.position.y !== 0) {
	//		newPosition.y += activePlane.position.y < 0 ? -distance : distance;
	//	} else if (activePlane.position.z !== 0) {
	//		newPosition.z += activePlane.position.z < 0 ? -distance : distance;
	//	}

	//	//play = true;
	//	//startTime = Date.now();
	//	camera.position.copy(newPosition);
	//}

	//cubeRenderer.domElement.ontouchmove = function(e) {
	//	let rect = e.target.getBoundingClientRect();
	//	let x = e.targetTouches[0].pageX - rect.left;
	//	let y = e.targetTouches[0].pageY - rect.top;
	//	cubeRenderer.domElement.onmousemove({
	//		offsetX: x,
	//		offsetY: y
	//	});
	//}

	//cubeRenderer.domElement.ontouchstart = function(e) {
	//	let rect = e.target.getBoundingClientRect();
	//	let x = e.targetTouches[0].pageX - rect.left;
	//	let y = e.targetTouches[0].pageY - rect.top;
	//	cubeRenderer.domElement.onclick({
	//		offsetX: x,
	//		offsetY: y
	//	});
	//}
