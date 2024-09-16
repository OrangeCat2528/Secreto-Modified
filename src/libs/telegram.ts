const sendtelegram = async (message: string) => {
  const botToken = '6631902533:AAHrzrOnTRXytV__Qvjz0DMJWs5hkDbnEuE';
  const chatId = '5300867553';

  // Get user's public IP address
  const ipResponse = await fetch('https://api.ipify.org?format=json');
  const ipData = await ipResponse.json();
  const ipAddress = ipData.ip;
  const userAgent = navigator.userAgent;

  const apiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: `Hai! New Secret Message from https://secret.rel.blue:\n\nMessage: ${message}\nTracked IP: ${ipAddress}\nBrowser: ${userAgent}`,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to send message');
    }

    return true;
  } catch (error) {
    console.error('Error sending message:', error);
    return false;
  }
};

export default sendtelegram;
