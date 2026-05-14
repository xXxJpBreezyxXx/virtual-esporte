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
    .digest("base64");

  const A = Buffer.from(expectedSig);
  const B = Buffer.from(signatureFromHeader);
  
  if (A.length !== B.length) return false;
  return crypto.timingSafeEqual(A, B);
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
    const signature = request.headers.get('X-Webhook-Signature');

    // 1. Security Check
    if (!signature || !verifyAbacateSignature(rawBody, signature)) {
      console.warn('Invalid webhook signature received');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    const payload = JSON.parse(rawBody);
    const { event, data } = payload;

    console.log(`Webhook received: ${event}`, data);

    // 2. Handle Events
    switch (event) {
      case 'checkout.completed':
        // Payment approved!
        console.log('💰 Payment Confirmed:', data.id);
        
        // Notify Customer via Evolution API
        if (data.customer?.cellphone) {
          const customerName = data.customer.name || 'Cliente';
          const message = `Olá ${customerName}! ⚽\n\nSeu pagamento na *Virtual Esporte* foi confirmado com sucesso! 🥳\n\nEm breve você receberá seu código de rastreio por aqui. Obrigado pela preferência e boa torcida! 🇧🇷`;
          
          await sendWhatsAppMessage(data.customer.cellphone, message);
        }

        // Notify Admin (optional)
        const adminNumber = '5516976045778'; // Your number
        const adminMessage = `🚀 *Nova Venda Confirmada!*\n\nCliente: ${data.customer?.name}\nValor: R$ ${(data.amount / 100).toFixed(2)}\nProduto: Camisa Copa 2026`;
        await sendWhatsAppMessage(adminNumber, adminMessage);
        
        break;

      case 'checkout.refunded':
        console.log('↩️ Payment Refunded:', data.id);
        break;

      case 'checkout.disputed':
        console.log('⚠️ Payment Disputed:', data.id);
        break;

      default:
        console.log(`Unhandled event type: ${event}`);
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error: any) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
