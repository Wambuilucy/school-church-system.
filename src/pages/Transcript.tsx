import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { students, getStudentAverage, getGradeColor } from '@/data/studentData';
import { transcripts } from '@/data/transcriptData';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FileText, Printer } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Transcript() {
  const [selectedId, setSelectedId] = useState<string>(students[0].id);
  const selected = students.find(s => s.id === selectedId);
  const records = transcripts[selectedId] || [];

  return (
    <Layout title="Student Transcripts" subtitle="View complete academic records for each student">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Student list */}
        <div className="lg:col-span-1 space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Select Student</p>
          {students.map(s => {
            const avg = getStudentAverage(s.id);
            return (
              <button
                key={s.id}
                onClick={() => setSelectedId(s.id)}
                className={cn(
                  "w-full flex items-center gap-3 rounded-lg border p-3 text-left transition-all",
                  selectedId === s.id
                    ? "border-primary bg-primary/5 shadow-sm"
                    : "border-border bg-card hover:border-primary/30"
                )}
              >
                <span className="text-xl">{s.avatar}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{s.name}</p>
                  <p className="text-xs text-muted-foreground">{s.grade}</p>
                </div>
                <span className={cn("text-xs font-bold", getGradeColor(avg))}>{avg}%</span>
              </button>
            );
          })}
        </div>

        {/* Transcript */}
        <div className="lg:col-span-3 space-y-4">
          {selected && (
            <>
              <div className="flex items-center justify-between rounded-xl border border-border bg-card p-5">
                <div className="flex items-center gap-4">
                  <span className="text-4xl">{selected.avatar}</span>
                  <div>
                    <h2 className="font-display text-xl font-bold text-foreground">{selected.name}</h2>
                    <p className="text-sm text-muted-foreground">{selected.grade} • Parent: {selected.parentName}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="gap-2">
                  <Printer className="h-4 w-4" />
                  Print Transcript
                </Button>
              </div>

              {records.length === 0 ? (
                <div className="rounded-xl border border-border bg-card p-10 text-center">
                  <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                  <p className="text-muted-foreground">No transcript records available.</p>
                </div>
              ) : (
                records.map((entry, idx) => (
                  <div key={idx} className="rounded-xl border border-border bg-card overflow-hidden">
                    <div className="flex items-center justify-between bg-secondary px-5 py-3">
                      <div className="flex items-center gap-3">
                        <Badge variant="secondary" className="font-semibold">{entry.term}</Badge>
                        <span className="text-sm text-muted-foreground">{entry.year}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-muted-foreground">GPA:</span>
                        <span className={cn("font-bold text-sm", entry.gpa >= 3.5 ? 'text-emerald-500' : entry.gpa >= 3.0 ? 'text-primary' : 'text-amber-500')}>
                          {entry.gpa.toFixed(1)}
                        </span>
                      </div>
                    </div>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Subject</TableHead>
                          <TableHead>Teacher</TableHead>
                          <TableHead className="text-center">Credits</TableHead>
                          <TableHead className="text-center">Score</TableHead>
                          <TableHead className="text-center">Grade</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {entry.subjects.map(sub => (
                          <TableRow key={sub.name}>
                            <TableCell className="font-medium">{sub.name}</TableCell>
                            <TableCell className="text-muted-foreground">{sub.teacher}</TableCell>
                            <TableCell className="text-center">{sub.credits}</TableCell>
                            <TableCell className={cn("text-center font-bold", getGradeColor(sub.score))}>{sub.score}%</TableCell>
                            <TableCell className="text-center">
                              <Badge variant="outline">{sub.grade}</Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    {entry.remarks && (
                      <div className="px-5 py-3 border-t border-border">
                        <p className="text-xs text-muted-foreground"><span className="font-semibold">Remarks:</span> {entry.remarks}</p>
                      </div>
                    )}
                  </div>
                ))
              )}
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}
