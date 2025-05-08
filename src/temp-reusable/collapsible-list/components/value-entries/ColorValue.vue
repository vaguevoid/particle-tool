<script setup lang="ts">
import { computed } from "vue";
import type { Color } from "../../models/valueTypes";

const props = defineProps<{
	id: string;
	value: Color;
	onChange?: (value: Color, path: string) => void;
	readonly?: boolean;
}>();

/** Convert a single 0-1 color value to a hex pair */
function convertToHex(normalizedColorValue: number): string {
	return Math.round(normalizedColorValue * 255).toString(16).padStart(2, "0");
}

const alpha = computed({
	get() {
		return props.value[3];
	},
	set(newValue: number) {
		const rgb = props.value.slice(0, 3);
		const rgba: Color = [...rgb, newValue] as Color;
		props.onChange?.(rgba, props.id);
	},
});

const color = computed({
	get() {
		// create hex color from rgb input
		const rgb = props.value.slice(0, -1);
		const hexValues = rgb.map(convertToHex);
		return `#${hexValues.join("")}`;
	},
	set(newValue: string) {
		// parse color out of input
		const r = newValue.slice(1, 3);
		const g = newValue.slice(3, 5);
		const b = newValue.slice(5);
		const colorList = [r, g, b];
		const numberColor = colorList.map((channel) => Number(`0x${channel}`));
		const normalizedColor = numberColor.map((channel) => channel / 255);
		const rgba = [...normalizedColor, alpha.value] as Color;
		props.onChange?.(rgba, props.id);
	},
});
</script>

<template>
  <div class="tooltip">
    i
    <span class="tooltiptext">This does not support alpha yet</span>
  </div>
  <input :id="id" v-model="color" :readonly="readonly" type="color" />
</template>

<style scoped>
 /** https://www.w3schools.com/howto/howto_css_tooltip.asp */
 /* Tooltip container */
 .tooltip {
  position: relative;
  font-style: italic;
  display: inline-block;
  border-bottom: 1px dotted black; /* If you want dots under the hoverable text */
}

/* Tooltip text */
.tooltip .tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: #555;
  color: #fff;
  text-align: center;
  padding: 5px 0;
  border-radius: 6px;

  /* Position the tooltip text */
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  margin-left: -60px;

  /* Fade in tooltip */
  opacity: 0;
  transition: opacity 0.3s;
}

/* Tooltip arrow */
.tooltip .tooltiptext::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #555 transparent transparent transparent;
}

/* Show the tooltip text when you mouse over the tooltip container */
.tooltip:hover .tooltiptext {
  visibility: visible;
  opacity: 1;
}
</style>
