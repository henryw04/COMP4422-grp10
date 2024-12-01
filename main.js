import * as THREE from './lib/three-module.js';
import {OrbitControls} from './lib/OrbitControls.js';


const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight);
const UpDirection = new THREE.Vector3(0, 1, 0);
const Origin = new THREE.Vector3(0,0,0);

function PointToSun(Mesh) {
	var directionToOrigin = new THREE.Vector3().subVectors(Origin, Mesh.position).normalize();
	Mesh.quaternion.setFromUnitVectors(UpDirection, directionToOrigin);
	return null;
}
function CreatePlanet(radius,texture,x,tilt){
    var geometry = new THREE.SphereGeometry(radius,50,50);
    var material = new THREE.MeshPhongMaterial({ 
	    map: texture 
    });
    var PlanetMesh =  new THREE.Mesh(geometry, material);
    PlanetMesh.castShadow =true;
    PlanetMesh.receiveShadow =true;
    PlanetMesh.position.x = x;

    if (tilt){
        PlanetMesh.rotation.z = Math.PI * tilt / 180;
    }
    return PlanetMesh;
}
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(

 	90, //fov
	window.innerWidth / window.innerHeight, //aspect
	0.1, //near plane
	4000 //far plane
);

const orbit=new OrbitControls(camera,renderer.domElement);
camera.position.set(150,60,50);

orbit.update();

//added axixhelper 
//red is x 
//green is y 
//blue is z
//const axisHelper = new THREE.AxesHelper(500);
//scene.add(axisHelper);

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
const moontexture = loader.load('./textures/moon8k.jpg');
const bgtexture = loader.load('./textures/milkyway8k.jpg');

const bgGeometry = new THREE.SphereGeometry(3000, 100, 100);
const bgMaterial = new THREE.MeshBasicMaterial({
	map: bgtexture,
	side: THREE.DoubleSide,
});
const bg = new THREE.Mesh(bgGeometry, bgMaterial);
scene.add(bg);


//create sun
const sungeometry = new THREE.SphereGeometry(10,50,50);
const sunmat = new THREE.MeshBasicMaterial({map: suntexture})
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

/* const mercury = CreatePlanet(1.2,mercurytexture,15,-0.03); //size, loader with texture ,x offset, tilt angle
const venus = CreatePlanet(2.7,venuxtexture,22,-2.64);
const earth = CreatePlanet(3,earthtexture,earthx,-23.44);
const mars = CreatePlanet(1.66,marstexture,38,-25.19);
const jupiter = CreatePlanet(11,jupitertexture,57,-3.13);
const saturn = CreatePlanet(9,saturntexture,85,-26.73);
const uranus = CreatePlanet(4,uranustexture,105,-97.77);
const neptune = CreatePlanet(5,neptunetexture,120,-28.32); */


// 	MERCURY  	 VENUS  	 EARTH    	 MARS  	 JUPITER  	 SATURN  	 URANUS  	 NEPTUNE  	 PLUTO 
//Orbital Period 	0.241 	0.615 	1 	 1.88 	11.9 	29.4 	83.7 	163.7 	247.9

const mercuryx = 15;
const venusx = 22;
const earthx = 30;
const marsx = 38;
const jupiterx = 57;
const saturnx = 85;
const uranusx = 105;
const neptunex = 120;

const mercuryratio = 1/0.241;
const venusratio = 1/0.615;
const earthratio = 1;
const marsratio = 1/1.88;
const jupitersratio = 1/11.9;
const saturnratio = 1/29.4;
const uranusratio = 1/83.7;
const neptuneratio = 1/163.7;
const moonratio = 1/0.0747;

//moon offset




const mercury = CreatePlanet(1.2,mercurytexture,15,-0.03); //size, loader with texture ,x offset, tilt angle
const venus = CreatePlanet(2.7,venuxtexture,22,-2.64);
const earth = CreatePlanet(3,earthtexture,earthx,-23.44);
const mars = CreatePlanet(1.66,marstexture,38,-25.19);
const jupiter = CreatePlanet(11,jupitertexture,57,-3.13);
const saturn = CreatePlanet(9,saturntexture,85,-26.73);
const uranus = CreatePlanet(4,uranustexture,105,-97.77);
const neptune = CreatePlanet(5,neptunetexture,120,-28.32);
const moon = CreatePlanet(0.5,moontexture,earthx,-28.32);

//deathstar
const deathstargeometry = new THREE.SphereGeometry(40,50,50);
const deathstarmat = new THREE.MeshPhongMaterial({map: deathstartexture})
const deathstar = new THREE.Mesh(deathstargeometry, deathstarmat);
deathstar.position.set(100, 32, 100);

//create deathstar beam

const beamgeometry = new THREE.CylinderGeometry(5, 35, 150, 32, 1, false);
const beammat = new THREE.MeshStandardMaterial({ color: 0x15ff00 });
beammat.emissive.set(0x15ff00);
beammat.transparent = true;
beammat.opacity = 0.76;

const beam = new THREE.Mesh(beamgeometry, beammat);
beam.position.set(50, 16, 50);
PointToSun(beam);
beam.visible=false;

scene.add(beam);

scene.add(mercury);
scene.add(venus);
scene.add(mars);
scene.add(jupiter);
scene.add(saturn);
scene.add(uranus);
scene.add(neptune);
scene.add(deathstar);
scene.add(earth);
scene.add(moon);

//slider reaction//

const speedslider = document.getElementById("speed");
speedslider.oninput = function() {
  scale = Number(this.value);
}
const speedsliderbut = document.getElementById("sliderbutton");
speedsliderbut.onclick = function(){
	speedslider.value=75;
	scale=75;
}

const ambientslider = document.getElementById("ambient");
ambientslider.oninput = function() {
  ambient = Number(this.value)/10;
  al.intensity=ambient;
}
const ambientsliderbut = document.getElementById("ambientbutton");
ambientsliderbut.onclick = function(){
	ambientslider.value=1;	
	ambient=0.1;
	al.intensity=ambient;
}
//slider reaction end//

//death star shoot//
const shootbut = document.getElementById("beambutton");
shootbut.onclick = function(){
	beam.visible = true;
	setTimeout(() => {
        alert('Congratulations!!! You have destroyed the solar system! BOMMMM 💥💥💥💥💥💥💥💥💥');
    }, 10);
}

var earthspeed = 0.001;
var scale = 75;

//moon offset ball for moon offset position
const ballGeometry = new THREE.SphereGeometry(0.5, 32, 32);
const ballMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const ball = new THREE.Mesh(ballGeometry, ballMaterial);
scene.add(ball);

let angle = 0;

function animate() {
	requestAnimationFrame(animate);
	
	//each frame//
	//start rotations//
	sun.rotateY(earthspeed/27*scale);

	mercury.rotateY(earthspeed/58.65*scale);
	mercury.position.x = mercuryx * Math.cos(mercuryratio*angle);
	mercury.position.z = mercuryx * Math.sin(mercuryratio*angle);

	//mercurygrp.rotateY(earthspeed/88*scale);

	venus.rotateY(-earthspeed/243*scale);
	venus.position.x = venusx * Math.cos(venusratio*angle);
	venus.position.z = venusx * Math.sin(venusratio*angle);
	//venusgrp.rotateY(earthspeed/225*scale);

	earth.rotateY(earthspeed*scale);
	earth.position.x = earthx * Math.cos(angle);
	earth.position.z = earthx * Math.sin(angle);

	moon.rotateY(earthspeed*scale);
	moon.position.x = earth.position.x + ball.position.x;
	moon.position.z = earth.position.z + ball.position.y;

	
	//earthgrp.rotateY(earthspeed/365*scale);

	mars.rotateY(earthspeed/1.03*scale);
	mars.position.x = marsx * Math.cos(marsratio*angle);
	mars.position.z = marsx * Math.sin(marsratio*angle);
	//marsgrp.rotateY(earthspeed/687*scale);

	jupiter.rotateY(earthspeed*(24/9.9)*scale);
	jupiter.position.x = jupiterx * Math.cos(jupitersratio*angle);
	jupiter.position.z = jupiterx * Math.sin(jupitersratio*angle);
	//jupitergrp.rotateY(earthspeed/4333*scale);

	saturn.rotateY(earthspeed*(24/10.7)*scale);
	saturn.position.x = saturnx * Math.cos(saturnratio*angle);
	saturn.position.z = saturnx * Math.sin(saturnratio*angle);
	//saturngrp.rotateY(earthspeed/10756*scale);

	uranus.rotateY(earthspeed*(24/17.3)*scale);
	uranus.position.x = uranusx * Math.cos(uranusratio*angle);
	uranus.position.z = uranusx * Math.sin(uranusratio*angle);
	//uranusgrp.rotateY(earthspeed/30687*scale);

	neptune.rotateY(earthspeed*(24/16.1)*scale);
	neptune.position.x = neptunex * Math.cos(neptuneratio*angle);
	neptune.position.z = neptunex * Math.sin(neptuneratio*angle);
	//neptunegrp.rotateY(earthspeed/60190*scale);
	//end rotation//

	//moon rotation
	ball.position.x = 4 * Math.cos(moonratio*angle);
    ball.position.y = 4 * Math.sin(moonratio*angle);

	
	angle += scale/10000;
	
	/* beam.position.z -= 1.8;

	if(beam.position.z < 0){
		beam.position.z = 19;
	}
	
	beam2.position.z -= 2;

	if(beam2.position.z < 0){
		beam2.position.z = 18;
	} */
	
	//control.update();


	renderer.render(scene, camera);//render//
}

animate();
