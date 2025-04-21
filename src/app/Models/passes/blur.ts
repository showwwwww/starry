import fragmentShader from '@app/shaders/blur/fragment.glsl';
import vertexShader from '@app/shaders/blur/vertex.glsl';

const blur = {
  uniforms: {
    tDiffuse: { type: 't', value: null },
    uResolution: { type: 'v2', value: null },
    uStrength: { type: 'v2', value: null },
  },
  vertexShader,
  fragmentShader,
};

export default blur;
