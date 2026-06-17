// src/lib/rpgEngine.ts
import { prisma } from './prisma';

export const XP_REWARDS = {
  APPLY_JOB: 20,
  RESUME_UPDATE: 50,
  SKILL_ASSESSMENT: 100,
  RECRUITER_MESSAGE: 30,
  INTERVIEW_COMPLETED: 200,
  JOB_OFFER: 1000,
  JOB_HIRED: 5000,
};

// Level engine: Level N = sqrt(XP / 100) + 1
export function calculateLevel(xp: number): number {
  const level = Math.floor(Math.sqrt(xp / 100)) + 1;
  return Math.min(level, 50); // Cap at 50 "Career Legend"
}

export function getLevelTitle(level: number): string {
  if (level >= 50) return "Career Legend";
  if (level >= 25) return "Industry Expert";
  if (level >= 10) return "Skilled Professional";
  if (level >= 5) return "Career Explorer";
  return "Job Seeker";
}

export async function awardXP(userId: string, amount: number, reason: string) {
  // 1. Create transaction
  await prisma.xPTransaction.create({
    data: { userId, amount, reason }
  });

  // 2. Update user
  const user = await prisma.user.findUnique({ where: { id: userId }});
  if (!user) throw new Error("User not found");

  const newXP = user.currentXP + amount;
  const newLevel = calculateLevel(newXP);
  const leveledUp = newLevel > user.level;

  const updated = await prisma.user.update({
    where: { id: userId },
    data: {
      currentXP: newXP,
      level: newLevel,
      lastActiveAt: new Date(),
    }
  });

  return { updatedUser: updated, leveledUp };
}

export async function checkAndAwardAchievements(userId: string) {
    const user = await prisma.user.findUnique({ 
        where: { id: userId },
        include: { achievements: true, xpTransactions: true }
    });
    if (!user) return;

    const currentAchievedTitles = user.achievements.map(a => a.title);
    const newAchievements = [];

    const hasApplied = user.xpTransactions.some(t => t.reason === "Apply to Job");
    if (hasApplied && !currentAchievedTitles.includes("First Application")) {
        newAchievements.push({ title: "First Application", description: "Applied to your first job." });
    }

    const hasResumeUpdate = user.xpTransactions.some(t => t.reason === "Resume Update");
    if (hasResumeUpdate && !currentAchievedTitles.includes("Resume Master")) {
        newAchievements.push({ title: "Resume Master", description: "Updated your resume." });
    }

    const hasInterview = user.xpTransactions.some(t => t.reason === "Interview Completed");
    if (hasInterview && !currentAchievedTitles.includes("Interview Slayer")) {
        newAchievements.push({ title: "Interview Slayer", description: "Completed an interview." });
    }

    for (const ach of newAchievements) {
        await prisma.userAchievement.create({
            data: {
                userId,
                title: ach.title,
                description: ach.description
            }
        });
    }

    return newAchievements;
}
