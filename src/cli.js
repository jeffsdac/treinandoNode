import chalk from "chalk";

import writeFile from "./index.js";

const caminho = process.argv;

async function showFile () {
    const texto = await writeFile(caminho[2]);

    console.log(chalk.blueBright("O TEXTO PEGO FOI: "), texto);
}

showFile();