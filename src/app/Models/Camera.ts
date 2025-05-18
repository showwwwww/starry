'use client';
import * as THREE from 'three';

class Camera {
  readonly instance: THREE.Camera;
  constructor() {
    this.instance = new THREE.PerspectiveCamera(35, 1, 0.1, 1000);
  }
}

const camera = new Camera();
export default camera;
