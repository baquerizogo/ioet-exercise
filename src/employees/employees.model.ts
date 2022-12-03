import { Workday } from "../workdays/workday.model";

export interface Employee {
    name: string,
    workdays: Workday[],
}