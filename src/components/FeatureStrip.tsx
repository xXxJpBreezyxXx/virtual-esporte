"use client";

import { ShieldCheck, Truck, Clock, Gem } from "lucide-react";

export default function FeatureStrip() {
  const features = [
    {
      icon: <Gem className="w-6 h-6 text-[#C9A84C]" />,
      title: "Qualidade Tailandesa 1:1",
      desc: "Camisas idênticas ao padrão original"
    },
    {
      icon: <Truck className="w-6 h-6 text-[#C9A84C]" />,
      title: "Frete Grátis Brasil",
      desc: "Envio seguro e com rastreamento"
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#C9A84C]" />,
      title: "Compra 100% Segura",
      desc: "Garantia de entrega da sua camisa"
    },
    {
      icon: <Clock className="w-6 h-6 text-[#C9A84C]" />,
      title: "Suporte VIP 24/7",
      desc: "Atendimento humano via WhatsApp"
    }
  ];

  return (
    <section className="bg-[#111111] border-y border-[#222222]">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-[#C9A84C]/10 rounded-full flex items-center justify-center mb-3">
                {feature.icon}
              </div>
              <h3 className="font-bold text-white mb-1">{feature.title}</h3>
              <p className="text-sm text-gray-400">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
