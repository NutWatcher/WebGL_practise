/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/// <reference path="../typescript.d.ts" /> 
//import * as layout from "./shader/test.glsl";
Object.defineProperty(exports, "__esModule", { value: true });
//  let vertex_shader = require('./shader/vertex.glsl');
//  let fragment_shader = require('./shader/fragment-1.glsl');
const vertex_shader = __webpack_require__(/*! ./shader/vertex.glsl */ "./src/shader/vertex.glsl");
const fragment_shader = __webpack_require__(/*! ./shader/fragment-1.glsl */ "./src/shader/fragment-1.glsl");
console.log("vertex_shader");
console.log(vertex_shader);
const THREE = __webpack_require__(/*! three */ "three");
const init_1 = __webpack_require__(/*! ./init */ "./src/init.ts");
let webGLInit = new init_1.default();
document.body.appendChild(webGLInit.renderer.domElement);
let CreateMaterial = (vertexShader, fragmentShader) => {
    var vertShader = vertex_shader;
    var fragShader = fragment_shader;
    var attributes = {};
    var uniforms = {
        sleep: { type: 'f', value: 3 },
        time: { type: 'f', value: 0.2 },
        scale: { type: 'f', value: 0.2 },
        alpha: { type: 'f', value: 0.6 },
        resolution: { type: "v2", value: new THREE.Vector2() }
    };
    uniforms.resolution.value.x = window.innerWidth;
    uniforms.resolution.value.y = window.innerHeight;
    var meshMaterial = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: String(vertShader),
        fragmentShader: String(fragShader),
        transparent: true
    });
    return meshMaterial;
};
let cubeGeometry = new THREE.BoxGeometry(20, 20, 20);
let meshMaterial1 = CreateMaterial("vertex-shader", "fragment-shader-1");
let material = [
    meshMaterial1,
    meshMaterial1,
    meshMaterial1,
    meshMaterial1,
    meshMaterial1,
    meshMaterial1
];
let cube = new THREE.Mesh(cubeGeometry, material);
webGLInit.scene.add(cube);
webGLInit.scene.add(webGLInit.camera);
webGLInit.scene.add(webGLInit.ambientLight);
webGLInit.scene.add(webGLInit.spotLight);
let step = 0;
function render() {
    cube.rotation.y = step += 0.001;
    cube.rotation.x = step;
    cube.rotation.z = step;
    cube.material.forEach(function (e) {
        e.uniforms.time.value += 0.01;
    });
    // render using requestAnimationFrame
    requestAnimationFrame(render);
    webGLInit.renderer.render(webGLInit.scene, webGLInit.camera);
}
render();


/***/ }),

/***/ "./src/init.ts":
/*!*********************!*\
  !*** ./src/init.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const THREE = __webpack_require__(/*! three */ "three");
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
class WebGLInit {
    constructor() {
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
exports.default = WebGLInit;


/***/ }),

/***/ "./src/shader/fragment-1.glsl":
/*!************************************!*\
  !*** ./src/shader/fragment-1.glsl ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "precision highp float;\r\nuniform float time;\r\nuniform float alpha;\r\nuniform vec2 resolution;\r\nvarying vec2 vUv;\r\n\r\nvoid main2(void)\r\n{\r\n    vec2 position = vUv;\r\n    float red = 1.0;\r\n    float green = 0.25 + sin(time) * 0.25;\r\n    float blue = 0.0;\r\n    vec3 rgb = vec3(red, green, blue);\r\n    vec4 color = vec4(rgb, alpha);\r\n    gl_FragColor = color;\r\n}\r\n\r\n#define PI 3.14159\r\n#define TWO_PI (PI*2.0)\r\n#define N 68.5\r\n\r\nvoid main(void)\r\n{\r\n    vec2 center = (gl_FragCoord.xy);\r\n    center.x=-10.12*sin(time/200.0);\r\n    center.y=-10.12*cos(time/200.0);\r\n\r\n    vec2 v = (gl_FragCoord.xy - resolution/20.0) / min(resolution.y,resolution.x) * 15.0;\r\n    v.x=v.x-10.0;\r\n    v.y=v.y-200.0;\r\n    float col = 0.0;\r\n\r\n    for(float i = 0.0; i < N; i++)\r\n    {\r\n    float a = i * (TWO_PI/N) * 61.95;\r\n    col += cos(TWO_PI*(v.y * cos(a) + v.x * sin(a) + sin(time*0.004)*100.0 ));\r\n    }\r\n\r\n    col /= 5.0;\r\n\r\n    gl_FragColor = vec4(col*1.0, -col*1.0,-col*4.0, 1.0);\r\n}\r\n"

/***/ }),

/***/ "./src/shader/vertex.glsl":
/*!********************************!*\
  !*** ./src/shader/vertex.glsl ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "uniform float time;\r\nvarying vec2 vUv;\r\n\r\n\r\nvoid main()\r\n{\r\n    vec3 posChanged = position;\r\n    posChanged.x = posChanged.x*(abs(sin(time*0.10)));\r\n    posChanged.y = posChanged.y*(abs(cos(time*0.10)));\r\n    posChanged.z = posChanged.z*(abs(sin(time*0.10)));\r\n    gl_Position = projectionMatrix * modelViewMatrix * vec4(position*(abs(sin(time)/2.0)+0.5),1.0);\r\n    //gl_Position = projectionMatrix * modelViewMatrix * vec4(posChanged,1.0);\r\n}\r\n"

/***/ }),

/***/ "three":
/*!************************!*\
  !*** external "THREE" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = THREE;

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map