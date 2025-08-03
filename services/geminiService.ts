
import { GoogleGenAI } from "@google/genai";

if (!process.env.API_KEY) {
  // In a real app, you'd want to handle this more gracefully.
  // For this example, we'll throw an error if the key is missing.
  throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const model = "gemini-2.5-flash";

/**
 * Meringkas teks yang diberikan.
 * @param text Teks untuk diringkas.
 * @returns Teks yang telah diringkas.
 */
export const summarizeText = async (text: string): Promise<string> => {
  if (!text.trim()) return "Teks kosong, tidak ada yang bisa diringkas.";
  
  const prompt = `Anda adalah asisten penulis yang ahli. Ringkas teks berikut ini dalam beberapa poin penting atau satu paragraf singkat. Fokus pada ide-ide utama.\n\nTeks:\n---\n${text}\n---\n\nRingkasan:`;
  
  try {
    const response = await ai.models.generateContent({
        model,
        contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error summarizing text:", error);
    return "Maaf, terjadi kesalahan saat mencoba meringkas teks.";
  }
};

/**
 * Memperbaiki tata bahasa dan ejaan dari teks yang diberikan.
 * @param text Teks untuk diperbaiki.
 * @returns Teks yang telah diperbaiki.
 */
export const correctGrammar = async (text: string): Promise<string> => {
  if (!text.trim()) return "Teks kosong, tidak ada yang bisa diperbaiki.";

  const prompt = `Anda adalah seorang editor profesional. Perbaiki semua kesalahan tata bahasa dan ejaan dalam teks berikut. Jangan mengubah gaya atau makna asli dari tulisan tersebut. Kembalikan hanya teks yang sudah diperbaiki.\n\nTeks Asli:\n---\n${text}\n---\n\nTeks yang Diperbaiki:`;

  try {
    const response = await ai.models.generateContent({
        model,
        contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error correcting grammar:", error);
    return "Maaf, terjadi kesalahan saat mencoba memperbaiki tata bahasa.";
  }
};

/**
 * Menghasilkan ide-ide baru berdasarkan teks yang diberikan.
 * @param text Teks sebagai dasar untuk ide.
 * @returns Daftar ide-ide baru.
 */
export const generateIdeas = async (text: string): Promise<string> => {
    if (!text.trim()) return "Teks kosong, tidak ada ide yang bisa dihasilkan.";

    const prompt = `Anda adalah seorang ahli strategi kreatif. Berdasarkan teks berikut, hasilkan 3 ide atau konsep baru yang bisa dikembangkan lebih lanjut. Sajikan dalam format daftar bernomor.\n\nTeks Referensi:\n---\n${text}\n---\n\nIde-ide Baru:`;
    
    try {
        const response = await ai.models.generateContent({
            model,
            contents: prompt,
        });
        return response.text;
    } catch (error) {
        console.error("Error generating ideas:", error);
        return "Maaf, terjadi kesalahan saat mencoba menghasilkan ide.";
    }
};
