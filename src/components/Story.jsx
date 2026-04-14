import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from '../assets/images2.jpg'

const Story = () => {
  const sectionRef = useRef(null)
  const textRef = useRef(null)
  const imageRef = useRef(null)
  const timelineRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section fade in
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 85%",
        onEnter: () => {
          gsap.to(sectionRef.current, { opacity: 1, duration: 0.8 })
        }
      })

      // Text reveal line by line
      const paragraphs = textRef.current.querySelectorAll('p')
      paragraphs.forEach((p, i) => {
        ScrollTrigger.create({
          trigger: p,
          start: "top 85%",
          onEnter: () => {
            gsap.fromTo(p,
              { opacity: 0, y: 30, filter: "blur(5px)" },
              { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, delay: i * 0.15, ease: "power2.out" }
            )
          }
        })
      })

      // Image frame reveal
      ScrollTrigger.create({
        trigger: imageRef.current,
        start: "top 80%",
        onEnter: () => {
          gsap.fromTo(imageRef.current,
            { scale: 0.85, opacity: 0, rotateZ: -2 },
            { scale: 1, opacity: 1, rotateZ: 0, duration: 1.2, ease: "power3.out" }
          )
        }
      })

      // Timeline items
      timelineRef.current.forEach((item, i) => {
        ScrollTrigger.create({
          trigger: item,
          start: "top 85%",
          onEnter: () => {
            gsap.fromTo(item,
              { opacity: 0, x: i % 2 === 0 ? -40 : 40 },
              { opacity: 1, x: 0, duration: 0.6, delay: i * 0.1, ease: "power2.out" }
            )
          }
        })
      })
    })

    return () => ctx.revert()
  }, [])

  const timelineEvents = [
    { year: "2026", event: "First message on Chatta", desc: "A simple 'hello' that changed everything" },
    { year: "2026", event: "First voice call", desc: "Your laughter became my favorite sound" },
    { year: "2026", event: "Every single day", desc: "Falling deeper with every conversation" },
    { year: "Present", event: "Forever", desc: "You mean everything to me" }
  ]

  return (
    <section ref={sectionRef} id="story" className="py-32 px-6 md:px-12 opacity-0 bg-[#fdfaf7]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <span className="text-xs tracking-[0.3em] uppercase text-[#c9a87b] font-semibold">Chapter One</span>
          <h2 className="font-serif text-5xl md:text-6xl font-light text-[#2c2c2c] mt-4">The Beginning</h2>
          <div className="divider"></div>
          <p className="text-[#888] max-w-2xl mx-auto mt-4 font-light">A story that started with a single notification and became my entire world</p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div ref={textRef} className="space-y-6">
            <p className="text-[#444] text-lg leading-relaxed font-light">
              It started with a simple message on <span className="text-[#c9a87b] font-medium">Chatta</span>.
              A platform designed for strangers, but destiny had other plans. It brought me my entire world.
            </p>
            <p className="text-[#444] text-lg leading-relaxed font-light">
              Your words painted pictures I'd never seen. Your laughter through texts echoed in my mind for hours.
              The way you see the world with such wonder, such depth it pulled me into a beautiful gravity 
              I never wanted to escape.
            </p>
            <p className="text-[#444] text-lg leading-relaxed font-light">
              <span className="font-medium text-[#2c2c2c]">Babe</span>, you became the first thought of my morning,
              the last whisper of my night, and everything beautiful in between.
            </p>
            <div className="pt-4">
              <div className="divider-thin"></div>
              <p className="text-[#c9a87b] italic mt-4 text-lg">"Some souls just recognize each other instantly. You are mine."</p>
              <p className="text-[#999] text-sm mt-2">— Forever yours, always.</p>
            </div>
          </div>

          <div className="premium-frame" ref={imageRef} style={{ opacity: 0 }}>
            <img 
              src={Image} 
              alt="Babe portrait" 
              className="w-full h-full object-cover aspect-[4/5]"
            />
            <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-xs text-[#c9a87b] tracking-wider">
              ✦ MY BABE ✦
            </div>
          </div>
        </div>

        {/* Timeline Section */}
        <div className="mt-32">
          <div className="text-center mb-16">
            <span className="text-xs tracking-[0.3em] uppercase text-[#c9a87b] font-semibold">Our Journey</span>
            <h3 className="font-serif text-3xl md:text-4xl font-light text-[#2c2c2c] mt-2">Every moment matters</h3>
            <div className="divider-thin"></div>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            {timelineEvents.map((item, idx) => (
              <div
                key={idx}
                ref={el => timelineRef.current[idx] = el}
                className="text-center p-6 bg-white/50 border border-[#e8ddd0] opacity-0"
              >
                <div className="text-3xl font-serif text-[#c9a87b] mb-2">{item.year}</div>
                <div className="w-8 h-px bg-[#c9a87b] mx-auto my-3"></div>
                <p className="text-[#2c2c2c] font-medium text-sm tracking-wide">{item.event}</p>
                <p className="text-[#888] text-xs mt-2 font-light">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-3 gap-8 mt-24 pt-12 border-t border-[#e8ddd0]">
          <div className="text-center">
            <div className="text-4xl font-serif text-[#c9a87b] mb-2">∞</div>
            <p className="text-[#2c2c2c] text-sm tracking-wider uppercase">Infinite Love</p>
            <p className="text-[#999] text-xs mt-1">Beyond measure</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-serif text-[#c9a87b] mb-2">❤️</div>
            <p className="text-[#2c2c2c] text-sm tracking-wider uppercase">Unconditional</p>
            <p className="text-[#999] text-xs mt-1">No boundaries</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-serif text-[#c9a87b] mb-2">✨</div>
            <p className="text-[#2c2c2c] text-sm tracking-wider uppercase">Everlasting</p>
            <p className="text-[#999] text-xs mt-1">For all time</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Story
