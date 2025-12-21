
import { GoogleGenAI } from "@google/genai";

// Ensure process.env is handled safely for client-side builds
const API_KEY = process.env.API_KEY || "";
const ai = new GoogleGenAI({ apiKey: API_KEY });

export const getCarRecommendation = async (userPreferences: string) => {
  if (!API_KEY) return "Abdulhay Motors premium avtomobillarini tavsiya qiladi.";
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Foydalanuvchi quyidagi afzalliklarga ega avtomobil qidirmoqda: ${userPreferences}. 
                 Global avtomobil tendentsiyalari asosida, ularga mos keladigan hashamatli yoki yuqori texnologiyali avtomobil haqida qisqa, professional tavsiya bering. 
                 Tavsiyani O'zbek tilida bering va "Abdulhay Motors"ni yuqori sifatli manba sifatida tilga oling.`,
      config: {
        systemInstruction: "Siz Abdulhay Motors kompaniyasining professional avtomobil maslahatchisisiz. Javoblaringiz faqat O'zbek tilida, ishonchli va hashamatli ohangda bo'lishi kerak.",
        temperature: 0.7,
      },
    });
    return response.text;
  } catch (error) {
    return "Abdulhay Motors sizga unumdorlik va barqarorlikning eng yaxshi kombinatsiyasi uchun bizning premium elektromobillar kolleksiyamizni o'rganishni tavsiya qiladi.";
  }
};

export const getCarAIReview = async (carBrand: string, carModel: string) => {
    if (!API_KEY) return "Ushbu avtomobil o'z toifasida eng yaxshi tanlovdir.";
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `${carBrand} ${carModel} avtomobili haqida 3 jumlali ekspert xulosasini yozing. Uning hashamat bozoridagi o'rni va muhandislik yutuqlariga e'tibor bering. O'zbek tilida yozing.`,
        config: {
          systemInstruction: "Siz global avtomobil muhandisligi bo'yicha ekspertsiz. Faqat O'zbek tilida javob bering.",
          temperature: 0.8,
        }
      });
      return response.text;
    } catch (error) {
      return "Ushbu avtomobil o'z toifasida tengsiz muhandislik va nufuzni belgilovchi ajoyib tanlovdir.";
    }
};

export const chatWithAI = async (history: any[], message: string) => {
  if (!API_KEY) return "AI hozircha ishlamayapti, iltimos keyinroq urinib ko'ring.";
  try {
    const chat = ai.chats.create({
      model: "gemini-3-flash-preview",
      config: {
        systemInstruction: "Siz Abdulhay Motorsning 'Abdulhay AI' ismli virtual yordamchisisiz. Siz juda xushmuomala, professional va avtomobillar bo'yicha ekspert emassiz. Sizning maqsadingiz mijozga mashina tanlashda yordam berish va uni Abdulhay Motorsdan sotib olishga qiziqtirishdir. Faqat O'zbek tilida javob bering.",
        temperature: 0.9,
      }
    });
    
    const result = await chat.sendMessage({ message });
    return result.text;
  } catch (error) {
    console.error("AI Chat error:", error);
    return "Kechirasiz, tizimda vaqtinchalik uzilish yuz berdi. Iltimos, bir ozdan so'ng qayta urinib ko'ring.";
  }
};
