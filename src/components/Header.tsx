"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ShoppingBag, Menu, X } from "lucide-react";
import Link from "next/link";

const AnimatedNavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  return (
    <Link href={href} className="group relative inline-block overflow-hidden text-sm font-bold uppercase tracking-widest" style={{ height: '1.25rem' }}>
      <div className="flex flex-col transition-transform duration-300 ease-out group-hover:-translate-y-1/2">
        <span className="block leading-5 h-5 text-gray-300">{children}</span>
        <span className="block leading-5 h-5 text-[#C9A84C]">{children}</span>
      </div>
    </Link>
  );
};

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [headerShapeClass, setHeaderShapeClass] = useState("rounded-full");
  const shapeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    if (shapeTimeoutRef.current) clearTimeout(shapeTimeoutRef.current);

    if (isOpen) {
      setHeaderShapeClass("rounded-2xl");
    } else {
      shapeTimeoutRef.current = setTimeout(() => {
        setHeaderShapeClass("rounded-full");
      }, 300);
    }

    return () => {
      if (shapeTimeoutRef.current) clearTimeout(shapeTimeoutRef.current);
    };
  }, [isOpen]);

  const navLinksData = [
    { label: "Início", href: "/#inicio" },
    { label: "Brasil", href: "/#brasil" },
    { label: "Seleções", href: "/#selecoes" },
    { label: "Comprar", href: "/#comprar" },
  ];

  return (
    <header
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50
                  flex flex-col items-center
                  pl-4 pr-4 sm:pl-6 sm:pr-3 py-2.5
                  backdrop-blur-md
                  ${headerShapeClass}
                  border border-[#C9A84C]/25 bg-[#020F2A]/85
                  w-[calc(100%-1.5rem)] sm:w-auto
                  transition-[border-radius] duration-0 ease-in-out
                  shadow-[0_4px_30px_rgba(0,0,0,0.5)]`}
    >
      {/* Main Row */}
      <div className="flex items-center justify-between w-full gap-x-5 sm:gap-x-8">
        {/* Logo */}
        <Link href="/#inicio" className="flex items-center shrink-0">
          <Image
            src="/logo.png"
            alt="Virtual Esporte"
            width={160}
            height={44}
            className="h-10 sm:h-11 w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden sm:flex items-center space-x-6">
          {navLinksData.map((link) => (
            <AnimatedNavLink key={link.href} href={link.href}>
              {link.label}
            </AnimatedNavLink>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden sm:flex items-center">
          <div className="relative group">
            <div className="absolute inset-0 -m-1.5 rounded-full bg-[#C9A84C] opacity-30 filter blur-lg pointer-events-none transition-all duration-300 ease-out group-hover:opacity-50 group-hover:blur-xl group-hover:-m-2.5" />
            <a
              href="https://wa.me/5516976045778?text=Olá!"
              className="relative z-10 inline-flex items-center gap-2 px-5 py-2 text-xs font-bold uppercase tracking-widest text-[#020F2A] bg-gradient-to-br from-[#C9A84C] to-[#E8D48B] rounded-full hover:from-[#E8D48B] hover:to-white transition-all duration-200"
            >
              <ShoppingBag className="w-4 h-4" />
              Garanta a Sua
            </a>
          </div>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="sm:hidden flex items-center justify-center w-9 h-9 text-gray-300 hover:text-white focus:outline-none transition-colors"
          onClick={toggleMenu}
          aria-label={isOpen ? "Fechar Menu" : "Abrir Menu"}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      <div
        className={`sm:hidden flex flex-col items-center w-full transition-all ease-in-out duration-300 overflow-hidden
                    ${isOpen ? "max-h-[500px] opacity-100 pt-4 pb-2" : "max-h-0 opacity-0 pt-0 pointer-events-none"}`}
      >
        <nav className="flex flex-col items-center space-y-4 text-base w-full">
          {navLinksData.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-gray-300 hover:text-[#C9A84C] transition-colors w-full text-center font-bold uppercase tracking-widest text-sm"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-col items-center mt-5 w-full px-4">
          <a
            href="https://wa.me/5516976045778?text=Olá!"
            onClick={() => setIsOpen(false)}
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-bold uppercase tracking-widest text-[#020F2A] bg-gradient-to-br from-[#C9A84C] to-[#E8D48B] rounded-full hover:from-[#E8D48B] hover:to-white transition-all duration-200"
          >
            <ShoppingBag className="w-4 h-4" />
            Garanta a Sua
          </a>
        </div>
      </div>
    </header>
  );
}
