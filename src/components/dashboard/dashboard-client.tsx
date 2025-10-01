'use client';

import type { Employee, AttendanceRecord } from '@/lib/types';
import { useState, useMemo } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartConfig,
} from '@/components/ui/chart';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid } from 'recharts';
import { getMonth, getYear, format, parse, startOfMonth } from 'date-fns';
import { Presentation, UserCheck, UserX } from 'lucide-react';

type DashboardClientProps = {
  employees: Employee[];
  records: AttendanceRecord[];
};

const chartConfig = {
  present: {
    label: 'Present',
    color: 'hsl(var(--chart-2))',
    icon: UserCheck,
  },
  absent: {
    label: 'Absent',
    color: 'hsl(var(--chart-1))',
    icon: UserX,
  },
  leave: {
    label: 'On Leave',
    color: 'hsl(var(--chart-4))',
    icon: Presentation,
  },
} satisfies ChartConfig;

export default function DashboardClient({
  employees,
  records,
}: DashboardClientProps) {
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(employees[0].id);
  
  const availableMonths = useMemo(() => {
    const months = new Set<string>();
    records.forEach(record => {
      months.add(format(startOfMonth(parse(record.date, 'yyyy-MM-dd', new Date())), 'yyyy-MM'));
    });
    return Array.from(months).sort().reverse();
  }, [records]);

  const [selectedMonth, setSelectedMonth] = useState(availableMonths[0] || '');

  const filteredData = useMemo(() => {
    if (!selectedEmployeeId || !selectedMonth) return [];

    const monthDate = parse(selectedMonth, 'yyyy-MM', new Date());
    const targetMonth = getMonth(monthDate);
    const targetYear = getYear(monthDate);

    return records
      .filter(record => {
        const recordDate = parse(record.date, 'yyyy-MM-dd', new Date());
        return record.employeeId === selectedEmployeeId &&
               getMonth(recordDate) === targetMonth &&
               getYear(recordDate) === targetYear;
      })
      .map(record => ({
        date: format(parse(record.date, 'yyyy-MM-dd', new Date()), 'MMM d'),
        ...record
      }))
      .sort((a, b) => a.date.localeCompare(b.date));
  }, [selectedEmployeeId, selectedMonth, records]);

  const summary = useMemo(() => {
    return filteredData.reduce(
      (acc, record) => {
        if (record.status === 'present') acc.present++;
        if (record.status === 'absent') acc.absent++;
        if (record.status === 'leave') acc.leave++;
        return acc;
      },
      { present: 0, absent: 0, leave: 0 }
    );
  }, [filteredData]);

  const chartData = useMemo(() => {
    return [
      { status: 'Present', count: summary.present, fill: 'var(--color-present)' },
      { status: 'Absent', count: summary.absent, fill: 'var(--color-absent)' },
      { status: 'On Leave', count: summary.leave, fill: 'var(--color-leave)' },
    ];
  }, [summary]);


  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle>Monthly Summary</CardTitle>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Select
              value={selectedEmployeeId}
              onValueChange={setSelectedEmployeeId}
            >
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Select Employee" />
              </SelectTrigger>
              <SelectContent>
                {employees.map((employee) => (
                  <SelectItem key={employee.id} value={employee.id}>
                    {employee.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Select Month" />
              </SelectTrigger>
              <SelectContent>
                {availableMonths.map((month) => (
                  <SelectItem key={month} value={month}>
                    {format(parse(month, 'yyyy-MM', new Date()), 'MMMM yyyy')}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Present
                </CardTitle>
                <UserCheck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{summary.present}</div>
                <p className="text-xs text-muted-foreground">days</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Absent
                </CardTitle>
                <UserX className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{summary.absent}</div>
                <p className="text-xs text-muted-foreground">days</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Leave
                </CardTitle>
                <Presentation className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{summary.leave}</div>
                <p className="text-xs text-muted-foreground">days</p>
              </CardContent>
            </Card>
          </div>
          <div className="mt-6">
            <h3 className="mb-4 text-lg font-semibold">Attendance Breakdown</h3>
             <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
              <BarChart accessibilityLayer data={chartData} layout="vertical">
                <CartesianGrid horizontal={false} />
                <YAxis
                  dataKey="status"
                  type="category"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={10}
                  className="text-sm"
                />
                <XAxis dataKey="count" type="number" hide />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="line" />}
                />
                 <ChartLegend content={<ChartLegendContent />} />
                <Bar dataKey="count" radius={5}>
                </Bar>
              </BarChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
