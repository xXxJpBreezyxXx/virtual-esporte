import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function TermosPage() {
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
            TERMOS DE SERVIÇO
          </h1>

          <div className="prose prose-invert max-w-none text-gray-400 space-y-6 text-sm leading-relaxed">
            <section>
              <h2 className="text-[#C9A84C] font-bold text-lg mb-3">1. Aceitação dos Termos</h2>
              <p>
                Ao acessar o site da Virtual Esporte, você concorda em cumprir estes termos de serviço, todas as leis e regulamentos aplicáveis. Se você não concordar com algum destes termos, está proibido de usar ou acessar este site.
              </p>
            </section>

            <section>
              <h2 className="text-[#C9A84C] font-bold text-lg mb-3">2. Qualidade dos Produtos</h2>
              <p>
                Nossas camisas são importadas com padrão de qualidade <strong>Tailandesa 1:1</strong>, o que significa que seguem fielmente os padrões de tecido, costura e detalhes dos modelos oficiais utilizados pelos jogadores.
              </p>
            </section>

            <section>
              <h2 className="text-[#C9A84C] font-bold text-lg mb-3">3. Prazos e Entregas</h2>
              <p>
                O prazo de entrega varia de acordo com a região, sendo informado no momento do checkout. Por se tratarem de camisas premium importadas, o prazo médio é de 10 a 20 dias úteis. Você receberá o código de rastreio via WhatsApp assim que o produto for postado.
              </p>
            </section>

            <section>
              <h2 className="text-[#C9A84C] font-bold text-lg mb-3">4. Pagamentos</h2>
              <p>
                Aceitamos PIX e Cartão de Crédito via gateway <strong>AbacatePay</strong>. A liberação do pedido ocorre imediatamente após a confirmação do pagamento pelo sistema financeiro.
              </p>
            </section>

            <section>
              <h2 className="text-[#C9A84C] font-bold text-lg mb-3">5. Propriedade Intelectual</h2>
              <p>
                A Virtual Esporte é um site promocional de vestuário esportivo. Não possuímos vínculo oficial direto com a FIFA ou federações de futebol citadas, atuando de forma independente no mercado de vestuário.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
