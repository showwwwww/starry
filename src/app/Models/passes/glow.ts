import shaderFragment from '@app/shaders/glow/fragment.glsl';
import shaderVertex from '@app/shaders/glow/vertex.glsl';

const glow = {
  uniforms: {
    tDiffuse: { type: 't', value: null },
    uPosition: { type: 'v2', value: null },
    uRadius: { type: 'f', value: null },
    uColor: { type: 'v3', value: null },
    uAlpha: { type: 'f', value: null },
  },
  vertexShader: shaderVertex,
  fragmentShader: shaderFragment,
};

export default glow;
