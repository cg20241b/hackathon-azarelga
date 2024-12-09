import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

// Create scene
const scene = new THREE.Scene();

// Create camera
const camera = new THREE.PerspectiveCamera(
    75, window.innerWidth / window.innerHeight, 0.1, 1000
);
camera.position.z = 5;

// Create renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Load font and create text meshes
const loader = new FontLoader();
loader.load(
    './fonts/helvetiker_regular.typeface.json',
    function (font) {
        // Text mesh for 'L'
        const textGeometry1 = new TextGeometry('L', {
            font: font,
            size: 1,
            height: 0.2,
        });
        const textMaterial1 = new THREE.MeshBasicMaterial({ color: 0xff0000 });
        const textMesh1 = new THREE.Mesh(textGeometry1, textMaterial1);
        textMesh1.position.set(-1, 0, 0); // Left side
        scene.add(textMesh1);

        // Text mesh for '6'
        const textGeometry2 = new TextGeometry('6', {
            font: font,
            size: 1,
            height: 0.2,
        });
        const textMaterial2 = new THREE.MeshBasicMaterial({ color: 0x0000ff });
        const textMesh2 = new THREE.Mesh(textGeometry2, textMaterial2);
        textMesh2.position.set(1, 0, 0); // Right side
        scene.add(textMesh2);
    }
);

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Update renderer
    renderer.setSize(width, height);

    // Update camera
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
}
animate();