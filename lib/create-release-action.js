module.exports = createReleaseAction;

const { writeFile } = require("fs").promises;

async function createReleaseAction() {
  await writeFile(
    ".github/workflows/release.yml",
    `name: Release
on:
  push:
    branches:
      - master

jobs:
  release:
    name: release
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@master
      - uses: actions/setup-node@v1
        with:
          node-version: "12.x"
      - run: npm ci
      - run: npm run build
      - run: npx semantic-release
        env:
          GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}
          NPM_TOKEN: \${{ secrets.NPM_TOKEN }}
`
  );
}