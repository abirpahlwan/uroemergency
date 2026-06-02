'use client'

import { useEffect, useRef } from 'react'

export default function DotBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const grainRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const grain = grainRef.current
    if (!canvas || !grain) return
    const ctx = canvas.getContext('2d')
    const gctx = grain.getContext('2d')
    if (!ctx || !gctx) return

    const spacing = 28
    const baseRadius = 1.5
    const mouse = { x: -9999, y: -9999 }
    const influence = 180

    let animId: number
    let t = 0

    const drawGrain = () => {
      const w = grain.width
      const h = grain.height
      const imageData = gctx.createImageData(w, h)
      const data = imageData.data
      for (let i = 0; i < data.length; i += 4) {
        const v = (Math.random() * 255) | 0
        data[i] = v
        data[i + 1] = v
        data[i + 2] = v
        data[i + 3] = Math.random() < 0.35 ? ((Math.random() * 12) | 0) : 0
      }
      gctx.putImageData(imageData, 0, 0)
    }

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      grain.width = window.innerWidth
      grain.height = window.innerHeight
      drawGrain()
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const cols = Math.ceil(canvas.width / spacing) + 1
      const rows = Math.ceil(canvas.height / spacing) + 1
      t += 0.018

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const bx = c * spacing
          const by = r * spacing
          const dx = bx - mouse.x
          const dy = by - mouse.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          const factor = Math.max(0, 1 - dist / influence)

          const phase = c * 1.3 + r * 1.7
          const jiggle = factor * 1.8
          const x = bx + Math.sin(t * 1.5 + phase) * jiggle
          const y = by + Math.cos(t * 1.5 + phase * 0.8) * jiggle

          const radius = baseRadius + factor * 3.5
          const alpha = 0.12 + factor * 0.35

          ctx.beginPath()
          ctx.arc(x, y, radius, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(0, 0, 0, ${alpha})`
          ctx.fill()
        }
      }

      animId = requestAnimationFrame(draw)
    }

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }

    const onLeave = () => {
      mouse.x = -9999
      mouse.y = -9999
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseleave', onLeave)
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  const canvasStyle: React.CSSProperties = {
    position: 'fixed',
    inset: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
  }

  return (
    <>
      <canvas ref={canvasRef} style={{ ...canvasStyle, zIndex: 0 }} />
      <canvas ref={grainRef} style={{ ...canvasStyle, zIndex: 1, mixBlendMode: 'multiply' }} />
    </>
  )
}
