import { rm, mkdir, cp, readFile, writeFile } from 'node:fs/promises';
await rm('dist', { recursive: true, force: true });
await mkdir('dist', { recursive: true });
for (const file of ['styles.css','assets','data','_headers']) {
  await cp(file, `dist/${file}`, { recursive: true });
}
// Os módulos-fonte continuam separados. O pacote entregue usa um script
// clássico para também funcionar com file://, sem servidor ou requisições.
const files = ['data/content.js','data/questionnaire.js','data/tax.js','data/itcmd.js','data/tax-engine.js','data/simulator-ui.js','app.js'];
const chunks = [];
for (const file of files) {
  const code = (await readFile(file, 'utf8'))
    .replace(/^import .* from ['"].*['"];\r?\n/gm, '')
    .replace(/^export /gm, '');
  if (/^\s*(import|export)\s/m.test(code)) throw new Error(`Declaração de módulo não processada em ${file}`);
  chunks.push(`// ${file}\n${code}`);
}
await writeFile('dist/app.bundle.js', `(()=>{\n'use strict';\n${chunks.join('\n')}\n})();\n`);
const html = (await readFile('index.html', 'utf8'))
  .replace('<script type="module" src="app.js"></script>', '<script defer src="app.bundle.js"></script>');
if (!html.includes('src="app.bundle.js"')) throw new Error('Entrada do script não encontrada');
await writeFile('dist/index.html', html);
console.log('Site estático gerado em dist/; index.html também funciona sem servidor.');
