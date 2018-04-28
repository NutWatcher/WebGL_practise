import * as THREE from 'three' ;
// let scene = new THREE.Scene();
// let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
// // position and point the camera to the center of the scene
// camera.position.x = 30;
// camera.position.y = 30;
// camera.position.z = 30;
// camera.lookAt(new THREE.Vector3(0, 0, 0));

// let renderer = new THREE.WebGLRenderer();
// renderer.setClearColor(new THREE.Color(0x000000));
// renderer.setSize(window.innerWidth, window.innerHeight);
// renderer.shadowMap.enabled = true;
// //设置画布大小
// renderer.setSize(window.innerWidth, window.innerHeight);
// //加入到body
// //document.body.appendChild(renderer.domElement);

//  // add subtle ambient lighting
//  let ambientLight = new THREE.AmbientLight(0x0c0c0c);
//  //scene.add(ambientLight);

//  // add spotlight for the shadows
//  let spotLight = new THREE.SpotLight(0xffffff);
//  spotLight.position.set(-40, 60, -10);
//  spotLight.castShadow = true;
//  //scene.add(spotLight);


 export default class WebGLInit{
    // scene = new THREE.Scene();
    // camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    // renderer = new THREE.WebGLRenderer();
    // ambientLight = new THREE.AmbientLight(0x0c0c0c);
    // spotLight = new THREE.SpotLight(0xffffff);


    scene : any;
    camera : any;
    renderer : any;
    ambientLight : any;
    spotLight : any;
    constructor(){
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer();
        this.ambientLight = new THREE.AmbientLight(0x0c0c0c);
        this.spotLight = new THREE.SpotLight(0xffffff);
        this.camera.position.x = 30;
        this.camera.position.y = 30;
        this.camera.position.z = 30;
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));

        this.renderer.setClearColor(new THREE.Color(0x000000));
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.shadowMap.enabled = true;
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.spotLight.position.set(-40, 60, -10);
        this.spotLight.castShadow = true;
    }
 }