export type CourseCategory = "NEET" | "JEE" | "Foundation" | "Crash Course" | "Class 11" | "Class 12";
export type CourseAccess = "Free" | "Premium";
export type CourseTone = "blue" | "violet" | "emerald";
export type LectureState = "completed" | "current" | "locked" | "available";

export type Lecture = {
  id: string;
  number: number;
  title: string;
  duration: string;
  videoLength: string;
  progress: number;
  lastWatched?: string;
  completed: boolean;
  locked?: boolean;
  description: string;
  notes: string;
  resources: string[];
  assignment?: string;
};

export type Chapter = {
  id: string;
  title: string;
  summary: string;
  duration: string;
  progress: number;
  lectures: Lecture[];
};

export type Subject = {
  id: string;
  title: string;
  faculty: string;
  progress: number;
  chapters: Chapter[];
};

export type Course = {
  id: string;
  title: string;
  faculty: string;
  category: CourseCategory;
  access: CourseAccess;
  duration: string;
  rating: number;
  students: number;
  price: number;
  purchased: boolean;
  progress: number;
  batch: string;
  description: string;
  tone: CourseTone;
  thumbnailSubject: string;
  lastWatched?: {
    subjectId: string;
    chapterId: string;
    lectureId: string;
    timestamp: string;
  };
  subjects: Subject[];
};

const physicsSubjects: Subject[] = [
  {
    id: "physics",
    title: "Physics",
    faculty: "Dr. Arjun Mehta",
    progress: 68,
    chapters: [
      {
        id: "electric-charges",
        title: "Electric Charges and Fields",
        summary: "Charge, force, field lines, electric flux, and Gauss law foundations.",
        duration: "4h 18m",
        progress: 100,
        lectures: [
          lecture("electric-charge", 1, "Electric charge and its properties", "42 min", "42:16", 100, true, "42:16"),
          lecture("coulombs-law", 2, "Coulomb's law and superposition", "56 min", "56:08", 100, true, "56:08", "Learn force between point charges and how multiple forces combine vectorially."),
          lecture("electric-field", 3, "Electric field and field lines", "48 min", "48:22", 100, true, "48:22"),
          lecture("electric-flux", 4, "Electric flux", "39 min", "39:10", 100, true, "39:10"),
        ],
      },
      {
        id: "gauss-law",
        title: "Gauss's Law",
        summary: "Use symmetry to calculate electric fields quickly and accurately.",
        duration: "3h 42m",
        progress: 38,
        lectures: [
          lecture("lecture-8", 5, "Gauss's law - intuition and proof", "54 min", "54:20", 53, false, "24:18", "Understand Gauss's law visually, derive its mathematical form, and learn when symmetry makes it useful."),
          lecture("applications-gauss", 6, "Applications of Gauss's law", "62 min", "1:02:14", 0, false),
          lecture("gauss-practice", 7, "Gauss law practice problems", "38 min", "38:45", 0, false),
        ],
      },
      {
        id: "electric-potential",
        title: "Electric Potential and Capacitance",
        summary: "Potential, potential energy, capacitors, and energy storage.",
        duration: "5h 06m",
        progress: 0,
        lectures: [
          lecture("potential-energy", 8, "Electric potential energy", "44 min", "44:12", 0, false, undefined, undefined, true),
          lecture("capacitors", 9, "Capacitors and combinations", "51 min", "51:33", 0, false, undefined, undefined, true),
        ],
      },
    ],
  },
  {
    id: "chemistry",
    title: "Chemistry",
    faculty: "Prof. Nisha Kapoor",
    progress: 44,
    chapters: [
      {
        id: "chemical-bonding",
        title: "Chemical Bonding",
        summary: "Bond formation, VSEPR, hybridisation, and molecular orbital basics.",
        duration: "3h 10m",
        progress: 66,
        lectures: [
          lecture("ionic-bond", 1, "Ionic bond and lattice energy", "48 min", "48:30", 100, true, "48:30"),
          lecture("hybridisation", 2, "Hybridisation made simple", "52 min", "52:08", 36, false, "18:12"),
          lecture("molecular-orbital", 3, "Molecular orbital theory", "55 min", "55:18", 0, false),
        ],
      },
    ],
  },
  {
    id: "biology",
    title: "Biology",
    faculty: "Dr. Rhea Sharma",
    progress: 72,
    chapters: [
      {
        id: "cell-biology",
        title: "Cell Biology",
        summary: "Cell organelles, membranes, division, and cellular transport.",
        duration: "4h 05m",
        progress: 72,
        lectures: [
          lecture("cell-structure", 1, "Cell structure and organelles", "46 min", "46:20", 100, true, "46:20"),
          lecture("cell-cycle", 2, "Cell cycle and mitosis", "58 min", "58:04", 58, false, "31:14"),
          lecture("meiosis", 3, "Meiosis and variation", "50 min", "50:45", 0, false),
        ],
      },
      {
        id: "genetics",
        title: "Genetics",
        summary: "Inheritance patterns, linkage, pedigree, and molecular basis.",
        duration: "5h 30m",
        progress: 20,
        lectures: [
          lecture("mendel", 1, "Mendelian inheritance", "55 min", "55:00", 20, false, "11:04"),
          lecture("linkage", 2, "Linkage and crossing over", "49 min", "49:15", 0, false),
        ],
      },
    ],
  },
];

export const courseCatalog: Course[] = [
  {
    id: "physics",
    title: "Complete NEET 2026 Master Course",
    faculty: "Dr. Arjun Mehta",
    category: "NEET",
    access: "Premium",
    duration: "142h 30m",
    rating: 4.9,
    students: 12840,
    price: 3999,
    purchased: true,
    progress: 64,
    batch: "NEET 2026 - Batch A",
    description: "A structured NEET learning path across Physics, Chemistry, and Biology with lectures, live classes, tests, notes, assignments, and doubt discussions in one focused workspace.",
    tone: "blue",
    thumbnailSubject: "Physics",
    lastWatched: { subjectId: "physics", chapterId: "gauss-law", lectureId: "lecture-8", timestamp: "24:18" },
    subjects: physicsSubjects,
  },
  {
    id: "organic-chemistry",
    title: "Organic Chemistry Mastery",
    faculty: "Prof. Nisha Kapoor",
    category: "JEE",
    access: "Premium",
    duration: "36h 20m",
    rating: 4.8,
    students: 9420,
    price: 3499,
    purchased: true,
    progress: 42,
    batch: "JEE 2026 - Batch B",
    description: "Reaction mechanisms, named reactions, stereochemistry, and practice sessions organized for serious JEE preparation.",
    tone: "violet",
    thumbnailSubject: "Chemistry",
    lastWatched: { subjectId: "chemistry", chapterId: "chemical-bonding", lectureId: "hybridisation", timestamp: "18:12" },
    subjects: [
      {
        id: "chemistry",
        title: "Chemistry",
        faculty: "Prof. Nisha Kapoor",
        progress: 42,
        chapters: [
          {
            id: "goc",
            title: "General Organic Chemistry",
            summary: "Electronic effects, intermediates, acidity, basicity, and mechanism logic.",
            duration: "7h 40m",
            progress: 42,
            lectures: [
              lecture("inductive-effect", 1, "Inductive and resonance effects", "54 min", "54:18", 100, true, "54:18"),
              lecture("reaction-intermediates", 2, "Carbocations and carbanions", "48 min", "48:09", 62, false, "29:44"),
              lecture("acid-base", 3, "Acidity and basicity trends", "52 min", "52:15", 0, false),
            ],
          },
        ],
      },
    ],
  },
  {
    id: "human-physiology",
    title: "Human Physiology Intensive",
    faculty: "Dr. Rhea Sharma",
    category: "NEET",
    access: "Premium",
    duration: "28h 10m",
    rating: 4.9,
    students: 11870,
    price: 2999,
    purchased: true,
    progress: 81,
    batch: "NEET 2026 - Batch A",
    description: "High-yield human physiology with diagrams, chapter tests, and clinical-style memory anchors.",
    tone: "emerald",
    thumbnailSubject: "Biology",
    lastWatched: { subjectId: "biology", chapterId: "cell-biology", lectureId: "cell-cycle", timestamp: "31:14" },
    subjects: [physicsSubjects[2]],
  },
  marketplaceCourse("jee-calculus", "Calculus for JEE Advanced", "Vikram Rao", "JEE", "Mathematics", "40h 15m", 4.9, 15160, 4499, "blue"),
  marketplaceCourse("inorganic-neet", "Inorganic Chemistry for NEET", "Dr. Sana Iqbal", "NEET", "Chemistry", "31h 20m", 4.8, 8240, 2799, "violet"),
  marketplaceCourse("genetics-evolution", "Genetics and Evolution", "Dr. Priya Menon", "NEET", "Biology", "22h 10m", 4.8, 10380, 2499, "emerald"),
  marketplaceCourse("science-foundation", "Science Foundation Class 10", "Ananya Bose", "Foundation", "Science", "52h 00m", 4.7, 6780, 3299, "emerald"),
  marketplaceCourse("physics-revision", "Physics Formula Revision", "Dr. Arjun Mehta", "Crash Course", "Physics", "6h 30m", 4.8, 21400, 0, "blue", "Free"),
  marketplaceCourse("coordinate-geometry", "Coordinate Geometry", "Karan Malhotra", "Class 12", "Mathematics", "26h 45m", 4.7, 7180, 2299, "blue"),
];

function lecture(
  id: string,
  number: number,
  title: string,
  duration: string,
  videoLength: string,
  progress: number,
  completed: boolean,
  lastWatched?: string,
  description = "A focused lesson with concise theory, solved examples, and exam-oriented practice.",
  locked = false,
): Lecture {
  return {
    id,
    number,
    title,
    duration,
    videoLength,
    progress,
    completed,
    locked,
    lastWatched,
    description,
    notes: `${title} - PDF notes`,
    resources: ["Class notes", "Practice worksheet", "Formula summary"],
    assignment: number % 2 === 0 ? "Chapter practice set" : undefined,
  };
}

function marketplaceCourse(
  id: string,
  title: string,
  faculty: string,
  category: CourseCategory,
  subject: string,
  duration: string,
  rating: number,
  students: number,
  price: number,
  tone: CourseTone,
  access: CourseAccess = "Premium",
): Course {
  return {
    id,
    title,
    faculty,
    category,
    access,
    duration,
    rating,
    students,
    price,
    purchased: false,
    progress: 0,
    batch: `${category} upcoming batch`,
    description: "A structured premium course with lectures, notes, practice material, tests, and faculty-led doubt support.",
    tone,
    thumbnailSubject: subject,
    subjects: [
      {
        id: subject.toLowerCase().replace(/\s+/g, "-"),
        title: subject,
        faculty,
        progress: 0,
        chapters: [
          {
            id: "orientation",
            title: "Course Orientation",
            summary: "How to use this course and plan your weekly learning rhythm.",
            duration: "1h 10m",
            progress: 0,
            lectures: [
              lecture("orientation", 1, "Course roadmap and study plan", "32 min", "32:10", 0, false),
              lecture("diagnostic", 2, "Diagnostic practice session", "38 min", "38:20", 0, false),
            ],
          },
        ],
      },
    ],
  };
}

export function getCourse(courseId = "physics") {
  return courseCatalog.find((course) => course.id === courseId) ?? courseCatalog[0];
}

export function getCourseStats(course: Course) {
  const subjectsCount = course.subjects.length;
  const chaptersCount = course.subjects.reduce((total, subject) => total + subject.chapters.length, 0);
  const lecturesCount = course.subjects.reduce((total, subject) => total + subject.chapters.reduce((sum, chapter) => sum + chapter.lectures.length, 0), 0);
  const completedLectures = course.subjects.reduce(
    (total, subject) => total + subject.chapters.reduce((sum, chapter) => sum + chapter.lectures.filter((lectureItem) => lectureItem.completed).length, 0),
    0,
  );
  return {
    subjectsCount,
    chaptersCount,
    lecturesCount,
    completedLectures,
    remainingLectures: Math.max(lecturesCount - completedLectures, 0),
  };
}

export function getLastWatched(course: Course) {
  const fallbackSubject = course.subjects[0];
  const fallbackChapter = fallbackSubject?.chapters[0];
  const fallbackLecture = fallbackChapter?.lectures[0];
  const subject = course.subjects.find((item) => item.id === course.lastWatched?.subjectId) ?? fallbackSubject;
  const chapter = subject?.chapters.find((item) => item.id === course.lastWatched?.chapterId) ?? fallbackChapter;
  const lectureItem = chapter?.lectures.find((item) => item.id === course.lastWatched?.lectureId) ?? fallbackLecture;
  return { subject, chapter, lecture: lectureItem, timestamp: course.lastWatched?.timestamp ?? lectureItem?.lastWatched ?? "0:00" };
}

export function getLectureContext(courseId = "physics", lectureId = "lecture-8") {
  const course = getCourse(courseId);
  for (const subject of course.subjects) {
    for (const chapter of subject.chapters) {
      const found = chapter.lectures.find((item) => item.id === lectureId);
      if (found) return { course, subject, chapter, lecture: found };
    }
  }
  const last = getLastWatched(course);
  return { course, subject: last.subject, chapter: last.chapter, lecture: last.lecture };
}
