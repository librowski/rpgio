import type { EventEmitter } from "./EventEmitter";

export class EventEmitterGroup<T extends string> {
	elements: EventEmitter<T>[];

	constructor(...elements: EventEmitter<T>[]) {
		this.elements = elements;
	}

	unsubscribe(event: T, handler: () => void) {
		for (const element of this.elements) {
			element.unsubscribe(event, handler);
		}
	}

	subscribe(event: T, handler: () => void) {
		for (const element of this.elements) {
			element.subscribe(event, handler);
		}
	}

	dispose() {
		for (const element of this.elements) {
			element.dispose();
		}
	}
}
