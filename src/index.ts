import { formatData, readInputFile } from "./index.service";

const rawInputData = readInputFile('../public/assets/data.txt');
formatData(rawInputData);

