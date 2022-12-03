import { readFileSync } from 'fs';
import { join } from 'path';

export const readInputFile = (filename: string):string | undefined => {
    try {
        const result:string = readFileSync(join(__dirname, filename), 'utf-8');
        return result;
    } catch(error) {
        throw new Error("File not found");
    }
};