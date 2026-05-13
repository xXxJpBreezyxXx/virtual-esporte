"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { useCheckout } from "@/components/CheckoutProvider";

const slides = [
  {
    id: 0,
    type: "overlay",
    tag: "🇧🇷 RUMO AO HEXA",
    title1: "VISTA O MANTO",
    title2: "DO BRASIL",
    titleColor: "text-[#FFD700]",
    desc: "Virtual Esporte apresenta: a camisa da Seleção Brasileira com qualidade Tailandesa 1:1. Vista o padrão oficial e prepare-se para a Copa do Mundo 2026.",
    image: "/images/brazil_hero.jpeg",
    glowColor: "bg-transparent",
    isBrazil: true
  },
  {
    id: 1,
    type: "overlay",
    tag: "🏆 COPA DO MUNDO 2026",
    title1: "VISTA AS CORES",
    title2: "DO MUNDO",
    titleColor: "text-[#C9A84C]",
    desc: "As camisas de futebol mais desejadas do mercado. Importação premium com qualidade Tailandesa 1:1 e frete grátis para todo o Brasil.",
    image: "/images/Banner.jpeg",
    glowColor: "bg-transparent",
    isBrazil: false
  }
];

export default function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-play carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const { openCheckout } = useCheckout();
  const slide = slides[currentSlide];

  return (
    <section id="inicio" className="relative pt-24 pb-12 sm:pt-32 sm:pb-20 overflow-hidden min-h-[90vh] flex items-center">
      {/* Background patterns */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 -left-1/4 w-1/2 h-full bg-[#C9A84C] blur-[120px] rounded-full animate-blob mix-blend-screen" />
        <div className="absolute bottom-0 -right-1/4 w-1/2 h-full bg-[#00B8FF] blur-[120px] rounded-full animate-blob animation-delay-2000 mix-blend-screen" />
      </div>

      <div className="container mx-auto px-4 relative z-10 h-full w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            className="w-full h-full flex items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {slide.type === "split" ? (
              <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 h-full">
                {/* Text Content - Left on Desktop */}
                <div className="w-full lg:w-1/2 text-center lg:text-left">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="inline-flex items-center gap-2 mb-4 px-4 py-1 border border-[#00B8FF]/50 rounded-full text-[#00B8FF] font-semibold tracking-widest text-sm uppercase bg-[#00B8FF]/10"
                  >
                    <span className="w-2 h-2 rounded-full bg-[#E61D25] animate-pulse"></span>
                    {slide.tag}
                  </motion.div>

                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bebas-neue mb-4 leading-[0.85] text-white"
                  >
                    {slide.title1}<br />
                    <span className={slide.titleColor}>{slide.title2}</span>
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-lg sm:text-xl text-gray-300 mb-8 max-w-xl mx-auto lg:mx-0"
                  >
                    {slide.desc}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
                  >
                    {slide.isBrazil ? (
                      <a
                        href="#brasil"
                        className="inline-flex items-center justify-center gap-2 sm:gap-3 bg-gradient-to-r from-[#C9A84C] to-[#8C7335] text-[#020F2A] font-bold text-sm sm:text-lg px-5 py-2.5 sm:px-8 sm:py-4 rounded-full hover:scale-105 transition-transform shadow-[0_0_30px_rgba(201,168,76,0.3)] w-full sm:w-auto"
                      >
                        <ShoppingCart size={18} className="sm:w-[22px] sm:h-[22px]" />
                        <span className="uppercase tracking-wider">COMPRAR AGORA</span>
                      </a>
                    ) : (
                      <a
                        href="#selecoes"
                        className="inline-flex items-center justify-center gap-2 sm:gap-3 bg-gradient-to-r from-[#C9A84C] to-[#8C7335] text-[#020F2A] font-bold text-sm sm:text-lg px-5 py-2.5 sm:px-8 sm:py-4 rounded-full hover:scale-105 transition-transform shadow-[0_0_30px_rgba(201,168,76,0.3)] w-full sm:w-auto"
                      >
                        <ShoppingCart size={18} className="sm:w-[22px] sm:h-[22px]" />
                        <span className="uppercase tracking-wider">CONSULTAR PREÇO</span>
                      </a>
                    )}

                    <a
                      href="#selecoes"
                      className="inline-flex items-center justify-center gap-2 text-white font-semibold text-sm uppercase tracking-widest hover:text-[#C9A84C] transition-colors w-full sm:w-auto py-4"
                    >
                      Ver todas as seleções ↓
                    </a>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="mt-6 flex items-center justify-center lg:justify-start gap-4 text-xs text-gray-400 font-medium uppercase tracking-widest"
                  >
                    <span className="flex items-center gap-1"><span className="text-[#3CAC3B]">✔</span> Qualidade 1:1</span>
                    <span className="flex items-center gap-1"><span className="text-[#3CAC3B]">✔</span> Frete Grátis</span>
                  </motion.div>
                </div>

                {/* Image Content - Right on Desktop */}
                <motion.div
                  initial={{ opacity: 0, x: 20, rotateY: -10 }}
                  animate={{ opacity: 1, x: 0, rotateY: 0 }}
                  transition={{ duration: 1, delay: 0.3, type: "spring", stiffness: 50 }}
                  className="w-full lg:w-1/2 flex justify-center perspective-[1000px]"
                >
                  <div className="relative w-full max-w-md xl:max-w-lg aspect-square">
                    {/* Glow effect behind image */}
                    <div className={`absolute inset-0 ${slide.glowColor} blur-[100px] rounded-full opacity-20 animate-pulse`} />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={slide.image}
                      alt={slide.title1}
                      className="w-full h-full object-contain relative z-10 drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] animate-float"
                      style={{ transformStyle: "preserve-3d" }}
                    />
                  </div>
                </motion.div>
              </div>
            ) : (
              /* Overlay Card Layout for Banner */
              <div className="w-full h-[60vh] sm:h-[70vh] md:h-[80vh] relative rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 group flex items-center">
                {/* Background Image */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={slide.image}
                  alt={slide.title1}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[10s] group-hover:scale-105"
                />

                {/* Dark Overlays for Readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent z-0" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020F2A]/90 via-transparent to-transparent z-0" />

                {/* Text Overlay */}
                <div className="relative z-10 p-6 sm:p-12 md:p-16 lg:p-24 max-w-3xl flex flex-col items-start text-left">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center gap-2 mb-3 px-3 py-1 border border-[#E61D25]/50 rounded-full text-white font-semibold tracking-widest text-[10px] sm:text-sm uppercase bg-[#E61D25]/80 backdrop-blur-md shadow-lg"
                  >
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                    {slide.tag}
                  </motion.div>
 
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-4xl sm:text-7xl md:text-8xl lg:text-9xl font-bebas-neue mb-3 leading-[0.9] text-white drop-shadow-2xl"
                  >
                    {slide.title1}<br />
                    <span className={slide.titleColor}>{slide.title2}</span>
                  </motion.h1>
 
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-sm sm:text-xl text-gray-200 mb-6 max-w-xl drop-shadow-lg font-medium line-clamp-3 sm:line-clamp-none"
                  >
                    {slide.desc}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="flex flex-col sm:flex-row items-center gap-4"
                  >
                    {slide.isBrazil ? (
                      <a
                        href="#brasil"
                        className="inline-flex items-center justify-center gap-2 sm:gap-3 bg-white text-[#020F2A] font-bold text-sm sm:text-lg px-5 py-2.5 sm:px-8 sm:py-4 rounded-full hover:scale-105 transition-transform shadow-[0_0_30px_rgba(255,255,255,0.3)] w-full sm:w-auto"
                      >
                        <ShoppingCart size={18} className="sm:w-[22px] sm:h-[22px]" />
                        <span className="uppercase tracking-wider">COMPRAR AGORA</span>
                      </a>
                    ) : (
                      <a
                        href="#selecoes"
                        className="inline-flex items-center justify-center gap-2 sm:gap-3 bg-white text-[#020F2A] font-bold text-sm sm:text-lg px-5 py-2.5 sm:px-8 sm:py-4 rounded-full hover:scale-105 transition-transform shadow-[0_0_30px_rgba(255,255,255,0.3)] w-full sm:w-auto"
                      >
                        <ShoppingCart size={18} className="sm:w-[22px] sm:h-[22px]" />
                        <span className="uppercase tracking-wider">CONSULTAR PREÇO</span>
                      </a>
                    )}
                  </motion.div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Carousel Indicators */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSlide === index ? "bg-[#C9A84C] w-8" : "bg-white/30 hover:bg-white/50"
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
