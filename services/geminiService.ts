
import { GoogleGenAI, Type } from "@google/genai";
import { Profile } from "../types";

// Fix: Strictly follow guidelines for API key initialization and removal of fallback empty string
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const findBestMatch = async (problem: string, experts: Profile[]): Promise<string | null> => {
  if (experts.length === 0) return null;

  const expertListString = experts
    .map(e => `UID: ${e.uid}, Expertise: ${e.expertise}`)
    .join('\n');

  const prompt = `
    You are an expert matching system for a skill-sharing platform.
    
    PROBLEM DESCRIPTION:
    "${problem}"

    AVAILABLE EXPERTS:
    ${expertListString}

    TASK:
    Analyze the problem and the list of experts. Return the UID of the single best expert to help with this specific problem. 
    If no one is a good fit, return "null".
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            bestMatchUid: {
              type: Type.STRING,
              description: "The UID of the best matched expert, or 'null' if none found."
            },
            reasoning: {
              type: Type.STRING,
              description: "Brief explanation of why this match was made."
            }
          },
          required: ["bestMatchUid"]
        }
      }
    });

    // Fix: Access response text using the .text property directly as per @google/genai guidelines
    const result = JSON.parse(response.text || '{}');
    return result.bestMatchUid === "null" ? null : result.bestMatchUid;
  } catch (error) {
    console.error("AI Matching Error:", error);
    return null;
  }
};
