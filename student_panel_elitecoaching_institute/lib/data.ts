export const courses = [
  { id: "physics", subject: "Physics", name: "Physics for NEET 2026", faculty: "Dr. Arjun Mehta", progress: 68, completed: 34, remaining: 16, tone: "blue" },
  { id: "chemistry", subject: "Chemistry", name: "Organic Chemistry", faculty: "Prof. Nisha Kapoor", progress: 42, completed: 21, remaining: 29, tone: "violet" },
  { id: "biology", subject: "Biology", name: "Human Physiology", faculty: "Dr. Rhea Sharma", progress: 81, completed: 39, remaining: 9, tone: "emerald" },
];

export const schedule = [
  { time: "10:00 AM", type: "Live class", subject: "Electrostatics: Gauss's Law", teacher: "Dr. Arjun Mehta", action: "Join class", status: "live" },
  { time: "01:30 PM", type: "Assignment", subject: "Organic reactions worksheet", teacher: "Prof. Nisha Kapoor", action: "View", status: "upcoming" },
  { time: "04:00 PM", type: "Test", subject: "Human Physiology · 30 questions", teacher: "Dr. Rhea Sharma", action: "Start test", status: "upcoming" },
];

export const chapters = [
  {
    title: "Chapter 1 · Electric Charges and Fields",
    duration: "4h 18m",
    progress: 100,
    lectures: [
      { title: "Electric charge and its properties", duration: "42 min", completed: true },
      { title: "Coulomb's law and superposition", duration: "56 min", completed: true },
      { title: "Electric field and field lines", duration: "48 min", completed: true },
    ],
  },
  {
    title: "Chapter 2 · Electric Potential",
    duration: "5h 06m",
    progress: 58,
    lectures: [
      { title: "Work done in an electric field", duration: "44 min", completed: true },
      { title: "Electric potential and potential difference", duration: "51 min", completed: true },
      { title: "Potential due to a system of charges", duration: "47 min", completed: false },
      { title: "Equipotential surfaces", duration: "38 min", completed: false },
    ],
  },
  {
    title: "Chapter 3 · Gauss's Law",
    duration: "3h 42m",
    progress: 16,
    lectures: [
      { title: "Electric flux", duration: "39 min", completed: true },
      { title: "Gauss's law — intuition and proof", duration: "54 min", completed: false },
      { title: "Applications of Gauss's law", duration: "62 min", completed: false },
    ],
  },
];
