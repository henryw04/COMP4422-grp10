import * as THREE from './lib/three-module.js';
import {OrbitControls} from './lib/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 5;


const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );

document.body.appendChild( renderer.domElement );

new OrbitControls(camera,renderer.domElement);

const geometry = new THREE.IcosahedronGeometry( 1,16);
const material = new THREE.MeshBasicMaterial( { 
	color: 0xffff00, 
} );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );


function animate() {

	cube.rotation.y += 0.01;

	renderer.render( scene, camera );

}
