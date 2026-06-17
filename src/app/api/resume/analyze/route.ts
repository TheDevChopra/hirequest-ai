import { NextResponse } from 'next/server';
import { analyzeResume } from '@/lib/ollama';

export async function POST(req: Request) {
  try {
    const { resumeText } = await req.json();

    if (!resumeText) {
      return NextResponse.json({ error: 'Resume text is required' }, { status: 400 });
    }

    // Call local Ollama AI to perform deep ATS analysis
    const analysis = await analyzeResume('llama3', resumeText);

    return NextResponse.json(analysis);
  } catch (error: any) {
    console.error("Resume analysis route error:", error);
    return NextResponse.json(
      { error: 'Failed to analyze resume.' },
      { status: 500 }
    );
  }
}
