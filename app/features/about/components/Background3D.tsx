import { useEffect, useRef } from 'react'

export function Background3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let width = 0
    let height = 0

    interface Star {
      x: number
      y: number
      z: number
      px: number
      py: number
    }

    const stars: Star[] = []
    const STAR_COUNT = 800
    const SPEED = 0.3

    function resize() {
      width = canvas!.width = canvas!.offsetWidth * window.devicePixelRatio
      height = canvas!.height = canvas!.offsetHeight * window.devicePixelRatio
    }

    function initStars() {
      stars.length = 0
      for (let i = 0; i < STAR_COUNT; i++) {
        stars.push({
          x: Math.random() * width - width / 2,
          y: Math.random() * height - height / 2,
          z: Math.random() * width,
          px: 0,
          py: 0,
        })
      }
    }

    function draw() {
      ctx!.fillStyle = 'rgba(0, 0, 0, 0.15)'
      ctx!.fillRect(0, 0, width, height)

      const cx = width / 2
      const cy = height / 2

      for (const star of stars) {
        star.z -= SPEED

        if (star.z <= 0) {
          star.x = Math.random() * width - cx
          star.y = Math.random() * height - cy
          star.z = width
          star.px = cx + (star.x / star.z) * width
          star.py = cy + (star.y / star.z) * height
        }

        const sx = cx + (star.x / star.z) * width
        const sy = cy + (star.y / star.z) * height
        const size = Math.max(0, (1 - star.z / width) * 2.5)
        const opacity = Math.max(0, (1 - star.z / width) * 0.8)

        // Draw trail
        ctx!.strokeStyle = `rgba(255, 0, 34, ${opacity * 0.3})`
        ctx!.lineWidth = size * 0.5
        ctx!.beginPath()
        ctx!.moveTo(star.px, star.py)
        ctx!.lineTo(sx, sy)
        ctx!.stroke()

        // Draw star
        ctx!.fillStyle = `rgba(255, 80, 100, ${opacity})`
        ctx!.beginPath()
        ctx!.arc(sx, sy, size, 0, Math.PI * 2)
        ctx!.fill()

        star.px = sx
        star.py = sy
      }

      animationId = requestAnimationFrame(draw)
    }

    resize()
    initStars()
    draw()

    const handleResize = () => {
      resize()
      initStars()
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div className="absolute inset-0 -z-20 opacity-40">
      <canvas
        ref={canvasRef}
        style={{ width: '100%', height: '100%', display: 'block' }}
      />
    </div>
  )
}
