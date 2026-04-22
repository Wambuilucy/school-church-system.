import { students } from './studentData';

export interface Lesson {
  id: string;
  title: string;
  videoUrl: string; // YouTube embed URL
  notes: string;
  duration: string;
}

export interface Exercise {
  id: string;
  title: string;
  questions: { q: string; answer: string }[];
}

export interface ExamPaper {
  id: string;
  title: string;
  year: string;
  term: string;
  url: string; // PDF link (placeholder)
  questions: number;
}

export interface Subject {
  id: string;
  name: string;
  icon: string;
  description: string;
  lessons: Lesson[];
  exercises: Exercise[];
  examPapers: ExamPaper[];
}

export interface ProgressEntry {
  studentId: string;
  subjectId: string;
  lessonsCompleted: string[]; // lesson ids
  exercisesCompleted: string[];
  examsAttempted: string[];
}

export const subjects: Subject[] = [
  {
    id: 'math',
    name: 'Mathematics',
    icon: '🧮',
    description: 'Algebra, geometry, and problem-solving fundamentals.',
    lessons: [
      {
        id: 'm-l1',
        title: 'Introduction to Algebra',
        videoUrl: 'https://www.youtube.com/embed/NybHckSEQBI',
        notes: 'Algebra uses letters to represent numbers. Key idea: an equation is a balance — whatever you do to one side, do to the other. Practice solving for x in linear equations like 2x + 3 = 11.',
        duration: '12 min',
      },
      {
        id: 'm-l2',
        title: 'Geometry Basics',
        videoUrl: 'https://www.youtube.com/embed/302eJ3TzJQU',
        notes: 'Geometry studies shapes, sizes, and the properties of space. Memorize the angle sum of a triangle (180°) and the Pythagorean theorem: a² + b² = c².',
        duration: '15 min',
      },
      {
        id: 'm-l3',
        title: 'Fractions and Decimals',
        videoUrl: 'https://www.youtube.com/embed/qFuXVTH-uvY',
        notes: 'Convert between fractions and decimals by dividing numerator by denominator. Always simplify fractions to lowest terms.',
        duration: '10 min',
      },
    ],
    exercises: [
      {
        id: 'm-e1',
        title: 'Algebra Practice Set',
        questions: [
          { q: 'Solve: 3x + 5 = 20', answer: 'x = 5' },
          { q: 'Solve: 2(x − 4) = 10', answer: 'x = 9' },
          { q: 'Simplify: 4x + 3x − 2', answer: '7x − 2' },
        ],
      },
      {
        id: 'm-e2',
        title: 'Geometry Drills',
        questions: [
          { q: 'A right triangle has legs 3 and 4. Find the hypotenuse.', answer: '5' },
          { q: 'Sum of interior angles of a hexagon?', answer: '720°' },
        ],
      },
    ],
    examPapers: [
      { id: 'm-ex1', title: 'Mathematics End-Term Exam', year: '2024', term: 'Term 3', url: '#', questions: 25 },
      { id: 'm-ex2', title: 'Mathematics Mid-Term Exam', year: '2024', term: 'Term 2', url: '#', questions: 20 },
      { id: 'm-ex3', title: 'Mathematics End-Term Exam', year: '2023', term: 'Term 3', url: '#', questions: 25 },
    ],
  },
  {
    id: 'english',
    name: 'English',
    icon: '📚',
    description: 'Grammar, comprehension, and creative writing.',
    lessons: [
      {
        id: 'e-l1',
        title: 'Parts of Speech',
        videoUrl: 'https://www.youtube.com/embed/2Hh58gPCrQk',
        notes: 'Eight parts of speech: noun, pronoun, verb, adjective, adverb, preposition, conjunction, interjection. Identify each in sentences to strengthen grammar.',
        duration: '14 min',
      },
      {
        id: 'e-l2',
        title: 'Reading Comprehension',
        videoUrl: 'https://www.youtube.com/embed/leXGdfMfb0M',
        notes: 'Skim for the main idea, then scan for details. Always re-read the question before choosing an answer.',
        duration: '11 min',
      },
    ],
    exercises: [
      {
        id: 'e-e1',
        title: 'Grammar Quiz',
        questions: [
          { q: 'Identify the verb: "The dog runs fast."', answer: 'runs' },
          { q: 'Plural of "child"?', answer: 'children' },
        ],
      },
    ],
    examPapers: [
      { id: 'e-ex1', title: 'English Composition Exam', year: '2024', term: 'Term 3', url: '#', questions: 15 },
      { id: 'e-ex2', title: 'English Comprehension Exam', year: '2023', term: 'Term 3', url: '#', questions: 20 },
    ],
  },
  {
    id: 'science',
    name: 'Science',
    icon: '🔬',
    description: 'Biology, chemistry, and physics foundations.',
    lessons: [
      {
        id: 's-l1',
        title: 'The Scientific Method',
        videoUrl: 'https://www.youtube.com/embed/N6IAzlugWw0',
        notes: 'Steps: observe → question → hypothesize → experiment → analyze → conclude. A good hypothesis is testable and falsifiable.',
        duration: '9 min',
      },
      {
        id: 's-l2',
        title: 'States of Matter',
        videoUrl: 'https://www.youtube.com/embed/s-KvoVzukHo',
        notes: 'Solids hold shape, liquids take container shape, gases fill space. Phase changes: melting, freezing, evaporation, condensation, sublimation.',
        duration: '13 min',
      },
    ],
    exercises: [
      {
        id: 's-e1',
        title: 'Matter Practice',
        questions: [
          { q: 'Process of liquid → gas?', answer: 'Evaporation' },
          { q: 'What is H₂O?', answer: 'Water' },
        ],
      },
    ],
    examPapers: [
      { id: 's-ex1', title: 'Science End-Term Exam', year: '2024', term: 'Term 3', url: '#', questions: 30 },
      { id: 's-ex2', title: 'Science Practical Exam', year: '2024', term: 'Term 2', url: '#', questions: 10 },
    ],
  },
  {
    id: 'history',
    name: 'History',
    icon: '🏛️',
    description: 'World civilizations and historical thinking.',
    lessons: [
      {
        id: 'h-l1',
        title: 'Ancient Civilizations',
        videoUrl: 'https://www.youtube.com/embed/Z3Wvu6e7gYI',
        notes: 'Major early civilizations: Mesopotamia, Egypt, Indus Valley, China. They share rivers, agriculture, writing, and city-states.',
        duration: '16 min',
      },
    ],
    exercises: [
      {
        id: 'h-e1',
        title: 'Civilizations Quiz',
        questions: [
          { q: 'River associated with Ancient Egypt?', answer: 'Nile' },
          { q: 'Cuneiform was developed by which civilization?', answer: 'Sumerians (Mesopotamia)' },
        ],
      },
    ],
    examPapers: [
      { id: 'h-ex1', title: 'History End-Term Exam', year: '2024', term: 'Term 3', url: '#', questions: 20 },
    ],
  },
];

// Mock progress per student — keyed by `${studentId}:${subjectId}`
function makeInitialProgress(): ProgressEntry[] {
  const out: ProgressEntry[] = [];
  students.forEach((s, i) => {
    subjects.forEach((subj, j) => {
      const lessonsDone = subj.lessons.slice(0, (i + j) % (subj.lessons.length + 1));
      const exDone = subj.exercises.slice(0, (i + j) % (subj.exercises.length + 1));
      const exmDone = subj.examPapers.slice(0, (i) % (subj.examPapers.length + 1));
      out.push({
        studentId: s.id,
        subjectId: subj.id,
        lessonsCompleted: lessonsDone.map(l => l.id),
        exercisesCompleted: exDone.map(e => e.id),
        examsAttempted: exmDone.map(e => e.id),
      });
    });
  });
  return out;
}

export const initialProgress: ProgressEntry[] = makeInitialProgress();

export function getProgressPercent(entry: ProgressEntry, subject: Subject): number {
  const total = subject.lessons.length + subject.exercises.length + subject.examPapers.length;
  if (total === 0) return 0;
  const done = entry.lessonsCompleted.length + entry.exercisesCompleted.length + entry.examsAttempted.length;
  return Math.round((done / total) * 100);
}
