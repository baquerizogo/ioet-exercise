import { Days, Employee } from "./employees.model";

export const isDay = (day:string): day is Days => {
    return ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'].indexOf(day) !== -1;
}

export const formatData = (rawInputData:string): Employee[] | undefined => {
    const employees: Employee[] = [];

    try {
        const rawData:string[] = rawInputData.split('\n');

        rawData.forEach((str) => {
            let employeeName: string = '';
            let employeeRawWorkdays: string = '';
            let employeeWorkdays: {
                day: Days, 
                entryHour: string, 
                departureHour: string
            }[] = [];

            if(str.split('=').length == 1) throw "Input is not valid";
            
            employeeName = str.split('=')[0];
            employeeRawWorkdays = str.split('=')[1];
            
            employeeRawWorkdays.split(',').forEach((workday) => {
                const day = workday.substring(0, 2);
                const hours = workday.substring(2);
                const entryHour = hours.split('-')[0];
                const departureHour = hours.split('-')[1];

                if(isDay(day)) {
                    console.log(isDay(day));
                    employeeWorkdays.push({day, entryHour, departureHour});
                } else {
                    throw new Error('Days structure is not valid');
                }
            });
            
            employees.push({name: employeeName, workdays: employeeWorkdays});
        })

        return(employees);
    } catch (error) {
        console.error(error);
    }
}
