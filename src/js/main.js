/* global dat */
'use strict';

import { THREE, ThreeApp } from './three_app';
import { preventDefaultTouchEvents } from './utils';

//====================================================================//
// configuration
//====================================================================//

const DEBUG = true;

const DEFAULT_SETTINGS = {

    scaleX: 1.0,
    scaleY: 1.0,
    scaleZ: 1.0

};


//====================================================================//
// main
//====================================================================//

export function main () {

    let app = new ThreeApp({ onRender: animate, onInit: init });

    Object.assign(app, DEFAULT_SETTINGS);

    preventDefaultTouchEvents();

    init_dat_gui(app);

    if (DEBUG) {
        window.THREE = THREE;
        window.threeApp = app;
        console.debug("hello from threejs-boilerplate");
    }

}

function init_dat_gui (app) {

    let gui = new dat.GUI({
        height: 3 * 32 - 1
    });

    gui.add(app, 'scaleX').min(0.1).max(5.0).name('Scale X');
    gui.add(app, 'scaleY').min(0.1).max(5.0).name('Scale Y');
    gui.add(app, 'scaleZ').min(0.1).max(5.0).name('Scale Z');

}


//====================================================================//
// init scene
//====================================================================//

function init (app) {

    let geometry = new THREE.BoxGeometry(400, 400, 400);
    let material = new THREE.MeshBasicMaterial({
                     color: 0xffffaa,
                 wireframe: true,
        wireframeLinewidth: 2
    });

    app.mesh = new THREE.Mesh(geometry, material);
    app.scene.add(app.mesh);

}


//====================================================================//
// animate scene
//====================================================================//

function animate (time, app) {

    app.mesh.scale.x = app.scaleX;
    app.mesh.scale.y = app.scaleY;
    app.mesh.scale.z = app.scaleZ;

    app.mesh.rotation.x += 0.01;
    app.mesh.rotation.y += 0.02;

}

