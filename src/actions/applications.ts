'use server';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const DEMO_USER_ID = "demo-user-123"; 

export async function getApplications() {
  try {
    const apps = await prisma.jobApplication.findMany({
      where: { userId: DEMO_USER_ID },
      orderBy: { boardOrder: 'asc' }
    });
    return apps;
  } catch (error) {
    console.error("Failed to fetch applications:", error);
    return [];
  }
}

export async function updateApplicationStatus(id: string, newStatus: string, newOrder: number) {
  try {
    await prisma.jobApplication.update({
      where: { id },
      data: {
        status: newStatus,
        boardOrder: newOrder
      }
    });
    return { success: true };
  } catch (error) {
    console.error("Failed to update application status:", error);
    return { success: false, error: "Failed to update" };
  }
}

export async function reorderApplications(updates: { id: string, boardOrder: number, status?: string }[]) {
  try {
    await prisma.$transaction(
      updates.map(update => 
        prisma.jobApplication.update({
          where: { id: update.id },
          data: { 
            boardOrder: update.boardOrder,
            ...(update.status ? { status: update.status } : {})
          }
        })
      )
    );
    return { success: true };
  } catch (error) {
    console.error("Failed to reorder applications:", error);
    return { success: false, error: "Failed to reorder" };
  }
}
