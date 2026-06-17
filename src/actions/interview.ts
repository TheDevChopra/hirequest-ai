'use server';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const DEMO_USER_ID = "demo-user-123";

export async function saveInterviewScore(type: string, score: number) {
  try {
    await prisma.interviewSession.create({
      data: {
        userId: DEMO_USER_ID,
        type: type,
        status: "Completed",
        overallScore: score
      }
    });
    return { success: true };
  } catch (error) {
    console.error("Failed to save interview:", error);
    return { success: false };
  }
}
