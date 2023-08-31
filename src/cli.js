import chalk from "chalk";
import fs from 'fs';
import writeFile from "./index.js";

const caminho = process.argv;

async function showFile () {
    const path = caminho[2];
    
    if (fs.lstatSync(path).isFile()){
        const resultado = await writeFile(path);
     
    } 
    else if (fs.lstatSync(path).isDirectory()){
        const arquivos = await fs.promises.readdir(path);
        arquivos.forEach(async (texts) => {
            const lista = await writeFile(`${path}/${texts}`);
            showList(lista);
        })
        
    }
   
}

function showList (list){
    console.log(chalk.yellow('Lista de links: '), list);
} 

showFile();