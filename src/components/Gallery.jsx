import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import radianceImg from '../assets/images2.jpg'
import graceImg from '../assets/3.jpg'
import movementVideo from '../assets/vid1.mp4'
import serenityImg from '../assets/5.jpg'
import joyImg from '../assets/7.jpg'
import memoryVideo from '../assets/vid2.mp4'
import newImage1 from '../assets/4.jpg'    
import newImage2 from '../assets/6.jpg'    
import newImage3 from '../assets/8.jpg' 

const Gallery = () => {
  const sectionRef = useRef(null)
  const itemsRef = useRef([])
  const [, setActiveIndex] = useState(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 80%",
        onEnter: () => {
          gsap.fromTo(".gallery-title",
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
          )
        }
      })

      itemsRef.current.forEach((item, i) => {
        ScrollTrigger.create({
          trigger: item,
          start: "top 85%",
          onEnter: () => {
            gsap.fromTo(item,
              { opacity: 0, y: 60, scale: 0.92, rotateZ: i % 2 === 0 ? -1 : 1 },
              { opacity: 1, y: 0, scale: 1, rotateZ: 0, duration: 0.8, delay: i * 0.08, ease: "power3.out" }
            )
          },
          once: true
        })
      })
    })

    return () => ctx.revert()
  }, [])

  const mediaItems = [
    { type: "image", src: radianceImg, alt: "Babe radiance", desc: "Radiance", caption: "Her light illuminates every room" },
    { type: "image", src: graceImg, alt: "Babe grace", desc: "Grace", caption: "Elegance in every gesture" },
    { type: "video", src: movementVideo, alt: "Babe in motion", desc: "Movement", caption: "Captured in beautiful motion" },
    { type: "image", src: serenityImg, alt: "Babe serenity", desc: "Serenity", caption: "Peace I found in her eyes" },
    { type: "image", src: joyImg, alt: "Babe joy", desc: "Joy", caption: "Her laughter is my favorite melody" },
    { type: "video", src: memoryVideo, alt: "Chatta memories", desc: "Memory", caption: "Where our story began" },
    { type: "image", src: newImage1, alt: "Babe beauty", desc: "Her Beautiful Soul", caption: "Beauty that words can't capture" },
    { type: "image", src: newImage2, alt: "Babe elegance", desc: "Timeless Elegance", caption: "Classic and eternal" },
    { type: "image", src: newImage3, alt: "Babe charm", desc: "Endless Charm", caption: "The charm that stole my heart" }
  ]

  return (
    <section ref={sectionRef} id="gallery" className="py-32 px-6 md:px-12 bg-[#fdfaf7]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20 gallery-title opacity-0">
          <span className="text-xs tracking-[0.3em] uppercase text-[#c9a87b] font-semibold">Chapter Two</span>
          <h2 className="font-serif text-5xl md:text-6xl font-light text-[#2c2c2c] mt-4">A Glimpse of Her</h2>
          <div className="divider"></div>
          <p className="text-[#888] max-w-xl mx-auto mt-4 font-light">Every frame holds a piece of the woman who owns my heart</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {mediaItems.map((item, index) => (
            <div
              key={index}
              ref={el => itemsRef.current[index] = el}
              className="polaroid opacity-0 cursor-pointer group"
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              <div className="relative overflow-hidden bg-[#f5f0eb] aspect-[3/4]">
                {item.type === "image" ? (
                  <img 
                    src={item.src} 
                    alt={item.alt}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                  />
                ) : (
                  <video 
                    src={item.src} 
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                  />
                )}
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-[#c9a87b]/0 group-hover:bg-[#c9a87b]/20 transition-all duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <span className="text-white text-xs tracking-wider uppercase bg-[#2c2c2c]/80 px-4 py-2 rounded-sm">View Memory</span>
                </div>
                
                {/* Number indicator */}
                <div className="number-stroke">{(index + 1).toString().padStart(2, '0')}</div>
              </div>
              
              <div className="p-4 text-center">
                <p className="text-[#2c2c2c] text-sm tracking-wide font-medium">{item.desc}</p>
                <p className="text-[#c9a87b] text-xs mt-1 italic">{item.caption}</p>
                <div className="divider-thin mt-3"></div>
                <p className="text-[#c9a87b] text-[10px] mt-2 tracking-wider">✦ FOR BABE ✦</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Gallery footer note */}
        <div className="text-center mt-16">
          <p className="text-[#999] text-xs tracking-wider font-light">9 moments · 1 love · Forever</p>
        </div>
      </div>
    </section>
  )
}

export default Gallery
