<script setup lang="ts">
import { ref, onMounted, computed, onUnmounted } from "vue";
import { aspectRatio } from "./services/websocket";
import DraggableNumberInput from './components/DraggableNumberInput.vue'
import SectionPill from "./components/SectionPill.vue";
import ParticleInput from "./components/ParticleInput.vue";

const gameScreenRef = ref<HTMLDivElement | null>(null);

const gameScreenStyle = computed(() => {
  if (!aspectRatio.value) {
    return {
      width: "100%",
      maxWidth: "800px",
    };
  }

  const { width, height } = aspectRatio.value;
  return {
    aspectRatio: `${width}/${height}`,
    width: "100%",
    maxWidth: "800px",
  };
});

onMounted(() => { });

onUnmounted(() => { });

function test_func_1() {
  console.log("test_func_1() called");
}

function test_func_2() {
  console.log("test_func_2() called");
}

</script>

<template>
  <main>
    <!-- Title -->
    <div>Particle Tool ✨ - (In Progress) &nbsp; &nbsp; <span class="text-plue-500">
        https://github.com/vaguevoid/particle-tool</span></div>
    <br>

    <div class="grid-container">

      <!-- Left Panel -->
      <div class="flex flex-col gap-y-8">
        <!-- Emitters -->
        <div class="h-[30%] card">
          <SectionPill name="Emitters" />
          <div class="p-2">
            Example: Emitter data goes here...
          </div>
        </div>

        <!-- Texture -->
        <div class="h-[25%] card">
          <SectionPill name="Textures" />
          <div class="p-2">
            Example: Texture data goes here...
          </div>
        </div>

        <!-- Emissions -->
        <div class="flex-grow card">
          <SectionPill name="Textures" />
          <div class="p-2">Example: Emitter controls go here... </div>
        </div>
      </div>

      <!-- Center Panel -->
      <div ref="gameScreenRef" :style="gameScreenStyle" class="cursor-pointer relative bg-gray-100" @mousedown="
        (event) => {
          // Process Event here
          test_func_1();
        }
      " @mouseup="
        (event) => {
          test_func_2();
        }
      ">

        <br>&nbsp; &nbsp;Camera Viewport goes here
        <p style="font-size: 120px;"><br><br><br><br><br>✨ ✨</p>
      </div>

      <!-- Right Panel -->
      <div class="flex-grow card h-full">
        <div>
          <SectionPill name="Particles:" />
        </div>

        <!----------- SPAWN  ----------->
        <div>
          <div class="p-2"><b>Spawn</b></div>

          <!-- Burst -->
          <div class="particle_input">
            <label for="burst_spawn" class="w-[75%]">Burst</label>
            <input type="checkbox" id="burst_spawn" class="w-25 h-5">
          </div>

          <!-- Rate -->
          <div class="particle_input">
            <label for="rate" class="w-[75%]">Rate</label>
            <DraggableNumberInput @value-changed="
              (newValue: any) => {
                test_func_1()
              }
            " @click="
              () => {
                test_func_2()
              }
            " id="rate" name="Rate" class="w-20 h-5" />
          </div>

          <!-- Lifetime -->
          <ParticleInput
  label="Custom Name"
  inputId="custom-rate"
  inputName="CustomRate"
  :containerClass="'custom-container'"
  :labelClass="'w-[80%]'"
  :inputClass="'w-24 h-6'"
  :valueChanged="test_func_1"
  :onClick="test_func_2"
/>


          <!--div class="particle_input">
            <label for="rate" class="w-[75%]">Lifetime</label>
            <DraggableNumberInput @value-changed="
              (newValue: any) => {
                test_func_1()
              }
            " @click="
              () => {
                test_func_2()
              }
            " id="rate" name="Rate" class="w-20 h-5" />
          </div-->

          <!-- Angle -->
          <div class="particle_input">
            <label for="rate" class="w-[75%]">Angle</label>
            <DraggableNumberInput @value-changed="
              (newValue: any) => {
                test_func_1()
              }
            " @click="
              () => {
                test_func_2()
              }
            " id="rate" name="Rate" class="w-20 h-5" />
          </div>

          <!-- Points Forward -->
          <div class="particle_input">
            <label for="points_forward" class="w-[75%]">Points Forward</label>
            <input type="checkbox" id="points_forward" class="w-5 h-5">
          </div>
        </div>

        <!----------- Speed  ----------->
        <div>
          <div class="p-2"><b>Speed</b></div>
          <!-- Initial Speed -->
          <div class="particle_input">
            <label for="rate" class="w-[75%]">Initial Speed:</label>
            <DraggableNumberInput @value-changed="
              (newValue: any) => {
                test_func_1()
              }
            " @click="
              () => {
                test_func_2()
              }
            " id="rate" name="Rate" class="w-20 h-5" />
          </div>

          <!-- End Speed -->
          <div class="particle_input">
            <label for="rate" class="w-[75%]">Gravity:</label>
            <DraggableNumberInput @value-changed="
              (newValue: any) => {
                test_func_1()
              }
            " @click="
              () => {
                test_func_2()
              }
            " id="rate" name="Rate" class="w-20 h-5" />
          </div>
        </div>

        <!----------- Visibility  ----------->
        <div class="p-2"><b>Visibility</b></div>
        <!-- Fade In -->
        <div class="particle_input">
          <label for="rate" class="w-[75%]">Fade In:</label>
          <DraggableNumberInput @value-changed="
              (newValue: any) => {
                test_func_1()
              }
            " @click="
              () => {
                test_func_2()
              }
            " id="rate" name="Rate" class="w-20 h-5" />
        </div>

        <!-- Fade Out -->
        <div class="particle_input">
          <label for="rate" class="w-[75%]">Fade Out:</label>
          <DraggableNumberInput @value-changed="
              (newValue: any) => {
                test_func_1()
              }
            " @click="
              () => {
                test_func_2()
              }
            " id="rate" name="Rate" class="w-20 h-5" />
        </div>


        <!----------- Rotation  ----------->
        <div class="p-2"><b>Rotation</b></div>
        <div class="particle_input">
          <label for="rotation" class="w-[75%]">Start Rotation:</label>
          <DraggableNumberInput @value-changed="
              (newValue: any) => {
                test_func_1()
              }
            " @click="
              () => {
                test_func_2()
              }
            " id="rate" name="Rate" class="w-20 h-5" />
        </div>
        <div class="particle_input">
          <label for="min_random" class="w-[75%]">Min Random:</label>
          <DraggableNumberInput @value-changed="
              (newValue: any) => {
                test_func_1()
              }
            " @click="
              () => {
                test_func_2()
              }
            " id="rate" name="Rate" class="w-20 h-5" />
        </div>
        <div class="particle_input">
          <label for="max_random" class="w-[75%]">Max Random:</label>
          <DraggableNumberInput @value-changed="
              (newValue: any) => {
                test_func_1()
              }
            " @click="
              () => {
                test_func_2()
              }
            " id="rate" name="Rate" class="w-20 h-5" />
        </div>

        <!----------- Trail  ----------->
        <div class="p-2"><b>Trail</b></div>
        <div class="particle_input">
          <label for="rate" class="w-[75%]">Min Random:</label>
          <DraggableNumberInput @value-changed="
              (newValue: any) => {
                test_func_1()
              }
            " @click="
              () => {
                test_func_2()
              }
            " id="rate" name="Rate" class="w-20 h-5" />
        </div>
        <div class="particle_input">
          <label for="rate" class="w-[75%]">Trail Lifetime:</label>
          <DraggableNumberInput @value-changed="
              (newValue: any) => {
                test_func_1()
              }
            " @click="
              () => {
                test_func_2()
              }
            " id="rate" name="Rate" class="w-20 h-5" />
        </div>
        <div class="particle_input">
          <label for="rate" class="w-[75%]">Trail Width:</label>
          <DraggableNumberInput @value-changed="
              (newValue: any) => {
                test_func_1()
              }
            " @click="
              () => {
                test_func_2()
              }
            " id="rate" name="Rate" class="w-20 h-5" />
        </div>
        <div class="particle_input">
          <label for="rate" class="w-[75%]">Max Random:</label>
          <DraggableNumberInput @value-changed="
              (newValue: any) => {
                test_func_1()
              }
            " @click="
              () => {
                test_func_2()
              }
            " id="rate" name="Rate" class="w-20 h-5" />
        </div>
      </div>
    </div>

  </main>
</template>

<style scoped>
main {
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  box-sizing: border-box;
  padding: 20px 20px 16px 16px;
}

.grid-container {
  display: grid;
  grid-template-columns: 1fr 4fr 1fr;
  gap: 20px;
}

.particle_input {
  @apply flex items-center justify-between p-2;
}

.fiasco .card {
  border: 1px solid black;
  box-shadow: 2px 2px 0 0 black;
  background-color: white;
}

.fiasco .pill {
  border: 1px solid black;
  border-radius: 32px;
  padding: 4px 12px;
  box-shadow: 2px 2px 0 0 black;
  line-height: 24px;
  font-weight: 600;
  display: inline-block;
}

.fiasco .pill.small {
  font-size: 10px;
  line-height: 15px;
  display: inline-block;
}
</style>
