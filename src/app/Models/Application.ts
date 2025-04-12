import * as THREE from 'three';

import Sizes from './utils/Sizes';
import Time from './utils/Time';

export default class Application {
  readonly $viewportEle: HTMLCanvasElement;
  readonly sizes: Sizes = new Sizes();
  readonly time: Time = new Time();
  readonly scene: THREE.Scene = new THREE.Scene();
  readonly renderer: THREE.WebGLRenderer;

  constructor({ canvas }: { canvas: HTMLCanvasElement }) {
    this.$viewportEle = canvas;
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.$viewportEle,
      alpha: true,
      powerPreference: 'high-performance',
    });
    this.init();
  }

  init = () => {
    this.initRenderer();
  };

  initRenderer = () => {
    this.renderer.setClearColor(0x000000, 1);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(this.sizes.viewport.width, this.sizes.viewport.height);
    this.renderer.autoClear = false;

    this.sizes.addEventListener('resize', () => {
      this.renderer.setSize(this.sizes.viewport.width, this.sizes.viewport.height);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });
  };
}
