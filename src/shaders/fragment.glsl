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