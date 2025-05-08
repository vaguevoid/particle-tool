import { getPath } from "./entry";
import type { CollapsibleEntry } from "./valueTypes";

export function queryRegexp(query: string) {
	return new RegExp(query.split("").join(".*"), "i");
}

export function getMatchingPaths(
	query: string,
	list: CollapsibleEntry[],
): string[] {
	const regex = queryRegexp(query);

	const results: string[] = [];

	recurseQuery(list, regex, results, "");

	return results;
}

function recurseQuery(
	list: CollapsibleEntry[],
	regex: RegExp,
	matchPaths: string[],
	path: string,
) {
	list.forEach((entry) => {
		const entryPath = getPath(path, entry.label);
		if (entry.label.match(regex)) {
			matchPaths.push(entryPath);
		}
		if ("list" in entry) {
			recurseQuery(entry.list, regex, matchPaths, entryPath);
		}
	});
}
