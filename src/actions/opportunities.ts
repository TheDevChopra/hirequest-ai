'use server';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getOpportunities() {
  try {
    const opps = await prisma.opportunity.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return opps;
  } catch (error) {
    console.error("Failed to fetch opportunities:", error);
    return [];
  }
}
