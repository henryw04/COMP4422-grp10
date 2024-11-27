import * as THREE from './lib/three-module.js';
import {OrbitControls} from './lib/OrbitControls.js';
import { CreatePlanet } from './lib/CreatePlanet.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 5;


const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize( window.innerWidth, window.innerHeight );


document.body.appendChild( renderer.domElement );

new OrbitControls(camera,renderer.domElement);

const loader = new THREE.TextureLoader();

//preload texture
const suntexture = loader.load('./textures/sunmapthumb.jpg');
const earthtexture = loader.load('./textures/earthmap1k.jpg');


//sun = CreatePlanet(suntexture,scene);
const earth = CreatePlanet(1,earthtexture,-23.4);
scene.add(earth);

function animate() {

	earth.rotateY(0.01);

	renderer.render( scene, camera );

}
renderer.setAnimationLoop(animate);
