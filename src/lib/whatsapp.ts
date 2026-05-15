export async function sendWhatsAppMessage(number: string, text: string) {
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
