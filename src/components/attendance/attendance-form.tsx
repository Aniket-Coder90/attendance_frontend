"use client";

import { useEffect, useState } from "react";
import { Table, Radio, Button, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import {
  employeeAttendanceFillAsyncThunk,
  getEmployeeListAsyncThunk,
} from "@/redux/async-thunk/employees-async-thunk";
import { AttendanceStatusEnum, type Employee } from "@/lib/types";
import dayjs, { Dayjs } from "dayjs";

type AttendanceRecord = {
  key: string;
  id: number;
  name: string;
  email?: string;
  designation: string;
  category: string;
  status: AttendanceStatusEnum;
};

export default function AttendanceForm({ date }: { date: Dayjs | null }) {
  const dispatch = useAppDispatch();
  const [employeeList, setEmployeeList] = useState<AttendanceRecord[]>([]);
  const [attendance, setAttendance] = useState<
    {
      status: AttendanceStatusEnum;
      employeeId: number;
      date: string;
    }[]
  >([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(
      getEmployeeListAsyncThunk({
        year: dayjs(date).year(),
        month: dayjs(date).month() + 1,
        day: dayjs(date).date(),
      })
    )
      .unwrap()
      .then((res) => {
        const data = res.data ?? [];
        setEmployeeList(
          data.map((emp: Employee) => ({
            key: emp.id.toString(),
            ...emp,
            status: emp.attendances[emp.attendances?.length - 1]?.status, // default
          }))
        );

        // Initialize attendance state
        const initialAttendance = data.map((emp: Employee) => ({
          employeeId: emp.id,
          status: AttendanceStatusEnum.PRESENT,
          date: date,
        }));
        setAttendance(initialAttendance);
      });
  }, [dispatch, date]);

  // Handle status change
  const handleStatusChange = (
    employeeId: number,
    value: AttendanceStatusEnum
  ) => {
    setAttendance((prev) =>
      prev.map((att) =>
        att.employeeId === employeeId ? { ...att, status: value } : att
      )
    );
    setEmployeeList((prev) =>
      prev.map((emp) =>
        emp.id === employeeId ? { ...emp, status: value } : emp
      )
    );
  };

  // Table columns
  const columns: ColumnsType<AttendanceRecord> = [
    {
      title: "Employee",
      dataIndex: "name",
      key: "name",
      render: (_, record) => (
        <div>
          <div>{record.name}</div>
          <div style={{ color: "#888" }}>{record.email}</div>
        </div>
      ),
    },
    {
      title: "Designation",
      dataIndex: "designation",
      key: "designation",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Status",
      dataIndex: "attendanceId",
      key: "attendanceId",
      render: (_, record) => (
        <Radio.Group
          value={record.status ?? AttendanceStatusEnum.PRESENT}
          onChange={(e) => handleStatusChange(record.id, e.target.value)}
        >
          <Radio value={AttendanceStatusEnum.PRESENT}>Present</Radio>
          <Radio value={AttendanceStatusEnum.ABSENT}>Absent</Radio>
          <Radio value={AttendanceStatusEnum.LEAVE}>Leave</Radio>
        </Radio.Group>
      ),
    },
  ];

  // Submit attendance
  const handleSubmit = async () => {
    setLoading(true);
    try {
      await dispatch(employeeAttendanceFillAsyncThunk(attendance)).unwrap();
      message.success("Attendance submitted successfully!");
    } catch (err) {
      message.error("Failed to submit attendance.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Table columns={columns} dataSource={employeeList} pagination={false} />
      <div style={{ marginTop: 16, textAlign: "right" }}>
        <Button type="primary" onClick={handleSubmit} loading={loading}>
          Submit Attendance
        </Button>
      </div>
    </div>
  );
}
