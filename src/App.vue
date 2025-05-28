<script setup lang="ts">
import { ref, onMounted, computed, onUnmounted, reactive } from "vue";
import { Fs } from "@vaguevoid/tools";
import ParticleInput from "./components/ParticleInput.vue";
import SectionPill from "./components/SectionPill.vue";
import CollapsibleSection from "./components/CollapsibleSection.vue";
import ParticleCheckbox from "./components/ParticleCheckbox.vue";
import EmitterGrid from "./components/EmitterGrid.vue";
import TextureInput from "./components/TextureInput.vue";
import ColorInput from "./components/ColorInput.vue"
const gameScreenRef = ref<HTMLDivElement | null>(null);

const gameScreenStyle = computed(() => {
  return {
    width: "100%",
    maxWidth: "800px",
  };
});

const particleVariables = {
  Spawn: ["Burst", "Amount", "Rate", "Angle", "Lifetime"],
  Speed: ["Start Speed", "Acceleration", "Gravity"],
  Visibility: ["Fade In", "Fade Out"],
  Rotation: ["Rotation Speed"],
  Trail: ["Trail Lifetime", "Trail Width", "Min Random", "Max Random"],
};

const particleState = reactive(
  Object.fromEntries(
    Object.entries(particleVariables).map(([section, items]) => [
      section,
      Object.fromEntries(items.map(item => [item, 0]))
    ])
  )
);

async function saveParticleConfig() {
  let state = ""
  for (const key in particleState) {
    state += JSON.stringify(particleState[key])
  }
  await Fs.writeFile(
    "src/assets/particle-config.json",
    state
  );
  console.log("Particle config saved!");
}

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

      <!------------ Left Panel ----------->
      <div class="flex flex-col gap-y-8">
        <!-- Emitters -->
        <div class="card">
          <SectionPill name="Emitters" />
          <EmitterGrid :emitters="['/images/spark_01.png', '/images/smoke_10.png','/images/muzzle_01.png']"/>
          <!-- <div class="p-2">
            Example: Emitter data goes here...
          </div> -->
        </div>

        <!-- Texture -->
        <div class="card">
          <SectionPill name="Textures" />
          <div class="p-2">
            <TextureInput labelText="Texture" inputId="texture" inputName="Texture" texture="./images/spark_01.png" :onValueChanged="test_func_1"
            :onClick="test_func_2" />
            <ColorInput labelText="Color" inputId="color" inputName="Color" color="#6659FF" :onValueChanged="test_func_1"
            :onClick="test_func_2" />
          </div>
        </div>

        <!-- Emissions -->
        <div class="card h-full">
          <div>
            <SectionPill name="Emission" />
          </div>
          <ParticleInput labelText="Shape" inputId="shape" inputName="Shape" :onValueChanged="test_func_1"
            :onClick="test_func_2" />
          <ParticleInput labelText="Position" inputId="position" inputName="Position" :inputLabels="['X','Y']" :onValueChanged="test_func_1"
            :onClick="test_func_2" />
          <ParticleInput labelText="Rotation" inputId="rotation" inputName="Rotation" :onValueChanged="test_func_1"
            :onClick="test_func_2" />
          <ParticleInput labelText="Radius" inputId="radius" inputName="Radius" :onValueChanged="test_func_1"
            :onClick="test_func_2" />
        </div>
      </div>

      <!------------ Center Panel ----------->
      <div ref="gameScreenRef" :style="gameScreenStyle" class="cursor-pointer relative bg-gray-100" @mousedown="
        () => {
          // Process Event here
          test_func_1();
        }
      " @mouseup="
        () => {
          test_func_2();
        }
      ">

        <br>&nbsp; &nbsp;Camera Viewport goes here
        <p style="font-size: 120px;"><br><br><br><br><br>✨ ✨</p>
      </div>

      <!------------ Right Panel ----------->
      <div class="flex-grow card h-full">
        <div>
          <SectionPill name="Particles"/>
        </div>

        <span v-for="(items, section) in particleVariables">
          <CollapsibleSection :name="section">
            <ParticleInput v-for="item in items" :labelText="item" :inputId="item.toLowerCase()" :inputName="item" :onValueChanged="(newValue) => {
              particleState[section][item] = newValue;
              saveParticleConfig()
            }" :onClick="test_func_2"/>
          </CollapsibleSection>
        </span>
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

.fiasco .card {
  border: 1px solid black;
  box-shadow: 2px 2px 0 0 black;
  background-color: white;
  min-width: 300px
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
