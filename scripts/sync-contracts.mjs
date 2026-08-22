import { access, copyFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const target = resolve(root, 'public/contracts');
const source = process.env.SAFEFUN_CONTRACTS_DIR
  ? resolve(process.env.SAFEFUN_CONTRACTS_DIR)
  : resolve(root, '../Backend/docs/generated');
await mkdir(target, { recursive: true });
for (const name of ['openapi.json', 'asyncapi.json']) {
  const sourceFile = resolve(source, name);
  const targetFile = resolve(target, name);
  try {
    await access(sourceFile);
    await copyFile(sourceFile, targetFile);
  } catch {
    await access(targetFile);
    console.log(`Using committed ${name}; set SAFEFUN_CONTRACTS_DIR to refresh it.`);
  }
}
