'use client';
declare type Eventer<EventName, EventData> = {
  eventName: EventName;
} & EventData;

export default class EventEmitter<EventsName extends string, EventData = unknown> {
  readonly callbacks: Map<EventsName, Array<(eventer: Eventer<EventsName, EventData>) => void>> =
    new Map();
  constructor() {}

  on(eventName: EventsName, callback: (eventer: Eventer<EventsName, EventData>) => void): void {
    if (!this.callbacks.has(eventName)) {
      this.callbacks.set(eventName, []);
    }
    this.callbacks.get(eventName)?.push(callback);
  }

  off(eventName: EventsName, callback: (eventer: Eventer<EventsName, EventData>) => void): void {
    if (!this.callbacks.has(eventName)) return;
    this.callbacks.set(
      eventName,
      this.callbacks.get(eventName)?.filter((cb) => cb !== callback) ?? []
    );
  }

  emit(eventName: EventsName, eventer: Eventer<EventsName, EventData>): void {
    if (!this.callbacks.has(eventName)) return;
    this.callbacks.get(eventName)?.forEach((callback) => callback?.(eventer));
  }
}
