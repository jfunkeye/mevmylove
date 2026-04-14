import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const FinalMessage = () => {
  const sectionRef = useRef(null)
  const heartRef = useRef(null)
  const textRef = useRef(null)
  const quotesRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 80%",
        onEnter: () => {
          gsap.fromTo(textRef.current,
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
          )
        }
      })

      // Floating heart animation
      gsap.to(heartRef.current, {
        scale: 1.1,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      })

      // Quotes animation
      quotesRef.current.forEach((quote, i) => {
        ScrollTrigger.create({
          trigger: quote,
          start: "top 85%",
          onEnter: () => {
            gsap.fromTo(quote,
              { opacity: 0, y: 30, scale: 0.95 },
              { opacity: 1, y: 0, scale: 1, duration: 0.6, delay: i * 0.15, ease: "back.out(0.8)" }
            )
          }
        })
      })
    })

    return () => ctx.revert()
  }, [])

  const quotes = [
    "You are my greatest adventure and my safest home.",
    "Every love story is beautiful, but ours is my favorite.",
    "Thank you for being the reason I believe in magic."
  ]

  return (
    <section ref={sectionRef} className="min-h-screen flex items-center justify-center px-6 py-32 bg-[#fdfaf7]">
      <div className="max-w-5xl mx-auto">
        <div ref={textRef} className="text-center opacity-0">
          <div ref={heartRef} className="inline-block mb-8">
            <span className="text-7xl">❤️</span>
          </div>
          
          <h2 className="font-serif text-5xl md:text-7xl font-light text-[#2c2c2c] leading-tight">
            You Mean Everything to Me
          </h2>
          
          <div className="divider"></div>
          
          <p className="text-[#444] text-lg md:text-xl leading-relaxed font-light max-w-2xl mx-auto">
            From our first message on Chatta to this very moment you have been my greatest blessing.
            Your beauty, your soul, your existence I cherish every part of you.
          </p>
          
          {/* Quotes section */}
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            {quotes.map((quote, idx) => (
              <div
                key={idx}
                ref={el => quotesRef.current[idx] = el}
                className="p-6 bg-white/50 border border-[#e8ddd0] opacity-0"
              >
                <p className="text-[#c9a87b] text-3xl mb-3">“</p>
                <p className="text-[#555] text-sm leading-relaxed italic">{quote}</p>
                <div className="divider-thin mt-4"></div>
                <p className="text-[#c9a87b] text-[10px] tracking-wider mt-2">BABE</p>
              </div>
            ))}
          </div>
          
          <p className="text-[#c9a87b] text-sm tracking-wider mt-12 uppercase">Forever yours, always</p>
          
          <div className="mt-12">
            <div className="inline-block border-t border-[#e8ddd0] pt-8">
              <p className="text-[#999] text-xs tracking-wider">✦ A love story written in the stars ✦</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FinalMessage