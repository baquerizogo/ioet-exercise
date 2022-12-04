import { Employee, Pair } from "./employees.model";
import { calculateMatchedEmployees, checkCoincidences, checkIfPairAlreadyExists, parseEmployeesData } from "./employees.service";

test('Throw error if raw data is empty', () => {
    expect(() => parseEmployeesData('')).toThrow("Wrong data format. Please check your data and try again.");
});

test('Throw error if raw data is invalid', () => {
    const str = "RENEMO10:00-12:00,dedede"
    
    expect(() => parseEmployeesData(str)).toThrow("Wrong data format. Please check your data and try again.");
});

test('Return an empty array if there are no paired employees', () => {
    const employees: Employee[] = [
        {
            name: 'JOSE',
            workdays: [
                {
                    day: 'TU',
                    hours: '16:00-18:00',
                    entryHour: 1600,
                    departureHour: 1800 
                }
            ]
        },
        {
            name: 'RENE',
            workdays: [
                {
                    day: 'MO',
                    hours: '16:00-18:00',
                    entryHour: 1600,
                    departureHour: 1800 
                }
            ]
        },
        {
            name: 'ASTRID',
            workdays: [
                {
                    day: 'WE',
                    hours: '16:00-18:00',
                    entryHour: 1600,
                    departureHour: 1800 
                }
            ]
        }
    ]

    const pairedEmployees: Pair[] = calculateMatchedEmployees(employees);
    expect(pairedEmployees.length).toBe(0);
})

test('Return 0 if there are no coincidences between two employees', () => {
    const employee: Employee = {
        name: 'JOSE',
        workdays: [
            {
                day: 'TU',
                hours: '16:00-18:00',
                entryHour: 1600,
                departureHour: 1800 
            }
        ]
    }

    const auxEmployee: Employee = {
        name: 'ASTRID',
        workdays: [
            {
                day: 'MO',
                hours: '16:00-18:00',
                entryHour: 1600,
                departureHour: 1800 
            }
        ]
    }

    const coincidences = checkCoincidences(employee, auxEmployee);

    expect(coincidences).toBe(0);
});

test('Return 1 or more if there are coincidences between two employees', () => {
    const employee: Employee = {
        name: 'JOSE',
        workdays: [
            {
                day: 'MO',
                hours: '16:00-18:00',
                entryHour: 1600,
                departureHour: 1800 
            },
            {
                day: 'TU',
                hours: '16:00-18:00',
                entryHour: 1600,
                departureHour: 1800 
            }
        ]
    }

    const auxEmployee: Employee = {
        name: 'ASTRID',
        workdays: [
            {
                day: 'MO',
                hours: '16:00-18:00',
                entryHour: 1600,
                departureHour: 1800 
            },
            {
                day: 'TU',
                hours: '16:00-18:00',
                entryHour: 1600,
                departureHour: 1800 
            },
            {
                day: 'WE',
                hours: '16:00-18:00',
                entryHour: 1600,
                departureHour: 1800 
            }
        ]
    }

    const coincidences = checkCoincidences(employee, auxEmployee);

    expect(coincidences).toBe(2);
});

test('Return true if the pair of employees already exists in the Pairs array', () => {
    const pairs: Pair[] = [
        {
            names: ['JOSE', 'ASTRID'],
            namesOutput: 'JOSE-ASTRID',
            coincidenceCount: 2,
        }
    ];

    const exists: boolean = checkIfPairAlreadyExists(pairs, 'JOSE', 'ASTRID');
    expect(exists).toBeTruthy();
})

test('Return false if the pair of employees is new', () => {
    const pairs: Pair[] = [
        {
            names: ['JOSE', 'ASTRID'],
            namesOutput: 'JOSE-ASTRID',
            coincidenceCount: 2,
        }
    ];

    const exists: boolean = checkIfPairAlreadyExists(pairs, 'JOSE', 'DANIEL');
    expect(exists).toBeFalsy();
})