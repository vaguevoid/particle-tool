<script setup lang="ts">
const props = defineProps<{
	id: string;
	value: number;
	onChange?: (value: number, path: string) => void;
}>();

function onChangeNumber(event: Event) {
	const value = (event.target as HTMLInputElement).value;
	const numValue = Number.parseFloat(value);
	props.onChange?.(numValue, props.id);
}
</script>

<template>
  <input :id="id" :value="value" @input="onChangeNumber" type="number" class="input-cnr" />
</template>

<style scoped>
  input {
    width: 11.2rem;
  }
</style>
