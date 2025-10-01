import { Employee, AttendanceRecord, AttendanceStatus } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { subDays, format } from 'date-fns';

const avatars = PlaceHolderImages.filter(img => img.id.startsWith('avatar-'));

export const employees: Employee[] = [
  { id: '1', name: 'Alisha Vance', email: 'alisha.vance@example.com', avatar: avatars[0].imageUrl },
  { id: '2', name: 'Brodie Bowman', email: 'brodie.bowman@example.com', avatar: avatars[1].imageUrl },
  { id: '3', name: 'Charlize Rollins', email: 'charlize.rollins@example.com', avatar: avatars[2].imageUrl },
  { id: '4', name: 'Dane Hoover', email: 'dane.hoover@example.com', avatar: avatars[3].imageUrl },
  { id: '5', name: 'Eleni Mahoney', email: 'eleni.mahoney@example.com', avatar: avatars[4].imageUrl },
  { id: '6', name: 'Finnian Vickers', email: 'finnian.vickers@example.com', avatar: avatars[5].imageUrl },
  { id: '7', name: 'Gracie-Mae Milne', email: 'gracie.mae.milne@example.com', avatar: avatars[6].imageUrl },
  { id: '8', name: 'Harris Archer', email: 'harris.archer@example.com', avatar: avatars[7].imageUrl },
  { id: '9', name: 'Isla-Grace Hanna', email: 'isla.grace.hanna@example.com', avatar: avatars[8].imageUrl },
  { id: '10', name: 'Jaxon Gibbs', email: 'jaxon.gibbs@example.com', avatar: avatars[9].imageUrl },
];

const statuses: AttendanceStatus[] = ['present', 'absent', 'leave'];

// Generate attendance data for the last 60 days
export const attendanceRecords: AttendanceRecord[] = [];
const today = new Date();

employees.forEach(employee => {
  for (let i = 0; i < 60; i++) {
    const date = subDays(today, i);
    // Skew towards 'present'
    const randomStatus = statuses[Math.floor(Math.random() * 10) > 7 ? (Math.random() > 0.5 ? 1 : 2) : 0];
    
    // Don't generate for weekends
    if (date.getDay() !== 0 && date.getDay() !== 6) {
      attendanceRecords.push({
        employeeId: employee.id,
        date: format(date, 'yyyy-MM-dd'),
        status: randomStatus,
      });
    }
  }
});
