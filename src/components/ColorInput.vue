<script setup lang="ts">

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
</script>

<template>
  <div class="flex items-center justify-between p-2">
    <label :for="inputId" :class="labelClass">
      {{ labelText }}
    </label>
    <div class="color cursor-pointer" :style="{ background: color }"></div>
  </div>
</template>

<style scoped>
.color{
  width: 28px;
  height: 28px;
  border-radius: 1px;
  border: 2px solid var(--pluetral-lm-300, #D2D1DB);
}
</style>