export function remove<T>(array: T[], from: number) {
	return [...array.slice(0, from), ...array.slice(from + 1)];
}
