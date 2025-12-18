
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getCarRecommendation = async (userPreferences: string) => {
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
}
