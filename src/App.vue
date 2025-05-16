<script setup lang="ts">
import { ref, onMounted, computed, onUnmounted } from "vue";
import ParticleInput from "./components/ParticleInput.vue";
import SectionPill from "./components/SectionPill.vue";
import CollapsibleSection from "./components/CollapsibleSection.vue"
import ParticleCheckbox from "./components/ParticleCheckbox.vue"
const gameScreenRef = ref<HTMLDivElement | null>(null);

const gameScreenStyle = computed(() => {
  return {
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

      <!------------ Left Panel ----------->
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
          <SectionPill name="Spawn"/>
        </div>

        <!----------- SPAWN  ----------->
        <CollapsibleSection name="Spawn">

          <ParticleCheckbox labelText="Burst" inputId="burst_spawn" inputName="Burst" :onValueChanged="test_func_1"
            :onClick="test_func_2" />

          <ParticleInput labelText="Rate" inputId="rate" inputName="Rate" :onValueChanged="test_func_1"
            :onClick="test_func_2" />

          <ParticleInput labelText="Lifetime" inputId="life" inputName="Life" :onValueChanged="test_func_1"
            :onClick="test_func_2" />

          <ParticleInput labelText="Angle" inputId="angle" inputName="Angle" :onValueChanged="test_func_1"
            :onClick="test_func_2" />

          <ParticleInput labelText="Points Forward" inputId="forward" inputName="forward" :onValueChanged="test_func_1"
            :onClick="test_func_2" />
        </CollapsibleSection>


        <!----------- Speed  ----------->
        <CollapsibleSection name="Speed">

        <ParticleInput labelText="Start Speed" inputId="startSpeed" inputName="startSpeed"
          :onValueChanged="test_func_1" :onClick="test_func_2" />

        <ParticleInput labelText="End Speed" inputId="StartSpeed" inputName="StartSpeed" :onValueChanged="test_func_1"
          :onClick="test_func_2" />
        </CollapsibleSection>

        <!----------- Visibility  ----------->
        <CollapsibleSection name="Visibility">

        <ParticleInput labelText="Fade In" inputId="FadeIn" inputName="FadeIn" :onValueChanged="test_func_1"
          :onClick="test_func_2" />

        <ParticleInput labelText="Fade Out" inputId="FadeIn" inputName="FadeIn" :onValueChanged="test_func_1"
          :onClick="test_func_2" />
        </CollapsibleSection>
        

        <!----------- Rotation  ----------->
        <CollapsibleSection name="Rotation">
        <ParticleInput labelText="Start Rotation" inputId="FadeIn" inputName="FadeIn" :onValueChanged="test_func_1"
          :onClick="test_func_2" />

        <ParticleInput labelText="Min Rand Rotation" inputId="FadeIn" inputName="FadeIn" :onValueChanged="test_func_1"
          :onClick="test_func_2" />

        <ParticleInput labelText="Max Rand Rotation" inputId="FadeIn" inputName="FadeIn" :onValueChanged="test_func_1"
          :onClick="test_func_2" />
        </CollapsibleSection>

        <!----------- Trail  ----------->
        <CollapsibleSection name="Trail">
        <ParticleInput labelText="Trail Lifetime" inputId="FadeIn" inputName="FadeIn" :onValueChanged="test_func_1"
          :onClick="test_func_2" />

        <ParticleInput labelText="Trail Width" inputId="FadeIn" inputName="FadeIn" :onValueChanged="test_func_1"
          :onClick="test_func_2" />

        <ParticleInput labelText="Min Random" inputId="FadeIn" inputName="FadeIn" :onValueChanged="test_func_1"
          :onClick="test_func_2" />

        <ParticleInput labelText="Max Random" inputId="FadeIn" inputName="FadeIn" :onValueChanged="test_func_1"
          :onClick="test_func_2" />
        </CollapsibleSection>
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
