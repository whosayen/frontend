export namespace Hour {
    export const hoursOfDays = Array.from({length: 24}, (_, index) => `${index.toString().padStart(2, '0')}:00`);

    export const getHourFrom24HourFormat = (time: string): number => {
        return parseInt(time.split(':')[0]);
    }

    export const getMinuteFrom24HourFormat = (time: string): number => {
        return parseInt(time.split(':')[1]);
    }

    export const addHourTo24HourFormat = (time: string, hour: number): string => {
        const currentHour = getHourFrom24HourFormat(time);
        const newHour = (currentHour + hour) % 24;
        return `${newHour.toString().padStart(2, '0')}:${getMinuteFrom24HourFormat(time).toString().padStart(2, '0')}`;
    }

    export const addMinuteTo24HourFormat = (time: string, minute: number): string => {
        const currentMinute = getMinuteFrom24HourFormat(time);
        const newMinute = (currentMinute + minute) % 60;
        const hour = (currentMinute + minute) / 60;
        return `${addHourTo24HourFormat(time, hour)}:${newMinute.toString().padStart(2, '0')}`;
    }
}
