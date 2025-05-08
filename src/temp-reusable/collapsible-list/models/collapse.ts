/** Convenience function for creating a callback to save a list of expanded paths to localStorage at a given key */
export function saveExpanded(persistKey: string) {
  return (expandedPaths: string[]) => {
    localStorage.setItem(
			persistKey,
			JSON.stringify(expandedPaths),
		);
  }
}

/** Convenienve function for loading a list of expanded paths from localStorage */
export function loadExpanded(persistKey: string): string[] {
  const collapsed = localStorage.getItem(persistKey);
  if (collapsed) {
    return JSON.parse(collapsed);
  }
  return []
}
