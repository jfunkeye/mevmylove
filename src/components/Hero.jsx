import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const Hero = () => {
  const heroRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const ctaRef = useRef(null)
  const bgRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background parallax
      gsap.to(bgRef.current, {
        y: 100,
        duration: 1,
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5
        }
      })

      // Title letter animation with rotation
      const title = titleRef.current
      const letters = title.innerText.split('')
      title.innerHTML = letters.map(letter => 
        letter === ' ' ? '&nbsp;' : `<span class="inline-block opacity-0 translate-y-16 rotate-6">${letter}</span>`
      ).join('')
      
      const spans = title.querySelectorAll('span')
      gsap.to(spans, {
        y: 0,
        rotate: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.04,
        delay: 0.3,
        ease: "back.out(1.2)"
      })

      // Subtitle with text reveal
      gsap.fromTo(subtitleRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, delay: 0.9, ease: "power3.out" }
      )

      // CTA buttons with bounce
      gsap.fromTo(ctaRef.current.children,
        { opacity: 0, scale: 0.8, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.6, stagger: 0.12, delay: 1.2, ease: "elastic.out(1, 0.4)" }
      )
    })

    return () => ctx.revert()
  }, [])

  return (
    <section ref={heroRef} className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden bg-[#fdfaf7]">
      <div ref={bgRef} className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-[#c9a87b]/5 blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-[#c9a87b]/5 blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto text-center relative z-10">
        <div className="mb-6">
          <span className="text-xs tracking-[0.3em] text-[#c9a87b] font-light uppercase">A Love Story</span>
        </div>
        
        <div className="mb-8 overflow-hidden">
          <h1 ref={titleRef} className="font-serif text-7xl md:text-8xl lg:text-9xl font-light tracking-tight text-[#2c2c2c] leading-[1.1]">
            To My Babe
          </h1>
        </div>
        
        <div ref={subtitleRef} className="opacity-0">
          <p className="text-[#888] text-base md:text-lg tracking-wide max-w-xl mx-auto leading-relaxed font-light">
            We met on Chatta. You became my universe.
          </p>
          <div className="divider"></div>
        </div>

        <div ref={ctaRef} className="flex flex-wrap gap-4 justify-center mt-12">
          <a href="#story" className="magnetic group relative px-10 py-3.5 overflow-hidden bg-[#2c2c2c] text-white text-sm tracking-wider uppercase inline-block transition-all duration-300 hover:bg-[#c9a87b]">
            <span className="relative z-10">Begin the story</span>
          </a>
          <a href="#gallery" className="magnetic group relative px-10 py-3.5 overflow-hidden border border-[#2c2c2c]/20 text-[#2c2c2c] text-sm tracking-wider uppercase inline-block hover:bg-[#2c2c2c] hover:text-white transition-all duration-500">
            <span className="relative z-10">Her gallery</span>
          </a>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-[#c9a87b] tracking-wider">SCROLL</span>
          <div className="w-px h-12 bg-[#c9a87b]/30"></div>
        </div>
      </div>
    </section>
  )
}

export default Hero