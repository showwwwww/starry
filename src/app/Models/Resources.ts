import * as THREE from 'three';

import Loader, { ExtensionToType, ExtractExtension, Resource } from './utils/Loader';
import EventEmitter from './utils/EventEmitter';

type ResourcesEvents = 'ready' | 'loading';

const resources = [
  { name: 'test', path: './models/matcaps/beige.png', type: 'texture' },
] as const satisfies readonly Resource[];

type ResourceItems = {
  [K in (typeof resources)[number]['name']]:
    | ExtensionToType<ExtractExtension<Extract<(typeof resources)[number], { name: K }>['path']>>
    | undefined;
};

type ResourcesData = {
  progress: number;
};

export default class Resources extends EventEmitter<ResourcesEvents, ResourcesData> {
  readonly loader: Loader = Loader.getInstance();
  private static instance: Resources;
  items: ResourceItems = {
    test: undefined,
  };

  private constructor() {
    super();
    this.loader.load(resources);

    this.loader.on('load', ({ resource, data }) => {
      if (resource.type === 'texture') {
        const texture = new THREE.Texture(data as HTMLImageElement);
        texture.needsUpdate = true;
        this.items[resource.name as (typeof resources)[number]['name']] = texture;
      } else {
        this.items[resource.name as (typeof resources)[number]['name']] =
          data as unknown as ResourceItems[(typeof resources)[number]['name']];
      }
      this.trigger('loading', {
        eventName: 'loading',
        progress: this.loader.loaded / this.loader.toLoad,
      });
    });

    this.loader.on('complete', () => {
      this.trigger('ready', { eventName: 'ready', progress: 1 });
    });
  }

  static getInstance() {
    if (!Resources.instance) {
      Resources.instance = new Resources();
    }
    return Resources.instance;
  }
}
