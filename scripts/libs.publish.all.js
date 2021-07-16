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
const exec = require('child_process');
const path = require('path');
const npmRcFile = '.npmrc'

const npmRepository = process.env.NPM_REPOSITORY
if (!npmRepository) throw 'Environment variable NPM_REPOSITORY was not found!';

const npmToken = process.env.NPM_TOKEN
if (!npmToken) throw 'Environment variable NPM_TOKEN was not found!';

for (const [key, value] of Object.entries(angularConfig.projects)) {
  if(value.projectType !== "library") {
    continue;
  }

  let cwd = process.cwd();
  let projectPath = value['root'].split(path.sep).splice(1).join(path.sep);
  process.chdir(path.resolve(appRoot.toString(), 'dist', projectPath));
  console.log(`Writing ${npmRcFile} file in ${process.cwd()}`);
  fs.writeFileSync(npmRcFile, `${key.split("/")[0]}:registry=${npmRepository}\n` +
    `${npmRepository.replace(/^.*?:/ig, '')}:_authToken=${npmToken}\n`);
  exec.execSync('npm publish');
  process.chdir(cwd);
}
