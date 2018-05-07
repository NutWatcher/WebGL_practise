/// <reference path="../typescript.d.ts" /> 
//import * as layout from "./shader/test.glsl";

//  let vertex_shader = require('./shader/vertex.glsl');
//  let fragment_shader = require('./shader/fragment-1.glsl');


import * as  vertex_shader from './shader/vertex.glsl';
import * as  fragment_shader from './shader/fragment-1.glsl';

import * as  vertexPoint_shader from './shader/vertexPoint.glsl';
import * as  fragmentPoint_shader from './shader/fragmentPoint.glsl';
console.log("vertexPoint_shader");
console.log(vertexPoint_shader);


import * as THREE from 'three';
import { Material } from 'three';
import WebGLInit from './init'

let webGLInit = new WebGLInit();
document.body.appendChild(webGLInit.renderer.domElement);
let CreateMaterial = (vertexShader, fragmentShader) => {
    var vertShader = vertex_shader;
    var fragShader = fragment_shader;

    var attributes = {};
    var uniforms = {
        sleep: { type: 'f', value: 3 },
        time: { type: 'f', value: 0.2 },
        scale: { type: 'f', value: 0.2 },
        alpha: { type: 'f', value: 0.6 },
        resolution: { type: "v2", value: new THREE.Vector2() }
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

let pointGeometry = new THREE.Geometry();
let pointVertext = new THREE.Vector3(20, 20, 20);  
pointGeometry.vertices.push(pointVertext);
var uniforms = {
    sleep: { type: 'f', value: 3 },
    time: { type: 'f', value: 0.2 },
    scale: { type: 'f', value: 0.2 },
    alpha: { type: 'f', value: 0.6 },
    resolution: { type: "v2", value: new THREE.Vector2() }
};
uniforms.resolution.value.x = window.innerWidth;
uniforms.resolution.value.y = window.innerHeight;
let pointMaterial = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: String(vertexPoint_shader),
    fragmentShader: String(fragmentPoint_shader),
    transparent: true
});
let points=new THREE.Points(pointGeometry, pointMaterial);
webGLInit.scene.add(points);//点模型添加到场景中



// let cubeGeometry = new THREE.BoxGeometry(20, 20, 20);
// let meshMaterial1 = CreateMaterial("vertex-shader", "fragment-shader-1");
// let material = [
//     meshMaterial1,
//     meshMaterial1,
//     meshMaterial1,
//     meshMaterial1,
//     meshMaterial1,
//     meshMaterial1
// ];

// let cube = new THREE.Mesh(cubeGeometry, material);
//webGLInit.scene.add(cube);
webGLInit.scene.add(webGLInit.camera);
webGLInit.scene.add(webGLInit.ambientLight);
webGLInit.scene.add(webGLInit.spotLight);

let step = 0;

const lifeCycle = 5;
function render() {
    // cube.rotation.y = step += 0.001;
    // cube.rotation.x = step;
    // cube.rotation.z = step;

    // (cube.material as Array<THREE.ShaderMaterial>).forEach(function (e) {
    //     e.uniforms.time.value += 0.01;
    // });
    step += 0.001
    points.rotation.y = step;
    //points.rotation.x = step;
    //points.rotation.z = step;
    (points.material as THREE.ShaderMaterial).uniforms.time.value += 0.01;
    // cube.material = (cube.material as Array<THREE.ShaderMaterial>).filter(
    //     (v) => { return v.uniforms.time.value < lifeCycle }
    // );
    // render using requestAnimationFrame
    requestAnimationFrame(render);
    webGLInit.renderer.render(webGLInit.scene, webGLInit.camera);
}
render();