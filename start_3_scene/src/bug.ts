import * as THREE from "three";
import dat from 'dat.gui';

//创建场景.
let scene = new THREE.Scene();
//相机
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.x = 10;
camera.position.y = 10;
camera.position.z = 50;
camera.lookAt(scene.position);

//渲染器
let renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0xEEEEEE);
renderer.setClearAlpha(0.1);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);



//第二步,创建几何体.
let planeMeometry = new THREE.PlaneGeometry(20, 20, 10);
let circleGeometry = new THREE.SphereGeometry(5, 32, 32);
let planeMaterial = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    opacity: 0.1,
    depthTest: false,
    transparent: true,

    blending: THREE.CustomBlending,
    blendEquation: THREE.AddEquation, 
    blendSrc: THREE.ZeroFactor, 
    blendDst: THREE.ZeroFactor,

    blendEquationAlpha: THREE.AddEquation,
    blendSrcAlpha: THREE.ZeroFactor, 
    blendDstAlpha: THREE.ZeroFactor
});
let circleMaterial = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    opacity: 0.1,
    depthTest: false,
    transparent: true,

    blending: THREE.CustomBlending,
    blendEquation: THREE.AddEquation,
    blendSrc: THREE.DstAlphaFactor, //It doesn't work . Expert is Zero, but is's One in fact.
    blendDst: THREE.ZeroFactor
});

let plane = new THREE.Mesh(planeMeometry, planeMaterial);
let circle = new THREE.Mesh(circleGeometry, circleMaterial);
plane.renderOrder = 200;
circle.renderOrder = 300;

//加入到场景
scene.add(camera);
scene.add(plane);
scene.add(circle);
let axes = new THREE.AxesHelper(20);
scene.add(axes);
//渲染循环
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();
