export interface Project {
  slug: string;
  title: string;
  category: string;
  shortDescription: string;
  description: string[];
  technologies: string[];
  highlights: string[];
  liveUrl?: string;
  repoUrl?: string;
  imageUrl?: string;
  achievement?: string;
  limitations?: string[];
}

export const projects: Project[] = [
  {
    slug: "food-security-ss",
    title: "Food Security Forecasting — South Sudan",
    category: "Machine Learning | Data Analysis | Humanitarian Technology",
    shortDescription: "Predicting IPC Phase 3+ food insecurity in South Sudanese counties using historical data.",
    description: [
      "Participated in the IndabaX South Sudan 2026 machine learning hackathon. The challenge was to develop and train a machine learning model using a provided dataset to predict which South Sudanese counties were at risk of Crisis-or-worse food insecurity (IPC Phase 3 or above).",
      "The challenge used historical and pre-assessment information, including population, assessment dates, previous IPC classifications, cereal production, and cereal production gaps.",
      "The project explored how predictive modelling could provide additional early-warning signals to support humanitarian organisations and government agencies in prioritising assessment and response resources.",
    ],
    technologies: ["Python", "Pandas", "scikit-learn"],
    highlights: [
      "Ranked 5th among 37 participants who submitted models.",
      "Integrated historical and pre-assessment data.",
      "Designed to complement expert-led IPC assessments.",
    ],
    liveUrl: "https://food-security-ss-37k4.vercel.app/",
    repoUrl: "https://github.com/Roadblock71/food-security-ss",
    achievement: "5th out of 37 participants",
    imageUrl: "/images/projects/food-security.jpg", // Placeholder
    limitations: [
      "The model is intended to complement expert-led IPC assessments, not replace them.",
      "Not officially adopted by humanitarian organisations or government agencies.",
    ],
  },
  {
    slug: "cyberaware-ssd",
    title: "CyberAware SSD",
    category: "Web Development | Cybersecurity Awareness",
    shortDescription: "A South Sudan-focused cybersecurity awareness and education platform.",
    description: [
      "CyberAware SSD is a South Sudan-focused cybersecurity awareness and education platform designed to help users learn about safer online practices.",
      "The platform includes functionality for user accounts, courses, lessons, quizzes, learning progress, certificates, badges, and administrative course management.",
    ],
    technologies: ["PHP", "MySQL", "HTML", "CSS", "Bootstrap", "JavaScript"],
    highlights: [
      "Educational course and lesson management",
      "Interactive quizzes and progress tracking",
      "Certificates and achievement badges",
      "Administrative content management",
      "A focus on cybersecurity awareness in the South Sudanese context",
    ],
    liveUrl: "https://cyberawaressd.infinityfreeapp.com/CyberAwareSSD/",
    imageUrl: "/images/projects/cyberaware.jpg", // Placeholder
    limitations: [
      "This platform is not independently certified or penetration-tested.",
    ],
  },
  {
    slug: "gurush-remit",
    title: "GurushRemit",
    category: "Full-Stack Web Development | Financial Technology",
    shortDescription: "A cash-based money transfer management system prototype.",
    description: [
      "GurushRemit is a cash-based money transfer management system designed around physical branches and agents. It supports a workflow in which an agent records a transfer and an agent at the receiving branch can locate and process it.",
    ],
    technologies: ["PHP", "MySQL", "HTML", "CSS", "JavaScript"],
    highlights: [
      "Branch and agent management",
      "Money transfer recording and retrieval",
      "Transaction reference codes",
      "PIN-based recipient verification",
      "Currency conversion",
      "Transfer receipts",
      "Administrative management",
    ],
    imageUrl: "/images/projects/gurush-remit.jpg", // Placeholder
    limitations: [
      "This is a prototype. It is not licensed, bank-integrated, commercially deployed, or processing real financial transactions.",
    ],
  },
  {
    slug: "cpp-hotel-management",
    title: "C++ Hotel Management System",
    category: "Software Development | C++",
    shortDescription: "A practical programming project applying C++ fundamentals to a management-system problem.",
    description: [
      "A C++ hotel management system developed as a practical programming project. It demonstrates experience applying programming fundamentals to a management-system problem.",
    ],
    technologies: ["C++"],
    highlights: [
      "Applied programming fundamentals (loops, conditionals, file I/O)",
      "Management system logic",
    ],
    imageUrl: "/images/projects/cpp-hotel.jpg", // Placeholder
    limitations: [
      "Feature list and screenshots will be added upon verification.",
    ],
  },
];