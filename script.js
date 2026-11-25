const RESUME = {
  name: "Harsh Jadon",
  headline: "Computer Science Undergraduate | Full-Stack Web & Computer Vision",
  location: "Ballabgarh, Faridabad, Haryana, India",
  summary:
    "Computer Science undergraduate specializing in full-stack web development and computer vision. Hands-on experience architecting RESTful APIs, secure authentication systems, and machine learning models using OpenCV, MediaPipe, and PyTorch. Proven track record of delivering production-ready code through software engineering internships, competitive hackathons, and real-world system implementations.",
  experience: [
    {
      role: "Full Stack Development Intern",
      company: "Cognifz IT Solutions (Remote)",
      period: "Jul 2026 – Aug 2026",
      highlights: [
        "Engineered a secure user authentication and session management architecture using Node.js, Express.js, and MongoDB, incorporating encrypted password hashing and session cookies.",
        "Developed and shipped 8 full-stack production features, including EJS server-rendered interfaces, RESTful APIs, and custom middleware for request validation.",
        "Optimized system performance under high concurrency by implementing server-side caching and asynchronous background processing, significantly reducing database load."
      ]
    }
  ],
  projects: [
    {
      title: "Sahayak – Emergency Assistance App",
      stack: ["Android Studio", "Java", "Firebase", "GPS APIs"],
      highlights: [
        "Architected an emergency SOS dispatch system delivering real-time GPS location tracking and push alerts to pre-configured emergency contacts.",
        "Designed a custom lock-screen overlay interface displaying vital medical information and emergency contacts for immediate first-responder access without unlocking the device."
      ]
    },
    {
      title: "Sign Language Translator",
      stack: ["Python", "MediaPipe", "OpenCV", "PyTorch", "LSTM"],
      highlights: [
        "Developed an end-to-end real-time gesture translation pipeline using MediaPipe hand-tracking landmark estimation and LSTM neural networks to classify dynamic gestures into text.",
        "Processed live camera stream frames to minimize inference latency and maximize continuous sign recognition accuracy."
      ]
    },
    {
      title: "Scrap2Stack – Developer Collaboration Platform",
      stack: ["Android", "Kotlin", "Jetpack Compose", "Supabase", "MVVM"],
      highlights: [
        "Engineered a community-driven platform to reduce idea waste and encourage developer collaboration through idea sharing and project discovery.",
        "Implemented secure user authentication, interactive developer profiles, real-time notifications, and seamless GitHub integration."
      ]
    }
  ],
  skills: [
    {
      category: "Languages",
      items: ["Python", "C", "JavaScript (ES6+)", "SQL"]
    },
    {
      category: "Web & Backend Development",
      items: [
        "Node.js",
        "Express.js",
        "React.js",
        "HTML5",
        "CSS3",
        "EJS",
        "Bootstrap",
        "Tailwind CSS",
        "REST APIs"
      ]
    },
    {
      category: "AI & Computer Vision",
      items: [
        "OpenCV",
        "MediaPipe",
        "TensorFlow",
        "PyTorch",
        "TensorFlow Lite",
        "LSTM Neural Networks"
      ]
    },
    {
      category: "Databases & Tools",
      items: [
        "MongoDB",
        "Mongoose",
        "Firebase",
        "Git",
        "GitHub",
        "VS Code",
        "Android Studio"
      ]
    }
  ],
  education: [
    {
      degree: "B.Tech in Computer Science Engineering",
      institution: "Echelon Institute of Technology & Management",
      location: "Faridabad, Haryana",
      period: "2023 – 2027"
    },
    {
      degree: "Senior Secondary (Class 12)",
      institution: "Kundan Green Valley School – CBSE Board",
      location: "Faridabad, Haryana",
      period: "2023"
    }
  ],
  achievements: [
    {
      title: "Techelon-2026",
      detail:
        "Secured 3rd Position (Bronze Medal) in Annual Technical Fest, Echelon Institute of Technology"
    },
    {
      title: "Python Essentials Certification",
      detail:
        "Scaler Topics – Mastering the Essentials (121 Tutorials, 16 Modules, 10 Challenges)"
    },
    {
      title: "HackIndia 2026",
      detail: "SPARK 2 Hackathon Participant"
    },
    {
      title: "Workshops & Tools",
      detail:
        "Data Science using Python (Intl. Workshop 2k24) | UIPath Selectors | AI Tools (be10x)"
    }
  ],
  extracurricular: [
    {
      title: "Sports & Recreation",
      detail: "Cricket, Swimming, Snooker"
    }
  ],
  contact: [
    {
      label: "Email",
      value: "jadonharsh209@gmail.com",
      href: "mailto:jadonharsh209@gmail.com"
    },
    {
      label: "Phone",
      value: "+91 70489 30833",
      href: "tel:+917048930833"
    },
    {
      label: "GitHub",
      value: "github.com/HarshJadon1",
      href: "https://github.com/HarshJadon1",
      external: true
    },
    {
      label: "LinkedIn",
      value: "linkedin.com/in/harsh-jadon",
      href: "https://linkedin.com/in/harsh-jadon",
      external: true
    },
    {
      label: "Portfolio",
      value: "harshjadon.vercel.app",
      href: "https://harshjadon.vercel.app",
      external: true
    }
  ]
};

// DOM references
const canvas = document.getElementById("matrix-canvas");
const ctx = canvas.getContext("2d");
const terminal = document.getElementById("terminal");
const skipBtn = document.getElementById("skip-btn");
const replayBtn = document.getElementById("replay-btn");
const matrixBtn = document.getElementById("matrix-btn");
const promptForm = document.getElementById("prompt-form");
const cmdInput = document.getElementById("cmd-input");
const quickButtons = document.querySelectorAll(".cmd-chip");

// Matrix Rain setup
const MATRIX_LETTERS = "01HARSHJADON$#@";
const FONT_SIZE = 14;
let drops = [];
let matrixTimer = null;
let matrixEnabled = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function resizeMatrix() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const columns = Math.max(1, Math.floor(canvas.width / FONT_SIZE));
  drops = Array(columns)
    .fill(0)
    .map(() => Math.floor(Math.random() * 20));
}

function drawMatrix() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#005f3b";
  ctx.font = `${FONT_SIZE}px monospace`;

  for (let i = 0; i < drops.length; i++) {
    const char = MATRIX_LETTERS[Math.floor(Math.random() * MATRIX_LETTERS.length)];
    ctx.fillText(char, i * FONT_SIZE, drops[i] * FONT_SIZE);
    if (drops[i] * FONT_SIZE > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }
}

function setMatrixState(enabled) {
  matrixEnabled = enabled;
  canvas.classList.toggle("hidden", !enabled);
  matrixBtn.textContent = `Matrix: ${enabled ? "ON" : "OFF"}`;
  matrixBtn.setAttribute("aria-pressed", String(enabled));

  if (matrixTimer) {
    clearInterval(matrixTimer);
    matrixTimer = null;
  }

  if (enabled) {
    resizeMatrix();
    matrixTimer = setInterval(drawMatrix, 94);
  }
}

window.addEventListener("resize", () => {
  if (matrixEnabled) {
    resizeMatrix();
  }
});

// Safe DOM creation helpers
function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) {
    node.className = className;
  }
  if (text !== undefined) {
    node.textContent = text;
  }
  return node;
}

function createBulletList(items) {
  const ul = el("ul", "bullet-list");
  for (const text of items) {
    ul.appendChild(el("li", "", text));
  }
  return ul;
}

// Section renderers
function renderWhoami() {
  const wrap = el("div");
  wrap.appendChild(el("div", "hero-name", RESUME.name));
  wrap.appendChild(el("div", "hero-role", RESUME.headline));
  wrap.appendChild(el("div", "hero-meta", RESUME.location));
  wrap.appendChild(el("p", "summary-text", RESUME.summary));
  return wrap;
}

function renderExperience() {
  const wrap = el("div");
  for (const job of RESUME.experience) {
    const block = el("div", "item-block");
    const header = el("div", "item-header");
    header.appendChild(el("span", "item-title", `${job.role} — ${job.company}`));
    header.appendChild(el("span", "item-date", job.period));
    block.appendChild(header);
    block.appendChild(createBulletList(job.highlights));
    wrap.appendChild(block);
  }
  return wrap;
}

function renderProjects() {
  const wrap = el("div");
  for (const project of RESUME.projects) {
    const block = el("div", "item-block");
    block.appendChild(el("div", "item-title", project.title));

    const tags = el("div", "tag-row");
    for (const tech of project.stack) {
      tags.appendChild(el("span", "tag", tech));
    }
    block.appendChild(tags);
    block.appendChild(createBulletList(project.highlights));
    wrap.appendChild(block);
  }
  return wrap;
}

function renderSkills() {
  const wrap = el("div");
  for (const group of RESUME.skills) {
    const block = el("div", "skill-group");
    block.appendChild(el("div", "skill-label", group.category));
    const pills = el("div", "skill-items");
    for (const skill of group.items) {
      pills.appendChild(el("span", "skill-pill", skill));
    }
    block.appendChild(pills);
    wrap.appendChild(block);
  }
  return wrap;
}

function renderEducation() {
  const wrap = el("div");
  for (const edu of RESUME.education) {
    const block = el("div", "item-block");
    const header = el("div", "item-header");
    header.appendChild(el("span", "item-title", edu.degree));
    header.appendChild(el("span", "item-date", edu.period));
    block.appendChild(header);
    block.appendChild(
      el("div", "item-subtitle", `${edu.institution} · ${edu.location}`)
    );
    wrap.appendChild(block);
  }
  return wrap;
}

function renderAchievements() {
  const wrap = el("div");
  const list = el("ul", "bullet-list");
  for (const item of RESUME.achievements) {
    const li = el("li");
    li.appendChild(el("span", "item-title", `${item.title}: `));
    li.appendChild(document.createTextNode(item.detail));
    list.appendChild(li);
  }
  wrap.appendChild(list);
  return wrap;
}

function renderExtracurricular() {
  const wrap = el("div");
  const list = el("ul", "bullet-list");
  for (const item of RESUME.extracurricular) {
    const li = el("li");
    li.appendChild(el("span", "item-title", `${item.title}: `));
    li.appendChild(document.createTextNode(item.detail));
    list.appendChild(li);
  }
  wrap.appendChild(list);
  return wrap;
}

function renderContact() {
  const grid = el("div", "contact-grid");
  for (const entry of RESUME.contact) {
    const row = el("div", "contact-row");
    row.appendChild(el("span", "contact-key", `${entry.label}:`));
    const link = el("a", "", entry.value);
    link.href = entry.href;
    if (entry.external) {
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    }
    row.appendChild(link);
    grid.appendChild(row);
  }
  return grid;
}

function renderHelp() {
  return el(
    "p",
    "output-note",
    [
      "Available commands:",
      "  whoami          Profile & professional summary",
      "  experience      Internship & production engineering work",
      "  projects        Key full-stack, Android & AI/CV projects",
      "  skills          Technical stack & tooling",
      "  education       Academic background",
      "  achievements    Awards, certifications & workshops",
      "  extracurricular Sports & recreation",
      "  contact         Email, phone, GitHub, LinkedIn & portfolio",
      "  sudo hire harsh Hiring status check",
      "  all             Display complete resume",
      "  clear           Clear terminal screen"
    ].join("\n")
  );
}

function renderHire() {
  return el(
    "p",
    "output-note",
    [
      "Access granted.",
      "Candidate: Harsh Jadon — Full-Stack Web & Computer Vision Developer",
      "Track Record: Cognifz IT Solutions Intern | Techelon-2026 Bronze Medalist | HackIndia 2026",
      "Status: OPEN TO SOFTWARE ENGINEERING INTERNSHIPS & FULL-TIME ROLES"
    ].join("\n")
  );
}

const BOOT_SEQUENCE = [
  { cmd: "> whoami", render: renderWhoami },
  { cmd: "> cat experience.log", render: renderExperience },
  { cmd: "> ls -la projects/", render: renderProjects },
  { cmd: "> cat skills.json", render: renderSkills },
  { cmd: "> cat education.txt", render: renderEducation },
  { cmd: "> cat achievements.log", render: renderAchievements },
  { cmd: "> cat extracurricular.txt", render: renderExtracurricular },
  { cmd: "> contact --all", render: renderContact }
];

// Animation & interactive terminal state
let bootSessionId = 0;
let isBooting = false;
let skipRequested = false;
const commandHistory = [];
let historyIndex = -1;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function typeCommand(text, element, sessionId) {
  const cursor = el("span", "cursor");
  const textNode = document.createTextNode("");
  element.appendChild(textNode);
  element.appendChild(cursor);

  for (let i = 0; i < text.length; i++) {
    if (sessionId !== bootSessionId) {
      cursor.remove();
      return false;
    }
    if (skipRequested) {
      textNode.textContent = text;
      cursor.remove();
      return true;
    }
    textNode.textContent += text[i];
    await sleep(16);
  }

  cursor.remove();
  return sessionId === bootSessionId;
}

function appendEntry(cmdLabel, contentNode, animate = true) {
  const entry = el("section", "entry");
  const cmdLine = el("div", "command", cmdLabel);
  const output = el("div", animate ? "output fade-in" : "output");
  output.appendChild(contentNode);
  entry.appendChild(cmdLine);
  entry.appendChild(output);
  terminal.appendChild(entry);
  return entry;
}

async function runBootSequence(instant = false) {
  const sessionId = ++bootSessionId;
  skipRequested = instant || window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  isBooting = !skipRequested;
  skipBtn.hidden = skipRequested;
  terminal.replaceChildren();

  for (const step of BOOT_SEQUENCE) {
    if (sessionId !== bootSessionId) {
      return;
    }

    if (skipRequested) {
      appendEntry(step.cmd, step.render(), false);
      continue;
    }

    const entry = el("section", "entry");
    const cmdLine = el("div", "command");
    entry.appendChild(cmdLine);
    terminal.appendChild(entry);

    const completed = await typeCommand(step.cmd, cmdLine, sessionId);
    if (!completed) {
      return;
    }

    const output = el("div", "output fade-in");
    output.appendChild(step.render());
    entry.appendChild(output);

    if (!skipRequested) {
      await sleep(75);
    }
  }

  if (sessionId === bootSessionId) {
    isBooting = false;
    skipBtn.hidden = true;
  }
}

const COMMAND_MAP = {
  help: { label: "> help", render: renderHelp },
  whoami: { label: "> whoami", render: renderWhoami },
  about: { label: "> whoami", render: renderWhoami },
  summary: { label: "> whoami", render: renderWhoami },
  experience: { label: "> cat experience.log", render: renderExperience },
  intern: { label: "> cat experience.log", render: renderExperience },
  projects: { label: "> ls -la projects/", render: renderProjects },
  skills: { label: "> cat skills.json", render: renderSkills },
  education: { label: "> cat education.txt", render: renderEducation },
  achievements: { label: "> cat achievements.log", render: renderAchievements },
  certifications: { label: "> cat achievements.log", render: renderAchievements },
  extracurricular: { label: "> cat extracurricular.txt", render: renderExtracurricular },
  hobbies: { label: "> cat extracurricular.txt", render: renderExtracurricular },
  contact: { label: "> contact --all", render: renderContact },
  "sudo hire harsh": { label: "> sudo hire harsh", render: renderHire }
};

function executeCommand(rawInput) {
  const trimmed = rawInput.trim();
  if (!trimmed) {
    return;
  }

  const normalized = trimmed.toLowerCase().replace(/^>\s*/, "");
  commandHistory.push(trimmed);
  historyIndex = commandHistory.length;

  if (normalized === "clear" || normalized === "cls") {
    bootSessionId++;
    isBooting = false;
    skipBtn.hidden = true;
    terminal.replaceChildren();
    return;
  }

  if (normalized === "all" || normalized === "resume") {
    runBootSequence(true);
    return;
  }

  if (normalized === "replay") {
    runBootSequence(false);
    return;
  }

  if (isBooting) {
    runBootSequence(true);
  }

  const handler = COMMAND_MAP[normalized];
  if (handler) {
    const entry = appendEntry(`> ${trimmed}`, handler.render(), true);
    entry.scrollIntoView({ behavior: "smooth", block: "nearest" });
    return;
  }

  const errNote = el(
    "p",
    "output-note",
    `Command not found: '${trimmed}'. Type 'help' to see available commands.`
  );
  const entry = appendEntry(`> ${trimmed}`, errNote, true);
  entry.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

// Event wiring
skipBtn.addEventListener("click", () => {
  if (isBooting) {
    runBootSequence(true);
  }
});

replayBtn.addEventListener("click", () => {
  runBootSequence(false);
});

matrixBtn.addEventListener("click", () => {
  setMatrixState(!matrixEnabled);
});

promptForm.addEventListener("submit", event => {
  event.preventDefault();
  executeCommand(cmdInput.value);
  cmdInput.value = "";
});

cmdInput.addEventListener("keydown", event => {
  if (event.key === "ArrowUp") {
    if (historyIndex > 0) {
      historyIndex--;
      cmdInput.value = commandHistory[historyIndex];
    }
    event.preventDefault();
  } else if (event.key === "ArrowDown") {
    if (historyIndex < commandHistory.length - 1) {
      historyIndex++;
      cmdInput.value = commandHistory[historyIndex];
    } else {
      historyIndex = commandHistory.length;
      cmdInput.value = "";
    }
    event.preventDefault();
  }
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape" && isBooting) {
    runBootSequence(true);
  }
});

for (const btn of quickButtons) {
  btn.addEventListener("click", () => {
    executeCommand(btn.dataset.cmd);
    cmdInput.focus();
  });
}

// Initialize
setMatrixState(matrixEnabled);
runBootSequence(false);
