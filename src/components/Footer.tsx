"use client";

import { ShieldCheck, RotateCcw, PackageCheck, CreditCard, Lock, MessageCircle, Mail, Clock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const trustBadges = [
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: "Compra 100% Segura",
      desc: "Checkout protegido",
    },
    {
      icon: <RotateCcw className="w-6 h-6" />,
      title: "7 Dias de Garantia",
      desc: "Troca ou devolução",
    },
    {
      icon: <PackageCheck className="w-6 h-6" />,
      title: "Entrega Rastreada",
      desc: "Código via WhatsApp",
    },
    {
      icon: <CreditCard className="w-6 h-6" />,
      title: "PIX e Cartão",
      desc: "Parcele em até 12x",
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "Dados Protegidos",
      desc: "Criptografia SSL",
    },
  ];

  const usefulLinks = [
    { label: "Política de Trocas e Devoluções", href: "/trocas-e-devolucoes" },
    { label: "Termos de Uso", href: "/termos-de-servico" },
    { label: "Política de Privacidade", href: "/politica-de-privacidade" },
    { label: "Perguntas Frequentes", href: "/faq" },
  ];

  const siteLinks = [
    { label: "Início", href: "/#inicio" },
    { label: "Brasil", href: "/#brasil" },
    { label: "Seleções", href: "/#selecoes" },
    { label: "Como Comprar", href: "/#comprar" },
  ];

  return (
    <footer className="bg-[#050D1A] pt-0 pb-28 md:pb-10 border-t border-[#C9A84C]/15">

      {/* ═══════════════ TRUST BADGES STRIP ═══════════════ */}
      <div className="border-b border-white/5 bg-[#0A1628]">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {trustBadges.map((badge, i) => (
              <div
                key={i}
                className="flex flex-col items-center text-center group"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#C9A84C]/10 border border-[#C9A84C]/20 flex items-center justify-center mb-3 text-[#C9A84C] group-hover:bg-[#C9A84C]/20 group-hover:border-[#C9A84C]/40 transition-all duration-300">
                  {badge.icon}
                </div>
                <h4 className="text-white font-bold text-sm mb-0.5">
                  {badge.title}
                </h4>
                <p className="text-gray-500 text-xs">{badge.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════════════ MAIN FOOTER CONTENT ═══════════════ */}
      <div className="container mx-auto px-4 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          {/* Column 1: Brand */}
          <div className="lg:col-span-1">
            <Image
              src="/logo.png"
              alt="Virtual Esporte"
              width={160}
              height={40}
              className="h-10 w-auto mb-4 opacity-90"
            />
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Camisas oficiais com qualidade Tailandesa 1:1 para a Copa do Mundo 2026.
              Vista a paixão nacional com o melhor padrão do mercado.
            </p>
            <Image
              src="/images/logoFIFA.png"
              alt="FIFA World Cup 2026"
              width={48}
              height={48}
              className="h-12 w-auto opacity-60"
            />
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h3 className="text-[#C9A84C] font-bold text-xs uppercase tracking-widest mb-5">
              Navegação
            </h3>
            <ul className="space-y-3">
              {siteLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 text-sm hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Legal / Useful Links */}
          <div>
            <h3 className="text-[#C9A84C] font-bold text-xs uppercase tracking-widest mb-5">
              Informações
            </h3>
            <ul className="space-y-3">
              {usefulLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-400 text-sm hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="text-[#C9A84C] font-bold text-xs uppercase tracking-widest mb-5">
              Atendimento
            </h3>
            <div className="space-y-4">
              <a
                href="https://wa.me/5516976045778?text=Olá! Preciso de ajuda."
                className="flex items-center gap-3 text-gray-400 hover:text-[#25D366] transition-colors duration-200 group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#25D366]/10 border border-[#25D366]/20 flex items-center justify-center group-hover:bg-[#25D366]/20 transition-colors">
                  <MessageCircle className="w-5 h-5 text-[#25D366]" />
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">WhatsApp</p>
                  <p className="text-xs text-gray-500">(16) 97604-5778</p>
                </div>
              </a>
              <a
                href="mailto:virtualesporte@gmail.com"
                className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors duration-200 group"
              >
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                  <Mail className="w-5 h-5 text-gray-400" />
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">E-mail</p>
                  <p className="text-xs text-gray-500">virtualesporte@gmail.com</p>
                </div>
              </a>
              <div className="flex items-center gap-3 text-gray-400">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-gray-400" />
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">Horário</p>
                  <p className="text-xs text-gray-500">Seg–Sex, 9h às 18h</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════ BOTTOM BAR ═══════════════ */}
      <div className="border-t border-white/5">
        <div className="container mx-auto px-4 py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-gray-600 text-xs text-center md:text-left">
              &copy; {new Date().getFullYear()} Virtual Esporte. Todos os direitos reservados.
              {" · "}
              <span className="text-gray-700">
                Site promocional. Não possuímos vínculo oficial com a FIFA.
              </span>
            </p>
            <p className="text-gray-700 text-xs">
              Desenvolvido por João Silva — 2026
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
