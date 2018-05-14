import * as THREE from "three";
import dat from 'dat.gui';
import WebGLInit from './init';

let webGLInit = new WebGLInit();
document.body.appendChild(webGLInit.renderer.domElement);
webGLInit.scene.add(webGLInit.camera);
webGLInit.scene.add(webGLInit.ambientLight);
webGLInit.scene.add(webGLInit.spotLight);
webGLInit.scene.add(webGLInit.axes);
const gui = new dat.GUI();
let rotationStep = 0 ;
let option = {
    "x": "0",
    "y": "0",
    "z": "0"
};
gui.add(option, "x");
gui.add(option, "y");

//第二步,创建几何体.
var geometry = new THREE.PlaneGeometry( 5, 20, 32 );
var material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
var plane = new THREE.Mesh( geometry, material );
webGLInit.scene.add( plane );





//渲染循环
function render() {
    for (var i in gui.__controllers) {
        gui.__controllers[i].updateDisplay();
    }
    requestAnimationFrame(render);
    webGLInit.renderer.render(webGLInit.scene, webGLInit.camera);
}
let onDocumentMouseUp = (event) => {
    console.log(webGLInit.renderer.domElement.innerWidth);
    option.x = ((event.clientX / window.innerWidth) * 2 - 1).toString();
    option.y = (-(event.clientY / window.innerHeight) * 2 + 1).toString();
}
document.body.onmousedown = onDocumentMouseUp;
render();
