"use client";

import AttendanceForm from "@/components/attendance/attendance-form";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { downloadCSVFileAsyncThunk } from "@/redux/async-thunk/employees-async-thunk";
import { Button, DatePicker, Popover } from "antd";
import { format } from "date-fns";
import dayjs, { Dayjs } from "dayjs";
import { Download, LucideDownload } from "lucide-react";
import { useCallback, useState } from "react";

export default function AttendancePage() {
  const today = dayjs(); // current date (dayjs object)
  const [date, setDate] = useState<Dayjs | null>(today);

  const dispatch = useAppDispatch();

  const handleDownloadCSV = useCallback(
    (isMonthly: boolean) => {
      const payload = isMonthly
        ? {
            month: dayjs(date).format("YYYY-MM"),
          }
        : {
            day: dayjs(date).format("YYYY-MM-DD"),
          };
      // dispatch(downloadCSVFileAsyncThunk(payload))
      //   .unwrap()
      //   .then((res) => {
      //   console.log(res);
      //   const url = window.URL.createObjectURL(new Blob([res]));
      //   const link = document.createElement("a");
      //   link.href = url;
      //   link.setAttribute("download", "attendance.csv");
      //   document.body.appendChild(link);
      //   link.click();
      //   link.remove();
      // });
      // window.open(
      //   `http://localhost:8000/download-sheet?month=${dayjs(date).format(
      //     "YYYY-MM"
      //   )}&day=${dayjs(date).format("YYYY-MM-DD")}`,
      //   "_blank"
      // );

      window.location.href = `${
        process.env.NEXT_PUBLIC_API_BASE_URL
      }/download-sheet?month=${dayjs(date).format("YYYY-MM")}&day=${dayjs(
        date
      ).format("YYYY-MM-DD")}`;
    },
    [date]
  );

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
        <div className="flex items-center gap-4">
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
          <Popover
            content={
              <div className="flex flex-col gap-3">
                <Button onClick={() => handleDownloadCSV(true)}>
                  For {dayjs(date).format("MMM YYYY")}
                </Button>
                <Button onClick={() => handleDownloadCSV(false)}>
                  For {dayjs(date).format("DD MMM YYYY")}
                </Button>
              </div>
            }
          >
            <Button className="px-2 text-black p-0">
              <LucideDownload width={16} color="#000" stroke="#000" /> Download
              CSV
            </Button>
          </Popover>
        </div>
      </div>
      <main>
        <AttendanceForm date={date} />
      </main>
    </div>
  );
}
