uniform vec3 glowColor;
varying float intensity;
varying vec3 vNormal;
varying vec3 vPosition;

void main() {
    float intensity = pow(0.7 - dot(vNormal, vec3(0, 0, 1.0)), 2.0);
    gl_FragColor = vec4(glowColor, 1.0) * intensity;
}