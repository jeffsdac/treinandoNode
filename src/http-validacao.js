import chalk from "chalk";

function extractLinks (arrLinks){
    return arrLinks.map((objetoLink) =>Object.values(objetoLink).join());

}

export default async function listaValidada(listaDeLinks) {
    const links =  extractLinks(listaDeLinks);
    const status = await checaStatus(links);
    return listaDeLinks.map((objeto, i) => ({
        ...objeto,
        status:status[i]
    }));
}

function manejaErros (erro){
    if (erro.cause.code === 'ENOTFOUND'){
        return 'LINK NÃO ENCONTRADO';
    }else{
        return 'OCORREU ALGUM ERRO';
    }
}

async function checaStatus (listUrl) {
    const arrStatus = await Promise
    .all(
            listUrl.map(async(url) => {
                try{
                const response = await fetch(url, {method: 'HEAD'})
                return  response.status;
                } catch(erro){
                    return manejaErros(erro);
                }
            })
        )
    return arrStatus;
}