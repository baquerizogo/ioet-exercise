import { formatData, readInputFile } from "./index.service";

const rawInputData = readInputFile('../public/assets/data.txt');
const FormattedData = formatData(rawInputData);

if(typeof FormattedData != 'undefined') {
    console.log(FormattedData[0]);
}

