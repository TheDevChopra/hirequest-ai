import { NextResponse } from 'next/server';
import { chatOllamaResponse } from '@/lib/ollama';
import { prisma } from '@/lib/prisma';
import { awardXP } from '@/lib/rpgEngine';

export async function POST(req: Request) {
  try {
    const { message, model, userId } = await req.json();

    // In a real app we'd verify auth. Here we use the provided ID.
    const actualUserId = userId === 'demo-user-id' ? null : userId; // bypass DB if demo
    
    let messages = [{ role: 'system', content: 'You are an expert AI Career Copilot. Keep responses professional, concise, and helpful for career advancement.' }];
    
    if (actualUserId) {
       // Save user message
       await prisma.chatHistory.create({
         data: { userId: actualUserId, role: 'user', content: message }
       });
       // Award XP for asking a question
       await awardXP(actualUserId, 5, "Used AI Copilot");

       // Fetch history
       const history = await prisma.chatHistory.findMany({
         where: { userId: actualUserId },
         orderBy: { createdAt: 'asc' },
         take: 10 // last 10 messages for context
       });
       history.forEach(h => messages.push({ role: h.role as any, content: h.content }));
    } else {
       messages.push({ role: 'user', content: message });
    }

    // Get Ollama response
    const aiResponse = await chatOllamaResponse(model || 'mistral', messages as any);

    if (actualUserId) {
      await prisma.chatHistory.create({
        data: { userId: actualUserId, role: 'assistant', content: aiResponse }
      });
    }

    return NextResponse.json({ response: aiResponse });
  } catch (error: any) {
    console.error('Chat API Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
