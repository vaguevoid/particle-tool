<script setup lang="ts">
import { ref, onMounted, computed, onUnmounted } from "vue";
import {
  connectWebSocket,
  isConnected,
  aspectRatio,
} from "./services/websocket";
import DraggableNumberInput from './components/DraggableNumberInput.vue'
import InspectorHierarchy from "./components/InspectorHierarchy.vue";
import SectionPill from "./components/SectionPill.vue";

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

function test_1() {

}

</script>

<template>
  <main>
    <div class="flex h-screen">
      <!-- Left Panel has 3 rows -->
      <div class="w-[15%] flex flex-col gap-y-4">
        <!-- Title -->
        <div>Particle Tool ✨ - (In Progress)</div>

        <!-- Emitters -->
        <div class="h-[30%] p-2 card">
          <div>
            <SectionPill name="Emitters" />
          </div>
          Example: Emitter data goes here...
        </div>

        <!-- Texture -->
        <div class="h-[25%] p-2 card">
          <div>
            <SectionPill name="Textures" />
          </div>
          Example: Texture data goes here...
        </div>

        <!-- Emissions -->
        <div class="flex-grow card p-2">
          <div>
            <SectionPill name="Textures" />
          </div>
          Example: Emitter controls go here...
        </div>
      </div>

      <!-- Center Panel -->
      <div class="flex-grow p-4">
        <div class="main-content">
          Camera Viewport goes here
          <div ref="gameScreenRef" :style="gameScreenStyle" class="cursor-pointer relative bg-gray-100" @mousedown="
            (event) => {
              isMouseDown = true;
              // Process Event
            }
          " @mouseup="isMouseDown = false" @mousemove="
            (event) => {
              if (!isMouseDown) {
                return;
              }

              // Process Event
            }
          ">
          </div>
        </div>
      </div>

      <div class="w-[15%] h-full flex flex-col p-4 gap-y-2">
        <div class="flex-grow card h-full">
          <div>
            <SectionPill name="Particles:" />
          </div>
          <InspectorHierarchy />

          <!----------- SPAWN  ----------->
          <div>
            <div class="p-2"><b>Spawn</b></div>

            <!-- Burst -->
            <div class="flex items-center justify-start p-2">
              <label for="burst_spawn" class="w-[75%]">Burst</label>
              <input type="checkbox" id="burst_spawn" class="w-25 h-5">
            </div>

            <!-- Rate -->
            <div class="flex items-start justify-start p-2 flex-grow">
              <label for="rate" class="w-[75%]">Rate</label>
              <DraggableNumberInput @value-changed="
                (newValue: any) => {
                  test_1()
                  test_1()
                }
              " @click="
                () => {
                  test_1()
                }
              " id="rate" name="Rate" class="w-20 h-5" />
            </div>

            <!-- Lifetime -->
            <div class="flex items-center justify-between p-2 flex-grow">
              <label for="rate" class="w-[75%]">Lifetime</label>
              <DraggableNumberInput @value-changed="
                (newValue: any) => {
                  test_1()
                  test_1()
                }
              " @click="
                () => {
                  test_1()
                }
              " id="rate" name="Rate" class="w-20 h-5" />
            </div>

            <!-- Angle -->
            <div class="flex items-center justify-between p-2 flex-grow">
              <label for="rate" class="w-[75%]">Angle</label>
              <DraggableNumberInput @value-changed="
                (newValue: any) => {
                  test_1()
                  test_1()
                }
              " @click="
                () => {
                  test_1()
                }
              " id="rate" name="Rate" class="text-right w-20 h-5" />
            </div>

            <!-- Points Forward -->
            <div class="flex items-center justify-start p-2">
              <label for="points_forward" class="w-[75%]">Points Forward</label>
              <input type="checkbox" id="points_forward" class="w-5 h-5">
            </div>
          </div>

          <!----------- Speed  ----------->
          <div>
            <div class="p-2"><b>Speed</b></div>
            <!-- Initial Speed -->
            <div class="flex items-center justify-between p-2 flex-grow">
              <label for="rate" class="w-[75%]">Initial Speed:</label>
              <DraggableNumberInput @value-changed="
                (newValue: any) => {
                  test_1()
                  test_1()
                }
              " @click="
                () => {
                  test_1()
                }
              " id="rate" name="Rate" class="w-20 h-5" />
            </div>

            <!-- End Speed -->
            <div class="flex items-center justify-between p-2 flex-grow">
              <label for="rate" class="w-[75%]">Gravity:</label>
              <DraggableNumberInput @value-changed="
                (newValue: any) => {
                  test_1()
                  test_1()
                }
              " @click="
                () => {
                  test_1()
                }
              " id="rate" name="Rate" class="w-20 h-5" />
            </div>
          </div>

          <!----------- Visibility  ----------->
          <div>
            <div class="p-2"><b>Visibility</b></div>
            <!-- Fade In -->
            <div class="flex items-center justify-between p-2 flex-grow">
              <label for="rate" class="w-[75%]">Fade In:</label>
              <DraggableNumberInput @value-changed="
                (newValue: any) => {
                  test_1()
                  test_1()
                }
              " @click="
                () => {
                  test_1()
                }
              " id="rate" name="Rate" class="w-20 h-5" />
            </div>

            <!-- Fade Out -->
            <div class="flex items-center justify-between p-2 flex-grow">
              <label for="rate" class="w-[75%]">Fade Out:</label>
              <DraggableNumberInput @value-changed="
                (newValue: any) => {
                  test_1()
                  test_1()
                }
              " @click="
                () => {
                  test_1()
                }
              " id="rate" name="Rate" class="w-20 h-5" />
            </div>
          </div>

          <!----------- Rotation  ----------->
          <div>
            <div class="p-2"><b>Rotation</b></div>
            <div class="flex items-center justify-between p-2 flex-grow">
              <label for="rotation" class="w-[75%]">Start Rotation:</label>
              <DraggableNumberInput @value-changed="
                (newValue: any) => {
                  test_1()
                  test_1()
                }
              " @click="
                () => {
                  test_1()
                }
              " id="rotation" name="Rotation" class="w-20 h-5" />
            </div>
            <div class="flex items-center justify-between p-2 flex-grow">
              <label for="min_random" class="w-[75%]">Min Random:</label>
              <DraggableNumberInput @value-changed="
                (newValue: any) => {
                  test_1()
                  test_1()
                }
              " @click="
                () => {
                  test_1()
                }
              " id="min_random" name="MinRandom" class="w-20 h-5" />
              </div>
              <div class="flex items-center justify-between p-2 flex-grow">
                <label for="max_random" class="w-[75%]">Max Random:</label>
                <DraggableNumberInput @value-changed="
                  (newValue: any) => {
                    test_1()
                    test_1()
                  }
                " @click="
                  () => {
                    test_1()
                  }
                " id="max_random" name="MaxRandom" class="text-right w-20 h-5" />
       
            </div>

          </div>

          <!----------- Trail  ----------->
          <div>
            <div class="p-2"><b>Trail</b></div>
            <div class="flex items-center justify-between p-2 flex-grow">
              <label for="rate" class="w-[75%]">Min Random:</label>
              <DraggableNumberInput @value-changed="
                (newValue: any) => {
                  test_1()
                  test_1()
                }
              " @click="
                () => {
                  test_1()
                }
              " id="rate" name="Rate" class="w-20 h-5" />
              </div>
              <div class="flex items-center justify-between p-2 flex-grow">
                <label for="rate" class="w-[75%]">Trail Lifetime:</label>
                <DraggableNumberInput @value-changed="
                  (newValue: any) => {
                    test_1()
                    test_1()
                  }
                " @click="
                  () => {
                    test_1()
                  }
                " id="rate" name="Rate" class="w-20 h-5" />
       
            </div>
            <div class="flex items-center justify-between p-2 flex-grow">
              <label for="rate" class="w-[75%]">Trail Width:</label>
              <DraggableNumberInput @value-changed="
                (newValue: any) => {
                  test_1()
                  test_1()
                }
              " @click="
                () => {
                  test_1()
                }
              " id="rate" name="Rate" class="w-20 h-5" />
              </div>
              <div class="flex items-center justify-between p-2 flex-grow">
                <label for="rate" class="w-[75%]">Max Random:</label>
                <DraggableNumberInput @value-changed="
                  (newValue: any) => {
                    test_1()
                    test_1()
                  }
                " @click="
                  () => {
                    test_1()
                  }
                " id="rate" name="Rate" class="w-20 h-5" />
            </div>
          </div>
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
  padding: 20px 4px 16px 16px;
}

.grid-container {
  display: grid;
  grid-template-columns: 200px auto 200px;
  /* Left & Right = 200px, Center = Flexible */
  gap: 10px;
  /* Adds spacing between columns */
}

.panel-left,
.panel-right {
  background: lightgray;
  padding: 20px;
}

.main-content {
  background: rgba(255, 255, 255, 0);
  padding: 20px;
}

input[type="checkbox"] {
  justify-self: start;
  /* Ensures checkbox is left-aligned */
}

input {
  width: 100%;
  /* Ensures text inputs take full width */
}

.hierarchy {
  grid-column: 1;
  grid-row: 1 / span 2;
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

.fiasco .plue {
  background-color: var(--plue);
  color: white;
  font-size: var(--font16);
}

.fiasco .pluetext {
  color: var(--plue);
}
</style>
