import { readFileSync } from 'fs';
import { join } from 'path';

export const readInputFile = (filename: string):string | undefined => {
    try {
        const result:string = readFileSync(join(__dirname, filename), 'utf-8');
        return result;
    } catch(error) {
        throw new Error("File not found");
    }
};

export const formatData = (rawInputData:string):{
    name:string, 
    workdays:{
        date: string, 
        entryHour: string, 
        departureHour: string
    }[]
}[] | undefined => {
    const employees: {
        name:string, 
        workdays:{
            date: string, 
            entryHour: string, 
            departureHour: string
        }[]
    }[] = [];

    try {
        const rawData:string[] = rawInputData.split('\n');

        rawData.forEach((str) => {
            let employeeName: string = '';
            let employeeRawWorkdays: string = '';
            let employeeWorkdays: {
                date: string, 
                entryHour: string, 
                departureHour: string
            }[] = [];

            if(str.split('=').length == 1) throw "Input is not valid";
            
            employeeName = str.split('=')[0];
            employeeRawWorkdays = str.split('=')[1];
            
            employeeRawWorkdays.split(',').forEach((workday) => {
                const date = workday.substring(0, 2);
                const hours = workday.substring(2);
                const entryHour = hours.split('-')[0];
                const departureHour = hours.split('-')[1];
                
                employeeWorkdays.push({date, entryHour, departureHour});
            });

            employees.push({name: employeeName, workdays: employeeWorkdays});
        })

        return(employees);
    } catch (error) {
        console.error(error);
    }
}
