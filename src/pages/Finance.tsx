import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { students, getGradeColor } from '@/data/studentData';
import { studentFinances } from '@/data/financeData';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DollarSign, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

const statusConfig = {
  paid: { label: 'Paid', icon: CheckCircle, className: 'bg-emerald-500/10 text-emerald-600 border-emerald-200' },
  pending: { label: 'Pending', icon: Clock, className: 'bg-amber-500/10 text-amber-600 border-amber-200' },
  overdue: { label: 'Overdue', icon: AlertTriangle, className: 'bg-red-500/10 text-red-600 border-red-200' },
};

export default function Finance() {
  const [selectedId, setSelectedId] = useState<string>(students[0].id);
  const selected = students.find(s => s.id === selectedId);
  const finance = studentFinances[selectedId];

  return (
    <Layout title="Finance Dashboard" subtitle="View student fee balances and payment history">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Student list */}
        <div className="lg:col-span-1 space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Select Student</p>
          {students.map(s => {
            const fin = studentFinances[s.id];
            const hasBalance = fin && fin.balance > 0;
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
                {fin && (
                  <span className={cn("text-xs font-bold", hasBalance ? 'text-amber-500' : 'text-emerald-500')}>
                    {hasBalance ? `$${fin.balance.toLocaleString()}` : 'Cleared'}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Finance details */}
        <div className="lg:col-span-3 space-y-4">
          {selected && finance && (
            <>
              {/* Summary cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="rounded-xl border border-border bg-card p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <DollarSign className="h-5 w-5 text-primary" />
                    </div>
                    <p className="text-sm text-muted-foreground">Total Fees</p>
                  </div>
                  <p className="text-2xl font-bold text-foreground">${finance.totalFees.toLocaleString()}</p>
                </div>
                <div className="rounded-xl border border-border bg-card p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
                      <CheckCircle className="h-5 w-5 text-emerald-500" />
                    </div>
                    <p className="text-sm text-muted-foreground">Total Paid</p>
                  </div>
                  <p className="text-2xl font-bold text-emerald-500">${finance.totalPaid.toLocaleString()}</p>
                </div>
                <div className="rounded-xl border border-border bg-card p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10">
                      <AlertTriangle className="h-5 w-5 text-amber-500" />
                    </div>
                    <p className="text-sm text-muted-foreground">Balance Due</p>
                  </div>
                  <p className={cn("text-2xl font-bold", finance.balance > 0 ? 'text-amber-500' : 'text-emerald-500')}>
                    ${finance.balance.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Payment progress */}
              <div className="rounded-xl border border-border bg-card p-5">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-medium text-foreground">Payment Progress</p>
                  <p className="text-sm text-muted-foreground">
                    {Math.round((finance.totalPaid / finance.totalFees) * 100)}% paid
                  </p>
                </div>
                <Progress value={(finance.totalPaid / finance.totalFees) * 100} className="h-3" />
              </div>

              {/* Fee breakdown */}
              <div className="rounded-xl border border-border bg-card overflow-hidden">
                <div className="px-5 py-3 bg-secondary">
                  <p className="font-semibold text-foreground">Fee Breakdown — {selected.name}</p>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Description</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Paid Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {finance.fees.map(fee => {
                      const cfg = statusConfig[fee.status];
                      return (
                        <TableRow key={fee.id}>
                          <TableCell className="font-medium">{fee.description}</TableCell>
                          <TableCell className="text-muted-foreground">{fee.dueDate}</TableCell>
                          <TableCell className="text-right font-bold">${fee.amount.toLocaleString()}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className={cn("gap-1", cfg.className)}>
                              <cfg.icon className="h-3 w-3" />
                              {cfg.label}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-muted-foreground">{fee.paidDate || '—'}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}
