import * as THREE from './lib/three-module.js';
import {OrbitControls} from './lib/OrbitControls.js';
import {CreatePlanet,CreateGrp} from './lib/Planets.js';

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(

 	90, //fov
	window.innerWidth / window.innerHeight, //aspect
	0.1, //near plane
	1000 //far plane
);

const orbit=new OrbitControls(camera,renderer.domElement);
camera.position.set(0,100,0);

orbit.update();

//added axixhelper 
//red is x 
//green is y 
//blue is z
const axisHelper = new THREE.AxesHelper(500);
scene.add(axisHelper);

document.body.appendChild( renderer.domElement );


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
const deathstartexture = loader.load('./textures/death_star.jpg');



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

//planet creation
const mercury = CreatePlanet(1.2,mercurytexture,15,-0.03); //size, loader with texture ,x offset, tilt angle
const venus = CreatePlanet(2.7,venuxtexture,22,-2.64);
const earth = CreatePlanet(3,earthtexture,30,-23.44);
const mars = CreatePlanet(1.66,marstexture,38,-25.19);
const jupiter = CreatePlanet(11,jupitertexture,57,-3.13);
const saturn = CreatePlanet(9,saturntexture,85,-26.73);
const uranus = CreatePlanet(4,uranustexture,105,-97.77);
const neptune = CreatePlanet(5,neptunetexture,120,-28.32);

//deathstar
var deathstargeometry = new THREE.SphereGeometry(1,50,50);
var deathstarmat = new THREE.MeshPhongMaterial({map: deathstartexture})
var deathstar = new THREE.Mesh(deathstargeometry, deathstarmat);
deathstar.position.set(0,-0.5,20);
deathstar.rotateY(Math.PI*5/6);

//create deathstar beam
//max beam height should be 10
const beamgeometry = new THREE.CylinderGeometry(0.1,0.1,3,32); 
const beammat = new THREE.MeshStandardMaterial({color: 0x15ff00});
beammat.emissive.set(0x15ff00);
beammat.transparent = true;
beammat.opacity = 0.76;
var beam = new THREE.Mesh(beamgeometry, beammat);
beam.position.set(0,-0.1,19);
beam.rotateX(Math.PI/2);

scene.add(beam);

const beamgeometry2 = new THREE.CylinderGeometry(0.1,0.1,3,32); 
const beammat2 = new THREE.MeshStandardMaterial({color: 0x00ffae});
beammat2.emissive.set(0xafff05);
beammat2.transparent = true;
beammat2.opacity = 0.76;
var beam2 = new THREE.Mesh(beamgeometry2, beammat2);
beam2.position.set(0,-0.1,17.5);
beam2.rotateX(Math.PI/2);

scene.add(beam2);

const beamgeometry3 = new THREE.CylinderGeometry(0.1,0.1,10,32); 
const beammat3 = new THREE.MeshStandardMaterial({color: 0x68ff00});
beammat3.emissive.set(0x71ff63);
beammat3.transparent = true;
beammat3.opacity = 0.5;
var beam3 = new THREE.Mesh(beamgeometry3, beammat3);
beam3.position.set(0,-0.1,15);
beam3.rotateX(Math.PI/2);
scene.add(beam3);



//add planet to a group
const mercurygrp = CreateGrp(mercury);
const venusgrp = CreateGrp(venus);
const earthgrp = CreateGrp(earth);
const marsgrp = CreateGrp(mars);
const jupitergrp = CreateGrp(jupiter);
const saturngrp = CreateGrp(saturn);
const uranusgrp = CreateGrp(uranus);
const neptunegrp = CreateGrp(neptune);

//displaying
scene.add(mercurygrp);
scene.add(venusgrp);
scene.add(earthgrp);
scene.add(marsgrp);
scene.add(jupitergrp);
scene.add(saturngrp);
scene.add(uranusgrp);
scene.add(neptunegrp);
scene.add(deathstar);

const earthspeed = 0.003;
var scale = 100;

//slider reaction//
var speedslider = document.getElementById("speed");
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
//slider reaction end//



function animate() {
	//each frame//
	//start rotations//
	sun.rotateY(earthspeed/27*scale);

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
	//end rotation//


	
	beam.position.z -= 1.8;

	if(beam.position.z < 0){
		beam.position.z = 19;
	}
	
	beam2.position.z -= 2;

	if(beam2.position.z < 0){
		beam2.position.z = 18;
	}
	
	//control.update();


	renderer.render(scene, camera);//render//
}
renderer.setAnimationLoop(animate);
