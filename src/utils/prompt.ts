import * as readline from "node:readline";
import { stdin, stdout } from "node:process";

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