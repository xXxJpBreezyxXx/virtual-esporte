import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function PrivacidadePage() {
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
          
          <h1 className="text-4xl font-bebas text-white mb-8 tracking-wider">
            POLÍTICA DE PRIVACIDADE
          </h1>

          <div className="prose prose-invert max-w-none text-gray-400 space-y-6 text-sm leading-relaxed">
            <section>
              <h2 className="text-[#C9A84C] font-bold text-lg mb-3">1. Coleta de Informações</h2>
              <p>
                Coletamos informações necessárias para o processamento de seus pedidos, como nome, CPF, endereço e contato. Esses dados são essenciais para a entrega e emissão de comprovantes de compra.
              </p>
            </section>

            <section>
              <h2 className="text-[#C9A84C] font-bold text-lg mb-3">2. Uso dos Dados</h2>
              <p>
                Seus dados são utilizados exclusivamente para:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Processamento e entrega de pedidos;</li>
                <li>Comunicação sobre o status da entrega;</li>
                <li>Melhoria da experiência de navegação através de cookies de análise (Google Analytics).</li>
              </ul>
            </section>

            <section>
              <h2 className="text-[#C9A84C] font-bold text-lg mb-3">3. Segurança</h2>
              <p>
                Utilizamos protocolos de segurança SSL para garantir que todas as transações financeiras e dados pessoais sejam criptografados. Não armazenamos dados de cartão de crédito em nossos servidores; o processamento é feito de forma segura pelo gateway de pagamento <strong>AbacatePay</strong>.
              </p>
            </section>

            <section>
              <h2 className="text-[#C9A84C] font-bold text-lg mb-3">4. Compartilhamento</h2>
              <p>
                A Virtual Esporte não vende ou aluga seus dados para terceiros. O compartilhamento ocorre apenas com parceiros logísticos (Correios/Transportadoras) para viabilizar a entrega do seu produto.
              </p>
            </section>

            <section>
              <h2 className="text-[#C9A84C] font-bold text-lg mb-3">5. Seus Direitos</h2>
              <p>
                Em conformidade com a LGPD (Lei Geral de Proteção de Dados), você tem o direito de solicitar a alteração ou exclusão definitiva de seus dados de nossa base a qualquer momento, entrando em contato com nosso suporte.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
