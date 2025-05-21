<script setup lang="ts">
// This is adapted from code from Sunyatasattva:
// https://github.com/sunyatasattva/vue-draggable-number/blob/master/src/components/DraggableNumberInput.vue

import { ref } from 'vue'

const emit = defineEmits(['valueChanged'])

const props = withDefaults(
  defineProps<{
    dragDirection?: string
    max?: number
    min?: number
    step?: number
    value?: number
  }>(),
  { dragDirection: 'X', step: 1, min: -Infinity, max: Infinity, value: 0},
)

const isDragging = ref(false)
const ultraFineThreshold = 1
const fineThreshold = 10

function cursorDirection(): 'ns-resize' | 'ew-resize' {
  return props.dragDirection === 'Y' ? 'ns-resize' : 'ew-resize'
}

function adjustValue(val: number | string | MouseEvent): number {
  let newVal

  if (val instanceof MouseEvent) {
    const modifier = Math.abs(props.value) < ultraFineThreshold ? 0.01 : Math.abs(props.value) < fineThreshold ? 0.1 : 1
    newVal = props.dragDirection === 'Y' ? -val.movementY * modifier : val.movementX * modifier
    newVal = Number(props.value + newVal)
    if (newVal > fineThreshold) {
      newVal = Math.round(newVal)
    }
  } else newVal = Number(val)

  if (!isNaN(props.min) && newVal < props.min) newVal = Math.max(newVal, props.min)
  if (!isNaN(props.max) && newVal > props.max) newVal = Math.min(newVal, props.max)

  // Should maybe only do this on drag end? Otherwise saving happens constantly!!
  emit('valueChanged', newVal)
  return newVal
}

function dragStart(): void {
  isDragging.value = true

  document.body.style.cursor = cursorDirection()
  document.body.style.userSelect = 'none'

  document.addEventListener('mousemove', adjustValue)
  document.addEventListener('mouseup', dragEnd)
}

function dragEnd(): void {
  isDragging.value = false

  document.body.style.cursor = ''
  document.body.style.userSelect = ''

  document.removeEventListener('mousemove', adjustValue)
  document.removeEventListener('mouseup', dragEnd)
}
</script>

<template>
  <div>
    <field-input style="flex: none; width: 100%;" class="w-full relative">
      <input
        type="number"
        :max="props.max"
        :min="props.min"
        :step="props.step"
        :value="props.value"
        @input="adjustValue(($event.target as HTMLInputElement).value)"
      >
      <i
        class="iconoir-settings p-1 text-pluetral-400"
        :style="{ cursor: cursorDirection() }"
        @mousedown="dragStart"
      ></i>
    </field-input>
  </div>
</template>

<style scoped></style>
