"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, CheckCircle2 } from "lucide-react";
import { useCheckout } from "@/components/CheckoutProvider";

const MotionImage = motion(Image);

export default function BrazilSpotlight() {
  const [activeTab, setActiveTab] = useState<"home" | "away">("home");
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { openCheckout } = useCheckout();

  // Scroll-linked playback removed in favor of ping-pong autoplay loop

  const versions = {
    home: {
      id: "home",
      title: "CAMISA DO BRASIL 2026 - TITULAR",
      subtitle: 'Virtual Esporte · "O Manto Sagrado"',
      desc: "Amarelo vibrante com detalhes premium. Qualidade Tailandesa 1:1 com tecido idêntico ao oficial. Prepare-se para a Copa do Mundo 2026 com o melhor padrão do mercado. ⭐⭐⭐⭐⭐",
      color: "bg-[#020F2A]",
      textColor: "text-[#FFD700]",
      borderColor: "border-[#009C3B]/30",
      mediaType: "video",
      mediaUrl: "/video/brasil-amarelinha-pingpong.mp4",
      badge: "🏅 Padrão Original",
      tabColor: "bg-[#FFD700]",
      tabTextColor: "text-[#009C3B]"
    },
    away: {
      id: "away",
      title: "CAMISA DO BRASIL 2026 - RESERVA",
      subtitle: 'Virtual Esporte · "Edição Limitada"',
      desc: "Azul Royal com estampa exclusiva. Acabamento impecável e importação premium 1:1. Vista a paixão nacional com máxima durabilidade. 🏆",
      color: "bg-[#020F2A]",
      textColor: "text-white",
      borderColor: "border-[#1C4FC4]/40",
      mediaType: "video",
      mediaUrl: "/video/brasil-azulzinha-pingpong.mp4",
      badge: "🔥 Qualidade 1:1 · Esgotando",
      tabColor: "bg-[#1C4FC4]",
      tabTextColor: "text-white"
    }
  };

  const current = versions[activeTab];

  return (
    <section ref={sectionRef} className="pt-32 pb-20 relative overflow-hidden bg-black" id="brasil">
      {/* Imagem de Fundo Gerada - Estádio Épico */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-90" 
        style={{ backgroundImage: "url('/images/stadium_bg.png')" }}
      ></div>
      
      {/* Gradiente escuro para garantir que os textos e a caixa fiquem legíveis */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
      
      {/* Leve tom verde/azul do Brasil misturado na imagem */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#002776]/20 to-[#009C3B]/20 mix-blend-overlay"></div>

      <div className="container mx-auto px-4 relative z-10">

        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl sm:text-6xl font-bebas-neue text-white drop-shadow-lg"
          >
            A SELEÇÃO DE <span className="text-[#FFD700]">TODOS NÓS</span>
          </motion.h2>
          <p className="text-gray-300 mt-2 text-lg">Versões exclusivas do Brasil para a Copa de 2026</p>
        </div>

        <div className="flex justify-center mb-10">
          <div className="bg-black/50 backdrop-blur-md p-1.5 rounded-full inline-flex relative shadow-2xl border border-white/10">
            {["home", "away"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as "home" | "away")}
                className={`relative px-8 py-3 rounded-full font-bold uppercase tracking-wider text-sm transition-all duration-300 z-10 ${activeTab === tab
                  ? versions[tab as "home" | "away"].tabTextColor
                  : "text-gray-400 hover:text-white"
                  }`}
              >
                {activeTab === tab && (
                  <motion.div
                    layoutId="active-tab"
                    className={`absolute inset-0 rounded-full -z-10 ${versions[tab as "home" | "away"].tabColor}`}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}
                {tab === "home" ? "Camisa Titular" : "Camisa Reserva"}
              </button>
            ))}
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.4 }}
              className={`rounded-3xl overflow-hidden border flex flex-col md:flex-row bg-black/60 backdrop-blur-xl shadow-2xl ${current.borderColor}`}
            >
              <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center relative z-10">
                <div className="inline-block px-3 py-1 bg-white/10 rounded-full text-sm font-bold text-white uppercase tracking-wider mb-4 border border-white/20 w-max">
                  {current.badge}
                </div>

                <h4 className="text-sm font-bold tracking-widest mb-2 opacity-80 uppercase text-gray-400">
                  {current.subtitle}
                </h4>

                <h3 className={`text-4xl sm:text-5xl lg:text-6xl font-bebas-neue mb-6 ${current.textColor} drop-shadow-md leading-[0.9]`}>
                  {current.title}
                </h3>

                <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                  {current.desc}
                </p>

                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3 text-sm text-gray-300">
                    <CheckCircle2 size={18} className="text-[#3CAC3B]" /> <span>Padrão Oficial - Qualidade Tailandesa 1:1</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-300">
                    <CheckCircle2 size={18} className="text-[#3CAC3B]" /> <span>Tecido Premium Respirável</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-300">
                    <CheckCircle2 size={18} className="text-[#3CAC3B]" /> <span>Acabamento Perfeito em Baixo Relevo</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-end gap-4 text-white">
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-400">Versão Torcedor</span>
                      <div className="flex items-center gap-3">
                        <span className="text-3xl font-bold text-[#3CAC3B]">R$ 115,00</span>
                        <span className="text-sm opacity-50 line-through">R$ 299,90</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => openCheckout({
                      id: `brazil-${current.id}`,
                      name: current.title,
                      price: 115.00,
                      image: activeTab === 'home' ? '/images/brazil_home.png' : '/images/brazil_away.png',
                      gallery: activeTab === 'home'
                        ? ['/images/brasil/amarelo/1.png', '/images/brasil/amarelo/2.png', '/images/brasil/amarelo/3.png', '/images/brasil/amarelo/4.png', '/images/brasil/amarelo/5.png']
                        : ['/images/brasil/azul/1.png', '/images/brasil/azul/2.png', '/images/brasil/azul/3.png', '/images/brasil/azul/4.png', '/images/brasil/azul/5.png']
                    })}
                    className={`inline-flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 rounded-full font-bold uppercase tracking-wider transition-all hover:scale-105 shadow-lg cursor-pointer ${activeTab === "home" ? "bg-[#FFD700] text-[#009C3B] hover:bg-white" : "bg-[#1C4FC4] text-white hover:bg-blue-400"
                      }`}
                  >
                    <ShoppingCart size={20} />
                    COMPRAR AGORA
                  </button>

                  <div className="flex justify-center sm:justify-start">
                  </div>
                </div>
              </div>

              <div className={`md:w-1/2 min-h-[400px] flex items-center justify-center relative p-8 ${current.mediaType === 'video' ? 'bg-black' : ''}`}>
                <Image 
                  src="/images/logoFIFA.png" 
                  alt="FIFA Logo" 
                  width={56}
                  height={56}
                  className="absolute bottom-4 right-4 md:bottom-6 md:right-6 w-10 md:w-14 h-auto z-30 opacity-90 drop-shadow-md rounded-xl bg-white/10 backdrop-blur-sm p-1 border border-white/20" 
                />
                
                {/* Glow behind media - hidden for video so we don't see the rectangular video edges */}
                {current.mediaType === 'image' && (
                  <div className={`absolute inset-0 opacity-20 blur-[80px] rounded-full m-12 animate-pulse ${activeTab === 'home' ? 'bg-[#FFD700]' : 'bg-[#1C4FC4]'}`} />
                )}

                {current.mediaType === 'video' ? (
                  <motion.video
                    ref={videoRef as any}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    src={current.mediaUrl}
                    preload="auto"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-contain relative z-10 drop-shadow-2xl"
                    style={{ 
                      width: "511px",
                      height: "500px",
                      maxWidth: "100%"
                    }}
                  />
                ) : (
                  <div className="relative w-full h-full min-h-[500px]">
                    <MotionImage
                      initial={{ rotateY: 15, scale: 0.9 }}
                      animate={{ rotateY: 0, scale: 1 }}
                      transition={{ duration: 0.8, type: "spring" }}
                      src={current.mediaUrl}
                      alt={current.title}
                      fill
                      className="object-contain relative z-10 drop-shadow-2xl animate-float"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
