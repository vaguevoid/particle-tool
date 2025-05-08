<script>
import { defineComponent } from 'vue';
import DraggableNumberInput from './DraggableNumberInput.vue'

export default defineComponent({
    name: "ParticleInput",
    props: {
        label: { type: String, default: 'Adjustable-Name' },
        inputId: { type: String, default: 'rate' },
        inputName: { type: String, default: 'Rate' },
        containerClass: { type: String, default: 'BBBBBBBBB' },
        labelClass: { type: String, default: 'w-[75%]' },
        inputClass: { type: String, default: 'w-20 h-5' },
        valueChanged: { type: Function, default: () => { } },
        onClick: { type: Function, default: () => { } }
    }
});
</script>

<template>
    <div :class="containerClass">
        <label :for="inputId" :class="labelClass">{{ label }}</label>
        <DraggableNumberInput @value-changed="(newValue) => valueChanged(newValue)" @click="onClick" :id="inputId"
            :name="inputName" :class="inputClass" />
    </div>
</template>
