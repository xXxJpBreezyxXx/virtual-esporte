import { NextResponse } from 'next/server';
import { Client } from '@upstash/qstash';
import { sendWhatsAppMessage } from '@/lib/whatsapp';

const ABACATE_API_URL = 'https://api.abacatepay.com/v2';
const API_KEY = process.env.APIABACATEPAY;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { productId, productName, price, customer, size } = body;

    if (!API_KEY) {
      return NextResponse.json({ error: 'API Key not configured' }, { status: 500 });
    }

    // 1. Ensure product exists or create it
    // Using price as part of externalId to handle price changes
    const externalId = `product_${productId}`;
    
    const productResponse = await fetch(`${ABACATE_API_URL}/products/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        externalId,
        name: `${productName} - Tamanho ${size}`,
        price: Math.round(price * 100), // Convert to cents
        currency: 'BRL',
        description: `Uniforme da Seleção Brasileira - Copa 2026`,
      }),
    });

    const productData = await productResponse.json();
    let finalProductId = '';

    if (productData.success) {
      finalProductId = productData.data.id;
    } else {
      // If product already exists, we might need to list products and find it
      // But usually we can just proceed if we have the ID or try to list
      const listResponse = await fetch(`${ABACATE_API_URL}/products/list`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
        },
      });
      const listData = await listResponse.json();
      const existingProduct = listData.data?.find((p: any) => p.externalId === externalId);
      if (existingProduct) {
        finalProductId = existingProduct.id;
      } else {
        throw new Error('Failed to create or find product');
      }
    }

    // 2. Ensure customer exists or create it
    let customerId = '';
    const customerResponse = await fetch(`${ABACATE_API_URL}/customers/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        name: customer.name,
        email: customer.email,
        taxId: customer.taxId.replace(/\D/g, ''),
        cellphone: customer.phone.replace(/\D/g, ''),
        zipCode: customer.address.cep.replace(/\D/g, ''),
      }),
    });

    const customerData = await customerResponse.json();
    
    if (customerData.success) {
      customerId = customerData.data.id;
    } else {
      // If customer already exists or creation failed, try to find them by email/taxId
      console.log('Customer creation returned non-success, attempting to find existing customer...');
      const listCustRes = await fetch(`${ABACATE_API_URL}/customers/list`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${API_KEY}` },
      });
      const listCustData = await listCustRes.json();
      const existingCustomer = listCustData.data?.find((c: any) => 
        c.email === customer.email || c.taxId === customer.taxId.replace(/\D/g, '')
      );
      
      if (existingCustomer) {
        customerId = existingCustomer.id;
      } else {
        return NextResponse.json({ 
          error: customerData.error || 'Falha ao identificar cliente no sistema de pagamento.' 
        }, { status: 400 });
      }
    }

    // 3. Setup Abandoned Cart Recovery via Upstash QStash
    let qstashMessageId = '';
    try {
      const qstashClient = new Client({ token: process.env.QSTASH_TOKEN! });
      
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
      const response = await qstashClient.publishJSON({
        url: `${baseUrl}/api/recover-cart`,
        body: {
          customerName: customer.name,
          customerPhone: customer.phone,
          productName: `${productName} - Tamanho ${size}`
        },
        delay: "15m", // 15 minutes delay
      });
      qstashMessageId = response.messageId;
      console.log('✅ QStash Scheduled:', qstashMessageId);
    } catch (qError) {
      console.error('⚠️ Falha ao agendar recuperação no QStash:', qError);
      // We don't throw here to not break the checkout
    }

    // 4. Create Checkout
    console.log('Creating checkout for customer:', customerId);
    const checkoutResponse = await fetch(`${ABACATE_API_URL}/checkouts/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        items: [
          {
            id: finalProductId,
            quantity: 1,
          },
        ],
        customerId: customerId,
        metadata: {
          tamanho: size,
          endereco_completo: `${customer.address.street}, ${customer.address.number}${customer.address.complement ? ' - ' + customer.address.complement : ''}`,
          bairro: customer.address.neighborhood,
          cidade: customer.address.city,
          estado: customer.address.state,
          cep: customer.address.cep,
          whatsapp: customer.phone.replace(/\D/g, ''),
          qstashMessageId: qstashMessageId, // Injecting the ID here
        },
        methods: ['PIX', 'CARD'],
        returnUrl: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/obrigado`,
        completionUrl: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/obrigado`,
      }),
    });

    const checkoutData = await checkoutResponse.json();

    if (!checkoutData.success) {
      console.error('AbacatePay Checkout Error:', checkoutData);
      return NextResponse.json({ error: checkoutData.error || 'Erro ao gerar link de pagamento.' }, { status: 400 });
    }

    const checkoutUrl = checkoutData.data.url;

    // 5. Send Immediate WhatsApp Message
    try {
      const msg = `Olá ${customer.name}! Seu pedido da camisa da Seleção foi reservado com sucesso! ⚽\n\nAcesse o link seguro abaixo para gerar o PIX ou pagar no cartão:\n${checkoutUrl}\n\nSeu pedido está garantido por 15 minutos! ⏳`;
      await sendWhatsAppMessage(customer.phone, msg);
    } catch (wError) {
      console.error('⚠️ Falha ao enviar WhatsApp imediato:', wError);
    }

    return NextResponse.json({ url: checkoutUrl });
  } catch (error: any) {
    console.error('Checkout Critical Error:', error);
    return NextResponse.json({ error: 'Erro interno ao processar seu pedido.' }, { status: 500 });
  }
}
