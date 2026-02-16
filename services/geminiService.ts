import { GoogleGenAI, Type, Schema } from "@google/genai";
import { Startup } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
console.log("Gemini API Key Loaded:", !!process.env.API_KEY);

const STARTUP_SCHEMA: Schema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      name: { type: Type.STRING },
      industry: { type: Type.STRING },
      founded: { type: Type.STRING },
      founders: { type: Type.STRING, description: "Names of the key founders (e.g. 'Elizabeth Holmes' or 'Adam Neumann')" },
      sunset: { type: Type.STRING },
      raised: { type: Type.STRING },
      description: { type: Type.STRING },
      lessonLearned: { type: Type.STRING, description: "A short 2-3 word failure category e.g., 'Premature Scaling'" },
      whatIf: { type: Type.STRING, description: "A wistful sentence about their potential success." },
      focusArea: { type: Type.STRING },
      analogy: { type: Type.STRING, description: "A simple real-world analogy explaining the failure (e.g., 'Like trying to boil the ocean with a match')." },
      mentalModel: { type: Type.STRING, description: "The specific cognitive bias or business concept (e.g., 'The Sunk Cost Fallacy')." },
      pivotStrategy: { type: Type.STRING, description: "One specific strategic move that could have saved them." },
      sourceUrl: { type: Type.STRING, description: "A specific, valid URL to a news article about the failure (New York Times, The Verge, BBC, TechCrunch). Do not use broken paths." }
    },
    required: ["name", "industry", "founded", "founders", "raised", "lessonLearned", "whatIf", "description", "analogy", "mentalModel", "pivotStrategy", "sourceUrl"]
  }
};

export const fetchCategoryStartups = async (category: string, focus: string): Promise<Startup[]> => {
  try {
    const prompt = `
      Task: List 5 REAL, VERIFIABLE failed startups in the ${category} industry.
      
      STRICT RULES:
      1. REAL COMPANIES ONLY. Do not invent synthetic startups.
      2. Provide a valid 'sourceUrl' for each. Prioritize major publishers (NYT, BBC, Verge, Wired) over niche blogs to ensure links work.
      3. Focus on high-profile failures where lessons are clear.
      
      Analysis Requirements:
      - Include the names of the Founders.
      - Focus on these failure points: ${focus}.
      - "Mental Model": A business concept to remember (e.g., "Blitzscaling Trap").
      - "Simple Analogy": Explain it to a 5-year-old.
      - "Pivot Strategy": A concrete strategic change they missed.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: STARTUP_SCHEMA,
      }
    });

    const rawData = JSON.parse(response.text || "[]");
    
    return rawData.map((item: any, index: number) => ({
      ...item,
      id: `${category}-${index}-${Date.now()}`
    }));

  } catch (error) {
    console.error("Gemini API Error:", error);
    return [];
  }
};

export const searchSpecificStartup = async (query: string): Promise<Startup[]> => {
  try {
    const prompt = `
      Task: Analyze the REAL startup failure: "${query}".
      
      STRICT RULES:
      1. If the query matches a real failed company, analyze it deeply.
      2. If it's a general topic, find 5 REAL failed companies in that space (Increased from 3).
      3. Provide valid 'sourceUrl' links. Avoid generic homepages; link to specific "Shut down" or "Post-mortem" articles from reputable news sources (Verge, NYT, BBC, TechCrunch).
      
      Output Analysis:
      - Include Founder Names.
      - Deep dive with mental models and analogies.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: STARTUP_SCHEMA,
      }
    });

     const rawData = JSON.parse(response.text || "[]");
    return rawData.map((item: any, index: number) => ({
      ...item,
      id: `search-${index}-${Date.now()}`
    }));
  } catch (error) {
    console.error("Gemini Search Error", error);
    return [];
  }
};
