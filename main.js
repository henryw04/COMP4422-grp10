import * as THREE from './lib/three-module.js';
import {OrbitControls} from './lib/OrbitControls.js';
import {CreatePlanet,CreateGrp} from './lib/Planets.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.1, 4000 );
camera.position.set(0,10,90) ;


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
var sungeometry = new THREE.SphereGeometry(10,50,50);
var sunmat = new THREE.MeshBasicMaterial({map: suntexture})
const sun = new THREE.Mesh(sungeometry,sunmat)
scene.add(sun);

//sunlight
const plight = new THREE.PointLight( 0xffffff, 30, 150, 0.5 );
plight.castShadow=true;
scene.add( plight );
//light up all the planet a bit
var ambient = 0.1;
const al = new THREE.AmbientLight(0xffffff, ambient);
scene.add(al);

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


const earthspeed = 0.01;

var speedslider = document.getElementById("speed");
var scale = 100;
speedslider.oninput = function() {
  scale = Number(this.value);
}
var speedsliderbut = document.getElementById("sliderbutton");
speedsliderbut.onclick = function(){
	speedslider.value=100;
	scale=100;
}

var ambientslider = document.getElementById("ambient");
ambientslider.oninput = function() {
  ambient = Number(this.value)/10;
  al.intensity=ambient;
}
var ambientsliderbut = document.getElementById("ambientbutton");
ambientsliderbut.onclick = function(){
	ambientslider.value=1;	
	ambient=0.1;
	al.intensity=ambient;
}

function animate() {
	renderer.setAnimationLoop(animate);
	mercury.rotateY(earthspeed/58.65*scale);
	mercurygrp.rotateY(earthspeed/88*scale);

	venus.rotateY(-earthspeed/243*scale);
	venusgrp.rotateY(earthspeed/225*scale);

	earth.rotateY(earthspeed*scale);
	earthgrp.rotateY(earthspeed/365*scale);

	mars.rotateY(earthspeed/1.03*scale);
	marsgrp.rotateY(earthspeed/687*scale);

	jupiter.rotateY(earthspeed*(24/9.9)*scale);
	jupitergrp.rotateY(earthspeed/4333*scale);

	saturn.rotateY(earthspeed*(24/10.7)*scale);
	saturngrp.rotateY(earthspeed/10756*scale);

	uranus.rotateY(earthspeed*(24/17.3)*scale);
	uranusgrp.rotateY(earthspeed/30687*scale);

	neptune.rotateY(earthspeed*(24/16.1)*scale);
	neptunegrp.rotateY(earthspeed/60190*scale);

	renderer.render(scene, camera);

}

animate()