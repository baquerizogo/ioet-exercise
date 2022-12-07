import { Employee, Pair } from "./employees.model";
import { parseEmployeeWorkdays } from "../workdays/workday.service";

export const parseEmployeesData = (rawInputData: string): Employee[] | undefined => {
    const employees: Employee[] = [];

    try {
        const rawData: string[] = rawInputData.split('\n');

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

export const calculateMatchedEmployees = (employees: Employee[]): Pair[] => {
    const pairs: Pair[] = [];

    employees.forEach((employee) => {
        employees.forEach((auxEmployee) => {
            if(employee.name === auxEmployee.name) return;

            const coincidenceCount: number = checkCoincidences(employee, auxEmployee);
            const pairAlreadyExists: boolean = checkIfPairAlreadyExists(pairs, employee.name, auxEmployee.name);

            if(coincidenceCount > 0 && !pairAlreadyExists) {
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

export const checkCoincidences = (employee: Employee, auxEmployee: Employee): number => {
    let coincidenceCount: number = 0;

    employee.workdays.forEach((workday) => {
        const { entryHour, departureHour, day } = workday;

        auxEmployee.workdays.forEach((auxWorkday) => {
            const { entryHour: auxEntryHour, departureHour: auxDepartureHour, day: auxDay } = auxWorkday;

            const case1: boolean = entryHour >= auxEntryHour && entryHour < auxDepartureHour;
            const case2: boolean = departureHour > auxEntryHour && departureHour <= auxDepartureHour;
            const case3: boolean = entryHour <= auxEntryHour && departureHour >= auxDepartureHour;
            const dayCoincidence: boolean = day === auxDay;
            
            if((case1 || case2 || case3) && dayCoincidence ) {
                coincidenceCount = coincidenceCount + 1;
            }
        
        });
    });

    return coincidenceCount;
}

export const checkIfPairAlreadyExists = (pairs: Pair[], employeeName1: string, employeeName2: string): boolean => {
    let pairAlreadyExists: boolean = false;

    pairs.forEach((pair) => {
        const includeEmployee = pair.names.includes(employeeName1);
        const includeAuxEmployee = pair.names.includes(employeeName2);
        
        if( includeEmployee && includeAuxEmployee ) pairAlreadyExists = true;
    });

    return pairAlreadyExists;
}
