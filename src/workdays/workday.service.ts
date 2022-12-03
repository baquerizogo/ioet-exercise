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
        const timeRegex: RegExp = new RegExp('^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$')
        const day: string = workday.substring(0, 2);
        const hours: string = workday.substring(2);

        const rawEntryHour = hours.split('-')[0];
        const rawDepartureHour = hours.split('-')[1];
        const entryHour = parseInt(rawEntryHour.replace(':', '') , 10);
        const departureHour = parseInt(rawDepartureHour.replace(':', ''), 10);

        if( 
            isDay(day) && 
            areHoursValid(entryHour, departureHour) && 
            timeRegex.test(rawEntryHour) && 
            timeRegex.test(rawDepartureHour)
        ) {
            workdays.push({day, hours, entryHour, departureHour});
        } else {
            throw new Error();
        }
    });

    return workdays;
}