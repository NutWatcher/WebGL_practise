import * as THREE from "three";
import dat from 'dat.gui';
import WebGLInit from './init';

let webGLInit = new WebGLInit();
document.body.appendChild(webGLInit.renderer.domElement);

const gui = new dat.GUI();
let rotationStep = 0;
let option = {
    "x": "1",
    "y": "1",
    "z": "0"
};
gui.add(option, "x");
gui.add(option, "y");


let raycaster = new THREE.Raycaster();

//第二步,创建几何体.
var geometry = new THREE.PlaneGeometry(5, 20, 0);
var material = new THREE.MeshBasicMaterial({ color: 0xffff00, side: THREE.DoubleSide });
var plane = new THREE.Mesh(geometry, material);

webGLInit.scene.add( plane );
webGLInit.scene.add(webGLInit.camera);
webGLInit.scene.add(webGLInit.ambientLight);
webGLInit.scene.add(webGLInit.spotLight);
webGLInit.scene.add(webGLInit.axes);

let mouse = new THREE.Vector2(1, 1);
let INTERSECTED:THREE.Object3D[] = [];

//渲染循环
function render() {
    
    //console.log(mouse.x);
    raycaster.setFromCamera(mouse, webGLInit.camera);
    var intersects = raycaster.intersectObjects(webGLInit.scene.children);
    //console.log(webGLInit.scene.children);
    if (!mouse.equals( new THREE.Vector2(1, 1) )){
        if (intersects.length > 0) {
            for (let i: number = 0; i < intersects.length; i++) {
                (intersects[i].object as any).material.color.set(0x000000);
                INTERSECTED.push(intersects[i].object);
                //console.log(intersects[i].object);
            }
        }
        else {
            for (let i: number = 0; i < INTERSECTED.length; i++) {
                (INTERSECTED[i] as any).material.color.set(0xffff00);
            }
        }
    }
    
    // else if (INTERSECTED != null){
    //     (INTERSECTED as any).material.color.set(0xffff00);
    //     INTERSECTED = null;
    // }
    for (var i in gui.__controllers) {
        gui.__controllers[i].updateDisplay();
    }
    webGLInit.renderer.render(webGLInit.scene, webGLInit.camera);
    requestAnimationFrame(render);
    
}
let onDocumentMouseUp = (event) => {
    event.preventDefault();
    console.log(window.innerWidth);
    option.x = ((event.clientX / window.innerWidth) * 2 - 1).toString();
    option.y = (-(event.clientY / window.innerHeight) * 2 + 1).toString();

    mouse.x = ((event.clientX / window.innerWidth) * 2 - 1);
    mouse.y = (-(event.clientY / window.innerHeight) * 2 + 1);
}
document.body.onmousedown = onDocumentMouseUp;
render();
