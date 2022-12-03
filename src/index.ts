import { Employee } from "./employees/employees.model";
import { calculateMatchedEmployees, parseEmployeesData } from "./employees/employees.service";
import { promptFilename, readInputFile } from "./utils/prompt";

const index = async () => {
    try {
        const filename:string = await promptFilename();
        const rawInputData:string | undefined = readInputFile(`public/assets/${filename}`);
        
        if(typeof rawInputData === 'string') {
            const employees: Employee[] | undefined = parseEmployeesData(rawInputData);
            
            if(typeof employees != 'undefined') {
                const matchedEmployees = calculateMatchedEmployees(employees);
                
                console.table(matchedEmployees, ["namesOutput", "coincidenceCount"]);    
            }
        }
        
    } catch(error) {
        console.log(error);
        console.log("Finishing app...")
        process.exit();
    }
}

index();
 

