/**
 * Local semantic-release plugin that sets all inter-workspace dependency ranges
 * to the version being released and refreshes package-lock.json.
 *
 * Must be listed after the @semantic-release/npm entries, so the workspace
 * packages already carry the new version when the lockfile is updated.
 *
 * Options:
 *   rangePrefix  Prefix for the written range, e.g. "^", "~" or "" (default: "^").
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';

const DEP_TYPES = ['dependencies', 'devDependencies', 'peerDependencies', 'optionalDependencies'];

const readJson = path => JSON.parse(readFileSync(path, 'utf8'));

export async function prepare(pluginConfig, { cwd, nextRelease, logger }) {
  const range = `${pluginConfig.rangePrefix ?? '^'}${nextRelease.version}`;
  const workspaces = readJson(join(cwd, 'package.json')).workspaces ?? [];
  const pkgPaths = workspaces.map(ws => join(cwd, ws, 'package.json'));
  const workspaceNames = new Set(pkgPaths.map(p => readJson(p).name));

  for (const pkgPath of pkgPaths) {
    const pkg = readJson(pkgPath);
    let changed = false;

    for (const depType of DEP_TYPES) {
      for (const dep of Object.keys(pkg[depType] ?? {})) {
        if (workspaceNames.has(dep)) {
          pkg[depType][dep] = range;
          changed = true;
          logger.log('Set %s "%s" of %s to %s', depType, dep, pkg.name, range);
        }
      }
    }

    if (changed) {
      writeFileSync(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`);
    }
  }

  execFileSync('npm', ['install', '--package-lock-only', '--ignore-scripts'], { cwd, stdio: 'inherit' });
}
