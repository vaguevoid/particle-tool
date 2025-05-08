<script setup lang="ts">
import { getMatchParts } from "../models/filter";

defineProps<{
	text: string;
	query: string;
}>();
</script>

<template>
<span v-for="part in getMatchParts(query, text)" :class="{isMatch: part.isMatch}">
  {{ part.string }}
</span>
</template>

<style scoped>
.isMatch {
  background-color: var(--grink300);
}
</style>