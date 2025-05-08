<script setup lang="ts">
const props = defineProps<{
	id: string;
	value: string;
	readonly?: boolean;
	onChange?: (value: string, path: string) => void;
}>();

function onChangeString(event: Event) {
	const value = (event.target as HTMLInputElement).value;
	props.onChange?.(value, props.id);
}
</script>

<template>
  <input :id="id" :value="value" :readonly="readonly" @input="onChangeString" class="input-cnr" />
</template>

<style scoped>
  input {
    width: 11.2rem;
  }
</style>
