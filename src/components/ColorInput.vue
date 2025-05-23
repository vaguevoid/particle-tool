<script setup lang="ts">
import { ref } from 'vue';

// Define the props our component will accept.
const props = withDefaults(defineProps<{
  labelText: string;                   // Customizable label text
  inputId: string;                     // Customizable id attribute
  inputName: string;                   // Customizable name
  onValueChanged: (newValue: any) => void; // Customizable function for the value-changed event
  onClick: () => void;                 // Customizable function for the click event
  containerClass?: string;             // Optional: default classes for the outer div
  labelClass?: string;                 // Optional: default classes for the label
  inputClass?: string;                 // Optional: default classes for the DraggableNumberInput
  color?: string;
}>(), {
  containerClass: 'ParticleInput',
  labelClass: 'w-[75%]',
  inputClass: 'w-[25%] h-5',
});

const colorInputRef = ref<HTMLInputElement | null>(null);
const selectedColor = ref(props.color)
const handleColorChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  props.onValueChanged(input.value);
  selectedColor.value = input.value;
};
</script>

<template>
  <div class="flex items-center justify-between p-2">
    <label :for="inputId" :class="labelClass">
      {{ labelText }}
    </label>
    <div :class="inputClass">
      <input
        ref="colorInputRef"
        type="color"
        :id="inputId"
        :name="inputName"
        :value="selectedColor"
        @input="handleColorChange"
        class="w-0 h-0 absolute"
      />
      <div 
        class="cursor-pointer h-full relative border-[color:var(--pluetral-lm-300,#D2D1DB)] rounded-[1px] border-2 border-solid" 
        :style="{ background: selectedColor }"
        @click="colorInputRef?.click()"
      ></div>
    </div>
  </div>
</template>
