import { formatData, readInputFile } from "./index.service";
import { promptFilename } from "./utils/prompt";

const index = async () => {
    try {
        const filename:string = await promptFilename();
        const rawInputData:string | undefined = readInputFile(`../public/assets/${filename}`);
        
        if(typeof rawInputData === 'string') {
            const FormattedData = formatData(rawInputData);
            
            if(typeof FormattedData != 'undefined') {
                console.log(FormattedData[0]);
            }
        }
        
    } catch(error) {
        console.error(error);
        console.log("Finishing app...")
        process.exit();
    }
}

index();
 

