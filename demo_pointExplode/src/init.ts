import * as THREE from 'three' ;
 export default class WebGLInit{
    scene : any;
    camera : any;
    renderer : THREE.WebGLRenderer;
    ambientLight : any;
    spotLight : any;
    axes : any;
    constructor(){
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer();
        this.ambientLight = new THREE.AmbientLight(0x0c0c0c);
        this.spotLight = new THREE.SpotLight(0xffffff);
        this.axes=new THREE.AxesHelper(20);


        this.camera.position.x = 10;
        this.camera.position.y = 10;
        this.camera.position.z = 50;
        this.camera.lookAt(new THREE.Vector3(0, -10, 0));

        this.renderer.setClearColor(new THREE.Color(0xEEEEEE));
        this.renderer.shadowMap.enabled = true;
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.spotLight.position.set(-40, 60, -10);
        this.spotLight.castShadow = true;
    }
 }