"use client"

import { useEffect, useRef } from "react"

export const WebGLBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext("webgl")
    if (!gl) {
      console.error("WebGL not supported")
      return
    }

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      gl.viewport(0, 0, canvas.width, canvas.height)
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Vertex shader
    const vertexShaderSource = `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `

    const fragmentShaderSource = `
      precision mediump float;
      uniform vec2 resolution;
      uniform float time;

      void main() {
        vec2 uv = gl_FragCoord.xy / resolution;
        
        // Create multiple animated wave patterns
        float wave1 = sin(uv.x * 4.0 + time * 0.3) * 0.5 + 0.5;
        float wave2 = cos(uv.y * 3.0 - time * 0.2) * 0.5 + 0.5;
        float wave3 = sin((uv.x + uv.y) * 2.5 + time * 0.25) * 0.5 + 0.5;
        float wave4 = cos(uv.x * uv.y * 5.0 + time * 0.15) * 0.5 + 0.5;
        
        // Create radial gradient from center
        vec2 center = vec2(0.5, 0.5);
        float dist = distance(uv, center);
        float radial = 1.0 - smoothstep(0.0, 1.0, dist);
        
        // Mix waves with radial gradient
        float pattern = (wave1 * 0.3 + wave2 * 0.25 + wave3 * 0.25 + wave4 * 0.2);
        pattern = mix(pattern, radial, 0.3);
        
        // Darker color palette with multiple gradient stops
        vec3 color1 = vec3(0.0, 0.0, 0.0); // pure black
        vec3 color2 = vec3(0.02, 0.05, 0.15); // very dark blue
        vec3 color3 = vec3(0.03, 0.08, 0.25); // dark blue
        vec3 color4 = vec3(0.01, 0.03, 0.12); // darker blue
        vec3 color5 = vec3(0.0, 0.0, 0.0); // pure black
        
        // Multi-stop gradient based on vertical position
        vec3 gradient;
        if (uv.y < 0.25) {
          gradient = mix(color1, color2, uv.y * 4.0);
        } else if (uv.y < 0.5) {
          gradient = mix(color2, color3, (uv.y - 0.25) * 4.0);
        } else if (uv.y < 0.75) {
          gradient = mix(color3, color4, (uv.y - 0.5) * 4.0);
        } else {
          gradient = mix(color4, color5, (uv.y - 0.75) * 4.0);
        }
        
        // Add diagonal gradient overlay
        float diagonal = (uv.x + uv.y) * 0.5;
        vec3 diagonalColor = mix(vec3(0.01, 0.02, 0.08), vec3(0.02, 0.06, 0.18), diagonal);
        gradient = mix(gradient, diagonalColor, 0.2);
        
        // Apply pattern with subtle animation
        gradient = mix(gradient, gradient * 1.15, pattern * 0.2);
        
        // Add vignette effect for darker edges
        float vignette = smoothstep(0.8, 0.2, dist);
        gradient *= vignette * 0.7 + 0.3;
        
        gl_FragColor = vec4(gradient, 1.0);
      }
    `

    // Compile shader
    const compileShader = (source: string, type: number) => {
      const shader = gl.createShader(type)
      if (!shader) return null
      gl.shaderSource(shader, source)
      gl.compileShader(shader)
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl.getShaderInfoLog(shader))
        gl.deleteShader(shader)
        return null
      }
      return shader
    }

    const vertexShader = compileShader(vertexShaderSource, gl.VERTEX_SHADER)
    const fragmentShader = compileShader(fragmentShaderSource, gl.FRAGMENT_SHADER)

    if (!vertexShader || !fragmentShader) return

    // Create program
    const program = gl.createProgram()
    if (!program) return

    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(program))
      return
    }

    // Create buffer for full-screen quad
    const positionBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    const positions = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1])
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW)

    const positionLocation = gl.getAttribLocation(program, "position")
    gl.enableVertexAttribArray(positionLocation)
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0)

    // Get uniform locations
    const resolutionLocation = gl.getUniformLocation(program, "resolution")
    const timeLocation = gl.getUniformLocation(program, "time")

    // Animation loop
    const startTime = Date.now()
    const animate = () => {
      const currentTime = (Date.now() - startTime) / 1000

      gl.uniform2f(resolutionLocation, canvas.width, canvas.height)
      gl.uniform1f(timeLocation, currentTime)

      gl.clearColor(0, 0, 0, 1)
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full -z-10" style={{ pointerEvents: "none" }} />
}
