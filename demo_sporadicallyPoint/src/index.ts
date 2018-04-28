/// <reference path="../typescript.d.ts" /> 
//import * as layout from "./shader/test.glsl";

//  let vertex_shader = require('./shader/vertex.glsl');
//  let fragment_shader = require('./shader/fragment-1.glsl');


import * as  vertex_shader from'./shader/vertex.glsl';
import * as  fragment_shader from'./shader/fragment-1.glsl';
console.log("vertex_shader");
console.log(vertex_shader);


import * as THREE from 'three' ;
import { Material } from 'three';
import WebGLInit from './init'

let webGLInit = new WebGLInit();
document.body.appendChild(webGLInit.renderer.domElement);
let CreateMaterial = (vertexShader, fragmentShader) => {
    var vertShader = vertex_shader;
    var fragShader = fragment_shader;

    var attributes = {};
    var uniforms = {
        sleep: {type: 'f', value: 3},
        time: {type: 'f', value: 0.2},
        scale: {type: 'f', value: 0.2},
        alpha: {type: 'f', value: 0.6},
        resolution: {type: "v2", value: new THREE.Vector2()}
    };

    uniforms.resolution.value.x = window.innerWidth;
    uniforms.resolution.value.y = window.innerHeight;

    var meshMaterial = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: String(vertShader),
        fragmentShader: String(fragShader),
        transparent: true
    });

    return meshMaterial;
}


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
webGLInit.scene.add(cube);
webGLInit.scene.add(webGLInit.camera);
webGLInit.scene.add(webGLInit.ambientLight);
webGLInit.scene.add(webGLInit.spotLight);

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
    webGLInit.renderer.render(webGLInit.scene, webGLInit.camera);
}
render();