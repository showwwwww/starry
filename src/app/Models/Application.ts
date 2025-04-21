import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';

import Sizes from './utils/Sizes';
import Time from './utils/Time';
import Resources from './Resources';
import Camera from './Camera';

import blur from './passes/blur';
import glow from './passes/glow';

type Passes = {
  composer: EffectComposer;
  renderPass: RenderPass;
  horizontalBlurPass: ShaderPass;
  verticalBlurPass: ShaderPass;
  glowPass: ShaderPass;
};

export default class Application {
  readonly $viewportEle: HTMLCanvasElement;
  readonly sizes: Sizes = Sizes.getInstance();
  readonly time: Time = Time.getInstance();
  readonly resources: Resources = Resources.getInstance();
  readonly scene: THREE.Scene = new THREE.Scene();
  readonly renderer: THREE.WebGLRenderer;
  readonly passes: Passes;
  readonly camera: Camera;

  constructor({ canvas }: { canvas: HTMLCanvasElement }) {
    this.$viewportEle = canvas;
    this.renderer = this.createRenderer();
    this.camera = this.createCamera();
    this.passes = this.createPasses();
  }

  createRenderer = (): THREE.WebGLRenderer => {
    const renderer = new THREE.WebGLRenderer({
      canvas: this.$viewportEle,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setClearColor(0x000000, 1);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(this.sizes.viewport.width, this.sizes.viewport.height);
    renderer.autoClear = false;

    this.sizes.on('resize', () => {
      renderer.setSize(this.sizes.viewport.width, this.sizes.viewport.height);
    });

    return renderer;
  };

  createCamera = (): Camera => {
    return new Camera();
  };

  createPasses = (): Passes => {
    const composer = new EffectComposer(this.renderer);
    const renderPass = new RenderPass(this.scene, this.camera.instance);
    const horizontalBlurPass = new ShaderPass(blur);
    const verticalBlurPass = new ShaderPass(blur);
    const glowPass = new ShaderPass(glow);

    composer.addPass(renderPass);
    composer.addPass(horizontalBlurPass);
    composer.addPass(verticalBlurPass);
    composer.addPass(glowPass);

    return {
      composer,
      renderPass,
      horizontalBlurPass,
      verticalBlurPass,
      glowPass,
    };
  };
}
