const videoLibrary = [
  "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
  "https://www.w3schools.com/html/mov_bbb.mp4",
  "https://www.youtube.com/watch?v=ysz5S6PUM-U",
];

const moduleTemplatesByCategory = {
  "Web Dev": [
    {
      title: "Foundations",
      lessons: [
        "Kickoff and Environment Setup",
        "Core Concepts Walkthrough",
        "Building the First Feature",
      ],
    },
    {
      title: "Project Build",
      lessons: [
        "UI Composition",
        "Data Flow and API Wiring",
        "Deployment Checklist",
      ],
    },
  ],
  DSA: [
    {
      title: "Core Thinking",
      lessons: [
        "Problem Solving Approach",
        "Time and Space Complexity",
        "Pattern Recognition Practice",
      ],
    },
    {
      title: "Interview Drills",
      lessons: [
        "Array and String Patterns",
        "Trees and Graph Strategies",
        "Mock Interview Review",
      ],
    },
  ],
  AI: [
    {
      title: "AI Basics",
      lessons: [
        "Tooling and Workflow Setup",
        "Model Concepts Simplified",
        "Working with Real Prompts",
      ],
    },
    {
      title: "Applied AI",
      lessons: [
        "Building a Small Prototype",
        "Evaluation and Iteration",
        "Shipping AI Features Safely",
      ],
    },
  ],
  Design: [
    {
      title: "Design Principles",
      lessons: [
        "Visual Hierarchy Basics",
        "Color, Type, and Layout",
        "Design Critique Practice",
      ],
    },
    {
      title: "Portfolio Practice",
      lessons: [
        "Wireframes to Screens",
        "Design Systems Intro",
        "Presenting the Final Work",
      ],
    },
  ],
};

const createModules = (categoryName, courseTitle) => {
  const templates = moduleTemplatesByCategory[categoryName] || [];

  return templates.map((module, moduleIndex) => ({
    title: `${module.title} for ${courseTitle}`,
    lessons: module.lessons.map((lessonTitle, lessonIndex) => ({
      title: lessonTitle,
      videoUrl:
        videoLibrary[
          (moduleIndex * module.lessons.length + lessonIndex) %
            videoLibrary.length
        ],
    })),
  }));
};

const courseDefinitions = [
  {
    title: "Modern React Bootcamp",
    desc: "Build real React apps with components, routing, forms, and API integration.",
    price: 99,
    categoryName: "Web Dev",
    enrolledStudentEmails: ["student@example.com"],
  },
  {
    title: "Node and Express API Lab",
    desc: "Create backend APIs with routing, middleware, authentication, and MongoDB.",
    price: 109,
    categoryName: "Web Dev",
    enrolledStudentEmails: ["student@example.com"],
  },
  {
    title: "Frontend Performance Essentials",
    desc: "Learn practical techniques to make interfaces faster and smoother.",
    price: 89,
    categoryName: "Web Dev",
  },
  {
    title: "Full Stack MERN Projects",
    desc: "Connect React, Express, and MongoDB into portfolio-ready applications.",
    price: 129,
    categoryName: "Web Dev",
  },
  {
    title: "JavaScript Interview Prep",
    desc: "Strengthen your JavaScript fundamentals through targeted interview drills.",
    price: 79,
    categoryName: "Web Dev",
  },
  {
    title: "DSA Foundations for Beginners",
    desc: "Start from scratch with arrays, strings, maps, and core algorithm thinking.",
    price: 69,
    categoryName: "DSA",
    enrolledStudentEmails: ["student@example.com"],
  },
  {
    title: "Recursion and Backtracking Mastery",
    desc: "Understand recursive problem solving and practice classic backtracking patterns.",
    price: 89,
    categoryName: "DSA",
    enrolledStudentEmails: ["student@example.com"],
  },
  {
    title: "Graphs for Coding Interviews",
    desc: "Cover traversals, shortest paths, and graph modeling for interviews.",
    price: 94,
    categoryName: "DSA",
  },
  {
    title: "Dynamic Programming Roadmap",
    desc: "Learn how to recognize and solve dynamic programming problems with confidence.",
    price: 99,
    categoryName: "DSA",
  },
  {
    title: "Binary Trees and BST Practice",
    desc: "Work through the tree problems most often asked in technical interviews.",
    price: 84,
    categoryName: "DSA",
  },
  {
    title: "AI Tools for Developers",
    desc: "Use modern AI tools to speed up coding, planning, and debugging workflows.",
    price: 119,
    categoryName: "AI",
    enrolledStudentEmails: ["student@example.com"],
  },
  {
    title: "Prompt Engineering in Practice",
    desc: "Write better prompts, compare outputs, and improve reliability.",
    price: 89,
    categoryName: "AI",
    enrolledStudentEmails: ["student@example.com"],
  },
  {
    title: "Machine Learning Concepts Simplified",
    desc: "Build intuition for supervised learning, evaluation, and model selection.",
    price: 109,
    categoryName: "AI",
  },
  {
    title: "LLM App Prototyping",
    desc: "Prototype lightweight applications that use chat, summarization, and retrieval.",
    price: 129,
    categoryName: "AI",
  },
  {
    title: "AI Product Thinking",
    desc: "Learn how to design useful AI features with strong user experience guardrails.",
    price: 99,
    categoryName: "AI",
  },
  {
    title: "UI Design Starter Kit",
    desc: "Learn layout, spacing, typography, and interface decisions through examples.",
    price: 74,
    categoryName: "Design",
    enrolledStudentEmails: ["student@example.com"],
  },
  {
    title: "Figma for Product Designers",
    desc: "Go from wireframes to polished flows using modern Figma workflows.",
    price: 84,
    categoryName: "Design",
    enrolledStudentEmails: ["student@example.com"],
  },
  {
    title: "Design Systems Fundamentals",
    desc: "Understand reusable UI patterns, tokens, components, and consistency rules.",
    price: 94,
    categoryName: "Design",
  },
  {
    title: "Mobile App UX Patterns",
    desc: "Study common mobile flows, onboarding patterns, and interaction design choices.",
    price: 79,
    categoryName: "Design",
  },
  {
    title: "Portfolio Case Study Workshop",
    desc: "Turn project work into strong case studies that show process and outcomes.",
    price: 69,
    categoryName: "Design",
  },
];

const demoCourses = courseDefinitions.map((course) => ({
  ...course,
  modules: createModules(course.categoryName, course.title),
}));

export default demoCourses;
