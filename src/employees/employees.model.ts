export type Days = 'MO' | 'TU' | 'WE' | 'TH' | 'FR' | 'SA' | 'SU';

export interface Employee {
    name: string,
    workdays:{
        day: Days, 
        entryHour: string, 
        departureHour: string
    }[]
}