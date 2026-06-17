'use server';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const DEMO_USER_ID = "demo-user-123";

export async function getUserProfile() {
  try {
    const user = await prisma.user.findUnique({
      where: { id: DEMO_USER_ID },
      include: { profile: true }
    });
    return user;
  } catch (error) {
    console.error("Failed to fetch profile:", error);
    return null;
  }
}
