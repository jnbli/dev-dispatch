export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  postedMinutesAgo: number;
  tags: string[];
}

export interface Company {
  name: string;
  blurb: string;
  careersUrl: string;
  openRoles: number;
}

export const COMPANIES: Company[] = [
  { name: "Stripe", blurb: "Economic infrastructure for the internet.", careersUrl: "https://stripe.com/jobs", openRoles: 4 },
  { name: "Vercel", blurb: "The platform for frontend developers.", careersUrl: "https://vercel.com/careers", openRoles: 3 },
  { name: "Linear", blurb: "Purpose-built tool for planning and building products.", careersUrl: "https://linear.app/careers", openRoles: 2 },
  { name: "Notion", blurb: "One workspace for docs, wikis, and projects.", careersUrl: "https://notion.so/careers", openRoles: 3 },
  { name: "Ramp", blurb: "Finance automation for growing businesses.", careersUrl: "https://ramp.com/careers", openRoles: 2 },
  { name: "Retool", blurb: "Build internal tools, remarkably fast.", careersUrl: "https://retool.com/careers", openRoles: 2 },
  { name: "Scale AI", blurb: "The data engine for AI.", careersUrl: "https://scale.com/careers", openRoles: 3 },
  { name: "Rippling", blurb: "The employee management platform.", careersUrl: "https://rippling.com/careers", openRoles: 2 },
];

export const JOBS: Job[] = [
  { id: "1", title: "Senior Backend Engineer", company: "Stripe", location: "Remote (US)", postedMinutesAgo: 4, tags: ["Backend", "Senior"] },
  { id: "2", title: "Frontend Engineer, Platform", company: "Vercel", location: "Remote (US)", postedMinutesAgo: 9, tags: ["Frontend", "React"] },
  { id: "3", title: "Full Stack Engineer", company: "Linear", location: "Remote (US)", postedMinutesAgo: 17, tags: ["Full Stack"] },
  { id: "4", title: "Infrastructure Engineer", company: "Notion", location: "Remote (US)", postedMinutesAgo: 26, tags: ["Infra", "Senior"] },
  { id: "5", title: "Product Engineer", company: "Ramp", location: "New York, NY", postedMinutesAgo: 38, tags: ["Full Stack"] },
  { id: "6", title: "Founding Engineer", company: "Retool", location: "Remote (US)", postedMinutesAgo: 45, tags: ["Full Stack", "Early Stage"] },
  { id: "7", title: "ML Infrastructure Engineer", company: "Scale AI", location: "San Francisco, CA", postedMinutesAgo: 52, tags: ["ML", "Backend"] },
  { id: "8", title: "Senior Frontend Engineer", company: "Rippling", location: "Remote (US)", postedMinutesAgo: 61, tags: ["Frontend", "Senior"] },
  { id: "9", title: "Platform Engineer", company: "Stripe", location: "Remote (US)", postedMinutesAgo: 74, tags: ["Backend"] },
  { id: "10", title: "Design Engineer", company: "Linear", location: "Remote (US)", postedMinutesAgo: 89, tags: ["Frontend", "Design"] },
  { id: "11", title: "Staff Software Engineer", company: "Notion", location: "San Francisco, CA", postedMinutesAgo: 103, tags: ["Backend", "Staff"] },
  { id: "12", title: "Backend Engineer, Payments", company: "Ramp", location: "Remote (US)", postedMinutesAgo: 118, tags: ["Backend", "Payments"] },
];

export function formatPostedAgo(minutes: number): string {
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  return `${hours}h ago`;
}
