export interface Student {
  id: string;
  name: string;
  grade: string;
  avatar: string;
  parentName: string;
  parentId: string;
}

export interface SubjectScore {
  subject: string;
  score: number;
  maxScore: number;
  grade: string;
}

export interface TermPerformance {
  term: string;
  average: number;
  math: number;
  english: number;
  science: number;
  history: number;
  art: number;
}

export const students: Student[] = [
  { id: 's1', name: 'Emma Thompson', grade: 'Grade 8', avatar: '👩‍🎓', parentName: 'Sarah Thompson', parentId: 'p1' },
  { id: 's2', name: 'James Wilson', grade: 'Grade 8', avatar: '👨‍🎓', parentName: 'David Wilson', parentId: 'p2' },
  { id: 's3', name: 'Olivia Brown', grade: 'Grade 7', avatar: '👩‍🎓', parentName: 'Mary Brown', parentId: 'p3' },
  { id: 's4', name: 'Liam Davis', grade: 'Grade 7', avatar: '👨‍🎓', parentName: 'John Davis', parentId: 'p4' },
  { id: 's5', name: 'Sophia Martinez', grade: 'Grade 9', avatar: '👩‍🎓', parentName: 'Carlos Martinez', parentId: 'p5' },
  { id: 's6', name: 'Noah Johnson', grade: 'Grade 9', avatar: '👨‍🎓', parentName: 'Linda Johnson', parentId: 'p6' },
  { id: 's7', name: 'Ava Garcia', grade: 'Grade 8', avatar: '👩‍🎓', parentName: 'Maria Garcia', parentId: 'p7' },
  { id: 's8', name: 'Ethan Lee', grade: 'Grade 7', avatar: '👨‍🎓', parentName: 'Susan Lee', parentId: 'p8' },
];

export const studentScores: Record<string, SubjectScore[]> = {
  s1: [
    { subject: 'Math', score: 92, maxScore: 100, grade: 'A' },
    { subject: 'English', score: 88, maxScore: 100, grade: 'B+' },
    { subject: 'Science', score: 95, maxScore: 100, grade: 'A' },
    { subject: 'History', score: 78, maxScore: 100, grade: 'C+' },
    { subject: 'Art', score: 85, maxScore: 100, grade: 'B' },
  ],
  s2: [
    { subject: 'Math', score: 75, maxScore: 100, grade: 'C' },
    { subject: 'English', score: 82, maxScore: 100, grade: 'B' },
    { subject: 'Science', score: 68, maxScore: 100, grade: 'D+' },
    { subject: 'History', score: 90, maxScore: 100, grade: 'A-' },
    { subject: 'Art', score: 94, maxScore: 100, grade: 'A' },
  ],
  s3: [
    { subject: 'Math', score: 88, maxScore: 100, grade: 'B+' },
    { subject: 'English', score: 91, maxScore: 100, grade: 'A-' },
    { subject: 'Science', score: 84, maxScore: 100, grade: 'B' },
    { subject: 'History', score: 87, maxScore: 100, grade: 'B+' },
    { subject: 'Art', score: 79, maxScore: 100, grade: 'C+' },
  ],
  s4: [
    { subject: 'Math', score: 65, maxScore: 100, grade: 'D' },
    { subject: 'English', score: 72, maxScore: 100, grade: 'C' },
    { subject: 'Science', score: 78, maxScore: 100, grade: 'C+' },
    { subject: 'History', score: 69, maxScore: 100, grade: 'D+' },
    { subject: 'Art', score: 88, maxScore: 100, grade: 'B+' },
  ],
  s5: [
    { subject: 'Math', score: 97, maxScore: 100, grade: 'A+' },
    { subject: 'English', score: 93, maxScore: 100, grade: 'A' },
    { subject: 'Science', score: 96, maxScore: 100, grade: 'A+' },
    { subject: 'History', score: 91, maxScore: 100, grade: 'A-' },
    { subject: 'Art', score: 82, maxScore: 100, grade: 'B' },
  ],
  s6: [
    { subject: 'Math', score: 81, maxScore: 100, grade: 'B-' },
    { subject: 'English', score: 76, maxScore: 100, grade: 'C+' },
    { subject: 'Science', score: 83, maxScore: 100, grade: 'B' },
    { subject: 'History', score: 85, maxScore: 100, grade: 'B' },
    { subject: 'Art', score: 90, maxScore: 100, grade: 'A-' },
  ],
  s7: [
    { subject: 'Math', score: 89, maxScore: 100, grade: 'B+' },
    { subject: 'English', score: 94, maxScore: 100, grade: 'A' },
    { subject: 'Science', score: 87, maxScore: 100, grade: 'B+' },
    { subject: 'History', score: 92, maxScore: 100, grade: 'A-' },
    { subject: 'Art', score: 96, maxScore: 100, grade: 'A+' },
  ],
  s8: [
    { subject: 'Math', score: 70, maxScore: 100, grade: 'C-' },
    { subject: 'English', score: 68, maxScore: 100, grade: 'D+' },
    { subject: 'Science', score: 74, maxScore: 100, grade: 'C' },
    { subject: 'History', score: 71, maxScore: 100, grade: 'C-' },
    { subject: 'Art', score: 77, maxScore: 100, grade: 'C+' },
  ],
};

export const termPerformance: Record<string, TermPerformance[]> = {
  s1: [
    { term: 'Term 1', average: 82, math: 80, english: 85, science: 88, history: 70, art: 87 },
    { term: 'Term 2', average: 85, math: 85, english: 86, science: 90, history: 74, art: 88 },
    { term: 'Term 3', average: 87, math: 88, english: 87, science: 92, history: 76, art: 84 },
    { term: 'Term 4', average: 88, math: 92, english: 88, science: 95, history: 78, art: 85 },
  ],
  s2: [
    { term: 'Term 1', average: 78, math: 70, english: 80, science: 65, history: 85, art: 90 },
    { term: 'Term 2', average: 80, math: 72, english: 81, science: 66, history: 88, art: 92 },
    { term: 'Term 3', average: 81, math: 74, english: 82, science: 67, history: 89, art: 93 },
    { term: 'Term 4', average: 82, math: 75, english: 82, science: 68, history: 90, art: 94 },
  ],
  s3: [
    { term: 'Term 1', average: 83, math: 82, english: 88, science: 80, history: 84, art: 78 },
    { term: 'Term 2', average: 84, math: 84, english: 89, science: 81, history: 85, art: 78 },
    { term: 'Term 3', average: 85, math: 86, english: 90, science: 83, history: 86, art: 79 },
    { term: 'Term 4', average: 86, math: 88, english: 91, science: 84, history: 87, art: 79 },
  ],
  s4: [
    { term: 'Term 1', average: 68, math: 60, english: 68, science: 72, history: 65, art: 82 },
    { term: 'Term 2', average: 70, math: 62, english: 70, science: 75, history: 66, art: 85 },
    { term: 'Term 3', average: 72, math: 63, english: 71, science: 77, history: 68, art: 87 },
    { term: 'Term 4', average: 74, math: 65, english: 72, science: 78, history: 69, art: 88 },
  ],
  s5: [
    { term: 'Term 1', average: 90, math: 93, english: 90, science: 92, history: 88, art: 80 },
    { term: 'Term 2', average: 91, math: 95, english: 91, science: 93, history: 89, art: 81 },
    { term: 'Term 3', average: 92, math: 96, english: 92, science: 95, history: 90, art: 81 },
    { term: 'Term 4', average: 92, math: 97, english: 93, science: 96, history: 91, art: 82 },
  ],
  s6: [
    { term: 'Term 1', average: 80, math: 78, english: 74, science: 80, history: 82, art: 88 },
    { term: 'Term 2', average: 82, math: 79, english: 75, science: 81, history: 83, art: 89 },
    { term: 'Term 3', average: 83, math: 80, english: 76, science: 82, history: 84, art: 90 },
    { term: 'Term 4', average: 83, math: 81, english: 76, science: 83, history: 85, art: 90 },
  ],
  s7: [
    { term: 'Term 1', average: 88, math: 85, english: 90, science: 84, history: 88, art: 92 },
    { term: 'Term 2', average: 90, math: 87, english: 92, science: 85, history: 90, art: 94 },
    { term: 'Term 3', average: 91, math: 88, english: 93, science: 86, history: 91, art: 95 },
    { term: 'Term 4', average: 92, math: 89, english: 94, science: 87, history: 92, art: 96 },
  ],
  s8: [
    { term: 'Term 1', average: 68, math: 65, english: 64, science: 70, history: 68, art: 74 },
    { term: 'Term 2', average: 70, math: 67, english: 66, science: 72, history: 69, art: 75 },
    { term: 'Term 3', average: 71, math: 69, english: 67, science: 73, history: 70, art: 76 },
    { term: 'Term 4', average: 72, math: 70, english: 68, science: 74, history: 71, art: 77 },
  ],
};

export function getStudentAverage(studentId: string): number {
  const scores = studentScores[studentId];
  if (!scores) return 0;
  return Math.round(scores.reduce((sum, s) => sum + s.score, 0) / scores.length);
}

export function getGradeColor(score: number): string {
  if (score >= 90) return 'text-success';
  if (score >= 80) return 'text-primary';
  if (score >= 70) return 'text-warning';
  return 'text-destructive';
}
