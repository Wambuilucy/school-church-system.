import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { events, EventItem } from '@/data/eventsData';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Church, GraduationCap, MapPin, Clock, CalendarDays } from 'lucide-react';

type FilterCategory = 'all' | 'church' | 'school';

export default function Events() {
  const [filter, setFilter] = useState<FilterCategory>('all');

  const filtered = filter === 'all' ? events : events.filter(e => e.category === filter);
  const sorted = [...filtered].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const upcoming = sorted.filter(e => new Date(e.date) >= new Date('2026-04-14'));
  const past = sorted.filter(e => new Date(e.date) < new Date('2026-04-14'));

  return (
    <Layout title="Events" subtitle="View upcoming church and school events">
      {/* Filters */}
      <div className="flex gap-2 mb-6">
        {([
          { key: 'all' as FilterCategory, label: 'All Events', icon: CalendarDays },
          { key: 'church' as FilterCategory, label: 'Church', icon: Church },
          { key: 'school' as FilterCategory, label: 'School', icon: GraduationCap },
        ]).map(f => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={cn(
              "flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all border",
              filter === f.key
                ? "border-primary bg-primary text-primary-foreground shadow-md"
                : "border-border bg-card text-muted-foreground hover:bg-secondary"
            )}
          >
            <f.icon className="h-4 w-4" />
            {f.label}
          </button>
        ))}
      </div>

      {/* Upcoming */}
      {upcoming.length > 0 && (
        <div className="mb-8">
          <h3 className="font-display text-lg font-semibold text-foreground mb-4">Upcoming Events</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {upcoming.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      )}

      {/* Past */}
      {past.length > 0 && (
        <div>
          <h3 className="font-display text-lg font-semibold text-muted-foreground mb-4">Past Events</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 opacity-70">
            {past.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      )}

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <CalendarDays className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
          <p className="text-muted-foreground">No events found.</p>
        </div>
      )}
    </Layout>
  );
}

function EventCard({ event }: { event: EventItem }) {
  const dateObj = new Date(event.date);
  const day = dateObj.getDate();
  const month = dateObj.toLocaleString('default', { month: 'short' });

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden hover:shadow-md transition-shadow">
      <div className={cn("h-2", event.color)} />
      <div className="p-5">
        <div className="flex items-start gap-4">
          <div className="flex flex-col items-center rounded-lg bg-secondary px-3 py-2 min-w-[52px]">
            <span className="text-xs font-semibold uppercase text-muted-foreground">{month}</span>
            <span className="text-xl font-bold text-foreground">{day}</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="outline" className="text-xs capitalize">
                {event.category === 'church' ? <Church className="h-3 w-3 mr-1" /> : <GraduationCap className="h-3 w-3 mr-1" />}
                {event.category}
              </Badge>
              <Badge variant="secondary" className="text-xs">{event.type}</Badge>
            </div>
            <h4 className="font-semibold text-foreground mb-1 truncate">{event.title}</h4>
            <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{event.description}</p>
            <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" /> {event.time}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3" /> {event.location}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
