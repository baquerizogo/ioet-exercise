import { Workday } from "../workdays/workday.model";

export interface Employee {
    name: string,
    workdays: Workday[],
}

export interface Pair {
    names: string[],
    namesOutput: string,
    coincidenceCount: number,
}