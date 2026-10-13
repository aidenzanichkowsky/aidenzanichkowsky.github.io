export const navItems = [
  { href: "/", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
] as const;

export const skillGroups = [
  {
    title: "Languages",
    items: ["Python", "JavaScript", "Java"],
  },
  {
    title: "Frameworks",
    items: ["React", "Node.js", "D3.js"],
  },
  {
    title: "Core Tools",
    items: ["Git", "APIs", "SQL"],
  },
  {
    title: "Specialties",
    items: ["AI", "Prompt Engineering", "Security"],
  },
] as const;

export const focusAreas = [
  "Scalable systems",
  "Automation-first workflows",
  "AI-powered product thinking",
  "Clean, maintainable code",
] as const;

export const aboutHighlights = [
  "Recent Algonquin College graduate (2025)",
  "Focused on full-stack development, automation, and AI",
  "Interested in thoughtful product design and data-rich interfaces",
] as const;

export const projects: Array<{
  id: string;
  title: string;
  summary: string;
  tags: string[];
  href: string;
}> = [
  {
    id: "python-gif-generator",
    title: "Python Animated GIF Generator",
    summary: "A Python script that uses ImageIO to combine two PNG images into a looping animated GIF with configurable frame timing.",
    tags: ["Python", "ImageIO", "Git"],
    href: "https://github.com/aidenzanichkowsky/gif-project",
  },
];
