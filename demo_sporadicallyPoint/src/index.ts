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

const PointCount = 100;

let pointGeometry = new THREE.Geometry();
 
for (let i = 0 ; i < PointCount ; i ++){
    let pointVertext = new THREE.Vector3(
        THREE.Math.randFloat(0, 10), 
        THREE.Math.randFloat(0, 10), 
        THREE.Math.randFloat(-10, -20)); 
    pointGeometry.vertices.push(pointVertext);
    console.log( THREE.Math.randFloatSpread(100));
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
let points=new THREE.Points(pointGeometry, pointMaterial);

let pointGroup = new THREE.Group();


webGLInit.scene.add(points);//点模型添加到场景中
webGLInit.scene.add(webGLInit.camera);
webGLInit.scene.add(webGLInit.ambientLight);
webGLInit.scene.add(webGLInit.spotLight);
webGLInit.scene.add(webGLInit.axes);

let step = 0;

const lifeCycle = 5;

const gui = new dat.GUI();
let option = {
    "time": 0.01,
    "y":10*Math.abs(Math.cos(0.01*0.10)),
    "z":10*Math.abs(Math.cos(0.01*0.10))
};
gui.add(option,"time");
gui.add(option,"y",-100 , 100);
gui.add(option,"z",-100 , 100);
function render() {
    // cube.rotation.y = step += 0.001;
    // cube.rotation.x = step;
    // cube.rotation.z = step;

    // (cube.material as Array<THREE.ShaderMaterial>).forEach(function (e) {
    //     e.uniforms.time.value += 0.01;
    // });
    step += 0.1;
   // points.rotation.y = step;
//points.rotation.x = step;
  //  points.rotation.z = step;
    option.time += 0.05 ;
    option.y = 10*Math.abs(Math.cos(option.time*0.10)) ;
    option.z = Math.abs(-10*Math.abs(Math.cos(option.time*0.10*2.0))) -10 ;
    (points.material as THREE.ShaderMaterial).uniforms.time.value = option.time;
    for (var i in gui.__controllers) {
        gui.__controllers[i].updateDisplay();
      }
    // cube.material = (cube.material as Array<THREE.ShaderMaterial>).filter(
    //     (v) => { return v.uniforms.time.value < lifeCycle }
    // );
    // render using requestAnimationFrame
    requestAnimationFrame(render);
    webGLInit.renderer.render(webGLInit.scene, webGLInit.camera);
}
render();