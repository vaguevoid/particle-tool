<script setup lang="ts">
import {ref} from 'vue';
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
  texture?: string;
}>(), {
  containerClass: 'ParticleInput',
  labelClass: 'w-[75%]',
  inputClass: 'w-[25%] h-5',
});
const texturePath = ref(props.texture);
const fileInput = ref<HTMLInputElement | null>(null)
const handleImageClick=() => {
  fileInput.value?.click();
}
const handlefileChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result;
      if (result && typeof result == 'string') {
        props.onValueChanged(result);
        texturePath.value = result;
      }
    };
    reader.readAsDataURL(file);
  }
}
</script>

<template>
  <div class="flex items-center justify-between p-2">
    <label :for="inputId" :class="labelClass">
      {{ labelText }}
    </label>
    <span class="flex-grow cursor-pointer items-center h-18 w-16 border-[color:var(--pluetral-lm-300,#D2D1DB)] rounded-[1px] border-2 border-solid">
      <img v-if="texture != ''" :src="texturePath" alt="" @click="handleImageClick" class="w-full h-full object-fill">
      <input ref="fileInput" type="file" accept="image/*" class="hidden" @change="handlefileChange">
    </span>
  </div>
</template>
