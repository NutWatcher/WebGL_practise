/// <reference path="../typescript.d.ts" /> 
import * as THREE from "three";
import dat from 'dat.gui';
import WebGLInit from './init';

import * as  vertexPoint_shader from './shader/vertexPoint.glsl';
import * as  fragmentPoint_shader from './shader/fragmentPoint.glsl';
import { Vector3 } from "three";

let webGLInit = new WebGLInit();
document.body.appendChild(webGLInit.renderer.domElement);

const gui = new dat.GUI();
let option = {
    "x": "1",
    "y": "1",
    "z": "0"
};
gui.add(option, "x");
gui.add(option, "y");


//第二步,创建几何体.
var geometry = new THREE.PlaneGeometry(20, 20, 10);
var material = new THREE.MeshBasicMaterial({ 
        color: 0x666666, 
        side: THREE.DoubleSide 
    });
var plane = new THREE.Mesh(geometry, material);

webGLInit.scene.add( plane );
webGLInit.scene.add(webGLInit.camera);
webGLInit.scene.add(webGLInit.ambientLight);
webGLInit.scene.add(webGLInit.spotLight);
webGLInit.scene.add(webGLInit.axes);

let time = 0.0 ;
let mouse = new THREE.Vector2(1, 1);
let raycaster = new THREE.Raycaster();
let INTERSECTED:THREE.Object3D[] = [];
let Points:Set<THREE.Points> = new Set();

let createPoint = (location:Vector3) => {
    //console.log(Vector3);
    let uniforms = {
        sleep: { type: 'f', value: 3 },
        start: { type: 'f', value: time },
        time: { type: 'f', value: time },
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
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthTest:false
    });
    let pointGeometry = new THREE.Geometry();
    pointGeometry.vertices.push(new THREE.Vector3(location.x, location.y, 1+time));
    let point = new THREE.Points(pointGeometry, pointMaterial);
    webGLInit.scene.add(point);
    Points.add(point);
}

//渲染循环
function render() {
    raycaster.setFromCamera(mouse, webGLInit.camera);
    var intersects = raycaster.intersectObjects([plane]);
    if (!mouse.equals( new THREE.Vector2(1, 1) )){
        if (intersects.length > 0) {
            for (let i: number = 0; i < intersects.length; i++) {            
                createPoint(intersects[i].point);
            }
            mouse = new THREE.Vector2(1, 1);
        }
    }
    
    for (var i in gui.__controllers) {
        gui.__controllers[i].updateDisplay();
    }
    time += 0.02 ;
    for (let item of Points) {
        (item.material as THREE.ShaderMaterial).uniforms.time.value = time;
        let start = (item.material as THREE.ShaderMaterial).uniforms.start.value;
        if (time - start > 5){
            webGLInit.scene.remove(item);
            Points.delete(item);
        }
    }
    webGLInit.renderer.render(webGLInit.scene, webGLInit.camera);
    requestAnimationFrame(render);
    
}
let onDocumentMouseDown = (event) => {
    //event.preventDefault();
    option.x = ((event.clientX / window.innerWidth) * 2 - 1).toString();
    option.y = (-(event.clientY / window.innerHeight) * 2 + 1).toString();
    mouse.x = ((event.clientX / window.innerWidth) * 2 - 1);
    mouse.y = (-(event.clientY / window.innerHeight) * 2 + 1);
}
document.body.onmousedown = onDocumentMouseDown;
render();
