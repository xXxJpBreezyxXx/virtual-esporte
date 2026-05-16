"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, Package, Truck, MessageCircle, ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ThankYouPage() {
  useEffect(() => {
    // GTM Event: purchase
    // O valor está hardcoded como 115.00 pois todas as camisas estão com esse preço único.
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: 'purchase',
        ecommerce: {
          transaction_id: `T_${new Date().getTime()}`,
          value: 115.00,
          currency: 'BRL',
          items: [{
            item_id: 'camisa-worldcup',
            item_name: 'Camisa Seleção (Personalizada)',
            price: 115.00,
            quantity: 1
          }]
        }
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-yellow-400 selection:text-black">
      <Header />

      <main className="pt-32 pb-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          {/* Success Icon Animation */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", damping: 12, stiffness: 200 }}
            className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-500/20 text-green-500 mb-8"
          >
            <CheckCircle2 size={48} />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bebas tracking-tighter mb-4"
          >
            PEDIDO CONFIRMADO! 🏆
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto"
          >
            Obrigado por escolher a Virtual Esporte. Seu manto já está sendo preparado para brilhar na Copa de 2026!
          </motion.p>

          {/* Steps / Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 text-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/5 border border-white/10 p-6 rounded-2xl"
            >
              <div className="w-10 h-10 rounded-full bg-yellow-400 text-black flex items-center justify-center mb-4 font-bold">
                <Package size={20} />
              </div>
              <h3 className="font-bebas text-xl mb-2">Preparação</h3>
              <p className="text-sm text-gray-400">Verificamos cada detalhe da sua camisa para garantir a qualidade 1:1.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/5 border border-white/10 p-6 rounded-2xl"
            >
              <div className="w-10 h-10 rounded-full bg-yellow-400 text-black flex items-center justify-center mb-4 font-bold">
                <Truck size={20} />
              </div>
              <h3 className="font-bebas text-xl mb-2">Envio Rápido</h3>
              <p className="text-sm text-gray-400">Você receberá o código de rastreio via WhatsApp em até 3 dias úteis.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white/5 border border-white/10 p-6 rounded-2xl"
            >
              <div className="w-10 h-10 rounded-full bg-yellow-400 text-black flex items-center justify-center mb-4 font-bold">
                <MessageCircle size={20} />
              </div>
              <h3 className="font-bebas text-xl mb-2">Suporte VIP</h3>
              <p className="text-sm text-gray-400">Nossa equipe está à disposição no WhatsApp para qualquer dúvida.</p>
            </motion.div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="w-full sm:w-auto px-8 py-4 bg-white text-black font-bebas text-xl rounded-full hover:bg-yellow-400 transition-colors flex items-center justify-center gap-2"
            >
              <ArrowLeft size={20} />
              VOLTAR PARA A LOJA
            </Link>
            <a
              href="https://wa.me/5516976045778"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 bg-green-500 text-white font-bebas text-xl rounded-full hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
            >
              <MessageCircle size={20} />
              DÚVIDAS NO WHATSAPP
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
