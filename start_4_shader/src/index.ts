/// <reference path="../typescript.d.ts" /> 
//import * as layout from "./shader/test.glsl";

let vertex_shader = require('./shader/vertex.glsl');
let fragment_shader = require('./shader/fragment-1.glsl');

import * as THREE from 'three' ;
import { Material } from 'three';

let CreateMaterial = (vertexShader, fragmentShader) => {
    var vertShader = vertex_shader;
    var fragShader = fragment_shader;

    var attributes = {};
    var uniforms = {
        time: {type: 'f', value: 0.2},
        scale: {type: 'f', value: 0.2},
        alpha: {type: 'f', value: 0.6},
        resolution: {type: "v2", value: new THREE.Vector2()}
    };

    uniforms.resolution.value.x = window.innerWidth;
    uniforms.resolution.value.y = window.innerHeight;

    var meshMaterial = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: vertShader,
        fragmentShader: fragShader,
        transparent: true
    });

    return meshMaterial;
}

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
// position and point the camera to the center of the scene
camera.position.x = 30;
camera.position.y = 30;
camera.position.z = 30;
camera.lookAt(new THREE.Vector3(0, 0, 0));

let renderer = new THREE.WebGLRenderer();
renderer.setClearColor(new THREE.Color(0x000000));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
//设置画布大小
renderer.setSize(window.innerWidth, window.innerHeight);
//加入到body
document.body.appendChild(renderer.domElement);

let cubeGeometry = new THREE.BoxGeometry(20, 20, 20);
let meshMaterial1 = CreateMaterial("vertex-shader", "fragment-shader-1");
let material = [
    meshMaterial1,
    meshMaterial1,
    meshMaterial1,
    meshMaterial1,
    meshMaterial1,
    meshMaterial1
];

let cube = new THREE.Mesh(cubeGeometry, material);
scene.add(cube);



 // add subtle ambient lighting
 let ambientLight = new THREE.AmbientLight(0x0c0c0c);
 scene.add(ambientLight);

 // add spotlight for the shadows
 let spotLight = new THREE.SpotLight(0xffffff);
 spotLight.position.set(-40, 60, -10);
 spotLight.castShadow = true;
 scene.add(spotLight);


 let step = 0;

 function render() {
    cube.rotation.y = step += 0.001;
    cube.rotation.x = step;
    cube.rotation.z = step;

    (cube.material as Array<THREE.ShaderMaterial>).forEach(function (e) {
        e.uniforms.time.value += 0.01;
    });

    // render using requestAnimationFrame
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}
render();