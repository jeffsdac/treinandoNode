import chalk from "chalk";
import fs from 'fs';

function trataErro (erro){
    throw new Error (chalk.red(erro.code, 'Não há arquivo no diretorio'))
}

// Async / Await
async function takeFile (pathFile) {
    try{
        const encoding = "utf-8";
        const texto = await fs.promises.readFile(pathFile, encoding)
        console.log(chalk.green(texto));
    }catch (erro){
        trataErro(erro);
    }finally{
        console.log(chalk.yellow("TODOS OS ARQUIVOS FORAM LIDOS"));
    }
}


// THEN

/**function takeFile (path) {
    const encoding = 'utf-8';
    fs.readFile(path, encoding, (erro, texto) => {
        if(erro){
            trataErro(erro);
        }
        console.log(chalk.green(texto))
    })
}**/

/**function takeFile(path){
    const encoding = "utf-8";
    fs.promises.readFile(path, encoding)
     .then((texto) => console.log(chalk.green(texto)))
     .catch(trataErro);
}**/

takeFile('./arquivos/texto.md');