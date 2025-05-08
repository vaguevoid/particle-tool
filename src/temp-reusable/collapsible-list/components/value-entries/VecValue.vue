<script setup lang="ts">
import { computed } from "vue";
import type { Vec2 } from "../../models/valueTypes";

const props = defineProps<{
	id: string;
	value: Vec2;
	onChange?: (value: Vec2, path: string) => void;
}>();

const x = computed({
	get() {
		return props.value.x;
	},
	set(value) {
		props.onChange?.(
			{ x: Number.parseFloat(value), y: Number.parseFloat(y.value) },
			props.id,
		);
	},
});

const y = computed({
	get() {
		return props.value.y;
	},
	set(value) {
		props.onChange?.(
			{ x: Number.parseFloat(x.value), y: Number.parseFloat(value) },
			props.id,
		);
	},
});
</script>

<template>
  <div class="vector-input">
    <div class="input-cnr number-input">
      <!-- TODO: add visually hidden vector name before X and Y-->
      <label :for="`${id}.x`">X</label>
      <input :id="`${id}.x`" v-model="x" type="number" />
    </div>
    <div class="input-cnr number-input">
      <label :for="`${id}.y`">Y</label>
      <input :id="`${id}.y`" v-model="y" type="number" />
    </div>
  </div>
</template>

<style scoped>
  .vector-input {
    display: flex;
    gap: 0.4rem;
  }

  .number-input {
    position: relative;
  }

  .vector-input label {
    position: absolute;
    left: .4rem;
    top: .5rem;
  }

  .vector-input input {
    width: 100%;
    text-align: left;
  }
</style>
