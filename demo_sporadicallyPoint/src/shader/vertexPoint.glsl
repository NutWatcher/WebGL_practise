uniform float time;
varying vec2 vUv;


void main()
{
    gl_PointSize = 50.;
    vec3 posChanged = position;
//posChanged.x = posChanged.x*(abs(sin(time*0.10)));
    posChanged.y = posChanged.y*(abs(cos(time*0.10)));
    posChanged.z = posChanged.z*(abs(cos(time*0.10*2.0)));
    //posChanged.z = - 15.0;
    
    gl_PointSize = gl_PointSize + 3. * posChanged.z;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(posChanged,1.0);
}
