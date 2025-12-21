
const BOT_TOKEN = '7832996200:AAGhR4y29xwpSSB_Lt2DCoTGCC-zyf4BqSE';
const CHAT_ID = '6464089189'; 

export const sendTelegramMessage = async (message: string) => {
  try {
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: 'HTML',
      }),
    });
    return await response.json();
  } catch (error) {
    console.error('Telegram message error:', error);
  }
};

export const sendTelegramPhoto = async (photoUrl: string, caption: string) => {
  try {
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        photo: photoUrl,
        caption: caption,
        parse_mode: 'HTML',
      }),
    });
    return await response.json();
  } catch (error) {
    console.error('Telegram photo error:', error);
  }
};

export const checkAdminReplies = async (userId: string) => {
  try {
    const timestamp = new Date().getTime();
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/getUpdates?offset=-20&limit=20&allowed_updates=["message"]&t=${timestamp}`; 
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.ok && data.result) {
      const adminReplies = data.result
        .filter((update: any) => 
          update.message && 
          update.message.text && 
          update.message.text.startsWith(`ID:${userId}:`)
        )
        .map((update: any) => ({
          update_id: update.update_id,
          text: update.message.text.replace(`ID:${userId}:`, '').trim()
        }));

      return adminReplies;
    }
    return [];
  } catch (error) {
    console.error('Error fetching updates:', error);
    return [];
  }
};

export const notifyAdminWelcome = () => {
  const text = `<b>🌟 Assalomu alaykum Avazxanov Abdulhay! 🌟</b>\n\n` +
               `🚀 Tizim tayyor. Mijozga javob berish uchun format:\n` +
               `<code>ID:USER_ID:Xabar matni</code>\n\n` +
               `<i>Masalan: ID:1712345:Salom Ibrohim!</i>`;
  return sendTelegramMessage(text);
};

export const notifyNewUser = (user: any) => {
  const text = `<b>👋 YANGI FOYDALANUVCHI KIRDI!</b>\n\n` +
               `🆔 ID: <code>${user.id}</code>\n` +
               `👤 Ism: <b>${user.firstName} ${user.lastName}</b>\n` +
               `📅 Yosh: <b>${user.age} yosh</b>\n` +
               `⏰ Vaqt: <b>${new Date().toLocaleString()}</b>\n\n` +
               `💬 <i>Javob berish uchun ID ni bosing va format bo'yicha yozing.</i>`;
  return sendTelegramMessage(text);
};

export const notifyAIChatMessage = (user: any, message: string) => {
  const text = `<b>🤖 AI CHAT: YANGI SAVOL!</b>\n\n` +
               `🆔 ID: <code>${user.id}</code>\n` +
               `👤 Mijoz: <b>${user.firstName} ${user.lastName}</b>\n\n` +
               `💬 <b>XABAR:</b>\n` +
               `<i>"${message}"</i>`;
  return sendTelegramMessage(text);
};

export const notifyLiveView = (userInfo: string, carName: string, price: string) => {
  const text = `<b>👀 JONLI KUZATUV (LIVE VIEW)</b>\n\n` +
               `👤 Mijoz: <b>${userInfo}</b>\n` +
               `🚘 Ko'ryapti: <b>${carName}</b>\n` +
               `💰 Narxi: <b>${price}</b>`;
  return sendTelegramMessage(text);
};

export const notifyWishlistAdd = (userName: string, car: any) => {
  const text = `<b>⭐ GARAZHGA QO'SHILDI</b>\n\n` +
               `👤 Mijoz: <b>${userName}</b>\n` +
               `🚗 Mashina: <b>${car.brand} ${car.model}</b>\n` +
               `💰 Narxi: <b>$${car.price.toLocaleString()}</b>`;
  return sendTelegramMessage(text);
};

export const notifyPurchaseRequest = (user: any, car: any) => {
  const caption = `<b>🔥 SOTIB OLISH SO'ROVI! 🔥</b>\n\n` +
                  `🆔 ID: <code>${user.id}</code>\n` +
                  `👤 Mijoz: <b>${user.firstName} ${user.lastName}</b>\n` +
                  `🚗 Mashina: <b>${car.brand} ${car.model}</b>\n` +
                  `💰 Narxi: <b>$${car.price.toLocaleString()}</b>`;
  return sendTelegramPhoto(car.imageUrl, caption);
};

export const notifyTestDrive = (userName: string, car: any, date: string) => {
  const text = `<b>🏎️ TEST-DRAYV BUYURTMASI!</b>\n\n` +
               `👤 Mijoz: <b>${userName}</b>\n` +
               `🚗 Mashina: <b>${car.brand} ${car.model}</b>\n` +
               `📅 Vaqt: <b>${date}</b>`;
  return sendTelegramMessage(text);
};
