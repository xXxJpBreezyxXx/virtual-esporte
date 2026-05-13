"use client";

import { motion } from "framer-motion";
import { MessageCircle, Search, CreditCard, Package } from "lucide-react";

export default function HowToBuy() {
  const steps = [
    {
      icon: <Search size={28} className="text-[#C9A84C]" />,
      title: "1. Escolha",
      desc: "Navegue pelas seleções mundiais ou escolha o manto do Brasil em destaque."
    },
    {
      icon: <MessageCircle size={28} className="text-[#C9A84C]" />,
      title: "2. Compra ou Zap",
      desc: "Camisa do Brasil? Compre direto no site. Outras seleções? Consulte-nos via WhatsApp."
    },
    {
      icon: <CreditCard size={28} className="text-[#C9A84C]" />,
      title: "3. Pagamento",
      desc: "Pagamento 100% seguro via Checkout Profissional (Pix ou Cartão)."
    },
    {
      icon: <Package size={28} className="text-[#C9A84C]" />,
      title: "4. Envio",
      desc: "Receba seu código de rastreio e acompanhe seu pedido até a entrega."
    }
  ];

  return (
    <section id="comprar" className="py-20 bg-[#111111]">
      <div className="container mx-auto px-4">
        
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl font-bebas-neue text-white"
          >
            COMO <span className="text-[#C9A84C]">COMPRAR</span>
          </motion.h2>
          <p className="text-gray-400 mt-2">Processo simples, rápido e 100% seguro</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative text-center"
            >
              <div className="w-20 h-20 mx-auto bg-[#1A1A1A] border-2 border-[#C9A84C]/30 rounded-full flex items-center justify-center mb-6 relative z-10">
                {step.icon}
              </div>
              
              {/* Connection line between steps (desktop only) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-1/2 w-full h-[2px] bg-gradient-to-r from-[#C9A84C]/30 to-transparent z-0" />
              )}
              
              <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
              <p className="text-gray-400 text-sm">{step.desc}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
