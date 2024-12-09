uniform vec3 color;
uniform float ambientIntensity;
uniform vec3 lightPosition;

varying vec3 vNormal;
varying vec3 vPosition;

void main() {
  // Ambient component
  vec3 ambient = color * ambientIntensity;

  // Diffuse component
  vec3 lightDir = normalize(lightPosition - vPosition);
  float diff = max(dot(vNormal, lightDir), 0.0);
  vec3 diffuse = diff * color;

  // Specular component (metal-like)
  vec3 viewDir = normalize(-vPosition);
  vec3 reflectDir = reflect(-lightDir, vNormal);
  float spec = pow(max(dot(viewDir, reflectDir), 0.0), 64.0);
  vec3 specular = color * spec;

  // Final color
  vec3 result = ambient + diffuse + specular;
  gl_FragColor = vec4(result, 1.0);
}