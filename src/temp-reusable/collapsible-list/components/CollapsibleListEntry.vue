<script setup lang="ts">
import { computed } from "vue";
import IconCaretDown from "../../icons/IconCaretDown.vue";
import IconCaretRight from "../../icons/IconCaretRight.vue";
import MatchText from "./MatchText.vue";

import { getPath } from "../models/entry";
import { NumberType } from "../models/valueTypes";
import type { CollapsibleEntry } from "../models/valueTypes";
import BooleanValueEntry from "./value-entries/BooleanValue.vue";
import ColorValueEntry from "./value-entries/ColorValue.vue";
import NumberValueEntry from "./value-entries/NumberValue.vue";
import StringValueEntry from "./value-entries/StringValue.vue";
import VecValueEntry from "./value-entries/VecValue.vue";

const props = defineProps<{
	collapsibleEntry: CollapsibleEntry;
	path: string;
	expandFilter: string[];
	forceVisible?: string[];
	matchString?: string;
}>();

const isExpanded = computed(() => {
	if (props.forceVisible !== undefined) {
		for (const matchedPath of props.forceVisible) {
			if (matchedPath.startsWith(props.path)) {
				return true;
			}
		}
	}
	return props.expandFilter.includes(props.path);
});

const isVisible = computed(() => {
	if (props.forceVisible === undefined) {
		return true;
	}
	// this should be visible if either a parent or a child in the hierarchy matches any of the forceVisible paths
	for (const matchedPath of props.forceVisible) {
		if (
			props.path.startsWith(matchedPath) ||
			matchedPath.startsWith(props.path)
		) {
			return true;
		}
	}
	return false;
});

const indentation = computed(() => {
	return props.path.split(".").length - 1;
});

const emit = defineEmits(["toggleCollapsed"]);

function passToParent(path: string) {
	emit("toggleCollapsed", path);
}

function onClickCallback(path: string, onClick: (path: string) => void) {
	onClick(path);
}
</script>

<template>
  <li :key="path" :class="{
    collapsed: !isVisible,
    leaf: !('list' in collapsibleEntry),
    'level-1': indentation === 0,
    'level-2': indentation === 1,
    'level-n': indentation > 1,
  }">
    <!-- If this is a collapsible list entry, recurse -->
    <div v-if="'list' in collapsibleEntry" class="collapsible-list">
      <button type="button" @click="$emit('toggleCollapsed', path)" :class="{ 'collapse-button': true, collapsed: !isExpanded }">
        <span>
          <span class="caret">
            <IconCaretDown />
            <IconCaretRight />
          </span>
          <MatchText
            v-if="matchString"
            :text="collapsibleEntry.label"
            :query="matchString"
          />
          <span v-else>
            {{ collapsibleEntry.label }}
          </span>
        </span>
      </button>
      <ul :class="{ collapsed: !isExpanded, level: true }">
        <collapsible-list-entry
          v-for="entry in collapsibleEntry.list"
          :collapsible-entry="entry"
          :path="getPath(path, entry.label)"
          :force-visible="forceVisible"
          :match-string="matchString"
          :expand-filter="expandFilter"
          @toggle-collapsed="passToParent"
        />
      </ul>
    </div>

    <!-- If this is a clickable entry, set up a button with a callback -->
    <button v-else-if="'onClick' in collapsibleEntry" type="button" @click="onClickCallback(path, collapsibleEntry.onClick)">{{ collapsibleEntry.label }}</button>

    <!-- If this is a ValueEntry -->
    <div v-else-if="'value' in collapsibleEntry" class="input-row">
      <label :for="path" class="input-label">{{ collapsibleEntry.label }}</label>
      <!-- String -->
      <StringValueEntry v-if="collapsibleEntry.kind === 'string'" :id="path" :value="collapsibleEntry.value" :onChange="collapsibleEntry.onChange" />
      <!-- Number -->
      <NumberValueEntry v-if="NumberType.includes(collapsibleEntry.kind)" :id="path" :value="collapsibleEntry.value" :onChange="collapsibleEntry.onChange" />
      <!-- Vector -->
      <VecValueEntry v-if="collapsibleEntry.kind === 'Vec2'" :id="path" :value="collapsibleEntry.value" :onChange="collapsibleEntry.onChange" />
      <!-- Color -->
      <ColorValueEntry v-if="collapsibleEntry.kind === 'Color'" :id="path" :value="collapsibleEntry.value" :onChange="collapsibleEntry.onChange" />
      <!-- Checkbox -->
      <BooleanValueEntry v-if="collapsibleEntry.kind === 'boolean'" :id="path" :value="collapsibleEntry.value" :onChange="collapsibleEntry.onChange" />
    </div>

    <!-- If this is just text, just a vanilla list element -->
    <span v-else>{{ collapsibleEntry.label }}</span>
  </li>
</template>

<style scoped>
ul {
  list-style-type: none;
  padding: 0px;
}

li {
  padding-bottom: 0.2rem;
}

li.collapsed, ul.collapsed {
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
  text-transform: capitalize;
  flex: 1;
}

</style>
