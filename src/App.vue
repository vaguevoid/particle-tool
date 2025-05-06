<script setup lang="ts">
import { ref, onMounted, computed, onUnmounted } from "vue";
import {
  connectWebSocket,
  lastRoundTripTime,
  lastMessage,
  isConnected,
  aspectRatio,
} from "./services/websocket";
import { sendSpawnMessage } from "./messages";

const gameScreenRef = ref<HTMLDivElement | null>(null);
const reconnectionInterval = ref<number | null>(null);
const isMouseDown = ref(false);

const gameScreenStyle = computed(() => {
  if (!aspectRatio.value) {
    return {
      aspectRatio: "16/9",
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

function handleSpawn(event: MouseEvent) {
  if (!gameScreenRef.value || !aspectRatio.value) return;

  // Get click position relative to the game view
  const rect = gameScreenRef.value.getBoundingClientRect();
  const clickX = event.clientX - rect.left;
  const clickY = rect.bottom - event.clientY; // Y is inverted in the game (positive is up)

  // Calculate position relative to the center of the game view
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;
  const relativeX = clickX - centerX;
  const relativeY = clickY - centerY;

  // Scale to game coordinates, with center as (0,0)
  const gameWidth = aspectRatio.value.width;
  const gameHeight = aspectRatio.value.height;
  const scaleX = gameWidth / rect.width;
  const scaleY = gameHeight / rect.height;
  const posX = relativeX * scaleX;
  const posY = relativeY * scaleY;

  console.log(`Spawning at game position: (${posX}, ${posY})`);

  sendSpawnMessage(
    {
      position: { x: posX, y: posY, z: 0 },
      scale: { x: 5, y: 5 },
      skew: { x: 0, y: 0 },
      pivot: { x: 0, y: 0 },
      rotation: 0,
    },
    { r: 1, g: 0, b: 0, a: 1 },
    { visible: true }
  );
}

onMounted(() => {
  connectWebSocket();

  reconnectionInterval.value = window.setInterval(() => {
    if (!isConnected.value) {
      connectWebSocket();
    }
  }, 2000);
});

onUnmounted(() => {
  if (reconnectionInterval.value !== null) {
    clearInterval(reconnectionInterval.value);
    reconnectionInterval.value = null;
  }
});
</script>

<template>
  <main>
    <card class="h-full">
      <card-body class="flex flex-col h-full gap-4">
        <!-- Two-column layout -->
        <div class="flex gap-4">
          
          <!-- Right column -->
          <div class="flex-1 flex flex-col gap-2">
            <div class="flex items-center text-sm mr-1">
              <template v-if="isConnected">
                <div
                  class="animate-pulse rounded-full w-3 h-3"
                  style="background-color: #0c0"
                />
                <div class="text-sm h-full ml-1">Connected to game</div>
              </template>
              <template v-else>
                <div
                  class="rounded-full w-3 h-3"
                  style="background-color: #f00"
                />
                <div class="text-sm h-full ml-1">Not connected to game</div>
              </template>
            </div>

            <div
              ref="gameScreenRef"
              :style="gameScreenStyle"
              class="cursor-pointer relative bg-gray-100"
              @mousedown="
                (event) => {
                  isMouseDown = true;
                  handleSpawn(event);
                }
              "
              @mouseup="isMouseDown = false"
              @mousemove="
                (event) => {
                  if (!isMouseDown) {
                    return;
                  }

                  handleSpawn(event);
                }
              "
            >
              <div class="absolute inset-4 flex justify-center">
                Click to spawn entity
              </div>
            </div>
          </div>
          
          <!-- Left column -->
          <div class="flex-1 flex flex-col gap-2">
            <div class="text-lg">
              Particle Tool - (In Progress)
            </div>

            <!--a
              class="text-ice-600"
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/vaguevoid/particle-tool/blob/main/README.md#usage"
              >How to try this tool</a
            -->

            <card v-if="lastMessage" variant="secondary" class="p-4">
              <div class="flex flex-col gap-2">
                <div v-if="lastRoundTripTime !== null" class="flex gap-2">
                  <span>Round trip</span>
                  <span class="font-medium">
                    {{ Math.round(lastRoundTripTime) }}
                    ms
                  </span>
                </div>
                <div v-if="lastMessage" class="flex gap-2">
                  <span>Last received message:</span>
                  <span class="font-medium">{{ lastMessage }}</span>
                </div>
              </div>
            </card>
          </div>
        </div>
      </card-body>
    </card>
  </main>
</template>

<style scoped>
main {
  min-height: 100vh;
  display: grid;
  overflow: hidden;
  padding: 1.2rem;
}
</style>
