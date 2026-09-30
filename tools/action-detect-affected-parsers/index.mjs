import { appendFileSync, existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';

const input = name => (process.env[`INPUT_${name.toUpperCase()}`] ?? '').trim();

const baseSha = input('base-sha');
const stylePackage = input('style-package') || 'packages/geostyler-style-monorepo-test';
const packagesDir = input('packages-dir') || 'packages';

if (!baseSha) {
  console.log('::error::Input "base-sha" is required.');
  process.exit(1);
}

// every package except geostyler-style is a parser
const allParsers = readdirSync(packagesDir, { withFileTypes: true })
  .filter(entry => entry.isDirectory())
  .map(entry => `${packagesDir}/${entry.name}`)
  .filter(dir => dir !== stylePackage && existsSync(join(dir, 'package.json')));

const changedFiles = execFileSync('git', ['diff', '--name-only', `${baseSha}...HEAD`], { encoding: 'utf8' })
  .split('\n')
  .filter(Boolean);

const isGlobalChange = changedFiles.some(file =>
  file.startsWith(`${stylePackage}/`) ||
  (!file.startsWith(`${packagesDir}/`) && !/^[^/]+\.md$/.test(file))
);

const parsers = isGlobalChange
  ? allParsers
  : allParsers.filter(dir => changedFiles.some(file => file.startsWith(`${dir}/`)));

const json = JSON.stringify(parsers);
console.log(`Affected parsers: ${json}`);
appendFileSync(process.env.GITHUB_OUTPUT, `parsers=${json}\n`);
