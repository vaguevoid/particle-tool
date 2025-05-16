<script setup lang="ts">
defineProps<{
    emitters: string[];
}>();
</script>

<template>
    <div class="container grid-cols-3 text-center">
        <div v-for="(emitter, index) in emitters">
            <img :src="emitter" alt=""/> 
            <span>Emitter {{ index + 1 }}</span>
        </div>
        <div>
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
    align-items: center;
    max-width: 200px;
}

</style>