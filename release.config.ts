import packageJson from './package.json' with { type: 'json' };

const workspacePackages = packageJson.workspaces || [];

const npmConfigurations = workspacePackages.map(pkg => [
  "@semantic-release/npm",
  {
    pkgRoot: `./${pkg}`
  }
]);

const gitAssets = [
  "CHANGELOG.md",
  "package.json",
  "package-lock.json"
].concat(
  workspacePackages
    .flatMap(pkg => [`./${pkg}/package.json`, `./${pkg}/package-lock.json`])
  );

export default {
  "branches": [
    "main",
    {
      "name": "next",
      "prerelease": true
    }
  ],
  "plugins": [
    [
      "@semantic-release/commit-analyzer",
      {
        "preset": "conventionalcommits"
      }
    ],
    [
      "@semantic-release/release-notes-generator",
      {
        "preset": "conventionalcommits",
        "presetConfig": {
          "header": "Changelog of GeoStyler SLD Parser"
        }
      }
    ],
    "@semantic-release/changelog",
    ...npmConfigurations,
    [
      "./tools/release-plugin-update-workspace-deps/index.mjs",
      {
        "rangePrefix": "^"
      }
    ],
    [
      "@semantic-release/git",
      {
        "assets": gitAssets,
        "message": "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}"
      }
    ],
    "@semantic-release/github"
  ]
};
