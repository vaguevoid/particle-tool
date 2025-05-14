<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  name: string;
}>();

const arrow = ref("▼")
const isExpanded = ref(true)

const emit = defineEmits<{
  (e: 'toggle'): void
}>();

function onClick() {
  isExpanded.value = !isExpanded.value
  arrow.value = isExpanded.value ? "▼" : "▲"
  emit('toggle')
}
</script>

<template>
  <div>
    <div class="header p-2 select-none">
      <b @click="onClick">{{ name }} {{ arrow }} </b>
    </div>
    <div v-show="isExpanded">
        <slot></slot>
      </div>
  </div>
</template>

<style scoped>
.header {
  cursor: pointer;
}
</style>