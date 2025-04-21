import * as THREE from 'three';

export default class Camera {
  readonly instance: THREE.Camera;
  constructor() {
    this.instance = new THREE.PerspectiveCamera(35, 1, 0.1, 1000);
  }
}
