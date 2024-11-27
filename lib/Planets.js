import * as THREE from './three-module.js'


function CreatePlanet(rationtoearth,texture,x,tilt){
    var geometry = new THREE.SphereGeometry(rationtoearth,50,50);
    var material = new THREE.MeshBasicMaterial({ 
	    map: texture 
    });
    var planet =  new THREE.Mesh(geometry, material);
    planet.castShadow =true;
    planet.receiveShadow =true;
    if (x){
        planet.position.set(x, 0, 0);
    }
    if (tilt){
        planet.rotation.z = Math.PI * tilt / 180;
    }
    return planet;
};

function CreateGrp(planet){
    var grp = new THREE.Group();
    grp.add(planet);
    return grp
}


export {CreatePlanet,CreateGrp}