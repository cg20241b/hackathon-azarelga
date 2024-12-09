// alphabet.glsl (plastic-like material)
uniform vec3 color;
uniform float ambientIntensity;
uniform vec3 lightPosition;

varying vec3 vNormal;
varying vec3 vPosition;

void main() {
    // Ambient
    vec3 ambient = color * ambientIntensity;
    
    // Diffuse
    vec3 lightDir = normalize(lightPosition - vPosition);
    float diff = max(dot(vNormal, lightDir), 0.0);
    vec3 diffuse = diff * color;
    
    // Specular (plastic-like)
    vec3 viewDir = normalize(-vPosition);
    vec3 halfDir = normalize(lightDir + viewDir);
    float spec = pow(max(dot(vNormal, halfDir), 0.0), 32.0);
    vec3 specular = vec3(0.5) * spec;
    
    vec3 result = ambient + diffuse + specular;
    gl_FragColor = vec4(result, 1.0);
}