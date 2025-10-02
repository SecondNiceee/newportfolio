"use client"

import * as THREE from "three"
import { useMemo, useState, useRef, useEffect } from "react"
import { createPortal, useFrame } from "@react-three/fiber"
import { useFBO } from "@react-three/drei"

import { DofPointsMaterial } from "./shaders/pointMaterial"
import { SimulationMaterial } from "./shaders/simulationMaterial"
import * as easing from "maath/easing"

export function Particles({
  speed,
  aperture,
  focus,
  size = 512,
  noiseScale = 1.0,
  noiseIntensity = 0.5,
  timeScale = 0.5,
  pointSize = 2.0,
  opacity = 1.0,
  planeScale = 1.0,
  useManualTime = false,
  manualTime = 0,
  introspect = false,
  ...props
}: {
  speed: number
  aperture: number
  focus: number
  size: number
  noiseScale?: number
  noiseIntensity?: number
  timeScale?: number
  pointSize?: number
  opacity?: number
  planeScale?: number
  useManualTime?: boolean
  manualTime?: number
  introspect?: boolean
}) {
  const [hasError, setHasError] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)

  const revealStartTime = useRef<number | null>(null)
  const [isRevealing, setIsRevealing] = useState(true)
  const revealDuration = 3.5 // seconds

  const [scene] = useState(() => new THREE.Scene())
  const [camera] = useState(() => new THREE.OrthographicCamera(-1, 1, 1, -1, 1 / Math.pow(2, 53), 1))
  const [positions] = useState(() => new Float32Array([-1, -1, 0, 1, -1, 0, 1, 1, 0, -1, -1, 0, 1, 1, 0, -1, 1, 0]))
  const [uvs] = useState(() => new Float32Array([0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0]))

  const particles = useMemo(() => {
    const length = size * size
    const particles = new Float32Array(length * 3)
    for (let i = 0; i < length; i++) {
      const i3 = i * 3
      particles[i3 + 0] = (i % size) / size
      particles[i3 + 1] = i / size / size
    }
    return particles
  }, [size])

  const simulationMaterial = useMemo(() => {
    try {
      return new SimulationMaterial(planeScale)
    } catch (error) {
      console.error("[v0] Failed to create SimulationMaterial:", error)
      setHasError(true)
      return null
    }
  }, [planeScale])

  const target = useFBO(size, size, {
    minFilter: THREE.NearestFilter,
    magFilter: THREE.NearestFilter,
    format: THREE.RGBAFormat,
    type: THREE.FloatType,
  })

  const dofPointsMaterial = useMemo(() => {
    if (!simulationMaterial || !target) return null

    try {
      const m = new DofPointsMaterial()
      if (m.uniforms && target.texture) {
        m.uniforms.positions.value = target.texture
        if (simulationMaterial.uniforms && simulationMaterial.uniforms.positions) {
          m.uniforms.initialPositions.value = simulationMaterial.uniforms.positions.value
        }
      }
      return m
    } catch (error) {
      console.error("[v0] Failed to create DofPointsMaterial:", error)
      setHasError(true)
      return null
    }
  }, [simulationMaterial, target])

  useEffect(() => {
    if (simulationMaterial && dofPointsMaterial && target && !hasError) {
      setIsInitialized(true)
    }
  }, [simulationMaterial, dofPointsMaterial, target, hasError])

  useFrame((state, delta) => {
    if (hasError || !isInitialized || !dofPointsMaterial || !simulationMaterial || !target) {
      return
    }

    if (!state.gl || !state.gl.getContext()) {
      console.error("[v0] WebGL context not available")
      setHasError(true)
      return
    }

    try {
      state.gl.setRenderTarget(target)
      state.gl.clear()
      state.gl.render(scene, camera)
      state.gl.setRenderTarget(null)

      const currentTime = useManualTime ? manualTime : state.clock.elapsedTime

      if (revealStartTime.current === null) {
        revealStartTime.current = currentTime
      }

      const revealElapsed = currentTime - revealStartTime.current
      const revealProgress = Math.min(revealElapsed / revealDuration, 1.0)

      const easedProgress = 1 - Math.pow(1 - revealProgress, 3)

      const revealFactor = easedProgress * 4.0

      if (revealProgress >= 1.0 && isRevealing) {
        setIsRevealing(false)
      }

      if (dofPointsMaterial.uniforms) {
        if (dofPointsMaterial.uniforms.uTime) dofPointsMaterial.uniforms.uTime.value = currentTime
        if (dofPointsMaterial.uniforms.uFocus) dofPointsMaterial.uniforms.uFocus.value = focus
        if (dofPointsMaterial.uniforms.uBlur) dofPointsMaterial.uniforms.uBlur.value = aperture

        if (dofPointsMaterial.uniforms.uTransition) {
          easing.damp(
            dofPointsMaterial.uniforms.uTransition,
            "value",
            introspect ? 1.0 : 0.0,
            introspect ? 0.35 : 0.2,
            delta,
          )
        }

        if (dofPointsMaterial.uniforms.uPointSize) dofPointsMaterial.uniforms.uPointSize.value = pointSize
        if (dofPointsMaterial.uniforms.uOpacity) dofPointsMaterial.uniforms.uOpacity.value = opacity
        if (dofPointsMaterial.uniforms.uRevealFactor) dofPointsMaterial.uniforms.uRevealFactor.value = revealFactor
        if (dofPointsMaterial.uniforms.uRevealProgress) dofPointsMaterial.uniforms.uRevealProgress.value = easedProgress
      }

      if (simulationMaterial.uniforms) {
        if (simulationMaterial.uniforms.uTime) simulationMaterial.uniforms.uTime.value = currentTime
        if (simulationMaterial.uniforms.uNoiseScale) simulationMaterial.uniforms.uNoiseScale.value = noiseScale
        if (simulationMaterial.uniforms.uNoiseIntensity)
          simulationMaterial.uniforms.uNoiseIntensity.value = noiseIntensity
        if (simulationMaterial.uniforms.uTimeScale) simulationMaterial.uniforms.uTimeScale.value = timeScale * speed
      }
    } catch (error) {
      console.error("[v0] Error in useFrame:", error)
      setHasError(true)
    }
  })

  if (hasError) {
    return null // Fail silently to prevent breaking the page
  }

  if (!isInitialized || !simulationMaterial || !dofPointsMaterial) {
    return null // Don't render until fully initialized
  }

  return (
    <>
      {createPortal(
        <mesh material={simulationMaterial}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[positions, 3]} />
            <bufferAttribute attach="attributes-uv" args={[uvs, 2]} />
          </bufferGeometry>
        </mesh>,
        scene,
      )}
      <points material={dofPointsMaterial} {...props}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[particles, 3]} />
        </bufferGeometry>
      </points>
    </>
  )
}
