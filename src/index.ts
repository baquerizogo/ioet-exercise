import { Employee } from "./employees/employees.model";
import { parseEmployeesData } from "./employees/employees.service";
import { promptFilename, readInputFile } from "./utils/prompt";

const index = async () => {
    try {
        const filename:string = await promptFilename();
        const rawInputData:string | undefined = readInputFile(`public/assets/${filename}`);
        
        if(typeof rawInputData === 'string') {
            const employees: Employee[] | undefined = parseEmployeesData(rawInputData);
            const matchedEmployees = '';
            if(typeof employees != 'undefined') {
                console.log(employees[0]);
            }
        }
        
    } catch(error) {
        console.log(error);
        console.log("Finishing app...")
        process.exit();
    }
}

index();
 

