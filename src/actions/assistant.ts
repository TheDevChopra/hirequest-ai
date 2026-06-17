'use server';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const DEMO_USER_ID = "demo-user-123";

export async function getChatHistory() {
  try {
    const history = await prisma.chatHistory.findMany({
      where: { userId: DEMO_USER_ID },
      orderBy: { createdAt: 'asc' }
    });
    return history.map(h => ({ role: h.role, content: h.content }));
  } catch (error) {
    console.error("Failed to fetch chat history:", error);
    return [];
  }
}

export async function saveChatMessage(role: string, content: string) {
  try {
    await prisma.chatHistory.create({
      data: {
        userId: DEMO_USER_ID,
        role,
        content
      }
    });
    return { success: true };
  } catch (error) {
    console.error("Failed to save chat message:", error);
    return { success: false };
  }
}

export async function clearChatHistory() {
  try {
    await prisma.chatHistory.deleteMany({
      where: { userId: DEMO_USER_ID }
    });
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}
