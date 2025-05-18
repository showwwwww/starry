'use client';
import EventEmitter from './utils/EventEmitter';

type Commands =
  | 'touchstart'
  | 'touchmove'
  | 'touchend'
  | 'click'
  | 'mousemove'
  | 'mousedown'
  | 'mouseup'
  | 'keydown'
  | 'keyup';

type CommandToEvent = {
  touchstart: TouchEvent;
  touchmove: TouchEvent;
  touchend: TouchEvent;
  click: MouseEvent;
  mousemove: MouseEvent;
  mousedown: MouseEvent;
  mouseup: MouseEvent;
  keydown: KeyboardEvent;
  keyup: KeyboardEvent;
};

class Commander extends EventEmitter<Commands, CommandToEvent[Commands]> {
  constructor() {
    super();
    window.addEventListener('touchstart', (event) =>
      this.emit('touchstart', { eventName: 'touchstart', ...event })
    );
    window.addEventListener('touchmove', (event) =>
      this.emit('touchmove', { eventName: 'touchmove', ...event })
    );
    window.addEventListener('touchend', (event) =>
      this.emit('touchend', { eventName: 'touchend', ...event })
    );
    window.addEventListener('click', (event) =>
      this.emit('click', { eventName: 'click', ...event })
    );
    window.addEventListener('mousemove', (event) =>
      this.emit('mousemove', { eventName: 'mousemove', ...event })
    );
    window.addEventListener('mousedown', (event) =>
      this.emit('mousedown', { eventName: 'mousedown', ...event })
    );
    window.addEventListener('mouseup', (event) =>
      this.emit('mouseup', { eventName: 'mouseup', ...event })
    );
    window.addEventListener('keydown', (event) =>
      this.emit('keydown', { eventName: 'keydown', ...event })
    );
  }
}

const commander = new Commander();
export default commander;
