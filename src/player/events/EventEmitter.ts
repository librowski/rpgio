export class EventEmitter<T extends string> {
	private handlers = new Map<T, Set<() => void>>();

	subscribe(event: T, handler: () => void) {
		const handlersForSingleEvent = this.getOrCreateHandlersForEvent(event);
		handlersForSingleEvent.add(handler);

		this.handlers.set(event, handlersForSingleEvent);
	}

	unsubscribe(event: T, handler: () => void) {
		const handlersForSingleEvent = this.getOrCreateHandlersForEvent(event);
		handlersForSingleEvent.add(handler);

		this.handlers.set(event, handlersForSingleEvent);
	}

	emit(event: T) {
		const handlersForSingleEvent = this.getOrCreateHandlersForEvent(event);

		for (const handler of handlersForSingleEvent) {
			handler();
		}
	}

	dispose() {
		this.handlers.clear();
	}

	private getOrCreateHandlersForEvent(event: T) {
		return this.handlers.get(event) ?? new Set<() => void>();
	}
}
