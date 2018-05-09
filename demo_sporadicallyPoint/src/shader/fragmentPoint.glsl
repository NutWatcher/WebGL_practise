precision highp float;
uniform float time;
uniform float alpha;
uniform vec2 resolution;
varying vec2 vUv;

void main2(void)
{
    vec2 position = vUv;
    float red = 1.0;
    float green = 0.25 + sin(time) * 0.25;
    float blue = 0.0;
    vec3 rgb = vec3(red, green, blue);
    vec4 color = vec4(rgb, alpha);
    gl_FragColor = color;
}

float ff(float x , float y){
    return fract(cos(x * (12.9898) + y * (4.1414)) * 43758.5453);
}
#define PI 3.14159
#define TWO_PI (PI*2.0)
#define N 68.5
void main(void)
{
    float d = distance(gl_PointCoord, vec2(0.5,0.5));
    if(d < 0.5){ //判断距离，如果小于0.5就绘制
        gl_FragColor = vec4(abs(sin(time*0.10)),0.0 + ff(gl_FragCoord.x, gl_FragCoord.y),0.0 + ff(gl_FragCoord.y, gl_FragCoord.x), d);
    }
    else{ discard; }
}
