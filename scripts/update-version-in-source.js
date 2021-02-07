const fs = require('fs');
const path = require('path');
const execSync = require('child_process').execSync;
const version = require('../package.json').version;

const sourcePath = path.join(__dirname, '..', 'mustache.js');
const originalSource = fs.readFileSync(sourcePath).toString('utf-8');
const updatedSource = originalSource.replace(
  /version: '[^']+',/, 
  `version: '${version}',`
);

fs.writeFileSync(sourcePath, updatedSource);

// with the updated version number in the source code, we make that change
// a part of the git commit created by npm when it bumped the version as a
// result of using the `$ npm version [patch | minor | major]` command
execSync('git commit --all --amend --no-edit');

// npm automatically adds an appropriate git tag when bumping versions,
// we got to update that tag after changing the source code with the version
// and amending the original commit created by npm
execSync(`git tag --force v${version}`);
