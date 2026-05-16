"use client";

import { ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCheckout } from "@/components/CheckoutProvider";

export default function MobileCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling down 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const { openCheckout } = useCheckout();

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 w-full p-4 z-50 md:hidden bg-gradient-to-t from-black via-black/90 to-transparent"
        >
          <button
            onClick={() => openCheckout({
              id: 'mobile-cta-brasil',
              name: 'Camisa Brasil 2026 - Titular',
              price: 115.00,
              image: '/images/brasil/amarelo/1.png',
              gallery: [
                '/images/brasil/amarelo/1.png',
                '/images/brasil/amarelo/2.png',
                '/images/brasil/amarelo/3.png',
                '/images/brasil/amarelo/4.png',
                '/images/brasil/amarelo/5.png'
              ]
            })}
            className="flex items-center justify-center gap-2 w-full bg-[#FFD700] text-[#009C3B] font-extrabold py-4 px-6 rounded-full shadow-lg shadow-[#FFD700]/30 cursor-pointer"
          >
            <ShoppingCart size={20} />
            <span className="uppercase tracking-wider">COMPRAR AGORA</span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
