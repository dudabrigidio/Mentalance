// Script para atualizar informações do Git
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

try {
    // Obter informações do Git
    const hash = execSync('git rev-parse --short HEAD', { encoding: 'utf-8' }).trim();
    const hashFull = execSync('git rev-parse HEAD', { encoding: 'utf-8' }).trim();
    const branch = execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf-8' }).trim();
    const date = execSync('git log -1 --format=%cd --date=short', { encoding: 'utf-8' }).trim();

    // Conteúdo do arquivo
    const content = `
    export const gitInfo = {
    commitHash: '${hash}',
    commitHashFull: '${hashFull}',
    branch: '${branch}',
    lastCommitDate: '${date}'
    };
    `;

    // Caminho do arquivo
    const filePath = path.join(__dirname, '..', 'utils', 'gitInfo.ts');
    
    // Escrever arquivo
    fs.writeFileSync(filePath, content);
} catch (error) {
    console.error('Erro ao atualizar git info:', error.message);
}
