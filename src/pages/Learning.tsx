import { useMemo, useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { subjects as initialSubjects, initialProgress, getProgressPercent, type Subject, type Lesson, type Exercise, type ExamPaper, type ProgressEntry } from '@/data/learningData';
import { students } from '@/data/studentData';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Pencil, Plus, Trash2, PlayCircle, FileText, ClipboardList, CheckCircle2, Circle, BookOpen } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

export default function Learning() {
  const { user } = useAuth();
  const role = user?.role || 'student';
  const isTeacher = role === 'teacher';

  const [subjects, setSubjects] = useState<Subject[]>(initialSubjects);
  const [progress, setProgress] = useState<ProgressEntry[]>(initialProgress);
  const [activeSubjectId, setActiveSubjectId] = useState<string>(initialSubjects[0].id);

  // Determine which student's progress we're viewing
  const viewableStudentIds = useMemo(() => {
    if (role === 'teacher') return students.map(s => s.id);
    if (role === 'parent') return user?.childrenIds || [];
    if (role === 'student') return user?.studentId ? [user.studentId] : [];
    return [];
  }, [role, user]);

  const [selectedStudentId, setSelectedStudentId] = useState<string>(viewableStudentIds[0] || 's1');

  const activeSubject = subjects.find(s => s.id === activeSubjectId)!;
  const studentProgress = progress.find(p => p.studentId === selectedStudentId && p.subjectId === activeSubjectId)
    || { studentId: selectedStudentId, subjectId: activeSubjectId, lessonsCompleted: [], exercisesCompleted: [], examsAttempted: [] };

  const updateProgress = (updater: (p: ProgressEntry) => ProgressEntry) => {
    setProgress(prev => {
      const idx = prev.findIndex(p => p.studentId === selectedStudentId && p.subjectId === activeSubjectId);
      if (idx === -1) return [...prev, updater({ studentId: selectedStudentId, subjectId: activeSubjectId, lessonsCompleted: [], exercisesCompleted: [], examsAttempted: [] })];
      const next = [...prev];
      next[idx] = updater(next[idx]);
      return next;
    });
  };

  const toggle = (kind: 'lesson' | 'exercise' | 'exam', id: string) => {
    updateProgress(p => {
      const key = kind === 'lesson' ? 'lessonsCompleted' : kind === 'exercise' ? 'exercisesCompleted' : 'examsAttempted';
      const has = p[key].includes(id);
      return { ...p, [key]: has ? p[key].filter(x => x !== id) : [...p[key], id] };
    });
    toast.success('Progress updated');
  };

  // Teacher: edit subject content
  const updateSubject = (subjectId: string, updater: (s: Subject) => Subject) => {
    setSubjects(prev => prev.map(s => s.id === subjectId ? updater(s) : s));
  };

  return (
    <Layout title="Learning Hub" subtitle={isTeacher ? 'Manage lessons, exercises and exam papers' : 'Videos, notes, exercises and past exams'}>
      <div className="space-y-6">
        {/* Top controls */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            {subjects.map(s => (
              <Button
                key={s.id}
                variant={activeSubjectId === s.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveSubjectId(s.id)}
                className="gap-2"
              >
                <span>{s.icon}</span> {s.name}
              </Button>
            ))}
          </div>

          {viewableStudentIds.length > 0 && (
            <div className="flex items-center gap-2">
              <Label className="text-sm text-muted-foreground">Progress for:</Label>
              <Select value={selectedStudentId} onValueChange={setSelectedStudentId}>
                <SelectTrigger className="w-56"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {viewableStudentIds.map(sid => {
                    const s = students.find(x => x.id === sid);
                    if (!s) return null;
                    return <SelectItem key={sid} value={sid}>{s.avatar} {s.name} — {s.grade}</SelectItem>;
                  })}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        {/* Subject header + progress */}
        <Card className="p-5">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground flex items-center gap-2">
                <span className="text-3xl">{activeSubject.icon}</span> {activeSubject.name}
              </h2>
              <p className="text-sm text-muted-foreground mt-1 max-w-xl">{activeSubject.description}</p>
            </div>
            <div className="min-w-[220px]">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-muted-foreground">Overall progress</span>
                <span className="font-semibold text-foreground">{getProgressPercent(studentProgress, activeSubject)}%</span>
              </div>
              <Progress value={getProgressPercent(studentProgress, activeSubject)} className="h-2" />
              <div className="flex gap-2 mt-2 text-xs text-muted-foreground">
                <span>{studentProgress.lessonsCompleted.length}/{activeSubject.lessons.length} lessons</span>
                <span>•</span>
                <span>{studentProgress.exercisesCompleted.length}/{activeSubject.exercises.length} exercises</span>
                <span>•</span>
                <span>{studentProgress.examsAttempted.length}/{activeSubject.examPapers.length} exams</span>
              </div>
            </div>
          </div>
        </Card>

        <Tabs defaultValue="lessons" className="space-y-4">
          <TabsList>
            <TabsTrigger value="lessons" className="gap-2"><PlayCircle className="h-4 w-4" /> Lessons</TabsTrigger>
            <TabsTrigger value="exercises" className="gap-2"><ClipboardList className="h-4 w-4" /> Exercises</TabsTrigger>
            <TabsTrigger value="exams" className="gap-2"><FileText className="h-4 w-4" /> Exam Papers</TabsTrigger>
          </TabsList>

          {/* LESSONS */}
          <TabsContent value="lessons" className="space-y-4">
            {isTeacher && <AddLessonDialog onAdd={(lesson) => updateSubject(activeSubject.id, s => ({ ...s, lessons: [...s.lessons, lesson] }))} />}
            {activeSubject.lessons.length === 0 && <EmptyState icon={<BookOpen />} text="No lessons yet." />}
            <div className="grid gap-4 md:grid-cols-2">
              {activeSubject.lessons.map(lesson => (
                <LessonCard
                  key={lesson.id}
                  lesson={lesson}
                  completed={studentProgress.lessonsCompleted.includes(lesson.id)}
                  onToggle={() => toggle('lesson', lesson.id)}
                  isTeacher={isTeacher}
                  onEdit={(updated) => updateSubject(activeSubject.id, s => ({ ...s, lessons: s.lessons.map(l => l.id === updated.id ? updated : l) }))}
                  onDelete={() => updateSubject(activeSubject.id, s => ({ ...s, lessons: s.lessons.filter(l => l.id !== lesson.id) }))}
                />
              ))}
            </div>
          </TabsContent>

          {/* EXERCISES */}
          <TabsContent value="exercises" className="space-y-4">
            {isTeacher && <AddExerciseDialog onAdd={(ex) => updateSubject(activeSubject.id, s => ({ ...s, exercises: [...s.exercises, ex] }))} />}
            {activeSubject.exercises.length === 0 && <EmptyState icon={<ClipboardList />} text="No exercises yet." />}
            <div className="grid gap-4">
              {activeSubject.exercises.map(ex => (
                <ExerciseCard
                  key={ex.id}
                  exercise={ex}
                  completed={studentProgress.exercisesCompleted.includes(ex.id)}
                  onToggle={() => toggle('exercise', ex.id)}
                  isTeacher={isTeacher}
                  onDelete={() => updateSubject(activeSubject.id, s => ({ ...s, exercises: s.exercises.filter(e => e.id !== ex.id) }))}
                />
              ))}
            </div>
          </TabsContent>

          {/* EXAM PAPERS */}
          <TabsContent value="exams" className="space-y-4">
            {isTeacher && <AddExamDialog onAdd={(p) => updateSubject(activeSubject.id, s => ({ ...s, examPapers: [...s.examPapers, p] }))} />}
            {activeSubject.examPapers.length === 0 && <EmptyState icon={<FileText />} text="No exam papers yet." />}
            <div className="grid gap-3 md:grid-cols-2">
              {activeSubject.examPapers.map(p => (
                <ExamCard
                  key={p.id}
                  paper={p}
                  attempted={studentProgress.examsAttempted.includes(p.id)}
                  onToggle={() => toggle('exam', p.id)}
                  isTeacher={isTeacher}
                  onDelete={() => updateSubject(activeSubject.id, s => ({ ...s, examPapers: s.examPapers.filter(e => e.id !== p.id) }))}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}

/* ---------------- Cards ---------------- */

function LessonCard({ lesson, completed, onToggle, isTeacher, onEdit, onDelete }: {
  lesson: Lesson; completed: boolean; onToggle: () => void; isTeacher: boolean;
  onEdit: (l: Lesson) => void; onDelete: () => void;
}) {
  const [editing, setEditing] = useState(false);
  return (
    <Card className="overflow-hidden">
      <div className="aspect-video bg-muted">
        <iframe
          src={lesson.videoUrl}
          title={lesson.title}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-display font-semibold text-foreground">{lesson.title}</h3>
            <Badge variant="secondary" className="mt-1">{lesson.duration}</Badge>
          </div>
          <div className="flex gap-1">
            {isTeacher && (
              <>
                <Button size="icon" variant="ghost" onClick={() => setEditing(true)}><Pencil className="h-4 w-4" /></Button>
                <Button size="icon" variant="ghost" onClick={onDelete}><Trash2 className="h-4 w-4 text-destructive" /></Button>
              </>
            )}
          </div>
        </div>
        <p className="text-sm text-muted-foreground whitespace-pre-line">{lesson.notes}</p>
        <Button
          variant={completed ? 'secondary' : 'default'}
          size="sm"
          onClick={onToggle}
          className="gap-2 w-full"
        >
          {completed ? <CheckCircle2 className="h-4 w-4" /> : <Circle className="h-4 w-4" />}
          {completed ? 'Completed' : 'Mark as complete'}
        </Button>
      </div>

      <Dialog open={editing} onOpenChange={setEditing}>
        <DialogContent>
          <DialogHeader><DialogTitle>Edit Lesson</DialogTitle></DialogHeader>
          <LessonForm initial={lesson} onSubmit={(l) => { onEdit(l); setEditing(false); toast.success('Lesson updated'); }} />
        </DialogContent>
      </Dialog>
    </Card>
  );
}

function ExerciseCard({ exercise, completed, onToggle, isTeacher, onDelete }: {
  exercise: Exercise; completed: boolean; onToggle: () => void; isTeacher: boolean; onDelete: () => void;
}) {
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});
  return (
    <Card className="p-4">
      <div className="flex items-start justify-between gap-2 mb-3">
        <h3 className="font-display font-semibold text-foreground">{exercise.title}</h3>
        <div className="flex gap-1">
          {isTeacher && <Button size="icon" variant="ghost" onClick={onDelete}><Trash2 className="h-4 w-4 text-destructive" /></Button>}
        </div>
      </div>
      <ol className="space-y-2 mb-3">
        {exercise.questions.map((q, i) => (
          <li key={i} className="rounded-lg border border-border p-3">
            <p className="text-sm text-foreground"><span className="font-semibold">Q{i + 1}.</span> {q.q}</p>
            {revealed[i] ? (
              <p className="text-sm text-success mt-1"><span className="font-semibold">Answer:</span> {q.answer}</p>
            ) : (
              <Button variant="link" size="sm" className="px-0 h-auto" onClick={() => setRevealed(r => ({ ...r, [i]: true }))}>Show answer</Button>
            )}
          </li>
        ))}
      </ol>
      <Button variant={completed ? 'secondary' : 'default'} size="sm" onClick={onToggle} className="gap-2 w-full">
        {completed ? <CheckCircle2 className="h-4 w-4" /> : <Circle className="h-4 w-4" />}
        {completed ? 'Completed' : 'Mark as complete'}
      </Button>
    </Card>
  );
}

function ExamCard({ paper, attempted, onToggle, isTeacher, onDelete }: {
  paper: ExamPaper; attempted: boolean; onToggle: () => void; isTeacher: boolean; onDelete: () => void;
}) {
  return (
    <Card className="p-4 flex items-center justify-between gap-3">
      <div className="flex items-center gap-3 min-w-0">
        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary"><FileText className="h-5 w-5" /></div>
        <div className="min-w-0">
          <p className="font-semibold text-foreground truncate">{paper.title}</p>
          <p className="text-xs text-muted-foreground">{paper.year} • {paper.term} • {paper.questions} questions</p>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <Button size="sm" variant={attempted ? 'secondary' : 'default'} onClick={onToggle} className={cn("gap-1")}>
          {attempted ? <CheckCircle2 className="h-4 w-4" /> : <Circle className="h-4 w-4" />}
          {attempted ? 'Done' : 'Attempt'}
        </Button>
        {isTeacher && <Button size="icon" variant="ghost" onClick={onDelete}><Trash2 className="h-4 w-4 text-destructive" /></Button>}
      </div>
    </Card>
  );
}

function EmptyState({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <Card className="p-8 text-center text-muted-foreground">
      <div className="mx-auto mb-2 h-10 w-10 flex items-center justify-center text-muted-foreground">{icon}</div>
      <p>{text}</p>
    </Card>
  );
}

/* ---------------- Forms / Add dialogs ---------------- */

function LessonForm({ initial, onSubmit }: { initial?: Lesson; onSubmit: (l: Lesson) => void }) {
  const [title, setTitle] = useState(initial?.title || '');
  const [videoUrl, setVideoUrl] = useState(initial?.videoUrl || '');
  const [notes, setNotes] = useState(initial?.notes || '');
  const [duration, setDuration] = useState(initial?.duration || '10 min');

  return (
    <div className="space-y-3">
      <div><Label>Title</Label><Input value={title} onChange={e => setTitle(e.target.value)} /></div>
      <div><Label>Video embed URL</Label><Input value={videoUrl} onChange={e => setVideoUrl(e.target.value)} placeholder="https://www.youtube.com/embed/..." /></div>
      <div><Label>Duration</Label><Input value={duration} onChange={e => setDuration(e.target.value)} /></div>
      <div><Label>Notes</Label><Textarea rows={5} value={notes} onChange={e => setNotes(e.target.value)} /></div>
      <DialogFooter>
        <Button onClick={() => {
          if (!title || !videoUrl) { toast.error('Title and video URL required'); return; }
          onSubmit({ id: initial?.id || `l-${Date.now()}`, title, videoUrl, notes, duration });
        }}>Save</Button>
      </DialogFooter>
    </div>
  );
}

function AddLessonDialog({ onAdd }: { onAdd: (l: Lesson) => void }) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2"><Plus className="h-4 w-4" /> Add Lesson</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader><DialogTitle>New Lesson</DialogTitle></DialogHeader>
        <LessonForm onSubmit={(l) => { onAdd(l); setOpen(false); toast.success('Lesson added'); }} />
      </DialogContent>
    </Dialog>
  );
}

function AddExerciseDialog({ onAdd }: { onAdd: (e: Exercise) => void }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [rows, setRows] = useState<{ q: string; answer: string }[]>([{ q: '', answer: '' }]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2"><Plus className="h-4 w-4" /> Add Exercise</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader><DialogTitle>New Exercise</DialogTitle></DialogHeader>
        <div className="space-y-3">
          <div><Label>Title</Label><Input value={title} onChange={e => setTitle(e.target.value)} /></div>
          <div className="space-y-2">
            <Label>Questions</Label>
            {rows.map((r, i) => (
              <div key={i} className="grid grid-cols-2 gap-2">
                <Input placeholder="Question" value={r.q} onChange={e => setRows(rs => rs.map((x, j) => j === i ? { ...x, q: e.target.value } : x))} />
                <Input placeholder="Answer" value={r.answer} onChange={e => setRows(rs => rs.map((x, j) => j === i ? { ...x, answer: e.target.value } : x))} />
              </div>
            ))}
            <Button size="sm" variant="outline" onClick={() => setRows(rs => [...rs, { q: '', answer: '' }])}>+ Add question</Button>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={() => {
            const cleaned = rows.filter(r => r.q.trim());
            if (!title || cleaned.length === 0) { toast.error('Add a title and at least one question'); return; }
            onAdd({ id: `e-${Date.now()}`, title, questions: cleaned });
            setOpen(false); setTitle(''); setRows([{ q: '', answer: '' }]);
            toast.success('Exercise added');
          }}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function AddExamDialog({ onAdd }: { onAdd: (p: ExamPaper) => void }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('2024');
  const [term, setTerm] = useState('Term 3');
  const [questions, setQuestions] = useState('20');

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2"><Plus className="h-4 w-4" /> Add Exam Paper</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader><DialogTitle>New Exam Paper</DialogTitle></DialogHeader>
        <div className="space-y-3">
          <div><Label>Title</Label><Input value={title} onChange={e => setTitle(e.target.value)} /></div>
          <div className="grid grid-cols-3 gap-2">
            <div><Label>Year</Label><Input value={year} onChange={e => setYear(e.target.value)} /></div>
            <div><Label>Term</Label><Input value={term} onChange={e => setTerm(e.target.value)} /></div>
            <div><Label>Questions</Label><Input type="number" value={questions} onChange={e => setQuestions(e.target.value)} /></div>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={() => {
            if (!title) { toast.error('Title required'); return; }
            onAdd({ id: `ex-${Date.now()}`, title, year, term, url: '#', questions: parseInt(questions) || 0 });
            setOpen(false); setTitle('');
            toast.success('Exam paper added');
          }}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
