import * as THREE from './lib/three-module.js';
import {OrbitControls} from './lib/OrbitControls.js';
import {CreatePlanet,CreateGrp} from './lib/Planets.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.1, 4000 );
camera.position.z = 90;


const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize( window.innerWidth, window.innerHeight );


document.body.appendChild( renderer.domElement );

new OrbitControls(camera,renderer.domElement);

const loader = new THREE.TextureLoader();

//preload texture
const suntexture = loader.load('./textures/sun.png');
const mercurytexture = loader.load('./textures/mercury8k.jpg')
const venuxtexture = loader.load('./textures/venus8k.jpg')
const earthtexture = loader.load('./textures/earthmap8k.jpg');
const marstexture = loader.load('./textures/mars8k.jpg');
const jupitertexture = loader.load('./textures/jupiter8k.jpg');
const saturntexture = loader.load('./textures/saturn8k.jpg');
const uranustexture = loader.load('./textures/uranus2k.jpg');
const neptunetexture = loader.load('./textures/neptune2k.jpg');

//create sun
const sun = CreatePlanet(10,suntexture);
scene.add(sun);


const mercury = CreatePlanet(1.2,mercurytexture,15,-0.03);
const venus = CreatePlanet(2.7,venuxtexture,22,-2.64);
const earth = CreatePlanet(3,earthtexture,30,-23.44);
const mars = CreatePlanet(1.66,marstexture,38,-25.19);
const jupiter = CreatePlanet(11,jupitertexture,57,-3.13);
const saturn = CreatePlanet(9,saturntexture,85,-26.73);
const uranus = CreatePlanet(4,uranustexture,105,-97.77);
const neptune = CreatePlanet(5,neptunetexture,120,-28.32);

const mercurygrp = CreateGrp(mercury);
const venusgrp = CreateGrp(venus);
const earthgrp = CreateGrp(earth);
const marsgrp = CreateGrp(mars);
const jupitergrp = CreateGrp(jupiter);
const saturngrp = CreateGrp(saturn);
const uranusgrp = CreateGrp(uranus);
const neptunegrp = CreateGrp(neptune);


scene.add(mercurygrp);
scene.add(venusgrp);
scene.add(earthgrp);
scene.add(marsgrp);
scene.add(jupitergrp);
scene.add(saturngrp);
scene.add(uranusgrp);
scene.add(neptunegrp);

function animate() {
	mercury.rotateY(0.01/58.65);
	mercurygrp.rotateY(0.041477);

	venus.rotateY(-0.01/243);
	venusgrp.rotateY(0.016222);

	earth.rotateY(0.01);
	earthgrp.rotateY(0.01);

	mars.rotateY(0.01);
	marsgrp.rotateY(0.00531);

	jupiter.rotateY(0.0242);
	jupitergrp.rotateY(0.0008333);

	saturn.rotateY(0.02243);
	saturngrp.rotateY(0.00034014);

	uranus.rotateY(0.01393);
	uranusgrp.rotateY(0.00011905);

	neptune.rotateY(0.014906);
	neptunegrp.rotateY(0.00006061);

	renderer.render(scene, camera);

}
renderer.setAnimationLoop(animate);
