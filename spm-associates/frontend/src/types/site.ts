export interface Site {
    id?: number;
    name: string;
    location: string;
    clientName: string;
    budget: number;
    status: 'ACTIVE' | 'COMPLETED' | 'ON_HOLD';
    startDate: string;
    endDate?: string;
}
