import { Employee, Pair } from "./employees/employees.model";
import { calculateMatchedEmployees, parseEmployeesData } from "./employees/employees.service";
import { promptFilename, readInputFile } from "./utils/prompt";

const index = async () => {
    try {
        const filename:string = await promptFilename();
        const rawInputData:string | undefined = readInputFile(`public/assets/${filename}`);
        
        if(typeof rawInputData === 'string') {
            const employees: Employee[] | undefined = parseEmployeesData(rawInputData);
            
            if(typeof employees != 'undefined') {
                const matchedEmployees: Pair[] = calculateMatchedEmployees(employees);
                
                if(matchedEmployees.length == 0) {
                    console.log('No employee coincided in the office this time.');
                    return;
                }

                console.table(matchedEmployees, ["namesOutput", "coincidenceCount"]);    
                return;
            }
        }
    } catch(error) {
        console.log(error);
        console.log("Finishing app...")
        process.exit();
    }
}

index();
 

