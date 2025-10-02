"use client";

import AttendanceForm from "@/components/attendance/attendance-form";
import { DatePicker } from "antd";
import { format } from "date-fns";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";

export default function AttendancePage() {
  const today = dayjs(); // current date (dayjs object)
  const [date, setDate] = useState<Dayjs | null>(today);

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <header className="space-y-1.5">
          <h1 className="text-2xl font-bold tracking-tight font-headline sm:text-3xl">
            Daily Attendance
          </h1>
          <p className="text-muted-foreground">
            Mark attendance for all employees for{" "}
            {dayjs(date).format("DD MMM YYYY")} .
          </p>
        </header>
        <DatePicker
          format="DD-MM-YYYY"
          value={date}
          defaultValue={today}
          allowClear={false}
          onChange={(val) => setDate(val)}
          className="w-52"
          maxDate={today}
          minDate={dayjs().subtract(1, "month")}
        />
      </div>
      <main>
        <AttendanceForm date={date} />
      </main>
    </div>
  );
}
