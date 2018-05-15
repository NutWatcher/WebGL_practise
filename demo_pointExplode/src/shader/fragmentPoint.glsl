precision highp float;
uniform float time;
uniform float start;
uniform float alpha;
uniform vec2 resolution;
varying vec2 vUv;
void main(void)
{
    float d = distance(gl_PointCoord, vec2(0.5,0.5));
    if(d < 0.5){ //判断距离，如果小于0.5就绘制
        gl_FragColor = vec4(
        1,
        0.0 ,
        0.0 , 1.0 - 1.0 * (time - start) / 5.0);
    }
    else{ discard; }
}
