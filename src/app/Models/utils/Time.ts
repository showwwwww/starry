import EventEmitter from './EventEmitter';

type TimeEvents = 'tick';

type TimeData = {
  STARTED_AT: number;
  elapsed: number;
  delta: number;
};

export default class Time extends EventEmitter<TimeEvents, TimeData> {
  readonly STARTED_AT: number = Date.now();
  readonly MAX_TIME_DELTA: number = 60;
  current = this.STARTED_AT;
  elapsed = 0;
  delta = this.MAX_TIME_DELTA;
  ticker: number | null = null;

  private static instance: Time;
  private constructor() {
    super();
    this.tick();
  }

  static getInstance() {
    if (!Time.instance) {
      Time.instance = new Time();
    }
    return Time.instance;
  }

  tick = () => {
    this.ticker = requestAnimationFrame(this.tick);

    const current = Date.now();

    this.elapsed = current - this.STARTED_AT;
    this.delta = Math.min(current - this.current, this.MAX_TIME_DELTA);
    this.current = current;

    this.emit('tick', {
      eventName: 'tick',
      STARTED_AT: this.STARTED_AT,
      elapsed: this.elapsed,
      delta: this.delta,
    });
  };

  stop = () => {
    if (this.ticker) {
      cancelAnimationFrame(this.ticker);
      this.ticker = null;
    }
  };
}
