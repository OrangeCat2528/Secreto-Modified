const sendtelegram = async (message: string) => {
  const botToken = '6631902533:AAHrzrOnTRXytV__Qvjz0DMJWs5hkDbnEuE';
  const chatId = '5300867553';

  const apiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: `Hai! New Secret Message from https://secret.rel.blue:\nMessage: ${message}`,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to send message');
    }

    return true; // Indicates successful message sending
  } catch (error) {
    console.error('Error sending message:', error);
    return false; // Indicates failed message sending
  }
};

export default sendtelegram;
