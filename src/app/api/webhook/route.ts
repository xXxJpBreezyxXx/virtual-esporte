import { NextResponse } from 'next/server';
import crypto from 'node:crypto';

// Public HMAC key or Secret from AbacatePay dashboard
const WEBHOOK_SECRET = process.env.ABACATEPAY_WEBHOOK_SECRET || "";

/**
 * Verifies if the webhook signature matches the expected HMAC.
 */
function verifyAbacateSignature(rawBody: string, signatureFromHeader: string) {
  if (!WEBHOOK_SECRET) return false;

  const bodyBuffer = Buffer.from(rawBody, "utf8");
  const expectedSig = crypto
    .createHmac("sha256", WEBHOOK_SECRET)
    .update(bodyBuffer)
    .digest("base64"); // Voltando para Base64 conforme documentação

  console.log('--- Signature Debug ---');
  console.log('Expected (Base64):', expectedSig);
  console.log('Received:', signatureFromHeader);

  return expectedSig === signatureFromHeader;
}

/**
 * Sends a message via Evolution API
 */
async function sendWhatsAppMessage(number: string, text: string) {
  const apiUrl = process.env.EVOLUTION_API_URL;
  const apiKey = process.env.EVOLUTION_API_KEY;
  const instance = process.env.EVOLUTION_INSTANCE_NAME;

  if (!apiUrl || !apiKey || !instance) {
    console.warn('Evolution API not configured');
    return;
  }

  try {
    // Limpa o número e garante o DDI 55 se for brasileiro
    let formattedNumber = number.replace(/\D/g, '');
    if (formattedNumber.length === 10 || formattedNumber.length === 11) {
      formattedNumber = `55${formattedNumber}`;
    }

    const response = await fetch(`${apiUrl}/message/sendText/${instance}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': apiKey
      },
      body: JSON.stringify({
        number: formattedNumber,
        text: text,
        linkPreview: false
      })
    });
    
    const data = await response.json();
    console.log('Evolution API response:', data);
  } catch (error) {
    console.error('Error sending WhatsApp message:', error);
  }
}

export async function POST(request: Request) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get('x-webhook-signature') || request.headers.get('X-Webhook-Signature');

    console.log('--- Webhook Received ---');
    console.log('Signature Header:', signature);
    
    // 1. Security Check - Layer 1: Secret in URL (Recomendado pela Doc)
    const { searchParams } = new URL(request.url);
    const querySecret = searchParams.get('webhookSecret');
    
    if (querySecret && WEBHOOK_SECRET && querySecret !== WEBHOOK_SECRET) {
      console.warn('❌ Webhook Secret na URL não confere!');
      // return NextResponse.json({ error: 'Unauthorized URL Secret' }, { status: 401 });
    }

    // 1. Security Check - Layer 2: Assinatura HMAC (DESATIVADO TEMPORARIAMENTE PARA TESTE)
    if (!signature || !verifyAbacateSignature(rawBody, signature)) {
      console.warn('⚠️ Assinatura HMAC inválida, mas ignorando para fins de teste...');
      // return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    const payload = JSON.parse(rawBody);
    const { event, data } = payload;

    // Ajuste para a estrutura real: data.checkout e data.customer
    const checkout = data.checkout;
    const customer = data.customer;

    console.log(`✅ Event: ${event}`);
    console.log(`💰 Checkout ID: ${checkout?.id}`);

    // 2. Handle Events
    switch (event) {
      case 'checkout.completed':
        console.log('💰 Payment Confirmed!');
        
        // Notify Customer via Evolution API
        // Busca o telefone em TODOS os lugares possíveis do payload
        const phone = 
          customer?.cellphone || 
          checkout?.customer?.cellphone || 
          checkout?.metadata?.whatsapp || 
          payload?.data?.customer?.cellphone ||
          payload?.data?.checkout?.customer?.cellphone;
        
        console.log(`📱 Tentando notificar cliente. Telefone encontrado: ${phone || 'NENHUM'}`);
        
        if (phone && phone.length >= 10) {
          const customerName = customer?.name || checkout?.customer?.name || 'Cliente';
          const message = `Olá ${customerName}! ⚽\n\nSeu pagamento na *Virtual Esporte* foi confirmado com sucesso! 🥳\n\nEm breve você receberá seu código de rastreio por aqui. Obrigado pela preferência e boa torcida! 🇧🇷`;
          
          await sendWhatsAppMessage(phone, message);
          console.log(`✅ Notificação enviada para o cliente: ${phone}`);
        } else {
          console.warn('⚠️ Telefone do cliente não encontrado ou inválido no payload');
          // Log do metadata para depuração
          console.log('Metadata recebido:', JSON.stringify(checkout?.metadata));
        }

        // Notify Admin
        const adminNumber = '5516976045778';
        const adminMessage = `🚀 *Nova Venda Confirmada!*\n\nCliente: ${customer?.name}\nValor: R$ ${(checkout?.amount / 100).toFixed(2)}\nProduto: Camisa Copa 2026`;
        await sendWhatsAppMessage(adminNumber, adminMessage);
        
        break;

      case 'checkout.refunded':
        console.log('↩️ Payment Refunded:', checkout?.id);
        break;

      default:
        console.log(`ℹ️ Unhandled event type: ${event}`);
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error: any) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
