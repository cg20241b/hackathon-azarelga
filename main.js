import * as THREE from 'three';
import { createCustomShaderMaterial } from './shaderUtils.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('mainCanvas') });
renderer.setSize(window.innerWidth, window.innerHeight);

// Light source cube
const lightCubeGeometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
const lightCubeMaterial = new THREE.ShaderMaterial({
    uniforms: {
        glowColor: { value: new THREE.Color(1, 1, 1) }
    },
    vertexShader: `
        varying vec3 vPosition;
        void main() {
            vPosition = position;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        uniform vec3 glowColor;
        void main() {
            gl_FragColor = vec4(glowColor, 0.8);
        }
    `,
    transparent: true
});
const lightCube = new THREE.Mesh(lightCubeGeometry, lightCubeMaterial);
scene.add(lightCube);
lightCube.position.set(0, 0, 0);

// Camera positioning
camera.position.z = 5;

// Font loader
const fontLoader = new FontLoader();
fontLoader.load('./src/fonts/helvetiker_regular.typeface.json', (font) => {
    // Character "L"
    const lGeometry = new TextGeometry('L', {
        font: font,
        size: 1,
        height: 0.2,
    });
    const lMaterial = createCustomShaderMaterial('#636B2F', {
        lightPosition: lightCube.position,
        materialType: 'plastic'
    });
    const lMesh = new THREE.Mesh(lGeometry, lMaterial);
    lMesh.position.set(-2, 0, 0);
    scene.add(lMesh);

    // Digit "6"
    const sixGeometry = new TextGeometry('6', {
        font: font,
        size: 1,
        height: 0.2,
    });
    const sixMaterial = createCustomShaderMaterial('#2F6B63', {
        lightPosition: lightCube.position,
        materialType: 'metal',
        shininess: 100
    });
    const sixMesh = new THREE.Mesh(sixGeometry, sixMaterial);
    sixMesh.position.set(2, 0, 0);
    scene.add(sixMesh);
});

// Keyboard controls
const keyState = {};
window.addEventListener('keydown', (e) => {
    keyState[e.key.toLowerCase()] = true;
});
window.addEventListener('keyup', (e) => {
    keyState[e.key.toLowerCase()] = false;
});

// Animation loop with controls
function animate() {
    requestAnimationFrame(animate);

    // Cube movement
    if (keyState['w']) lightCube.position.y += 0.1;
    if (keyState['s']) lightCube.position.y -= 0.1;

    // Camera movement
    if (keyState['a']) camera.position.x -= 0.1;
    if (keyState['d']) camera.position.x += 0.1;

    renderer.render(scene, camera);
}

animate();

// Responsive handling
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});