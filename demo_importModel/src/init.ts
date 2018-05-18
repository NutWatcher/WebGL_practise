import * as THREE from 'three' ;
export default class WebGLInit{
    scene : THREE.Scene;
    camera : THREE.PerspectiveCamera;
    renderer : THREE.WebGLRenderer;
    ambientLight : THREE.AmbientLight;
    spotLight : THREE.SpotLight;
    axes : THREE.AxesHelper;
    constructor(){
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer(        );
        this.ambientLight = new THREE.AmbientLight(0xffffff);
        this.spotLight = new THREE.SpotLight(0xffdddd);
        this.axes=new THREE.AxesHelper(20);


        this.camera.position.x = -5;
        this.camera.position.y = 5;
        this.camera.position.z = 5;
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));

        this.renderer.setClearColor(new THREE.Color(0xEEEEEE));
        this.renderer.shadowMap.enabled = true;
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.spotLight.position.set(-40, 60, -10);
        this.spotLight.castShadow = true;
    }
 }