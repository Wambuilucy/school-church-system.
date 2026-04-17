import { useState, useMemo } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { initialSuggestions, Suggestion } from '@/data/suggestionsData';
import { Lightbulb, Send, MessageCircle, CheckCircle2, Clock, Filter } from 'lucide-react';
import { toast } from 'sonner';
import { z } from 'zod';

const suggestionSchema = z.object({
  subject: z.string().trim().min(3, 'Subject must be at least 3 characters').max(120),
  message: z.string().trim().min(10, 'Message must be at least 10 characters').max(1000),
});

const categoryColors: Record<string, string> = {
  academic: 'bg-primary/10 text-primary',
  facilities: 'bg-accent/10 text-accent-foreground',
  events: 'bg-success/10 text-success',
  food: 'bg-warning/10 text-warning',
  safety: 'bg-destructive/10 text-destructive',
  other: 'bg-muted text-muted-foreground',
};

const statusConfig = {
  new: { label: 'New', icon: Clock, className: 'bg-primary/10 text-primary' },
  reviewing: { label: 'Reviewing', icon: MessageCircle, className: 'bg-warning/10 text-warning' },
  resolved: { label: 'Resolved', icon: CheckCircle2, className: 'bg-success/10 text-success' },
};

export default function Suggestions() {
  const { user } = useAuth();
  const isTeacher = user?.role === 'teacher';

  const [suggestions, setSuggestions] = useState<Suggestion[]>(initialSuggestions);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [category, setCategory] = useState<Suggestion['category']>('academic');
  const [anonymous, setAnonymous] = useState(false);
  const [filterStatus, setFilterStatus] = useState<'all' | Suggestion['status']>('all');
  const [filterCategory, setFilterCategory] = useState<'all' | Suggestion['category']>('all');

  const visibleSuggestions = useMemo(() => {
    const base = isTeacher
      ? suggestions
      : suggestions.filter((s) => s.authorName === user?.name && !s.anonymous);
    return base.filter(
      (s) =>
        (filterStatus === 'all' || s.status === filterStatus) &&
        (filterCategory === 'all' || s.category === filterCategory),
    );
  }, [suggestions, isTeacher, user, filterStatus, filterCategory]);

  const stats = useMemo(
    () => ({
      total: suggestions.length,
      new: suggestions.filter((s) => s.status === 'new').length,
      reviewing: suggestions.filter((s) => s.status === 'reviewing').length,
      resolved: suggestions.filter((s) => s.status === 'resolved').length,
    }),
    [suggestions],
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = suggestionSchema.safeParse({ subject, message });
    if (!result.success) {
      toast.error(result.error.issues[0].message);
      return;
    }
    const newSuggestion: Suggestion = {
      id: `s${Date.now()}`,
      authorName: anonymous ? 'Anonymous' : user?.name || 'Unknown',
      authorRole: (user?.role as Suggestion['authorRole']) || 'student',
      category,
      subject: result.data.subject,
      message: result.data.message,
      submittedAt: new Date(),
      status: 'new',
      anonymous,
    };
    setSuggestions((prev) => [newSuggestion, ...prev]);
    setSubject('');
    setMessage('');
    setAnonymous(false);
    setCategory('academic');
    toast.success('Suggestion submitted. Thank you for your feedback!');
  };

  const updateStatus = (id: string, status: Suggestion['status']) => {
    setSuggestions((prev) => prev.map((s) => (s.id === id ? { ...s, status } : s)));
    toast.success(`Marked as ${status}`);
  };

  return (
    <Layout title="Suggestion Box" subtitle={isTeacher ? 'Review feedback from the school community' : 'Share your ideas to help improve our school'}>
      <div className="space-y-6">

        {isTeacher && (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { label: 'Total', value: stats.total, color: 'text-foreground' },
              { label: 'New', value: stats.new, color: 'text-primary' },
              { label: 'Reviewing', value: stats.reviewing, color: 'text-warning' },
              { label: 'Resolved', value: stats.resolved, color: 'text-success' },
            ].map((s) => (
              <Card key={s.label}>
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground">{s.label}</p>
                  <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <Tabs defaultValue={isTeacher ? 'review' : 'submit'} className="w-full">
          <TabsList>
            <TabsTrigger value="submit">Submit Suggestion</TabsTrigger>
            <TabsTrigger value="review">{isTeacher ? 'All Suggestions' : 'My Suggestions'}</TabsTrigger>
          </TabsList>

          <TabsContent value="submit" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Share your feedback</CardTitle>
                <CardDescription>Your voice matters. Submit ideas, concerns, or compliments.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="Brief title for your suggestion"
                        maxLength={120}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Category</Label>
                      <Select value={category} onValueChange={(v) => setCategory(v as Suggestion['category'])}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="academic">Academic</SelectItem>
                          <SelectItem value="facilities">Facilities</SelectItem>
                          <SelectItem value="events">Events</SelectItem>
                          <SelectItem value="food">Food / Cafeteria</SelectItem>
                          <SelectItem value="safety">Safety</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Your suggestion</Label>
                    <Textarea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Describe your idea or feedback in detail..."
                      rows={6}
                      maxLength={1000}
                    />
                    <p className="text-xs text-muted-foreground text-right">{message.length}/1000</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="anon" checked={anonymous} onCheckedChange={(c) => setAnonymous(c === true)} />
                    <Label htmlFor="anon" className="cursor-pointer text-sm font-normal">
                      Submit anonymously
                    </Label>
                  </div>
                  <Button type="submit" variant="gradient" className="gap-2">
                    <Send className="h-4 w-4" /> Submit Suggestion
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="review" className="mt-4 space-y-4">
            {isTeacher && (
              <Card>
                <CardContent className="flex flex-wrap items-center gap-3 p-4">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <Select value={filterStatus} onValueChange={(v) => setFilterStatus(v as typeof filterStatus)}>
                    <SelectTrigger className="w-[160px]"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All statuses</SelectItem>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="reviewing">Reviewing</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={filterCategory} onValueChange={(v) => setFilterCategory(v as typeof filterCategory)}>
                    <SelectTrigger className="w-[180px]"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All categories</SelectItem>
                      <SelectItem value="academic">Academic</SelectItem>
                      <SelectItem value="facilities">Facilities</SelectItem>
                      <SelectItem value="events">Events</SelectItem>
                      <SelectItem value="food">Food / Cafeteria</SelectItem>
                      <SelectItem value="safety">Safety</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>
            )}

            {visibleSuggestions.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center text-muted-foreground">
                  No suggestions to display yet.
                </CardContent>
              </Card>
            ) : (
              visibleSuggestions.map((s) => {
                const StatusIcon = statusConfig[s.status].icon;
                return (
                  <Card key={s.id}>
                    <CardContent className="p-5 space-y-3">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div className="space-y-1">
                          <h3 className="font-semibold text-foreground">{s.subject}</h3>
                          <p className="text-xs text-muted-foreground">
                            By <span className="font-medium">{s.authorName}</span> ({s.authorRole}) ·{' '}
                            {s.submittedAt.toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline" className={categoryColors[s.category]}>
                            {s.category}
                          </Badge>
                          <Badge variant="outline" className={statusConfig[s.status].className}>
                            <StatusIcon className="mr-1 h-3 w-3" />
                            {statusConfig[s.status].label}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm text-foreground/90 leading-relaxed">{s.message}</p>
                      {isTeacher && (
                        <div className="flex flex-wrap gap-2 pt-2 border-t border-border">
                          <Button
                            size="sm"
                            variant={s.status === 'reviewing' ? 'default' : 'outline'}
                            onClick={() => updateStatus(s.id, 'reviewing')}
                          >
                            Mark Reviewing
                          </Button>
                          <Button
                            size="sm"
                            variant={s.status === 'resolved' ? 'success' : 'outline'}
                            onClick={() => updateStatus(s.id, 'resolved')}
                          >
                            Mark Resolved
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
