'use client';
import * as THREE from 'three';

import loader, { ExtensionToType, ExtractExtension, Resource } from './Loader';
import EventEmitter from './EventEmitter';

type ResourcesEvents = 'ready' | 'loading';

const resourcesPath = [
  { name: 'test', path: '/test.glb', type: undefined },
] as const satisfies readonly Resource[];

type ResourceItems = {
  [K in (typeof resourcesPath)[number]['name']]: Extract<
    (typeof resourcesPath)[number],
    { name: K }
  >['type'] extends 'texture'
    ? THREE.Texture
    :
        | ExtensionToType<
            ExtractExtension<Extract<(typeof resourcesPath)[number], { name: K }>['path']>
          >
        | undefined;
};

type ResourcesData = {
  progress: number;
};

class Resources extends EventEmitter<ResourcesEvents, ResourcesData> {
  readonly loader = loader;
  items: ResourceItems = {
    test: undefined,
  };

  constructor(_resources: typeof resourcesPath) {
    super();
    this.loader.load(_resources);

    this.loader.on('load', ({ resource, data }) => {
      if (resource.type === 'texture') {
        const texture = new THREE.Texture(data as HTMLImageElement);
        texture.needsUpdate = true;
        this.items[resource.name as (typeof resourcesPath)[number]['name']] = texture;
      } else {
        this.items[resource.name as (typeof resourcesPath)[number]['name']] =
          data as unknown as ResourceItems[(typeof resourcesPath)[number]['name']];
      }
      this.emit('loading', {
        eventName: 'loading',
        progress: this.loader.loaded / this.loader.toLoad,
      });
    });

    this.loader.on('complete', () => {
      this.emit('ready', { eventName: 'ready', progress: 1 });
    });
  }
}

const resources = new Resources(resourcesPath);
export default resources;
