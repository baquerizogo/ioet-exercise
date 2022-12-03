import { Employee } from "./employees.model";
import { parseEmployeeWorkdays } from "../workdays/workday.service";

export const parseEmployeesData = (rawInputData:string): Employee[] | undefined => {
    const employees: Employee[] = [];

    try {
        const rawData:string[] = rawInputData.split('\n');

        rawData.forEach((str) => {
            let employeeRawWorkdays: string = '';
            let employee: Employee = { name: '', workdays: []};
                        
            employee.name = str.split('=')[0];
            employeeRawWorkdays = str.split('=')[1];
            employee.workdays = parseEmployeeWorkdays(employeeRawWorkdays)

            employees.push(employee);
        })

        return(employees);
    } catch (error) {
        throw "Wrong data format. Please check your data and try again.";
    }
}
