import chalk from "chalk";
import fs from 'fs';


// /\[[^[\]]*?\]/gm
// \(https?:\/\/[^\s?#.].[^\s]*\)
/// \[[^[\]]*?\]\(https?:\/\/[^\s?#.].[^\s]*\)

//const fileText = await takeFile('./arquivos/texto.md');
//console.log(fileText);


function trataErro (erro){
    throw new Error (chalk.red(erro.code, 'Não há arquivo no diretorio'))
}

function extractLinks (text){
    const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
    const captures = [...text.matchAll(regex)];
    const link = captures.map( (capture) => ({[capture[1]] : capture[2]}));
    //console.log(link);
    return link;
}

// Async / Await
async function writeFile (pathFile) {
    try{
        const encoding = "utf-8";
        const texto = await fs.promises.readFile(pathFile, encoding)
        console.log(extractLinks(texto));
    }catch (erro){
        trataErro(erro);
    }finally{
        console.log(chalk.yellow("TODOS OS ARQUIVOS FORAM LIDOS"));
    }
}

/**
 * fakeFile: STRING -> path of the file that you want to take
 * Returns: the text of the file in STRING
 */
async function takeFile (pathFile){
    try{
        const encoding = "utf-8";
        const text = await fs.promises.readFile(pathFile, encoding)
        console.log(chalk.green("ARQUIVO PEGO COM SUCESSO"));
        return text;
    } catch (erro){
        console.log(chalk.red(erro));
    }finally{
        console.log(chalk.yellow("OPERAÇÃO DE PEGAR ARQUIVO CONCLUÍDA"));
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

writeFile('./arquivos/texto.md');