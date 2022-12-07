import * as readline from "node:readline";
import { stdin, stdout } from "node:process";
import { readFileSync } from 'fs';

const rl = readline.createInterface({
    input: stdin, 
    output: stdout,
    terminal: false
});

export const promptFilename = async (): Promise<string> => {
    return new Promise<string>(( resolve, reject ) => {
        rl.question("Please enter filename [ex:'data.txt']: ", (ans:string) => {
            if(!ans) reject("Please enter a valid filename and try again.");
            
            rl.close();
            resolve(ans);
        });
    })
}

export const readInputFile = (filename: string):string | undefined => {
    try {
        const result:string = readFileSync(filename, 'utf-8');
        return result;
    } catch(error) {
        throw "File not found. Please check the filename and try again.";
    }
};