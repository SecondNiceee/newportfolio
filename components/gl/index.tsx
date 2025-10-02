"use client"

// import { EffectComposer, ShaderPass } from "@react-three/postprocessing"
import { Canvas } from "@react-three/fiber"
import { Particles } from "./particles"
import { VignetteShader } from "./shaders/vignetteShader"
import { useEffect, useState, useRef } from "react"

export const GL = ({ hovering }: { hovering: boolean }) => {
  const [isMounted, setIsMounted] = useState(false)
  const [hasWebGL, setHasWebGL] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    // Check if we're in browser environment
    if (typeof window === "undefined") return

    // Test WebGL support
    try {
      const canvas = document.createElement("canvas")
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl")

      if (!gl) {
        setError("WebGL not supported")
        return
      }

      // Test if WebGL context is working
      const testShader = gl.createShader(gl.VERTEX_SHADER)
      if (!testShader) {
        setError("WebGL shader creation failed")
        return
      }

      gl.deleteShader(testShader)
      setHasWebGL(true)
    } catch (err) {
      console.error("[v0] WebGL detection error:", err)
      setError("WebGL initialization failed")
      return
    }

    setIsMounted(true)
  }, [])

  if (!isMounted || !hasWebGL || error) {
    return (
      <div className="absolute inset-0 bg-transparent flex items-center justify-center">
        {error && <div className="text-white/50 text-sm">{error}</div>}
      </div>
    )
  }

  const config = {
    speed: 1.0,
    focus: 3.8,
    aperture: 1.79,
    size: 512,
    noiseScale: 0.6,
    noiseIntensity: 0.52,
    timeScale: 1,
    pointSize: 10.0,
    opacity: 0.8,
    planeScale: 10.0,
    vignetteDarkness: 1.5,
    vignetteOffset: 0.4,
    useManualTime: false,
    manualTime: 0,
  }

  try {
    return (
      <div id="webgl">
        <Canvas
          ref={canvasRef}
          camera={{
            position: [1.2629783123314589, 2.664606471394044, -1.8178993743288914],
            fov: 50,
            near: 0.01,
            far: 300,
          }}
          onCreated={(state) => {
            // Validate all required state properties
            if (!state || !state.gl || !state.scene || !state.camera) {
              console.error("[v0] WebGL context not properly initialized")
              setError("WebGL context initialization failed")
              return
            }

            // Test WebGL context functionality
            try {
              const gl = state.gl.getContext()
              if (!gl || gl.isContextLost()) {
                setError("WebGL context lost")
                return
              }
            } catch (err) {
              console.error("[v0] WebGL context test failed:", err)
              setError("WebGL context test failed")
            }
          }}
          onError={(error) => {
            console.error("[v0] Canvas error:", error)
            setError("Canvas rendering error")
          }}
        >
          <Particles
            speed={config.speed}
            aperture={config.aperture}
            focus={config.focus}
            size={config.size}
            noiseScale={config.noiseScale}
            noiseIntensity={config.noiseIntensity}
            timeScale={config.timeScale}
            pointSize={config.pointSize}
            opacity={config.opacity}
            planeScale={config.planeScale}
            useManualTime={config.useManualTime}
            manualTime={config.manualTime}
            introspect={hovering}
          />
          {/* Temporarily disabled post-processing effects */}
          {/* <EffectComposer multisampling={0} disableGamma>
            <ShaderPass
              args={[VignetteShader]}
              uniforms-darkness-value={config.vignetteDarkness}
              uniforms-offset-value={config.vignetteOffset}
            />
          </EffectComposer> */}
        </Canvas>
      </div>
    )
  } catch (error) {
    console.error("[v0] WebGL rendering error:", error)
    return (
      <div className="absolute inset-0 bg-transparent flex items-center justify-center">
        <div className="text-white/50 text-sm">Rendering error occurred</div>
      </div>
    )
  }
}
