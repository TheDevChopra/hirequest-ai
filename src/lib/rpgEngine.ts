import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function awardXP(userId: string, amount: number, description: string) {
  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return;
    
    let newXp = user.currentXP + amount;
    let newLevel = Math.floor(Math.sqrt(newXp / 100)) + 1;

    await prisma.user.update({
      where: { id: userId },
      data: {
        currentXP: newXp,
        level: newLevel
      }
    });

  } catch (error) {
    console.error("Failed to award XP:", error);
  }
}
