'use server';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const DEMO_USER_ID = "demo-user-123";

export async function saveResumeAnalysis(
  name: string,
  content: string,
  atsScore: number,
  readabilityScore: number,
  impactScore: number,
  missingKeywords: string[],
  foundKeywords: string[],
  improvementTips: string[]
) {
  try {
    const resume = await prisma.resumeVersion.create({
      data: {
        userId: DEMO_USER_ID,
        name,
        content,
        atsScore,
        readabilityScore,
        impactScore,
        missingKeywords: JSON.stringify(missingKeywords),
        foundKeywords: JSON.stringify(foundKeywords),
        improvementTips: JSON.stringify(improvementTips)
      }
    });
    return { success: true, id: resume.id };
  } catch (error) {
    console.error("Failed to save resume:", error);
    return { success: false };
  }
}

export async function getResumes() {
  try {
    const resumes = await prisma.resumeVersion.findMany({
      where: { userId: DEMO_USER_ID },
      orderBy: { createdAt: 'desc' }
    });
    return resumes;
  } catch (error) {
    console.error("Failed to fetch resumes:", error);
    return [];
  }
}
