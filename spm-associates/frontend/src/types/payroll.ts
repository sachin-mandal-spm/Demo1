import { Employee } from './employee';

export interface Salary {
    id: number;
    employee: Employee;
    month: number;
    year: number;
    totalDaysWorked: number;
    basicAmount: number;
    daAmount: number;
    hraAmount: number;
    overtimeAmount: number;
    bonusAmount: number;
    deductions: number;
    netSalary: number;
    paymentStatus: string;
}
