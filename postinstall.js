const fs = require('fs');

// Read the root package.json file
const rootPackageJsonPath = '../../package.json';
const rootPackageJson = require(rootPackageJsonPath);

// Update the "scripts" section in the root package.json file
if (!rootPackageJson.scripts) {
  rootPackageJson.scripts = {};
}
rootPackageJson.scripts['es-express'] = 'node ./node_modules/es-express/es-express.js';

// Write the updated package.json file
fs.writeFileSync(rootPackageJsonPath, JSON.stringify(rootPackageJson, null, 2));