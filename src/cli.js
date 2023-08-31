import chalk from "chalk";
import fs from 'fs';
import writeFile from "./index.js";
import listaValidada from "./http-validacao.js";

const caminho = process.argv;

async function showFile () {
    const path = caminho[2];
    const valida = caminho[3] === '--valida';
    console.log(valida);

    try{
        fs.lstatSync(path);
    }catch(error){
        if (error.code === 'ENOENT'){
            console.log(chalk.red('ARQUIVO OU DIRETORIO NÃO EXISTE'));
            return;
        }
    }
    
     if (fs.lstatSync(path).isFile()){
        const resultado = await writeFile(path);
        showList(valida,resultado)
    } 
    else if (fs.lstatSync(path).isDirectory()){
        const arquivos = await fs.promises.readdir(path);
        arquivos.forEach(async (texts) => {
            const lista = await writeFile(`${path}/${texts}`);
            showList(valida, lista, texts);
        })
        
    }
   
}

async function showList (valida,list, nameDirectory= ''){
    if (valida){
        console.log(chalk.blue("LISTA VALIDADA!"),chalk.yellow(`${nameDirectory}`), await listaValidada(list));
    }else{
       console.log(chalk.yellow(`${nameDirectory}`), list);
    }
} 

showFile();