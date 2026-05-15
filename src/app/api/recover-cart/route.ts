import { NextResponse } from 'next/server';
import { verifySignatureAppRouter } from '@upstash/qstash/nextjs';
import { sendWhatsAppMessage } from '@/lib/whatsapp';

async function handler(request: Request) {
  try {
    const body = await request.json();
    const { customerName, customerPhone, productName } = body;

    console.log(`⏰ [QStash] Executando recuperação de carrinho para: ${customerName}`);

    if (customerPhone) {
      const msg = `Oii ${customerName}, tudo bem? Aqui é da Virtual Esporte! 🇧🇷\n\nVi que você tentou garantir sua *${productName}* mas o pagamento ainda não foi concluído.\n\nTeve alguma dificuldade com o PIX ou o Cartão? Se precisar de ajuda ou de um novo link, é só me responder aqui!`;
      
      await sendWhatsAppMessage(customerPhone, msg);
      console.log(`✅ Mensagem de recuperação enviada para: ${customerPhone}`);
    } else {
      console.warn('⚠️ Tentativa de recuperação falhou: Telefone do cliente não encontrado no payload do QStash');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Recover Cart Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export const POST = verifySignatureAppRouter(handler, {
  currentSigningKey: process.env.QSTASH_CURRENT_SIGNING_KEY || 'dummy_current_key',
  nextSigningKey: process.env.QSTASH_NEXT_SIGNING_KEY || 'dummy_next_key',
});
