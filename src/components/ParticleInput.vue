<script setup lang="ts">
import DraggableNumberInput from './DraggableNumberInput.vue';

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
    <DraggableNumberInput
      :id="inputId"
      :name="inputName"
      :class="inputClass"
      @valueChanged="onValueChanged"
      @click="onClick"
    />
</div>
</template>
