import { Employee, Pair } from "./employees.model";
import { parseEmployeeWorkdays } from "../workdays/workday.service";

export const parseEmployeesData = (rawInputData: string): Employee[] | undefined => {
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

export const calculateMatchedEmployees = (employees: Employee[]):Pair[] => {
    const pairs: Pair[] = [];

    employees.forEach((employee) => {
        employees.forEach((auxEmployee) => {
            let coincidenceCount: number = 0;
            let flag: boolean = false;
            let pairAlreadyExists: boolean = false;

            if(employee.name == auxEmployee.name) return; 

            employee.workdays.forEach((workday) => {
                const { entryHour, departureHour, day } = workday;

                auxEmployee.workdays.forEach((auxWorkday) => {
                    const { entryHour: auxEntryHour, departureHour: auxDepartureHour, day: auxDay } = auxWorkday;

                    const case1: boolean = entryHour >= auxEntryHour && entryHour < auxDepartureHour;
                    const case2: boolean = departureHour > auxEntryHour && departureHour <= auxDepartureHour;
                    const case3: boolean = entryHour <= auxEntryHour && departureHour >= auxDepartureHour;
                    const dayCoincidence: boolean = day === auxDay;
                    
                    if((case1 || case2 || case3) && dayCoincidence ) {
                        flag = true;
                        coincidenceCount = coincidenceCount + 1;
                    }
                
                })
            })

            pairs.forEach((pair) => {
                const includeEmployee = pair.names.includes(employee.name);
                const includeAuxEmployee = pair.names.includes(auxEmployee.name);
                
                if( includeEmployee && includeAuxEmployee ) pairAlreadyExists = true;
            })

            if(flag && !pairAlreadyExists) {
                pairs.push({
                    names: [employee.name, auxEmployee.name],
                    namesOutput: `${employee.name}-${auxEmployee.name}`,
                    coincidenceCount: coincidenceCount
                })
            }
        })
    });

    return pairs;
}
