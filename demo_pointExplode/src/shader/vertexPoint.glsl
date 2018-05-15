uniform float time;
uniform float start;
varying vec2 vUv;

float random(float x , float y){
    return fract(cos(x * (12.9898) + y * (4.1414)) * 43758.5453);
}
void main()
{
    gl_PointSize = 10.;
    // float key = cos(time + random(time,position.z)/5.0 + random(position.y, position.z)*10.0);
    gl_PointSize = gl_PointSize + 5. * (time - start);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
}
