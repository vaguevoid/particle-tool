<script setup lang="ts">
import { ref, onMounted, computed, onUnmounted } from "vue";
import ParticleInput from "./components/ParticleInput.vue";
import SectionPill from "./components/SectionPill.vue";
import CollapsibleSection from "./components/CollapsibleSection.vue";
import ParticleCheckbox from "./components/ParticleCheckbox.vue";
import Emitters from "./components/Emitters.vue";
import textureInput from "./components/TextureInput.vue"
import TextureInput from "./components/TextureInput.vue";
import ColorInput from "./components/ColorInput.vue"
import ParticlePreview from "./components/ParticlePreview.vue";
import type { ComponentPublicInstance } from 'vue';

const gameScreenRef = ref<HTMLDivElement | null>(null);
const particlePreviewRef = ref<ComponentPublicInstance<{ handlePlay: () => void }> | null>(null);

const gameScreenStyle = computed(() => {
  return {
    width: "100%",
    maxWidth: "800px",
  };
});

// Gather control values from the right panel (example, you may need to adjust input bindings)
const controls = ref({
  burst: false,
  amount: 2.4,
  lifetime: 2.75,
  startSpeed: 0.82,
  gravity: 0,
  startSize: 0.42,
  endSize: 0.01,
  sizeMultiplier: 10.0,
  fadeInPoint: 0.07,
  fadeOutPoint: 0.21,
  startRotation: 0,
  minRandomSpin: 25,
  maxRandomSpin: 90,
  trailLifetime: 0.09,
  trailWidth: 0.05,
  color: '#6659FF', // Example, wire up to ColorInput if needed
  spawnRate: 0.1,
  acceleration: 0,
  texture: '/images/star_01.png',
  minSpawnAngle: 0,
  maxSpawnAngle: 360
});

onMounted(() => { });

onUnmounted(() => { });

function test_func_1() {
  console.log("test_func_1() called");
}

function test_func_2() {
  console.log("test_func_2() called");
}

function playParticles() {
  particlePreviewRef.value?.handlePlay();
}

</script>

<template>
  <main>
    <!-- Title -->
    <div>Particle Tool ✨ - (In Progress) &nbsp; &nbsp; <span class="text-plue-500">
        https://github.com/vaguevoid/particle-tool</span></div>
    <br>

    <div class="grid-container ">

      <!------------ Left Panel ----------->
      <div class="flex flex-col gap-y-8">
        <!-- Emitters -->
        <div class="card">
          <SectionPill name="Emitters" />
          <Emitters :emitters="['/images/spark_01.png', '/images/smoke_10.png','/images/muzzle_01.png']"/>
          <!-- <div class="p-2">
            Example: Emitter data goes here...
          </div> -->
        </div>

        <!-- Texture -->
        <div class="card">
          <SectionPill name="Textures" />
          <div class="p-2">
            <TextureInput labelText="Shape" inputId="shape" inputName="Shape" texture="./images/spark_01.png" :onValueChanged="test_func_1"
            :onClick="test_func_2" />
            <ColorInput labelText="Color" inputId="color" inputName="color" color="#6659FF" :onValueChanged="test_func_1"
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
      <div class="flex flex-col items-center">
        <ParticlePreview ref="particlePreviewRef" :controls="controls" style="width:100%;height:100%;" />
        <div class="card">
          <button class="button p-2 w-8" @click="playParticles">
            <img src="/images/play.png" alt="">
          </button>
        </div>
      </div>

      <!------------ Right Panel ----------->
      <div class="flex-grow card h-full">
        <div>
          <SectionPill name="Spawn"/>
        </div>

        <!----------- SPAWN  ----------->
        <CollapsibleSection name="Spawn">
          <ParticleCheckbox labelText="Burst" inputId="burst_spawn" inputName="Burst" :onValueChanged="val => controls.burst = val"
            :onClick="test_func_2" />
          
          <ParticleInput labelText="Amount" inputId="amount" inputName="amount" :onValueChanged="val => controls.amount = val"
            :onClick="test_func_2" />
          
          <ParticleInput labelText="Rate" inputId="rate" inputName="Rate" :onValueChanged="val => controls.spawnRate = val"
            :onClick="test_func_2" />
          
          <ParticleInput labelText="Min Angle" inputId="min_angle" inputName="min_angle" :onValueChanged="val => controls.minSpawnAngle = val"
            :onClick="test_func_2" />
          
          <ParticleInput labelText="Max Angle" inputId="max_angle" inputName="max_angle" :onValueChanged="val => controls.maxSpawnAngle = val"
            :onClick="test_func_2" />

          <ParticleInput labelText="Lifetime" inputId="life" inputName="Life" :onValueChanged="val => controls.lifetime = val"
            :onClick="test_func_2" />

          <!-- <ParticleInput labelText="Angle" inputId="angle" inputName="Angle" :onValueChanged="val => controls.angle = val"
            :onClick="test_func_2" />

          <ParticleInput labelText="Points Forward" inputId="forward" inputName="forward" :onValueChanged="val => controls.forward = val"
            :onClick="test_func_2" /> -->
        </CollapsibleSection>

        <!----------- Speed  ----------->
        <CollapsibleSection name="Speed">
          <ParticleInput labelText="Start Speed" inputId="startSpeed" inputName="startSpeed" :onValueChanged="val => controls.startSpeed = val" 
            :onClick="test_func_2" />

          <ParticleInput labelText="Acceleration" inputId="acceleration" inputName="acceleration" :onValueChanged="val => controls.acceleration = val" 
            :onClick="test_func_2" />
          
          <ParticleInput labelText="Gravity" inputId="gravity" inputName="gravity" :onValueChanged="val => controls.gravity = val"
            :onClick="test_func_2" />
        </CollapsibleSection>

        <!----------- Size  ----------->
        <CollapsibleSection name="Size">
          <ParticleInput labelText="Start Size" inputId="startSize" inputName="startSize" :onValueChanged="val => controls.startSize = val" 
            :onClick="test_func_2" />

          <ParticleInput labelText="End Size" inputId="endSize" inputName="endSize" :onValueChanged="val => controls.endSize = val" 
            :onClick="test_func_2" />
        </CollapsibleSection>

        <!----------- Visibility  ----------->
        <CollapsibleSection name="Visibility">

          <ParticleInput labelText="Fade In" inputId="FadeIn" inputName="FadeIn" :onValueChanged="val => controls.fadeInPoint = val"
            :onClick="test_func_2" />

          <ParticleInput labelText="Fade Out" inputId="FadeIn" inputName="FadeIn" :onValueChanged="val => controls.fadeOutPoint = val"
            :onClick="test_func_2" />
        </CollapsibleSection>
        
        <!----------- Rotation  ----------->
        <CollapsibleSection name="Rotation">
          <ParticleInput labelText="Start Rotation" inputId="StartRotation" inputName="StartRotation" :onValueChanged="val => controls.startRotation = val"
            :onClick="test_func_2" />

          <ParticleInput labelText="Min Rand Rotation" inputId="FadeIn" inputName="FadeIn" :onValueChanged="val => controls.minRandomSpin = val"
            :onClick="test_func_2" />

          <ParticleInput labelText="Max Rand Rotation" inputId="FadeIn" inputName="FadeIn" :onValueChanged="val => controls.maxRandomSpin = val"
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
