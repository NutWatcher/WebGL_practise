uniform float time;
varying vec2 vUv;


void main()
{
    vec3 posChanged = position;
    posChanged.x = posChanged.x*(abs(sin(time*0.10)));
    posChanged.y = posChanged.y*(abs(cos(time*0.10)));
    posChanged.z = posChanged.z*(abs(sin(time*0.10)));
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position*(abs(sin(time)/2.0)+0.5),1.0);
    //gl_Position = projectionMatrix * modelViewMatrix * vec4(posChanged,  1.0);
}
