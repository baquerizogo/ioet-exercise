import { Days, Workday } from "./workday.model";

export const isDay = (day:string): day is Days => {
    return ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'].indexOf(day) !== -1;
}

export const areHoursValid = (entryHour:number, departureHour:number):boolean => {
    const maxHour: number = 2359;
    const minHour: number = 0;

    const isEntryValid: boolean = entryHour >= minHour && entryHour <= maxHour;
    const isDepartureValid: boolean = departureHour >= minHour && departureHour <= maxHour;
    const isHourSenseValid: boolean = entryHour < departureHour;
    
    if (isEntryValid && isDepartureValid && isHourSenseValid) {
        return true;
    }
    return false;
}

export const parseEmployeeWorkdays = (employeeRawWorkdays: string): Workday[] => {
    let workdays: Workday[] = [];

    employeeRawWorkdays.split(',').forEach((workday) => {
        const day = workday.substring(0, 2);
        const hours = workday.substring(2);
        const entryHour = parseInt(hours.split('-')[0].replace(':', '') , 10);
        const departureHour = parseInt(hours.split('-')[1].replace(':', ''), 10);

        if( isDay(day) && areHoursValid(entryHour, departureHour)) {
            workdays.push({day, hours, entryHour, departureHour});
        } else {
            throw new Error();
        }
    });

    return workdays;
}