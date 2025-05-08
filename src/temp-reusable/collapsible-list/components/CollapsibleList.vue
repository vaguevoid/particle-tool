<script setup lang="ts">
import { computed } from "vue";
import type { CollapsibleEntry } from "../models/valueTypes";
import CollapsibleListEntry from "./CollapsibleListEntry.vue";

const props = defineProps<{
	/**
	 * List of elements to render.
	 */
	list: CollapsibleEntry[];

	/** A callback to be triggered when an entry is collapsed/opened. Passes in the list of all expanded paths. */
	onToggleCollapsed?: (expandedPaths: string[]) => void;

	/** List of paths to be open on initial view. Pass in [] to have all be collapsed by default. */
	defaultOpenPaths: string[]

	/**
	 * (Optional) List of paths that should be exclusively visible. Paths are of the form "parent label.child label.nested child label".
	 * In this example, if "parent label.child label" were provided in forceVisible, "parent label" and "child label" elements would be visible and expanded.
	 * The "nested child label" element would be visible, but would be expanded/collapsed according to user input.
	 * All other children of "parent label" would be hidden, as well as siblings of "parent label".
	 * If not provided, all elements will be visible.
	 */
	forceVisible?: string[];

	/**
	 * (Optional) Element labels will be highlighted according to their similarity to the match string.
	 */
	matchString?: string;
}>();

const collapsedData = computed(() => props.defaultOpenPaths);

function toggleCollapsed(path: string) {
	const indexOfPath = collapsedData.value.indexOf(path);
	if (indexOfPath !== -1) {
		collapsedData.value.splice(indexOfPath, 1);
	} else {
		collapsedData.value.push(path);
	}
	if (props.onToggleCollapsed) {
		props.onToggleCollapsed(collapsedData.value);
	}
}
</script>

<template>
  <ul>
    <collapsible-list-entry
      v-for="collapsibleEntry in list"
      :collapsible-entry="collapsibleEntry"
      :path="collapsibleEntry.label"
      :key="collapsibleEntry.label"
      @toggle-collapsed="toggleCollapsed"
      :expand-filter="collapsedData"
      :force-visible="forceVisible"
      :match-string="matchString"
    />
  </ul>
</template>

<style scoped>
ul {
  list-style-type: none;
  padding: 0px;
}

li {
  padding-bottom: 0.2rem;
}

div.collapsed {
  display: none;
}

.caret-down {
  margin-right: 0.2rem;
  display: inline-block;
}
/* right svg is 2px larger than caret-down */
.caret-right {
  margin-right: 0.4rem;
  display: none;
}

.collapsed .caret-down {
  display: none;
}

.collapsed .caret-right {
  display: inline-block;
}

.input-row {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.input-label {
  flex: 1;
}

</style>