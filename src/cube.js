import * as THREE from "three";

class Cube {
  constructor(scene){

    this.scene = scene;

    this.materials = this.initMaterial();

    this.planes = this.initPlanes();
    this.groundPlane = this.initGroundPlane();

    this.cube = this.initCube(this.materials);

    this.scene.add(...this.planes);
    this.scene.add(this.groundPlane);
    this.scene.add(this.cube);


  }
  initCube(materials){
    let cube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), materials);
    cube.name = "the cube";
    return cube;
  }

  initGroundPlane(){

    let groundMaterial = new THREE.MeshBasicMaterial({
      color: 0xaaaaaa
    });
    let groundGeometry = new THREE.PlaneGeometry(1, 1);
    let groundPlane = new THREE.Mesh(groundGeometry, groundMaterial);
    groundPlane.rotation.x = -Math.PI / 2;
    groundPlane.position.y = -0.6;
    groundPlane.name = "ground plane";

    return groundPlane
  }

  initPlanes(){

    let planes = [];

    let planeMaterial = new THREE.MeshBasicMaterial({
      side: THREE.DoubleSide,
      color: 0x00c0ff,
      transparent: true,
      // transparent: false,
      opacity: 0,
      depthTest: false
    });
    let planeSize = 0.7;
    let planeGeometry = new THREE.PlaneGeometry(planeSize, planeSize);

    let a = 0.51;

    let plane1 = new THREE.Mesh(planeGeometry, planeMaterial.clone());
    plane1.position.z = a;
    planes.push(plane1);

    let plane2 = new THREE.Mesh(planeGeometry, planeMaterial.clone());
    plane2.position.z = -a;
    planes.push(plane2);

    let plane3 = new THREE.Mesh(planeGeometry, planeMaterial.clone());
    plane3.rotation.y = Math.PI / 2;
    plane3.position.x = a;
    planes.push(plane3);

    let plane4 = new THREE.Mesh(planeGeometry, planeMaterial.clone());
    plane4.rotation.y = Math.PI / 2;
    plane4.position.x = -a;
    planes.push(plane4);

    let plane5 = new THREE.Mesh(planeGeometry, planeMaterial.clone());
    plane5.rotation.x = Math.PI / 2;
    plane5.position.y = a;
    planes.push(plane5);

    let plane6 = new THREE.Mesh(planeGeometry, planeMaterial.clone());
    plane6.rotation.x = Math.PI / 2;
    plane6.position.y = -a;
    planes.push(plane6);

    plane1.name = "plane1";
    plane2.name = "plane2";
    plane3.name = "plane3";
    plane4.name = "plane4";
    plane5.name = "plane5";
    plane6.name = "plane6";

    return planes;

  }

  initMaterial(){

    let materials = [];
    let texts = ['RIGHT', 'LEFT', 'TOP', 'BOTTOM', 'FRONT', 'BACK'];

    let textureLoader = new THREE.TextureLoader();
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');

    let size = 64;
    canvas.width = size;
    canvas.height = size;

    ctx.font = 'bolder 12px "Open sans", Arial';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';

    let mainColor = '#fff';
    let otherColor = '#ccc';

    let bg = ctx.createLinearGradient(0, 0, 0, size);
    bg.addColorStop(0, mainColor);
    bg.addColorStop(1,  otherColor);

    for (let i = 0; i < 6; i++) {
      if (texts[i] == 'TOP') {
        ctx.fillStyle = mainColor;
      } else if (texts[i] == 'BOTTOM') {
        ctx.fillStyle = otherColor;
      } else {
        ctx.fillStyle = bg;
      }
      ctx.fillRect(0, 0, size, size);
      ctx.strokeStyle = '#aaa';
      ctx.setLineDash([8, 8]);
      ctx.lineWidth = 4;
      ctx.strokeRect(0, 0, size, size);
      ctx.fillStyle = '#999';
      ctx.fillText(texts[i], size / 2, size / 2);
      materials[i] = new THREE.MeshBasicMaterial({
        map: textureLoader.load(canvas.toDataURL())
      });
    }
    return materials;
  }

}

export { Cube };
