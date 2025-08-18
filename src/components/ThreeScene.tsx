import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { throttle } from 'lodash'

export default function ThreeScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1_000)
    camera.position.z = 30

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
    renderer.setSize(canvas.clientWidth || 640, canvas.clientHeight || 480)
    renderer.setPixelRatio(window.devicePixelRatio)

    const ambient = new THREE.AmbientLight(0xffffff, 0.3)
    scene.add(ambient)

    const dir = new THREE.DirectionalLight(0xffffff, 0.8)
    dir.position.set(25, 25, 25)
    scene.add(dir)

    // Création des cubes avec optimisations
    const cubes: THREE.Mesh[] = []
    for (let i = 0; i < 20; i++) {
      const mat = new THREE.MeshPhongMaterial({ 
        color: Math.random() * 0xffffff, 
        shininess: 80 
      })
      const geo = new THREE.BoxGeometry(
        1 + Math.random(), 
        1 + Math.random(), 
        1 + Math.random()
      )
      const cube = new THREE.Mesh(geo, mat)
      cube.position.set(
        (Math.random() - 0.5) * 50, 
        (Math.random() - 0.5) * 50, 
        (Math.random() - 0.5) * 50
      )
      scene.add(cube)
      cubes.push(cube)
    }

    const animate = () => {
      // Animation optimisée
      cubes.forEach((cube, i) => {
        cube.rotation.x += 0.002 * ((i % 3) + 1)
        cube.rotation.y += 0.003 * ((i % 4) + 1)
      })
      
      renderer.render(scene, camera)
      requestAnimationFrame(animate)
    }
    animate()

    const onResize = throttle(() => {
      camera.aspect = canvas.clientWidth / canvas.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(canvas.clientWidth, canvas.clientHeight)
    }, 200)

    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      
      // Nettoyage optimisé
      cubes.forEach(cube => {
        if (cube.geometry) cube.geometry.dispose()
        if (cube.material) {
          if (Array.isArray(cube.material)) {
            cube.material.forEach((m: THREE.Material) => m.dispose())
          } else {
            cube.material.dispose()
          }
        }
      })
    }
  }, [])

  return (
    <canvas 
      ref={canvasRef} 
      className="rounded-xl border border-white/20 shadow-2xl w-full h-96" 
    />
  )
} 