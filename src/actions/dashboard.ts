'use server';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const DEMO_USER_ID = "demo-user-123";

export async function getDashboardStats() {
  try {
    const user = await prisma.user.findUnique({
      where: { id: DEMO_USER_ID },
      include: { profile: true }
    });

    const activeApps = await prisma.jobApplication.count({
      where: { 
        userId: DEMO_USER_ID,
        status: { notIn: ['rejected'] }
      }
    });

    const recentApps = await prisma.jobApplication.findMany({
      where: { userId: DEMO_USER_ID },
      orderBy: { createdAt: 'desc' },
      take: 4
    });

    const recommendedOpps = await prisma.opportunity.findMany({
      orderBy: { createdAt: 'desc' },
      take: 3
    });

    return {
      user,
      activeApps,
      recentApps,
      recommendedOpps
    };
  } catch (error) {
    console.error("Failed to fetch dashboard stats:", error);
    return null;
  }
}
