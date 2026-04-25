<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const props = withDefaults(defineProps<{ count?: number }>(), { count: 42 })
const canvasRef = ref<HTMLCanvasElement | null>(null)

interface Flake {
  x: number
  y: number
  sz: number
  vx: number
  vy: number
  rot: number
  rotV: number
  op: number
}

let rafId = 0
let resizeObserver: ResizeObserver | null = null

function drawCrystal(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  rot: number,
  op: number,
) {
  ctx.save()
  ctx.translate(x, y)
  ctx.rotate(rot)
  ctx.globalAlpha = op
  ctx.strokeStyle = 'rgba(200,230,248,1)'
  ctx.lineWidth = size > 5 ? 0.9 : 0.6
  ctx.lineCap = 'round'
  const arms = 6
  for (let i = 0; i < arms; i++) {
    ctx.rotate((Math.PI * 2) / arms)
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.lineTo(0, size)
    ctx.stroke()
    const b1 = size * 0.42
    const b2 = size * 0.66
    const bw = size * 0.28
    ctx.beginPath()
    ctx.moveTo(0, b1)
    ctx.lineTo(bw, b1 + bw * 0.8)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(0, b1)
    ctx.lineTo(-bw, b1 + bw * 0.8)
    ctx.stroke()
    if (size > 5) {
      ctx.beginPath()
      ctx.moveTo(0, b2)
      ctx.lineTo(bw * 0.65, b2 + bw * 0.5)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(0, b2)
      ctx.lineTo(-bw * 0.65, b2 + bw * 0.5)
      ctx.stroke()
    }
    if (size > 7) {
      ctx.beginPath()
      ctx.arc(0, size, size * 0.07, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(210,238,252,0.8)'
      ctx.fill()
    }
  }
  ctx.globalAlpha = 1
  ctx.restore()
}

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  let w = 0
  let h = 0
  const resize = () => {
    w = canvas.offsetWidth
    h = canvas.offsetHeight
    canvas.width = w
    canvas.height = h
  }
  resize()

  const flakes: Flake[] = Array.from({ length: props.count }, () => ({
    x: Math.random() * (w || 400),
    y: Math.random() * (h || 600),
    sz: Math.random() * 9 + 3,
    vx: (Math.random() - 0.5) * 0.3,
    vy: Math.random() * 0.28 + 0.1,
    rot: Math.random() * Math.PI * 2,
    rotV: (Math.random() - 0.5) * 0.008,
    op: Math.random() * 0.45 + 0.15,
  }))

  const draw = () => {
    ctx.clearRect(0, 0, w, h)
    flakes.forEach((f) => {
      drawCrystal(ctx, f.x, f.y, f.sz, f.rot, f.op)
      f.x += f.vx
      f.y += f.vy
      f.rot += f.rotV
      if (f.y > h + f.sz * 2) {
        f.y = -f.sz * 2
        f.x = Math.random() * w
      }
      if (f.x < -20) f.x = w + 20
      if (f.x > w + 20) f.x = -20
    })
    rafId = requestAnimationFrame(draw)
  }
  draw()

  resizeObserver = new ResizeObserver(resize)
  resizeObserver.observe(canvas)
})

onUnmounted(() => {
  cancelAnimationFrame(rafId)
  resizeObserver?.disconnect()
})
</script>

<template>
  <canvas ref="canvasRef" class="snow-canvas" />
</template>

<style scoped>
.snow-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}
</style>
