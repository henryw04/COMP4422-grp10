import * as THREE from './three-module.js'


function CreatePlanet(rationtoearth,texture,tilt){
    var geometry = new THREE.SphereGeometry(rationtoearth,50,50);
    var material = new THREE.MeshBasicMaterial( { 
	map: texture 
} );
    var planet =  new THREE.Mesh( geometry, material );
    planet.rotation.z = Math.PI * tilt / 180;
    return planet;
};




export {CreatePlanet}