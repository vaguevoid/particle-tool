<script setup lang="ts">
import {ref} from 'vue';
import EmitterButton from './EmitterButton.vue';
defineProps<{
    emitters: string[];
}>();
const activeIndex = ref(-1);
</script>

<template>
    <div class="container">
        <div v-for="(emitter, index) in emitters" class="grid-item">
            <EmitterButton :name="`Emitter ${index + 1}`" :image_path="emitter" :active="activeIndex === index" @click="activeIndex = index"/>
            <!-- <img :src="emitter" alt=""/> 
            <span>Emitter {{ index + 1 }}</span> -->
        </div>
        <div class="grid-item">
            <button class = "button"> + </button>
        </div>
    </div>
</template>

<style scoped>
.button {
    display: inline-flex;
    height: 32px;
    width: 32px;
    padding: 5px;
    top: -16px;
    justify-content: center;
    gap: 8px;
    flex-shrink: 0;
    border-radius: 32px;
    border: 1px solid var(--pluetral-lm-900, #131127);
    background: var(--plue-lm-500, #6659FF);
}
.container {
    display: grid;
    grid-template-columns: repeat(auto-fit, 80px);
    justify-content: start;
    padding-bottom: 16px;
}
.grid-item {
    width: 64px;
    height: 64px;
    display: flex;                /* Enable flexbox */
    flex-direction: column;       /* Stack children vertically */
    align-items: center;          /* Center horizontally */
    justify-content: center;      /* Center vertically */
}
</style>