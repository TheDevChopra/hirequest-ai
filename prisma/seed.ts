import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const DEMO_USER_ID = "demo-user-123";

async function main() {
  console.log("Seeding Database...");

  // Ensure Demo User exists
  const user = await prisma.user.upsert({
    where: { id: DEMO_USER_ID },
    update: {},
    create: {
      id: DEMO_USER_ID,
      email: "dev@hirequest.com",
      name: "Dev Engineer",
      role: "CANDIDATE"
    }
  });

  await prisma.profile.upsert({
    where: { userId: DEMO_USER_ID },
    update: {},
    create: {
      userId: DEMO_USER_ID,
      about: "Passionate frontend engineer focused on building highly performant applications.",
      location: "San Francisco, CA (Remote)",
      experienceLevel: "Senior",
      profileViews: 142,
      searchAppearances: 56,
      recruiterSaves: 8
    }
  });

  // Clear existing to avoid duplicates in demo
  await prisma.opportunity.deleteMany();
  await prisma.jobApplication.deleteMany();

  // Create Opportunities
  await prisma.opportunity.createMany({
    data: [
      { title: "Senior Frontend Engineer", company: "Stripe", location: "Remote", salaryMin: 160000, salaryMax: 210000, description: "Build world class payment UIs.", requirements: "React, TS, 5+ yrs exp." },
      { title: "Product Engineer", company: "Linear", location: "San Francisco", salaryMin: 140000, salaryMax: 190000, description: "Help build the future of work.", requirements: "React, GraphQL, UI/UX focus." },
      { title: "Staff Fullstack Engineer", company: "Vercel", location: "Remote", salaryMin: 180000, salaryMax: 240000, description: "Make the web faster.", requirements: "Next.js, Edge compute." },
    ]
  });

  // Create Applications
  await prisma.jobApplication.createMany({
    data: [
      { userId: DEMO_USER_ID, company: "Airbnb", roleTitle: "Frontend Engineer", location: "Remote", status: "interested", boardOrder: 0 },
      { userId: DEMO_USER_ID, company: "Linear", roleTitle: "Product Engineer", location: "San Francisco", status: "applied", boardOrder: 0 },
      { userId: DEMO_USER_ID, company: "Stripe", roleTitle: "Software Engineer", location: "Seattle", status: "interview", boardOrder: 0 },
    ]
  });

  console.log("Database seeded successfully!");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
