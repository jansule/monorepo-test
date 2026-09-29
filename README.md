MONOREPO-TEST

## Releasing

Releases are done with [semantic-release](https://semantic-release.gitbook.io/) (see `release.config.ts`).
All workspace packages are released with the same version.

The local plugin `release/update-workspace-deps.mjs` runs in the `prepare` step and sets every
dependency on another workspace package (`dependencies`, `devDependencies`, `peerDependencies`,
`optionalDependencies`) to the released version, e.g. `^2.0.0`. It then refreshes `package-lock.json`.

Options:

| Option        | Default | Description                                               |
| ------------- | ------- | --------------------------------------------------------- |
| `rangePrefix` | `^`     | Prefix of the written range. Use `""` for exact versions. |

The plugin must be listed after the `@semantic-release/npm` entries and before `@semantic-release/git`.

