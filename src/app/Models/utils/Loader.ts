import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { BufferGeometry, Group, Texture } from 'three';

import EventEmitter from './EventEmitter';

type LoaderEvents = 'load' | 'complete';

type ImageExtension = 'jpg' | 'jpeg' | 'png' | 'webp';

type DERACOExtension = 'drc';

type GLTFExtension = 'gltf' | 'glb';

type FBXExtension = 'fbx';

type ResourceType = HTMLImageElement | BufferGeometry | GLTF | Group;

type LoaderData = { resource: Resource; data: ResourceType };

export type ExtensionToType<K> = K extends ImageExtension
  ? Texture
  : K extends DERACOExtension
    ? BufferGeometry
    : K extends GLTFExtension
      ? GLTF
      : K extends FBXExtension
        ? Group
        : never;

export type ExtractExtension<T extends string> = T extends `${string}.${infer Ext}`
  ? Ext extends `${string}.${string}`
    ? ExtractExtension<Ext>
    : Lowercase<Ext>
  : never;

type Extension = ImageExtension | DERACOExtension | GLTFExtension | FBXExtension;

type Type = 'texture' | undefined;

export type Resource = {
  name: string;
  path: string;
  type: Type;
};

type LoaderWedget = {
  extensions: Extension[];
  action: (resource: Resource) => void;
};

export default class Loader extends EventEmitter<LoaderEvents, LoaderData> {
  readonly loaders: LoaderWedget[] = [];
  toLoad: number = 0;
  loaded: number = 0;

  private static instance: Loader;

  private constructor() {
    super();
    this.initLoaders();
  }

  static getInstance() {
    if (!Loader.instance) {
      Loader.instance = new Loader();
    }
    return Loader.instance;
  }

  initLoaders = () => {
    // Images
    this.loaders.push({
      extensions: ['jpg', 'jpeg', 'png', 'webp'],
      action: (resource) => {
        const image = new Image();
        image.src = resource.path;
        image.addEventListener('load', () => {
          this.fileLoaded({ resource, data: image });
        });

        image.addEventListener('error', () => {
          this.fileLoaded({ resource, data: image });
        });

        image.src = resource.path;
      },
    });

    // DRACO
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('draco/');
    dracoLoader.setDecoderConfig({ type: 'js' });

    this.loaders.push({
      extensions: ['drc'],
      action: (resource) => {
        dracoLoader.load(resource.path, (data) => {
          this.fileLoaded({ resource, data });
        });
      },
    });

    // GLTF
    const gltfLoader = new GLTFLoader();
    gltfLoader.setDRACOLoader(dracoLoader);

    this.loaders.push({
      extensions: ['glb', 'gltf'],
      action: (resource) => {
        gltfLoader.load(resource.path, (data) => {
          this.fileLoaded({ resource, data });
        });
      },
    });

    // FBX
    const fbxLoader = new FBXLoader();

    this.loaders.push({
      extensions: ['fbx'],
      action: (resource) => {
        fbxLoader.load(resource.path, (data) => {
          this.fileLoaded({ resource, data });
        });
      },
    });
  };

  load = (resources: readonly Resource[]) => {
    this.toLoad = resources.length;
    for (const resource of resources) {
      const extension = resource.path.match(/\.([a-z]+)$/)?.[1];
      if (typeof extension === 'string') {
        const loader = this.loaders.find((loader) =>
          loader.extensions.includes(extension as Extension)
        );
        if (loader) {
          loader.action(resource);
        } else {
          console.warn(`No loader found for ${extension} files`);
        }
      } else {
        console.warn(`No extension found for ${resource.path}`);
      }
    }
  };

  fileLoaded = (eventer: LoaderData) => {
    this.loaded++;
    this.emit('load', { eventName: 'load', ...eventer });
    if (this.loaded === this.toLoad) {
      this.emit('complete', { eventName: 'complete', ...eventer });
    }
  };
}
