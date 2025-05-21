<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'

const props = defineProps<{
  controls?: {
    burst: boolean
    amount: number
    lifetime: number
    startSpeed: number
    gravity: number
    startSize: number
    endSize: number
    fadeInPoint: number
    fadeOutPoint: number
    startRotation: number
    minRandomSpin: number
    maxRandomSpin: number
    trailLifetime: number
    trailWidth: number
    color: string
    spawnRate: number
    acceleration: number
    texture: string
    minSpawnAngle: number
    maxSpawnAngle: number
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
const lastSpawnTime = ref<number>(0)
const particleTexture = ref<HTMLImageElement | null>(null)

const createParticle = () => {
  const centerX = canvas.value?.width ? canvas.value.width / 2 : 0
  const centerY = canvas.value?.height ? canvas.value.height / 2 : 0
  
  const controls = props.controls || {
    burst: false,
    amount: 2.4,
    lifetime: 2.75,
    startSpeed: 0.82,
    gravity: 0,
    startSize: 10,
    endSize: 2,
    fadeInPoint: 0.07,
    fadeOutPoint: 0.21,
    startRotation: 0,
    minRandomSpin: 25,
    maxRandomSpin: 90,
    trailLifetime: 0.09,
    trailWidth: 0.05,
    color: '#ff5722',
    spawnRate: 0.1,
    acceleration: 0,
    texture: '/images/star_01.png',
    minSpawnAngle: 0,
    maxSpawnAngle: 360
  }
  
  const numParticles = Math.floor(controls.amount)
  for (let i = 0; i < numParticles; i++) {
    // Convert angles to radians and calculate random angle within range
    const minAngleRad = (controls.minSpawnAngle * Math.PI) / 180
    const maxAngleRad = (controls.maxSpawnAngle * Math.PI) / 180
    const angle = minAngleRad + Math.random() * (maxAngleRad - minAngleRad)
    
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
      maxLife: controls.lifetime * (0.8 + Math.random() * 0.4),
      size: controls.startSize * (0.8 + Math.random() * 0.4),
      color: controls.color,
      rotation: startRotationRad,
      angularVelocity: minSpinRad + Math.random() * (maxSpinRad - minSpinRad)
    })
  }
}

const loadTexture = () => {
  const controls = props.controls || {}
  if (controls.texture) {
    const img = new Image()
    img.onload = () => {
      particleTexture.value = img
    }
    img.src = controls.texture
  }
}

watch(() => props.controls?.texture, () => {
  loadTexture()
})

const updateParticles = () => {
  if (!ctx.value) return
  ctx.value.clearRect(0, 0, canvas.value?.width || 0, canvas.value?.height || 0)
  const controls = props.controls || {
    burst: false,
    amount: 2.4,
    lifetime: 2.75,
    startSpeed: 0.82,
    gravity: 0,
    startSize: 10,
    endSize: 2,
    fadeInPoint: 0.07,
    fadeOutPoint: 0.21,
    startRotation: 0,
    minRandomSpin: 25,
    maxRandomSpin: 90,
    trailLifetime: 0.09,
    trailWidth: 0.05,
    color: '#ff5722',
    spawnRate: 0.1,
    acceleration: 0,
    texture: '/images/star_01.png',
    minSpawnAngle: 0,
    maxSpawnAngle: 360
  }

  // Handle continuous spawning when burst is false
  if (!controls.burst) {
    const currentTime = performance.now()
    const timeSinceLastSpawn = (currentTime - lastSpawnTime.value) / 1000 // Convert to seconds
    if (timeSinceLastSpawn >= 1 / controls.spawnRate) {
      createParticle()
      lastSpawnTime.value = currentTime
    }
  }

  particles.value = particles.value.filter(particle => {
    particle.life += 0.016
    if (particle.life >= particle.maxLife) return false

    // Apply acceleration to velocity
    const speed = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy)
    if (speed > 0) {
      const accelerationFactor = 1 + (controls.acceleration * 0.016)
      particle.vx *= accelerationFactor
      particle.vy *= accelerationFactor
    }

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
    const size = controls.startSize + (controls.endSize - controls.startSize) * lifeRatio
    
    ctx.value!.save()
    ctx.value!.translate(particle.x, particle.y)
    ctx.value!.rotate(particle.rotation)
    ctx.value!.globalAlpha = alpha

    if (particleTexture.value) {
      const baseSize = 32 // Base size of the texture
      const drawSize = baseSize * size // Multiply by the size factor
      
      // Create a temporary canvas for color tinting
      const tempCanvas = document.createElement('canvas')
      tempCanvas.width = drawSize
      tempCanvas.height = drawSize
      const tempCtx = tempCanvas.getContext('2d')!
      
      // Draw the texture
      tempCtx.drawImage(
        particleTexture.value,
        0, 0,
        drawSize,
        drawSize
      )
      
      // Apply color tint
      tempCtx.globalCompositeOperation = 'source-in'
      tempCtx.fillStyle = particle.color
      tempCtx.fillRect(0, 0, drawSize, drawSize)
      
      // Draw the tinted texture
      ctx.value!.drawImage(
        tempCanvas,
        -drawSize / 2,
        -drawSize / 2,
        drawSize,
        drawSize
      )
    } else {
      // Fallback to circle if no texture is loaded
      ctx.value!.fillStyle = `${particle.color}${Math.floor(alpha * 255).toString(16).padStart(2, '0')}`
      ctx.value!.beginPath()
      ctx.value!.arc(0, 0, size, 0, Math.PI * 2)
      ctx.value!.fill()
    }
    
    ctx.value!.restore()
    return true
  })
  
  if (particles.value.length > 0 || !controls.burst) {
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
  lastSpawnTime.value = performance.now()
  
  const controls = props.controls || {
    burst: false,
    amount: 2.4,
    lifetime: 2.75,
    startSpeed: 0.82,
    gravity: 0,
    startSize: 10,
    endSize: 2,
    fadeInPoint: 0.07,
    fadeOutPoint: 0.21,
    startRotation: 0,
    minRandomSpin: 25,
    maxRandomSpin: 90,
    trailLifetime: 0.09,
    trailWidth: 0.05,
    color: '#ff5722',
    spawnRate: 0.1,
    acceleration: 0,
    texture: '/images/star_01.png',
    minSpawnAngle: 0,
    maxSpawnAngle: 360
  }

  if (controls.burst) {
    createParticle()
  }
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
  loadTexture()
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
    <canvas ref="canvas" class="canvas"></canvas>
  </div>
</template>

<style scoped>
.preview-area {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}
.canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style> 