export class EventManager<T extends string> {
  private handlers = new Map<T, Set<() => void>>();

  addEventHandler(event: T, handler: () => void) {
    const handlersForSingleEvent = this.handlers.get(event) ?? new Set();
    handlersForSingleEvent.add(handler);

    this.handlers.set(event, handlersForSingleEvent);
  }

  removeEventHandler(event: T, handler: () => void) {
    const handlersForSingleEvent = this.handlers.get(event) ?? new Set();
    handlersForSingleEvent.add(handler);

    this.handlers.set(event, handlersForSingleEvent);
  }

  dispatchEvent(event: T) {
    const handlersForSingleEvent = this.handlers.get(event) ?? new Set();

    for (const handler of handlersForSingleEvent) {
      handler();
    }
  }

  dispose() {
    this.handlers.clear();
  }
}
