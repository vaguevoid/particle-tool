export function getPath(path: string, addId: string): string {
	if (path !== "") {
		return `${path}.${addId}`;
	}
	return `${addId}`;
}
