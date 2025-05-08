<script setup lang="ts">
import { ref } from "vue";
import { GameHandle, getGameHandle } from "@vaguevoid/tools";
import { onHide, onShow } from "../../util";

const canvas = ref<HTMLCanvasElement>();
let gameHandle = ref<GameHandle>(getGameHandle());

async function play() {
  await gameHandle.value.play();
}

function printError(err: string) {
  console.error(err);
}

onShow(async () => {
  gameHandle.value.on("mount:success", play);
  gameHandle.value.on("mount:error", printError);
  gameHandle.value.on("build:error", printError);

  await initGame();
});

onHide(() => {
  gameHandle.value.off("mount:success", play);
  gameHandle.value.off("mount:error", printError);
  gameHandle.value.off("build:error", printError);

  cleanup();
});

async function initGame() {
  if (!canvas.value) {
    console.warn("Canvas not available for game initialization");
    return;
  }
  gameHandle.value.watch(canvas.value);
}

function cleanup() {
  if (gameHandle.value) {
    gameHandle.value.unmount();
  }
}

</script>

<template>
  <canvas id="inspector-game" ref="canvas"></canvas>
</template>

<style scoped>
canvas {
  background-color: transparent;
  width: 100%;
}

canvas.updated {
  box-shadow: 0px 0px 32px 0px rgb(102, 89, 255);
}

.selectDialog {
  position: absolute;
  z-index: 2;
}

.selectDialog div {
  padding: 4px;
  cursor: pointer;
}

.selectDialog div:hover {
  background-color: var(--plue);
  color: white;
}

.loading canvas {
  background-color: white;
}

div.loading-dialog {
  font-size: var(--fontlarge);
  position: absolute;
  left: 0;
  right: 0;
  top: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
