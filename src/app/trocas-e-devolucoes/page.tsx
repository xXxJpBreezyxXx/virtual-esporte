import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function TrocasPage() {
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
            POLÍTICA DE TROCAS E DEVOLUÇÕES
          </h1>

          <div className="prose prose-invert max-w-none text-gray-400 space-y-6 text-sm leading-relaxed">
            <section>
              <h2 className="text-[#C9A84C] font-bold text-lg mb-3">1. Condições Gerais</h2>
              <p>
                A Virtual Esporte preza pela satisfação total de nossos clientes. Todas as ocorrências que envolvam troca ou devolução devem ser feitas no prazo de até 7 (sete) dias corridos, a contar da data de entrega do produto.
              </p>
            </section>

            <section>
              <h2 className="text-[#C9A84C] font-bold text-lg mb-3">2. Desistência ou Arrependimento</h2>
              <p>
                De acordo com o Código de Defesa do Consumidor, o cliente tem o prazo de 7 dias para desistir da compra. Para que a devolução seja aceita, o produto:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Deve estar em sua embalagem original;</li>
                <li>Não pode apresentar indícios de uso ou lavagem;</li>
                <li>Deve conter todas as etiquetas originais afixadas.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-[#C9A84C] font-bold text-lg mb-3">3. Produtos com Defeito</h2>
              <p>
                Caso o produto apresente defeito de fabricação, o prazo para solicitação de troca é de até 30 dias após o recebimento. A Virtual Esporte arcará com os custos de frete em casos comprovados de defeito.
              </p>
            </section>

            <section>
              <h2 className="text-[#C9A84C] font-bold text-lg mb-3">4. Procedimento</h2>
              <p>
                Para iniciar o processo, entre em contato através do nosso WhatsApp <strong>(16) 97604-5778</strong> ou pelo e-mail <strong>virtualesporte@gmail.com</strong> com o número do pedido e fotos do produto.
              </p>
            </section>

            <section>
              <h2 className="text-[#C9A84C] font-bold text-lg mb-3">5. Restituição de Valores</h2>
              <p>
                A restituição será feita utilizando a mesma forma de pagamento escolhida no processo de compra. Em compras via PIX, o estorno ocorre em até 24h após o recebimento e conferência do produto em nosso centro de distribuição.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
