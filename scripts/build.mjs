import { rm, mkdir, cp } from 'node:fs/promises';
await rm('dist', { recursive: true, force: true });
await mkdir('dist', { recursive: true });
for (const file of ['index.html','styles.css','app.js','assets','data','_headers']) {
  await cp(file, `dist/${file}`, { recursive: true });
}
console.log('Site estático gerado em dist/');
