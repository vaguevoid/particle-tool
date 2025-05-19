<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'

const props = defineProps<{
  controls?: {
    burst: boolean
    amount: number
    particleLifetime: number
    startSpeed: number
    gravity: number
    startSize: number
    endSize: number
    sizeMultiplier: number
    fadeInPoint: number
    fadeOutPoint: number
    startRotation: number
    minRandomSpin: number
    maxRandomSpin: number
    trailLifetime: number
    trailWidth: number
    color?: string
  }
}>()

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  size: number
  color: string
  rotation: number
  angularVelocity: number
}

const particles = ref<Particle[]>([])
const canvas = ref<HTMLCanvasElement | null>(null)
const ctx = ref<CanvasRenderingContext2D | null>(null)
const animationFrame = ref<number | null>(null)

const createParticle = () => {
  const centerX = canvas.value?.width ? canvas.value.width / 2 : 0
  const centerY = canvas.value?.height ? canvas.value.height / 2 : 0
  
  const controls = props.controls || {
    burst: false,
    amount: 2.4,
    particleLifetime: 2.75,
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
    color: '#ff5722',
  }
  
  const numParticles = Math.floor(controls.amount * 10)
  for (let i = 0; i < numParticles; i++) {
    const angle = Math.random() * Math.PI * 2
    const speed = controls.startSpeed * (1 + Math.random() * 0.5)
    const startRotationRad = (controls.startRotation * Math.PI) / 180
    const minSpinRad = (controls.minRandomSpin * Math.PI) / 180
    const maxSpinRad = (controls.maxRandomSpin * Math.PI) / 180
    particles.value.push({
      x: centerX,
      y: centerY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 0,
      maxLife: controls.particleLifetime * (0.8 + Math.random() * 0.4),
      size: controls.startSize * controls.sizeMultiplier * (0.8 + Math.random() * 0.4),
      color: controls.color || '#ff5722',
      rotation: startRotationRad,
      angularVelocity: minSpinRad + Math.random() * (maxSpinRad - minSpinRad)
    })
  }
}

const updateParticles = () => {
  if (!ctx.value) return
  ctx.value.clearRect(0, 0, canvas.value?.width || 0, canvas.value?.height || 0)
  const controls = props.controls || {
    burst: false,
    amount: 2.4,
    particleLifetime: 2.75,
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
    color: '#ff5722',
  }
  particles.value = particles.value.filter(particle => {
    particle.life += 0.016
    if (particle.life >= particle.maxLife) return false
    particle.x += particle.vx
    particle.y += particle.vy
    particle.vy += controls.gravity * 0.1
    particle.rotation += particle.angularVelocity * 0.016
    const lifeRatio = particle.life / particle.maxLife
    let alpha = 1.0
    if (lifeRatio < controls.fadeInPoint) {
      alpha = lifeRatio / controls.fadeInPoint
    } else if (lifeRatio > controls.fadeOutPoint) {
      alpha = 1.0 - ((lifeRatio - controls.fadeOutPoint) / (1.0 - controls.fadeOutPoint))
    }
    const currentSize = controls.startSize + (controls.endSize - controls.startSize) * lifeRatio
    const size = currentSize * controls.sizeMultiplier * (1 - alpha * 0.5)
    ctx.value!.save()
    ctx.value!.translate(particle.x, particle.y)
    ctx.value!.rotate(particle.rotation)
    ctx.value!.fillStyle = `${particle.color}${Math.floor(alpha * 255).toString(16).padStart(2, '0')}`
    ctx.value!.beginPath()
    ctx.value!.arc(0, 0, size, 0, Math.PI * 2)
    ctx.value!.fill()
    ctx.value!.restore()
    return true
  })
  if (particles.value.length > 0) {
    animationFrame.value = requestAnimationFrame(updateParticles)
  } else {
    animationFrame.value = null
  }
}

const handlePlay = () => {
  if (animationFrame.value) {
    cancelAnimationFrame(animationFrame.value)
    animationFrame.value = null
  }
  particles.value = []
  createParticle()
  animationFrame.value = requestAnimationFrame(updateParticles)
}

defineExpose({
  handlePlay
})

const initCanvas = () => {
  if (!canvas.value) return
  ctx.value = canvas.value.getContext('2d')
  const resizeCanvas = () => {
    if (!canvas.value) return
    canvas.value.width = canvas.value.offsetWidth
    canvas.value.height = canvas.value.offsetHeight
  }
  resizeCanvas()
  window.addEventListener('resize', resizeCanvas)
}

onMounted(() => {
  initCanvas()
})

onUnmounted(() => {
  if (animationFrame.value) {
    cancelAnimationFrame(animationFrame.value)
  }
  window.removeEventListener('resize', initCanvas)
})
</script>

<template>
  <div class="preview-area">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<style scoped>
.preview-area {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  background: white url(/images/grid.png);
  background-size: 80px 80px;
  background-position: calc(50% - 3px) 50%;
}
canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style> 