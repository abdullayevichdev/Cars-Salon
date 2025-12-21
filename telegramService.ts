
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

export const notifyAdminWelcome = () => {
  const text = `<b>🌟 Assalomu alaykum Avazxanov Abdulhay! 🌟</b>\n\n` +
               `🚀 <b>Abdulhay Motors</b> tizimi muvaffaqiyatli ishga tushdi!\n\n` +
               `Barcha tizimlar nazorat ostida. 🎰 💰`;
  return sendTelegramMessage(text);
};

export const notifyNewUser = (firstName: string, lastName: string, age: number) => {
  const text = `<b>👋 YANGI FOYDALANUVCHI KIRDI!</b>\n\n` +
               `👤 Ism: <b>${firstName} ${lastName}</b>\n` +
               `📅 Yosh: <b>${age} yosh</b>\n` +
               `⏰ Vaqt: <b>${new Date().toLocaleString()}</b>`;
  return sendTelegramMessage(text);
};

export const notifyLiveView = (userName: string, carName: string) => {
  const text = `<b>👀 JONLI KUZATUV (LIVE VIEW)</b>\n\n` +
               `👤 Mijoz: <b>${userName}</b>\n` +
               `🚘 Ko'ryapti: <b>${carName}</b>\n` +
               `📍 <i>Mijoz hozir sahifada turibdi!</i>`;
  return sendTelegramMessage(text);
};

export const notifyTestDrive = (userName: string, car: any, date: string) => {
  const caption = `<b>📅 TEST-DRAYVGA BUYURTMA!</b>\n\n` +
                  `👤 Mijoz: <b>${userName}</b>\n` +
                  `🚗 Mashina: <b>${car.brand} ${car.model}</b>\n` +
                  `🕒 Tanlangan vaqt: <b>${date}</b>\n\n` +
                  `✅ <i>Tezda mijoz bilan bog'laning!</i>`;
  return sendTelegramPhoto(car.imageUrl, caption);
};

export const notifyWishlistAdd = (userName: string, car: any) => {
  const caption = `<b>⭐ GARAJGA QO'SHILDI</b>\n\n` +
                  `👤 Mijoz: <b>${userName}</b>\n` +
                  `🚗 Mashina: <b>${car.brand} ${car.model}</b>\n` +
                  `💰 Narxi: <b>$${car.price.toLocaleString()}</b>`;
  return sendTelegramPhoto(car.imageUrl, caption);
};

export const notifyPurchaseRequest = (user: any, car: any) => {
  const caption = `<b>🔥 SOTIB OLISH SO'ROVI (BUY NOW)! 🔥</b>\n\n` +
                  `👤 <b>MIJOZ:</b>\n` +
                  `- Ism: <b>${user.firstName} ${user.lastName}</b>\n` +
                  `🚗 <b>AVTOMOBIL:</b>\n` +
                  `- Model: <b>${car.brand} ${car.model}</b>\n` +
                  `- Narxi: <b>$${car.price.toLocaleString()}</b>\n\n` +
                  `🚀 Mijoz qo'ng'iroqingizni kutmoqda! 🚀`;
  return sendTelegramPhoto(car.imageUrl, caption);
};
