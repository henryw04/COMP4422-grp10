import * as THREE from './three-module.js'


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
};

function CreateGrp(planet){
    var grp = new THREE.Group();
    grp.add(planet);
    return grp
}


export {CreatePlanet,CreateGrp}