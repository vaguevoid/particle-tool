<script setup lang="ts">
import { ref } from 'vue';

defineProps<{
  name: string;
}>();

const arrow = ref("▼")
const isExpanded = ref(true)

function onClick() {
  isExpanded.value = !isExpanded.value
  arrow.value = isExpanded.value ? "▼" : "▲"
}
</script>

<template>
  <div>
    <div class="header p-2 select-none" @click="onClick">
      <span class="flex items-center">
        <b> {{ name }} </b>
        <img 
          src="/images/caret.png"
          class="w-4 h-4 ml-2 transition-transform"
          :class="{ 'rotate-180': !isExpanded }"
        >
      </span>
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