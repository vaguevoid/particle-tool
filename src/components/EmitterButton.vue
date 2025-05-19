<script setup lang="ts">

const props = withDefaults(defineProps<{
    name: string;
    image_path: string;
    active?:boolean
}>(), {
    name: "Emitter 1",
});
</script>

<template>
    <button :class="{'active': props.active}">
        <img :src=image_path alt=""/> 
        <span>{{name}}</span>
    </button>
</template>

<style scoped>
.grid-item img {
    max-width: 100%;
    max-height: 75%;
    object-fit: contain;
    display: block;
}
.active {
    background-color:#E6E5EB;
}
</style>