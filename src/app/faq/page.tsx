import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, MessageCircle } from "lucide-react";
import Link from "next/link";

export default function FAQPage() {
  const faqs = [
    {
      q: "As camisas são originais?",
      a: "Nossas camisas são importadas com padrão Tailandês 1:1. Isso significa que são as melhores réplicas do mercado, utilizando os mesmos tecidos, bordados e tecnologias das versões oficiais de jogo."
    },
    {
      q: "Qual o prazo de entrega?",
      a: "O prazo médio é de 10 a 20 dias úteis após a postagem. Como são produtos importados de alto padrão, esse tempo é necessário para garantir a qualidade e a logística segura até sua casa."
    },
    {
      q: "Como recebo meu código de rastreio?",
      a: "Assim que seu pedido for despachado, enviamos o código de rastreamento automaticamente para o seu WhatsApp e e-mail cadastrados."
    },
    {
      q: "Posso parcelar minha compra?",
      a: "Sim! Aceitamos parcelamento em até 12x no cartão de crédito via AbacatePay. Também aceitamos PIX com aprovação imediata."
    },
    {
      q: "As camisas podem ser personalizadas?",
      a: "Sim, oferecemos personalização com nome e número oficial. Para pedidos personalizados, entre em contato diretamente pelo nosso WhatsApp após a compra."
    },
    {
      q: "E se a camisa não servir?",
      a: "Você tem até 7 dias após o recebimento para solicitar a troca por tamanho. Recomendamos conferir nossa tabela de medidas disponível na página de cada produto."
    }
  ];

  return (
    <>
      <Header />
      <main className="flex-grow pt-32 pb-20 bg-[#020F2A]">
        <div className="container mx-auto px-4 max-w-3xl">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-[#C9A84C] hover:text-white mb-8 transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para a Loja
          </Link>
          
          <h1 className="text-4xl font-bebas text-white mb-2 tracking-wider">
            PERGUNTAS FREQUENTES (FAQ)
          </h1>
          <p className="text-gray-500 mb-10">Tire suas dúvidas rápidas sobre pedidos, entregas e qualidade.</p>

          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-[#050D1A] border border-white/5 rounded-2xl p-6 hover:border-[#C9A84C]/30 transition-all group">
                <h3 className="text-[#C9A84C] font-bold text-lg mb-3 flex items-start gap-3">
                  <span className="text-white/20 font-bebas text-2xl leading-none">0{i+1}</span>
                  {faq.q}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed pl-9">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 p-8 rounded-3xl bg-gradient-to-br from-[#C9A84C]/10 to-transparent border border-[#C9A84C]/20 text-center">
            <h3 className="text-white font-bold mb-2">Ainda tem dúvidas?</h3>
            <p className="text-gray-400 text-sm mb-6">Nossa equipe de suporte está pronta para te atender no WhatsApp.</p>
            <a 
              href="https://wa.me/5516976045778?text=Olá! Vi o FAQ mas ainda tenho uma dúvida."
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] text-white rounded-full font-bold hover:bg-[#1eb956] transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              Falar com Suporte
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
