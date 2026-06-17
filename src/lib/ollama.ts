// src/lib/ollama.ts

const OLLAMA_BASE_URL = 'http://localhost:11434';

export const SUPPORTED_MODELS = [
  'qwen', 
  'llama3',
  'gemma',
  'mistral'
];

interface OllamaGenerateArgs {
  model: string;
  prompt: string;
  system?: string;
  stream?: boolean;
}

export async function generateOllamaResponse({
  model,
  prompt,
  system,
  stream = false,
}: OllamaGenerateArgs) {
  try {
    const response = await fetch(`${OLLAMA_BASE_URL}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model,
        prompt,
        system,
        stream,
      }),
    });

    if (!response.ok) {
      throw new Error(`Ollama API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error("Ollama generate error:", error);
    throw error;
  }
}

interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export async function chatOllamaResponse(model: string, messages: ChatMessage[]) {
  try {
    const response = await fetch(`${OLLAMA_BASE_URL}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model,
        messages,
        stream: false,
      }),
    });

    if (!response.ok) {
      throw new Error(`Ollama API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.message.content;
  } catch (error) {
    console.error("Ollama chat error:", error);
    throw error;
  }
}

export async function generateCareerClass(
  model: string,
  resumeText: string,
  linkedinData: string,
  portfolioLinks: string
) {
  const prompt = `
You are an expert Career AI specialized in categorizing professionals into an RPG-style Career Class.
Analyze the following professional data and generate a JSON response representing their Career Class.

Data:
Resume: ${resumeText}
LinkedIn: ${linkedinData}
Portfolios: ${portfolioLinks}

Examples of valid classes: "Frontend Archer", "Growth Hacker", "Creative Strategist", "AI Wizard", "Marketing Commander", "Customer Success Guardian".

You MUST return ONLY valid JSON in the following format, with no markdown formatting or extra text:
{
  "className": "String",
  "description": "String (RPG flavor text)",
  "strengths": "String (comma separated)",
  "weaknesses": "String (comma separated)",
  "recommendedPath": "String",
  "suggestedSkills": "String (comma separated)"
}
  `;

  const responseText = await generateOllamaResponse({
    model,
    prompt,
    system: "You are an AI that outputs pure JSON.",
    stream: false,
  });

  try {
    // Attempt to parse the response as JSON. Clean up potential markdown formatting.
    const cleanJson = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleanJson);
  } catch (error) {
    console.error("Failed to parse Ollama response as JSON:", responseText);
    throw new Error("Invalid format returned by AI.");
  }
}

export async function analyzeResume(model: string, resumeText: string) {
  const prompt = `
You are an expert ATS (Applicant Tracking System) and professional Career Coach.
Analyze the following resume text and provide a comprehensive optimization report.

Resume Text:
${resumeText.substring(0, 3000)}

You MUST return ONLY valid JSON in the following format, with no markdown formatting or extra text:
{
  "atsScore": Number (0-100),
  "readabilityScore": Number (0-100),
  "impactScore": Number (0-100),
  "foundKeywords": ["String", "String"],
  "missingKeywords": ["String", "String"],
  "improvementTips": ["String", "String"]
}
  `;

  const responseText = await generateOllamaResponse({
    model,
    prompt,
    system: "You are an AI that outputs pure JSON.",
    stream: false,
  });

  try {
    const cleanJson = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleanJson);
  } catch (error) {
    console.error("Failed to parse Ollama resume analysis as JSON:", responseText);
    throw new Error("Invalid format returned by AI.");
  }
}
