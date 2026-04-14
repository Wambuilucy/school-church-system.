import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  MessageSquare, 
  Users, 
  Send, 
  History, 
  FileText, 
  Settings,
  Zap,
  GraduationCap,
  UserCheck,
  BookOpen,
  ScrollText,
  DollarSign,
  CalendarDays
} from 'lucide-react';

const messagingItems = [
  { path: '/', icon: MessageSquare, label: 'Dashboard' },
  { path: '/compose', icon: Send, label: 'Compose Message' },
  { path: '/groups', icon: Users, label: 'Contact Groups' },
  { path: '/templates', icon: FileText, label: 'Templates' },
  { path: '/history', icon: History, label: 'Message History' },
  { path: '/settings', icon: Settings, label: 'Settings' },
];

const schoolItems = [
  { path: '/teacher', icon: GraduationCap, label: 'Teacher Dashboard' },
  { path: '/parent', icon: UserCheck, label: 'Parent Dashboard' },
  { path: '/students', icon: BookOpen, label: 'Students Dashboard' },
  { path: '/transcript', icon: ScrollText, label: 'Transcripts' },
  { path: '/finance', icon: DollarSign, label: 'Finance' },
  { path: '/events', icon: CalendarDays, label: 'Events' },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-border bg-card">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center gap-3 border-b border-border px-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-primary shadow-glow">
            <Zap className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-display text-lg font-bold text-foreground">BroadcastHub</h1>
            <p className="text-xs text-muted-foreground">Mass Messaging</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-4 overflow-y-auto">
          <p className="px-3 mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Messaging</p>
          {messagingItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}

          <div className="my-3 border-t border-border" />
          <p className="px-3 mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">School</p>
          {schoolItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-border p-4">
          <div className="rounded-lg bg-secondary p-3">
            <p className="text-xs font-medium text-secondary-foreground">Quick Tip</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Use templates to save time on repeated messages.
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
