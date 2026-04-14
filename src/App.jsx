import React, { useState, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from '@studio-freight/lenis'
import Hero from './components/Hero'
import Story from './components/Story'
import Gallery from './components/Gallery'
import FinalMessage from './components/FinalMessage'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 4
      })
    }, 80)

    // Smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    // Loader
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2200)

    // Cursor follower
    const cursor = document.querySelector('.cursor-follower')
    const handleMouseMove = (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.2,
        ease: "power2.out"
      })
    }
    window.addEventListener('mousemove', handleMouseMove)

    // Magnetic buttons effect
    const buttons = document.querySelectorAll('.magnetic')
    buttons.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect()
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2
        gsap.to(btn, {
          x: x * 0.15,
          y: y * 0.15,
          duration: 0.3,
          ease: "power2.out"
        })
      })
      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.4,
          ease: "elastic.out(1, 0.5)"
        })
      })
    })

    return () => {
      clearTimeout(timer)
      clearInterval(interval)
      window.removeEventListener('mousemove', handleMouseMove)
      lenis.destroy()
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  if (loading) {
    return (
      <div className="loader">
        <div className="loader-text">BABE · MY EVERYTHING</div>
        <div className="loader-bar"></div>
        <div className="loader-number">{progress}%</div>
      </div>
    )
  }

  return (
    <main className="bg-[#fdfaf7]">
      <Hero />
      <Story />
      <Gallery />
      <FinalMessage />
    </main>
  )
}

export default App