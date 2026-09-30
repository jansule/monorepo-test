import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';

const input = name => (process.env[`INPUT_${name.toUpperCase()}`] ?? '').trim();
const git = (...args) => execFileSync('git', args, { encoding: 'utf8' }).split('\n').filter(Boolean);
// commit messages are user input and must not be interpreted as workflow commands
const escape = text => text.replace(/%/g, '%25').replace(/\r/g, '%0D').replace(/\n/g, '%0A');

const baseSha = input('base-sha');
const headSha = input('head-sha');
const packagesDir = input('packages-dir') || 'packages';

if (!baseSha || !headSha) {
  console.log('::error::Inputs "base-sha" and "head-sha" are required.');
  process.exit(1);
}

const packageNames = new Map(
  readdirSync(packagesDir, { withFileTypes: true })
    .filter(entry => entry.isDirectory())
    .map(entry => `${packagesDir}/${entry.name}`)
    .filter(dir => existsSync(join(dir, 'package.json')))
    .map(dir => [dir, JSON.parse(readFileSync(join(dir, 'package.json'), 'utf8')).name])
);

let failed = false;

for (const sha of git('rev-list', '--no-merges', `${baseSha}..${headSha}`)) {
  const [header = ''] = git('log', '-1', '--format=%s', sha);
  const match = /^[\w-]+(?:\(([^)]*)\))?!?:/.exec(header);
  // malformed headers are reported by commitlint
  if (!match) {
    continue;
  }

  // split on ',' only, so scoped package names like @geostyler/x stay intact
  const scopes = new Set((match[1] ?? '').split(',').map(scope => scope.trim()).filter(Boolean));
  const files = git('diff-tree', '--no-commit-id', '--name-only', '-r', sha);
  const touched = [...packageNames]
    .filter(([dir]) => files.some(file => file.startsWith(`${dir}/`)))
    .map(([, name]) => name);
  const missing = touched.filter(name => !scopes.has(name));

  if (missing.length > 0) {
    failed = true;
    console.log(`::error::${sha.slice(0, 7)} "${escape(header)}" is missing scope(s): ${missing.join(', ')}`);
  } else {
    console.log(`${sha.slice(0, 7)} ok`);
  }
}

if (failed) {
  process.exit(1);
}
