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
import dat from 'dat.gui';
import { Material } from 'three';
import WebGLInit from './init'

let webGLInit = new WebGLInit();
document.body.appendChild(webGLInit.renderer.domElement);

const PointCount = 1000;

let pointGeometry = new THREE.Geometry();
for (let i = 0; i < PointCount; i++) {
    let pointVertext = new THREE.Vector3(
        THREE.Math.randFloat(-100, 100),
        THREE.Math.randFloat(-100, 100),
        THREE.Math.randFloat(-10, -20));
    pointGeometry.vertices.push(pointVertext);
}

let uniforms = {
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
let points = new THREE.Points(pointGeometry, pointMaterial);
let pointGroup = new THREE.Group();


webGLInit.scene.add(points);//点模型添加到场景中
webGLInit.scene.add(webGLInit.camera);
webGLInit.scene.add(webGLInit.ambientLight);
webGLInit.scene.add(webGLInit.spotLight);
webGLInit.scene.add(webGLInit.axes);

const gui = new dat.GUI();
let rotationStep = 0 ;
let option = {
    "time": 0.01,
    "step": 20,
    "z": 10 * Math.abs(Math.cos(0.01 * 0.10))
};
gui.add(option, "time");
gui.add(option, "step", 1, 500);
function render() {
    rotationStep += option.step / 10000;
    // points.rotation.y = step + THREE.Math.randFloat(0.0001, 0.0005);
    //points.rotation.x = step + THREE.Math.randFloat(0.001, 0.0005);
    points.rotation.z = rotationStep + THREE.Math.randFloat(0.0001, 0.0005);
    option.time += 0.05;
    option.z = Math.abs(-10 * Math.abs(Math.cos(option.time * 0.10 * 2.0))) - 10;
    (points.material as THREE.ShaderMaterial).uniforms.time.value = option.time;
    for (var i in gui.__controllers) {
        gui.__controllers[i].updateDisplay();
    }
    requestAnimationFrame(render);
    webGLInit.renderer.render(webGLInit.scene, webGLInit.camera);
}
render();