import { getMainGame } from "@vaguevoid/tools";

export function reload() {
  window.location.reload();
}

export async function jumpBack() {
  // hasTimetraveled.value = true;
  console.warn("Jump back not yet supported");
}

export async function stepBack() {
  // hasTimetraveled.value = true;
  console.warn("Step back not yet supported");
}

export async function resumeGame() {
  const mainGame = await getMainGame();
  await mainGame.play();
}

export async function pauseGame() {
  const mainGame = await getMainGame();
  await mainGame.pause();
}

export async function togglePlay() {
  const mainGame = await getMainGame();
  if (mainGame.playState === "playing") {
    await mainGame.pause();
  } else {
    await mainGame.play();
  }
}

export async function stepForward() {
  const mainGame = await getMainGame();
  await mainGame.frame();
}

export async function jumpForward() {
  console.warn("Jump forward not yet supported");
}
