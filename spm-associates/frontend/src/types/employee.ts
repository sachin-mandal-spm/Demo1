export interface Employee {
    id?: number;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    address: string;
    designation: string;
    salaryType: 'DAILY' | 'MONTHLY';
    basicSalary: number;
    dailyWage: number;
    joiningDate: string;
    aadhaarNumber: string;
    panNumber: string;
    bankAccountNumber: string;
    ifscCode: string;
    status: string;
}
