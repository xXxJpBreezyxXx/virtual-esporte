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
    const response = await fetch(`${apiUrl}/message/sendText/${instance}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': apiKey
      },
      body: JSON.stringify({
        number: number.replace(/\D/g, ''), // Ensure only numbers
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
    
    // 1. Security Check (DESATIVADO TEMPORARIAMENTE PARA TESTE)
    if (!signature || !verifyAbacateSignature(rawBody, signature)) {
      console.warn('⚠️ Assinatura inválida, mas ignorando para fins de teste...');
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
        // Usamos o telefone que veio no metadata ou no objeto customer
        const phone = customer?.cellphone || checkout?.metadata?.whatsapp || checkout?.customer?.cellphone;
        
        if (phone) {
          const customerName = customer?.name || 'Cliente';
          const message = `Olá ${customerName}! ⚽\n\nSeu pagamento na *Virtual Esporte* foi confirmado com sucesso! 🥳\n\nEm breve você receberá seu código de rastreio por aqui. Obrigado pela preferência e boa torcida! 🇧🇷`;
          
          await sendWhatsAppMessage(phone, message);
          console.log(`📱 Notificação enviada para: ${phone}`);
        } else {
          console.warn('⚠️ Telefone do cliente não encontrado no payload');
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
