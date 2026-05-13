"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Star, ChevronLeft, ChevronRight } from "lucide-react";

export default function SocialProof() {
  const [currentReview, setCurrentReview] = useState(0);

  const reviews = [
    { name: "Carlos S.", city: "São Paulo, SP", text: "A qualidade da camisa do Brasil me surpreendeu. Os detalhes em baixo relevo da versão Tailandesa 1:1 são perfeitos. Entrega em 12 dias." },
    { name: "Marcos R.", city: "Rio de Janeiro, RJ", text: "Atendimento vip via WhatsApp. Tiraram todas as minhas dúvidas e a camisa da Argentina é idêntica ao padrão original." },
    { name: "João P.", city: "Belo Horizonte, MG", text: "Terceira compra que faço na Virtual Esporte. O tecido premium respirável é absurdamente bom, não deve nada pras da loja oficial." },
  ];

  // Auto-play carousel on mobile
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [reviews.length]);

  return (
    <section className="py-20 bg-[#020F2A] border-t border-[#222]">
      <div className="container mx-auto px-4">
        
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl font-bebas-neue text-white"
          >
            QUEM COMPROU, <span className="text-[#C9A84C]">APROVA</span>
          </motion.h2>
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="flex text-[#FFD700]">
              {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="currentColor" />)}
            </div>
            <span className="text-white font-bold">4.9/5</span>
            <span className="text-gray-400">em mais de 2.000 avaliações</span>
          </div>
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentReview}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.3 }}
              className="bg-[#111] p-6 rounded-2xl border border-[#333] shadow-xl"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex text-[#C9A84C]">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <MessageCircle size={20} className="text-[#25D366]" />
              </div>
              <p className="text-gray-300 mb-6 italic">&quot;{reviews[currentReview].text}&quot;</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#222] rounded-full flex items-center justify-center text-white font-bold">
                  {reviews[currentReview].name.charAt(0)}
                </div>
                <div>
                  <div className="text-white font-bold text-sm">{reviews[currentReview].name}</div>
                  <div className="text-gray-500 text-xs">{reviews[currentReview].city}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button 
              onClick={() => setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length)}
              className="w-10 h-10 rounded-full bg-[#111] border border-[#333] flex items-center justify-center text-white hover:border-[#C9A84C] transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentReview(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${currentReview === index ? "bg-[#C9A84C] w-6" : "bg-white/30"}`}
                />
              ))}
            </div>
            <button 
              onClick={() => setCurrentReview((prev) => (prev + 1) % reviews.length)}
              className="w-10 h-10 rounded-full bg-[#111] border border-[#333] flex items-center justify-center text-white hover:border-[#C9A84C] transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#111] p-6 rounded-2xl border border-[#333] shadow-xl"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex text-[#C9A84C]">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <MessageCircle size={20} className="text-[#25D366]" />
              </div>
              <p className="text-gray-300 mb-6 italic">&quot;{review.text}&quot;</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#222] rounded-full flex items-center justify-center text-white font-bold">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <div className="text-white font-bold text-sm">{review.name}</div>
                  <div className="text-gray-500 text-xs">{review.city}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
