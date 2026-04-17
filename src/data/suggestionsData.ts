export interface Suggestion {
  id: string;
  authorName: string;
  authorRole: 'teacher' | 'parent' | 'student';
  category: 'academic' | 'facilities' | 'events' | 'food' | 'safety' | 'other';
  subject: string;
  message: string;
  submittedAt: Date;
  status: 'new' | 'reviewing' | 'resolved';
  anonymous: boolean;
}

export const initialSuggestions: Suggestion[] = [
  {
    id: 's1',
    authorName: 'Sarah Mitchell',
    authorRole: 'parent',
    category: 'academic',
    subject: 'More math practice sessions',
    message: 'Could the school offer additional after-school math tutoring for students who need extra support?',
    submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
    status: 'reviewing',
    anonymous: false,
  },
  {
    id: 's2',
    authorName: 'Anonymous',
    authorRole: 'student',
    category: 'food',
    subject: 'Healthier cafeteria options',
    message: 'Please consider adding more fresh fruit and vegetarian meals to the lunch menu.',
    submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
    status: 'new',
    anonymous: true,
  },
  {
    id: 's3',
    authorName: 'James Okonkwo',
    authorRole: 'student',
    category: 'facilities',
    subject: 'Library opening hours',
    message: 'It would be great if the library could stay open later on weekdays for study sessions.',
    submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
    status: 'resolved',
    anonymous: false,
  },
  {
    id: 's4',
    authorName: 'Mrs. Adeyemi',
    authorRole: 'teacher',
    category: 'safety',
    subject: 'Crosswalk near main gate',
    message: 'We need clearer signage and a crossing guard at the main gate during pickup hours.',
    submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1),
    status: 'new',
    anonymous: false,
  },
];
