import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { 
  MessageSquare, Users, Send, History, FileText, Settings, Zap,
  GraduationCap, UserCheck, BookOpen, ScrollText, DollarSign,
  CalendarDays, Bell, Home, Bus, Trophy, LogOut, Lightbulb
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const allItems = {
  messaging: [
    { path: '/', icon: MessageSquare, label: 'Dashboard', roles: ['teacher'] },
    { path: '/compose', icon: Send, label: 'Compose Message', roles: ['teacher'] },
    { path: '/groups', icon: Users, label: 'Contact Groups', roles: ['teacher'] },
    { path: '/templates', icon: FileText, label: 'Templates', roles: ['teacher'] },
    { path: '/history', icon: History, label: 'Message History', roles: ['teacher'] },
  ],
  school: [
    { path: '/welcome', icon: Home, label: 'Home', roles: ['teacher', 'parent', 'student'] },
    { path: '/notifications', icon: Bell, label: 'Notifications', roles: ['teacher', 'parent', 'student'] },
    { path: '/teacher', icon: GraduationCap, label: 'Teacher Dashboard', roles: ['teacher'] },
    { path: '/parent', icon: UserCheck, label: "Child's Dashboard", roles: ['parent'] },
    { path: '/student-portal', icon: BookOpen, label: 'My Results', roles: ['student'] },
    { path: '/students', icon: BookOpen, label: 'All Students', roles: ['teacher'] },
    { path: '/transcript', icon: ScrollText, label: 'Transcripts', roles: ['teacher', 'parent', 'student'] },
    { path: '/finance', icon: DollarSign, label: 'Finance', roles: ['teacher', 'parent', 'student'] },
    { path: '/events', icon: CalendarDays, label: 'Events', roles: ['teacher', 'parent', 'student'] },
    { path: '/trips', icon: Bus, label: 'School Trips', roles: ['teacher', 'parent', 'student'] },
    { path: '/teacher-directory', icon: Users, label: 'Staff Directory', roles: ['teacher', 'parent'] },
    { path: '/cocurricular', icon: Trophy, label: 'Co-curricular', roles: ['teacher', 'parent', 'student'] },
    { path: '/suggestions', icon: Lightbulb, label: 'Suggestion Box', roles: ['teacher', 'parent', 'student'] },
    { path: '/settings', icon: Settings, label: 'Settings', roles: ['teacher'] },
  ],
};

export function Sidebar() {
  const location = useLocation();
  const { user, logout } = useAuth();
  const role = user?.role || 'student';

  const messagingItems = allItems.messaging.filter(i => i.roles.includes(role));
  const schoolItems = allItems.school.filter(i => i.roles.includes(role));

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
            <p className="text-xs text-muted-foreground capitalize">{role} Portal</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-4 overflow-y-auto">
          {messagingItems.length > 0 && (
            <>
              <p className="px-3 mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Messaging</p>
              {messagingItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link key={item.path} to={item.path}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                      isActive ? "bg-primary text-primary-foreground shadow-md" : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    )}>
                    <item.icon className="h-5 w-5" />
                    {item.label}
                  </Link>
                );
              })}
              <div className="my-3 border-t border-border" />
            </>
          )}

          <p className="px-3 mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">School</p>
          {schoolItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link key={item.path} to={item.path}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                  isActive ? "bg-primary text-primary-foreground shadow-md" : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}>
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* User + Logout */}
        <div className="border-t border-border p-4">
          {user && (
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                {user.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{user.name}</p>
                <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
              </div>
            </div>
          )}
          <Button variant="ghost" size="sm" className="w-full justify-start gap-2 text-muted-foreground" onClick={logout}>
            <LogOut className="h-4 w-4" /> Sign Out
          </Button>
        </div>
      </div>
    </aside>
  );
}
