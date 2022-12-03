import * as readline from "node:readline";
import { stdin, stdout } from "node:process";
import { readFileSync } from 'fs';
import { join } from 'path';

const rl = readline.createInterface({
    input: stdin, 
    output: stdout,
    terminal: false
});

export const promptFilename = async () => {
    return new Promise<string>(( resolve, reject ) => {
        rl.question("Please enter filename [ex:'data.txt']: ", (ans:string) => {
            if(!ans) reject(new Error("Please enter a valid filename."));
            
            rl.close();
            resolve(ans);
        });
    })
}


export const readInputFile = (filename: string):string | undefined => {
    try {
        console.log(__dirname)
        const result:string = readFileSync(filename, 'utf-8');
        return result;
    } catch(error) {
        throw new Error("File not found");
    }
};