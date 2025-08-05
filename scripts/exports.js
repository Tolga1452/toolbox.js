import { readdirSync, writeFileSync } from 'fs';
import path from 'path';

const classesDir = path.join(process.cwd(), './src/classes');
const classesIndexPath = path.join(classesDir, 'index.ts');

const functionsDir = path.join(process.cwd(), './src/functions');
const functionsIndexPath = path.join(functionsDir, 'index.ts');

const typesDir = path.join(process.cwd(), './src/types');
const typesIndexPath = path.join(typesDir, 'index.ts');

const filter = (file) => file.endsWith('.ts') && file !== 'index.ts';

const classes = readdirSync(classesDir).filter(filter);
const functions = readdirSync(functionsDir).filter(filter);
const types = readdirSync(typesDir).filter(filter);

writeFileSync(classesIndexPath, classes.map(file => `export * from './${file.replace('.ts', '.js')}';`).join('\n'));
writeFileSync(functionsIndexPath, functions.map(file => `export * from './${file.replace('.ts', '.js')}';`).join('\n'));
writeFileSync(typesIndexPath, types.map(file => `export * from './${file.replace('.ts', '.js')}';`).join('\n'));

console.log('Exports generated successfully:');
console.log(`- Classes: ${classes.length}`);
console.log(`- Functions: ${functions.length}`);
console.log(`- Types: ${types.length}`);
