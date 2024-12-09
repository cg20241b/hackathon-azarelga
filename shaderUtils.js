import * as THREE from 'three';

// Utility function to create custom shader material
export function createCustomShaderMaterial(baseColor, options = {}) {
    const {
        ambientIntensity = 0.326,
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
        vertexShader: `
            uniform vec3 lightPosition;
            varying vec3 vNormal;
            varying vec3 vViewPosition;
            varying vec3 vLightDirection;

            void main() {
                vNormal = normalize(normalMatrix * normal);
                vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                vViewPosition = -mvPosition.xyz;
                vLightDirection = normalize(lightPosition - mvPosition.xyz);
                gl_Position = projectionMatrix * mvPosition;
            }
        `,
        fragmentShader: `
            uniform vec3 baseColor;
            uniform float ambientIntensity;
            uniform float shininess;
            uniform vec3 specularColor;
            uniform int materialType;

            varying vec3 vNormal;
            varying vec3 vViewPosition;
            varying vec3 vLightDirection;

            void main() {
                // Ambient component
                vec3 ambient = baseColor * ambientIntensity;

                // Diffuse component
                float diffuseStrength = max(dot(vNormal, vLightDirection), 0.0);
                vec3 diffuse = baseColor * diffuseStrength;

                // Specular component (Blinn-Phong)
                vec3 viewDirection = normalize(vViewPosition);
                vec3 halfwayDirection = normalize(vLightDirection + viewDirection);
                float specularStrength = pow(max(dot(vNormal, halfwayDirection), 0.0), shininess);
                
                // Adjust specular based on material type
                vec3 specular = materialType == 1 
                    ? specularColor * specularStrength * 1.5 // More reflective for metal
                    : specularColor * specularStrength;

                // Final color
                vec3 finalColor = ambient + diffuse + specular;
                gl_FragColor = vec4(finalColor, 1.0);
            }
        `
    });
}