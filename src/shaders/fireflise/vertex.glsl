uniform float uPixelRatio;
uniform float uSize;
uniform float uTime;

attribute float aScale;

void main()
{
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;

    gl_Position = projectionPosition;
    gl_Position.y += sin(uTime + modelPosition.x * 100.0) * aScale * 0.3;
    gl_PointSize = uSize * uPixelRatio * aScale;
    gl_PointSize *= (1.0 / - viewPosition.z);
}

