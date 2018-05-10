precision highp float;
uniform float time;
uniform float alpha;
uniform vec2 resolution;
varying vec2 vUv;
void main(void)
{
    float d = distance(gl_PointCoord, vec2(0.5,0.5));
    if(d < 0.5){ //判断距离，如果小于0.5就绘制
    }

    // y = 1/x 
    if ( (1.0 / (5.0* ((abs(gl_PointCoord.x - 0.5) + 0.25)))) - 0.25  > abs(gl_PointCoord.y - 0.5)){
        gl_FragColor = vec4(
        1,
        0.0 ,
        0.0 , 1.0);
    }
    else{ discard; }
}
