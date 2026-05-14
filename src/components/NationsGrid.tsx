"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";

export default function NationsGrid() {
  const nations = [
    { name: "Argentina", type: "Titular / 3 Estrelas", price: "Consultar Disponibilidade", image: "/images/selecoes/mockup/argentina.png" },
    { name: "França", type: "Titular", price: "Consultar Disponibilidade", image: "/images/selecoes/mockup/franca.png" },
    { name: "Alemanha", type: "Titular", price: "Consultar Disponibilidade", image: "/images/selecoes/mockup/alemanha.png" },
    { name: "Inglaterra", type: "Titular", price: "Consultar Disponibilidade", image: "/images/selecoes/mockup/inglaterra.png" },
    { name: "Espanha", type: "Titular", price: "Consultar Disponibilidade", image: "/images/selecoes/mockup/espanha.png" },
    { name: "Portugal", type: "Titular", price: "Consultar Disponibilidade", image: "/images/selecoes/mockup/portugal.png" },
    { name: "Países Baixos", type: "Titular", price: "Consultar Disponibilidade", image: "/images/selecoes/mockup/paisesbaixos.png" },
    { name: "Países Baixos - Visitante", type: "Reserva", price: "Consultar Disponibilidade", image: "/images/selecoes/mockup/paisesbaixos2.png" },
    { name: "Colômbia", type: "Titular", price: "Consultar Disponibilidade", image: "/images/selecoes/mockup/colombia.png" },
    { name: "Japão", type: "Titular", price: "Consultar Disponibilidade", image: "/images/selecoes/mockup/japao.png" },
    { name: "Canadá", type: "Titular", price: "Consultar Disponibilidade", image: "/images/selecoes/mockup/canada.png" },
    { name: "Canadá - Visitante", type: "Reserva", price: "Consultar Disponibilidade", image: "/images/selecoes/mockup/canada2.png" },
    { name: "Costa Rica", type: "Titular", price: "Consultar Disponibilidade", image: "/images/selecoes/mockup/costarica.png" },
    { name: "México", type: "Titular", price: "Consultar Disponibilidade", image: "/images/selecoes/mockup/mexico.png" },
    { name: "Senegal", type: "Titular", price: "Consultar Disponibilidade", image: "/images/selecoes/mockup/senegal.png" },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };


  return (
    <section className="py-20 bg-[#010B1E]" id="selecoes">
      <div className="container mx-auto px-4">

        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl font-bebas-neue text-white"
          >
            MAIS <span className="text-[#00B8FF]">SELEÇÕES</span>
          </motion.h2>
          <p className="text-gray-400 mt-2 max-w-xl mx-auto">
            Todas as potências mundiais com uniformes atualizados para a Copa do Mundo 2026.
          </p>
        </div>

        <div className="relative overflow-hidden py-4 -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="flex w-max animate-marquee hover:[animation-play-state:paused] gap-6">
            {[...nations, ...nations].map((nation, index) => (
              <div
                key={index}
                className="w-72 sm:w-80 shrink-0 bg-[#020F2A] rounded-2xl overflow-hidden border border-[#505B73]/30 hover:border-[#00B8FF] hover:shadow-[0_0_20px_rgba(0,184,255,0.2)] transition-all duration-300 group"
              >
                <div className="h-64 relative overflow-hidden bg-[#010B1E]">
                  <Image
                    src={nation.image}
                    alt={`Camisa da Seleção da ${nation.name} - Copa 2026 Padrão Original 1:1`}
                    width={320}
                    height={256}
                    className="w-full h-full object-cover opacity-80 group-hover:scale-110 group-hover:opacity-100 transition-all duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-[#00B8FF] text-[#020F2A] text-xs font-bold px-3 py-1 rounded-full uppercase">
                    Padrão Original
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bebas-neue text-white tracking-wide">{nation.name}</h3>
                  <p className="text-gray-400 text-sm mb-4">{nation.type}</p>
                  <div className="mt-2">
                    <a
                      href={`https://wa.me/5516976045778?text=Olá! Quero consultar o preço da camisa da seleção: ${nation.name}`}
                      className="inline-block bg-[#C9A84C] text-[#020F2A] hover:bg-white font-bold uppercase tracking-wider text-sm px-6 py-2 rounded-full transition-colors shadow-[0_0_10px_rgba(201,168,76,0.3)] hover:shadow-[0_0_15px_rgba(255,255,255,0.5)]"
                    >
                      Consultar Preço
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <a
            href="https://wa.me/5516976045778?text=Olá! Quero ver o catálogo completo das seleções disponíveis"
            className="inline-block border border-[#C9A84C] text-[#C9A84C] hover:bg-[#C9A84C] hover:text-black font-bold uppercase tracking-widest px-8 py-3 rounded-full transition-colors"
          >
            Ver Catálogo no WhatsApp
          </a>
        </div>

      </div>
    </section>
  );
}
