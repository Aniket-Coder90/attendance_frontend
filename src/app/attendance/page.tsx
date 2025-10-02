"use client";

import AttendanceForm from "@/components/attendance/attendance-form";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import {
  downloadCSVFileAsyncThunk,
  getDesignationListAsyncThunk,
} from "@/redux/async-thunk/employees-async-thunk";
import { Button, DatePicker, Popover, Select } from "antd";
import { format } from "date-fns";
import dayjs, { Dayjs } from "dayjs";
import { Download, LucideDownload } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

export default function AttendancePage() {
  const today = dayjs(); // current date (dayjs object)
  const [date, setDate] = useState<Dayjs | null>(today);

  const [designationOptions, setDesignationOptions] = useState<string[]>([]);

  const [filter, setFilter] = useState<string>("");

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
      const payloadParams = isMonthly
        ? `month=${payload.month}`
        : `day=${payload.day}`;

      window.location.href = `${process.env.NEXT_PUBLIC_API_BASE_URL}download-sheet?${payloadParams}`;
    },
    [date]
  );

  const getDesignationList = useCallback(() => {
    dispatch(getDesignationListAsyncThunk())
      .unwrap()
      .then((res) => {
        setDesignationOptions(res.data);
      });
  }, []);

  useEffect(() => {
    getDesignationList();
  }, []);

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
          <Select
            className="min-w-52"
            defaultValue={"all"}
            onSelect={(e) => setFilter(e)}
          >
            <Select.Option value="all">All</Select.Option>
            {designationOptions?.map((des: string) => {
              return (
                <Select.Option value={des} key={des}>
                  {des}
                </Select.Option>
              );
            })}
          </Select>
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
        <AttendanceForm date={date} filter={filter} />
      </main>
    </div>
  );
}
