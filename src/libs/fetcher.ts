import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabase: SupabaseClient = createClient(
  import.meta.env.VITE_SUPABASE_URL || '',
  import.meta.env.VITE_SUPABASE_ANON || ''
);

const results = async () => {
  const { data, error } = await supabase
    .from('messages')
    .select('id, message, owner, parent, created')
    .is('deleted', null)
    .eq('active', true)
    .order('created', {
      ascending: false
    });

  if (error) {
    console.log(error);
  }

  return !error ? data : null;
};

const sendTelegramMessage = async (message: string) => {
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

const send = async (message: string, parent?: number) => {
  // First, send message to Telegram
  const telegramMessageSent = await sendTelegramMessage(message);

  if (telegramMessageSent) {
    // If Telegram message sent successfully, then proceed to save to Supabase
    const { data, error } = await supabase.from('messages').insert([
      {
        message: message,
        active: true,
        parent: parent || null
      }
    ]);

    if (error) {
      console.log(error);
    }

    return !error ? data : null;
  } else {
    // If Telegram message sending fails, return null or handle accordingly
    return null;
  }
};

export { send, results };
