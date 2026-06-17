'use server';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const DEMO_USER_ID = "demo-user-123";

export async function updateUserSettings(name: string, email: string) {
  try {
    await prisma.user.update({
      where: { id: DEMO_USER_ID },
      data: { name, email }
    });
    return { success: true };
  } catch (error) {
    console.error("Failed to update settings:", error);
    return { success: false };
  }
}
