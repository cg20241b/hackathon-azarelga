import * as THREE from 'three';
import vertexShader from './src/shaders/vertex.glsl?raw';
import fragmentShader from './src/shaders/fragment.glsl?raw';

// Utility function to create custom shader material
export function createCustomShaderMaterial(baseColor, options = {}) {
    const {
        ambientIntensity = 0.126 + 0.200,
        lightPosition = new THREE.Vector3(0, 0, 0),
        shininess = 50,
        specularColor = new THREE.Color(1, 1, 1),
        materialType = 'plastic'
    } = options;

    return new THREE.ShaderMaterial({
        uniforms: {
            baseColor: { value: new THREE.Color(baseColor) },
            lightPosition: { value: lightPosition },
            ambientIntensity: { value: ambientIntensity },
            shininess: { value: shininess },
            specularColor: { value: specularColor },
            materialType: { value: materialType === 'metal' ? 1 : 0 }
        },
        vertexShader: vertexShader,
        fragmentShader: fragmentShader
    });
}