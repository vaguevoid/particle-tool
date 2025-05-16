<script setup lang="ts">

const emit = defineEmits(['valueChanged'])

function adjustValue(event: Event): void {
  const target = event.target as HTMLInputElement;
  emit('valueChanged', target.checked)
}
</script>

<template>
    <label class="container">
        <input type="checkbox" @input="adjustValue">
        <span class="checkmark"></span>
    </label>
</template>

<style scoped>
/* Customize the label (the container) */
.container {
  display: block;
  position: relative;
  cursor: pointer;
  font-size: 14px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Hide the browser's default checkbox */
.container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* Create a custom checkbox */
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 16px;
  width: 16px;
  border-radius: 2px;
  background: var(--pluetral-lm-100, #F3F3F6);
}

/* On mouse-over, add a grey background color */
.container:hover input ~ .checkmark {
  border-radius: 2px;
  border: 1px solid var(--pluetral-lm-400, #9E9CAF);
}

/* When the checkbox is checked, add a blue background */
.container input:checked ~ .checkmark {
  border-radius: 2px;
  border: 1px solid var(--plue-lm-500, #6659FF);
  background: var(--pluetral-lm-white, #FFF);
  box-shadow: 1px 1px 0px 0px #131127;
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the checkmark when checked */
.container input:checked ~ .checkmark:after {
  display: block;
}

/* Style the checkmark/indicator */
.container .checkmark:after {
  left: 5px;
  top: 2px;
  width: 5px;
  height: 10px;
  border: solid rgb(0, 0, 0);
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}

</style>