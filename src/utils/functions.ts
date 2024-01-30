import { DefaultProps } from '../types/inputs'

export function jaroWinklerSimilarity(str1: string, str2: string) {
    const jaroSimilarity = jaroSimilarityCoefficient(str1, str2);

    // Constantes para ajuste no índice de Jaro-Winkler
    const prefixScale = 0.1; // Escala do comprimento do prefixo (ajuste empírico)
    const maxCommonPrefixLength = 4; // Máximo comprimento do prefixo considerado

    // Calcula o comprimento do prefixo comum
    let commonPrefixLength = 0;
    for (let i = 0; i < Math.min(maxCommonPrefixLength, Math.min(str1.length, str2.length)); i++) {
        if (str1[i] === str2[i]) {
            commonPrefixLength++;
        } else {
            break;
        }
    }

    // Aplica o ajuste do índice de Jaro-Winkler
    const jaroWinklerSimilarity = jaroSimilarity + (prefixScale * commonPrefixLength * (1 - jaroSimilarity));

    return jaroWinklerSimilarity;
}

// Função auxiliar para calcular o coeficiente de similaridade de Jaro
function jaroSimilarityCoefficient(str1: string, str2: string) {
    const matchWindow = Math.floor(Math.max(str1.length, str2.length) / 2) - 1;
    const matches1 = getCharacterMatches(str1, str2, matchWindow);
    const matches2 = getCharacterMatches(str2, str1, matchWindow);

    if (matches1.length === 0 || matches2.length === 0) {
        return 0;
    }

    const transpositions = countTranspositions(matches1, matches2) / 2;

    const jaroSimilarity = (
        (matches1.length / str1.length) +
        (matches2.length / str2.length) +
        ((matches1.length - transpositions) / matches1.length)
    ) / 3;

    return jaroSimilarity;
}

// Função auxiliar para encontrar caracteres correspondentes em uma janela
function getCharacterMatches(str1: string, str2: string, matchWindow: number): number[] {
    const matches: number[] = [];

    for (let i = 0; i < str1.length; i++) {
        const start = Math.max(0, i - matchWindow);
        const end = Math.min(i + matchWindow + 1, str2.length);

        for (let j = start; j < end; j++) {
            if (str1[i] === str2[j] && !matches.includes(j)) {
                matches.push(j);
                break;
            }
        }
    }

    return matches;
}

// Função auxiliar para contar transposições entre caracteres correspondentes
function countTranspositions(matches1: number[], matches2: number[]) {
    let transpositions = 0;

    for (let i = 0; i < matches1.length; i++) {
        if (matches1[i] !== matches2[i]) {
            transpositions++;
        }
    }

    return transpositions;
}


// Função pra filtrar as propriedades padrão
export function filterProperties(props: DefaultProps & { [x: string]: any }, overwrite: { [x: string]: any } = {}) {
    const filterProps = [ 'label', 'aftericon', 'beforeicon', 'validation', 'help' ]

    return Object.keys(props).map(prop => (filterProps.indexOf(prop)!==-1) || (Object.keys(overwrite).indexOf(prop)!==-1))
}
