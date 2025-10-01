'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { AttendanceStatus } from './types';

export type FormState = {
  message: string;
  errors?: Record<string, string[] | undefined> | undefined;
};

const attendanceSchema = z.record(z.enum(['present', 'absent', 'leave']));

export async function submitAttendance(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const formEntries = Object.fromEntries(formData.entries());
  
  const parsed = attendanceSchema.safeParse(formEntries);

  if (!parsed.success) {
    return {
      message: 'Failed to submit attendance. Invalid data.',
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const attendanceData = parsed.data;

  console.log('Attendance Submitted:', attendanceData);
  // In a real application, you would save this data to a database.
  // For example:
  // const date = new Date().toISOString().split('T')[0];
  // for (const [employeeId, status] of Object.entries(attendanceData)) {
  //   await db.attendance.create({ data: { employeeId, date, status } });
  // }

  // Revalidate the dashboard path to show updated data if it were real
  revalidatePath('/dashboard');

  return { message: 'Attendance recorded successfully.' };
}
