import { employees, attendanceRecords } from '@/lib/data';
import DashboardClient from '@/components/dashboard/dashboard-client';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <header className="space-y-1.5">
        <h1 className="text-2xl font-bold tracking-tight font-headline sm:text-3xl">
          Attendance Dashboard
        </h1>
        <p className="text-muted-foreground">
          View monthly attendance summaries for each employee.
        </p>
      </header>
      <main>
        <DashboardClient
          employees={employees}
          records={attendanceRecords}
        />
      </main>
    </div>
  );
}
