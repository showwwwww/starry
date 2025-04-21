import EventEmitter from './EventEmitter';

type SizeEvents = 'resize';

type SizeData = {
  width: number;
  height: number;
  viewport: {
    width: number;
    height: number;
  };
};

export default class Sizes extends EventEmitter<SizeEvents, SizeData> {
  width: number = 0;
  height: number = 0;
  readonly viewport: {
    width: number;
    height: number;
  } = {
    width: 0,
    height: 0,
  };
  readonly $viewportEle: HTMLDivElement;
  private static instance: Sizes;
  private constructor() {
    super();
    this.$viewportEle = document.createElement('div');
    this.$viewportEle.style.position = 'absolute';
    this.$viewportEle.style.top = '0';
    this.$viewportEle.style.left = '0';
    this.$viewportEle.style.width = '100vw';
    this.$viewportEle.style.height = '100vh';
    this.$viewportEle.style.pointerEvents = 'none';

    window.addEventListener('resize', this.resize);
    this.resize();
  }

  static getInstance() {
    if (!Sizes.instance) {
      Sizes.instance = new Sizes();
    }
    return Sizes.instance;
  }

  resize = () => {
    document.body.appendChild(this.$viewportEle);
    this.viewport.width = this.$viewportEle.offsetWidth;
    this.viewport.height = this.$viewportEle.offsetHeight;
    document.body.removeChild(this.$viewportEle);
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.emit('resize', {
      eventName: 'resize',
      width: this.width,
      height: this.height,
      viewport: {
        ...this.viewport,
      },
    });
  };
}
