import { readFileSync } from 'fs';
import { join } from 'path';

export const readInputFile = (filename: string):string => {
    const result:string = readFileSync(join(__dirname, filename), 'utf-8');    
    return result;
};

export const formatData = (rawInputData:string) => {
    try {
        const rawData:string[] = rawInputData.split('\n');

        if(rawData.length == 0) throw "Input format is not valid."

        rawData.forEach((e) => {
            console.log(e);
        })
    } catch (error) {
        console.error(error);
    }
}
