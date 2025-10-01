"use client";

import { AttendanceForm } from "@/components/attendance/attendance-form";
import { format } from "date-fns";

export default function AttendancePage() {
  const today = new Date();

  return (
    <div className="space-y-6">
      <header className="space-y-1.5">
        <h1 className="text-2xl font-bold tracking-tight font-headline sm:text-3xl">
          Daily Attendance
        </h1>
        <p className="text-muted-foreground">
          Mark attendance for all employees for {format(today, "MMMM do, yyyy")}
          .
        </p>
      </header>
      <main>
        <AttendanceForm />
      </main>
    </div>
  );
}
