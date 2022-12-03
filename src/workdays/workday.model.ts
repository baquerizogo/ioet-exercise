export type Days = 'MO' | 'TU' | 'WE' | 'TH' | 'FR' | 'SA' | 'SU';

export type Workday = {
    day: Days,
    hours: string,
    entryHour: number,
    departureHour: number,
}