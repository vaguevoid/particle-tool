<script setup lang="ts">
import { type Ref, computed, ref } from "vue";
import type { CollapsibleEntry } from "../models/entry";
import { getMatchingPaths } from "../models/search";
import CollapsibleList from "./CollapsibleList.vue";

const props = defineProps<{
	/**
	 * List of elements to render.
	 */
	list: CollapsibleEntry[];

	/** A callback to be triggered when an entry is collapsed/opened. Passes in the list of all expanded paths. */
	onToggleCollapsed?: (expandedPaths: string[]) => void;

	/** List of paths to be open on initial view. Pass in [] to have all be collapsed by default. */
	defaultOpenPaths: string[]
}>();

const filterString: Ref<string> = ref("");

const forceVisible = computed(() => {
	if (filterString.value === "") {
		return undefined;
	}
	const visiblePaths = getMatchingPaths(filterString.value, props.list);
	return visiblePaths;
});
</script>

<template>
  <field-input class="mb-3 mt-3">
    <input
      type="text"
      v-model="filterString"
      placeholder="Filter"
    />
    <field-icon-left class="iconoir-search"></field-icon-left>
  </field-input>
  <CollapsibleList :list="list" :forceVisible="forceVisible" :matchString="filterString" :onToggleCollapsed="onToggleCollapsed" :defaultOpenPaths="defaultOpenPaths" />
</template>

<style scoped>


</style>
