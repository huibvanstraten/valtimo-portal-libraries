/*
 * Copyright 2015-2020 Ritense BV, the Netherlands.
 *
 * Licensed under EUPL, Version 1.2 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://joinup.ec.europa.eu/collection/eupl/eupl-text-eupl-12
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const appRoot = require('app-root-path');
const angularConfig = require(appRoot + '/angular.json')
const fs = require('fs');
const path = require('path');

const projectVersion = process.env.PROJECT_VERSION
if(!projectVersion) throw 'Environment variable PROJECT_VERSION was not found!';

let cwd = process.cwd();
console.log(`Current working directory: ${cwd}`);

for (const [key, value] of Object.entries(angularConfig.projects)) {
  if(value.projectType !== "library") {
    continue;
  }

  let projectPath = value['root'].split(path.sep).splice(1).join(path.sep); //remove the 'projects/'
  process.chdir(path.resolve(appRoot.toString(), 'dist', projectPath));
  const packageJson = fs.readFileSync('./package.json', 'utf-8');
  let packageObject = Object.assign(JSON.parse(packageJson), { version: projectVersion });
  fs.writeFileSync('./package.json', JSON.stringify(packageObject, null, 2), 'utf-8');

  console.log(`Updated version of: ${key}`);
}

process.chdir(cwd);

console.log('Updated all versions.');


