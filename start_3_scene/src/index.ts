import * as THREE from "three";


//创建场景.
let scene = new THREE.Scene();
//相机
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

camera.position.x= -20;
camera.position.y= 40;
camera.position.z= 30;
camera.lookAt(scene.position);

//渲染器
let renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0xEEEEEE);
renderer.setSize(window.innerWidth,window.innerHeight);
//renderer.shadowMapType=THREE.PCFSoftShadowMap;
renderer.shadowMap.enabled = true;

//生成一个坐标轴，辅助线，坐标轴的参数
var axes=new THREE.AxesHelper(20);
//生成一个平面
var planeGeometry=new THREE.PlaneGeometry(60,20,10,10);//注意参数
//生成一个材质，设置材质的颜色，同时显示线框
var planeMaterial=new THREE.MeshLambertMaterial({color:0xffffff});
//生成一个网格，将平面和材质放在一个网格中，组合在一起，组成一个物体
var plane=new THREE.Mesh(planeGeometry,planeMaterial);
plane.rotation.x=-0.5*Math.PI;
plane.position.x=0;
plane.position.y=0;
plane.position.z=0;
plane.receiveShadow=true;

//设置画布大小
renderer.setSize(window.innerWidth, window.innerHeight);
//加入到body
document.body.appendChild(renderer.domElement);



//第二步,创建几何体.

let CubeGeometry = new THREE.CubeGeometry(10, 10, 10);
let material = new THREE.MeshLambertMaterial({ color: 0xff0000, wireframe:true });
let cube = new THREE.Mesh(CubeGeometry, material);
cube.position.x=-4;
cube.position.y=3;
cube.position.z=0;
cube.castShadow=true;//需要阴影，方块进行投射阴影

var spotLight=new THREE.SpotLight(0xffffff);
spotLight.position.set(-40,60,-10);
spotLight.castShadow=true;
spotLight.shadow.mapSize.height=2048;
spotLight.shadow.mapSize.width=2048;

//加入到场景
scene.add(camera);
scene.add(axes);
scene.add(plane);
scene.add(cube);
scene.add(spotLight);

//渲染循环
function animate()
{
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.02
    
    renderer.render(scene, camera);
}
animate();
