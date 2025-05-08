<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
	id: string;
	value: boolean | number;
	onChange?: (value: boolean, path: string) => void;
}>();

const checked = computed({
	get() {
		return !!props.value;
	},
	set(value) {
		props.onChange?.(!!value, props.id);
	},
});
</script>

<template>
  <input :id="id" v-model="checked" type="checkbox" />
</template>

<style scoped>
</style>
