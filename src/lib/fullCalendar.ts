import { BookingDuration, Lesson, Student } from "./types/dtoTypes";

export const mockLessons: Lesson[] = [
    {id: '1', studentName: 'John Doe', startDate: '2024-06-10T09:00:00', endDate: '2024-06-10T10:00:00'},
    {id: '2', studentName: 'Jane Smith', startDate: '2024-06-11T09:00:00', endDate: '2024-06-11T10:00:00'},
    {id: '3', studentName: 'Michael Brown', startDate: '2024-06-12T09:00:00', endDate: '2024-06-12T10:00:00'},
    {id: '4', studentName: 'Emily White', startDate: '2024-06-13T09:00:00', endDate: '2024-06-13T10:00:00'},
    {id: '5', studentName: 'David Johnson', startDate: '2024-06-14T09:00:00', endDate: '2024-06-14T10:00:00'},
];
export const mockStudents: Student[] = [
    {id: 1, name: 'John Doe'},
    {id: 2, name: 'Jane Smith'},
    {id: 3, name: 'Michael Brown'},
    {id: 4, name: 'Emily White'},
    {id: 5, name: 'David Johnson'},
];

export const durationMap: { [key in BookingDuration]: number } = {
    'THIRTY_MINUTES': 30,
    'FORTY_FIVE_MINUTES': 45,
    'ONE_HOUR': 60,
    'ONE_AND_HALF_HOUR': 90,
};

export const getDurationInMinutes = (duration: BookingDuration): number => {
    return durationMap[duration];
};

export const calculateEndTime = (startTime: string, duration: BookingDuration): string => {
    const startDate = new Date(startTime);
    const endDate = new Date(startDate.getTime() + getDurationInMinutes(duration) * 60000);
    return endDate.toISOString();
};

