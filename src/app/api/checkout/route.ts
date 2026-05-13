import { NextResponse } from 'next/server';

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
    if (!customerData.success) {
      return NextResponse.json({ error: customerData.error || 'Failed to create customer' }, { status: 400 });
    }

    const customerId = customerData.data.id;

    // 3. Create Checkout
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
        },
        methods: ['PIX', 'CARD'],
        returnUrl: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/?status=success`,
        completionUrl: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/?status=success`,
      }),
    });

    const checkoutData = await checkoutResponse.json();

    if (!checkoutData.success) {
      return NextResponse.json({ error: checkoutData.error || 'Failed to create checkout' }, { status: 400 });
    }

    return NextResponse.json({ url: checkoutData.data.url });
  } catch (error: any) {
    console.error('Checkout error:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
