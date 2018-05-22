/// <reference path="../typescript.d.ts" /> 
import * as THREE from "three";
import * as Stats from "stats-js";
import * as dat from 'dat.gui';
import WebGLInit from './init';
import { Vector3, BufferAttribute } from "three";

let webGLInit = new WebGLInit();
document.body.appendChild(webGLInit.renderer.domElement);

//第二步,创建几何体.
var geometry = new THREE.PlaneGeometry(2, 2, 1);
var material = new THREE.MeshBasicMaterial({ 
        color: 0xffffff, 
        side: THREE.DoubleSide
    });
var plane = new THREE.Mesh(geometry, material);
plane.position.z += -5;
webGLInit.scene.add( plane );
webGLInit.scene.add(webGLInit.camera);
webGLInit.scene.add(webGLInit.ambientLight);
webGLInit.scene.add(webGLInit.spotLight);
webGLInit.scene.add(webGLInit.axes);


var onProgress = function(xhr) {
    if (xhr.lengthComputable) {
        var percentComplete = xhr.loaded / xhr.total * 100;
        var counter = document.getElementById("counter");
        counter.innerText = Math.round(percentComplete) + '% downloaded';
    }
};

var onError = function(xhr) {};

var mtlLoader = new THREE.MTLLoader();
mtlLoader.setPath('/model/');
mtlLoader.load('horse.mtl', function(materials) {
    materials.preload();
    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.setPath('/model/');
    objLoader.load('horse.obj', function(object) {
 

        
        object.position.y = -0.5;
        //webGLInit.scene.add(object);

        let Mesh:THREE.Mesh = object.children[0] as THREE.Mesh;
        let vertex = (Mesh.geometry as THREE.BufferGeometry).getAttribute("position");
        
        let vertexList:Float32Array = new Float32Array(vertex.array.length);
        let index = 0 ;
        for(let val of (vertex.array as Array<number>)){
            vertexList[index ++ ] = (val*2);
        }
        var geometry = new THREE.BufferGeometry();
        geometry.addAttribute( 'position', new BufferAttribute(vertexList, 3) ); 
        
        var pointsMaterial = new THREE.PointsMaterial( {
            size: 0.1, 
            color: 0xff0000 , 
            depthTest: false, transparent: true, opacity: 0.1} );  
        let pointModel = new THREE.Points(geometry, pointsMaterial);
        pointModel.position.y = -1;
        webGLInit.scene.add(pointModel);
        
 
    }, onProgress, onError);
});

const gui = new dat.GUI();
let option = {
    "x": "1",
    "y": "1",
    "z": "0"
};
gui.add(option, "x");
gui.add(option, "y");

var stats = new Stats();
stats.setMode(1); // 0: fps, 1: ms
stats.domElement.style.position = 'absolute';
stats.domElement.style.left = '0px';
stats.domElement.style.top = '0px';
document.body.appendChild(stats.domElement);

//渲染循环
function render() {
    webGLInit.renderer.render(webGLInit.scene, webGLInit.camera);
    requestAnimationFrame(render);
    stats.update();
}
render();
