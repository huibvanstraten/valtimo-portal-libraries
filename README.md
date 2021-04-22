# ValtimoPortal

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.1.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4201/`. The app will automatically reload if you change
any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also
use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag
for a production build.

Run `npm run buildAll` to first build all the libraries before building the app. Build artifacts of the libs will also
be stored in the `dist/` directory.

Run `npm run buildLibs` to build all libraries. Build artifacts of the libs will be stored in the `dist/` directory.

Run `npm run build:` plus your library name (e.g. `npm run build:shared`) to build that specific library.

## Watch

Run `npm run watchAll` to first clean up the build folder (`dist/`) and to then build all libraries and the app
sequentially and watch for changes in parallel. This allows for easy development through only one command.

Run `npm run watch:` plus your library name (e.g. `npm run watch:shared`) to build that specific library and to re-build
when there are changes.

## Running unit tests

Run `npm run test` to execute the unit tests via [Jest](https://jestjs.io/).

Run `npm run test:` plus your library name (e.g. `npm run test:shared`) to execute the unit tests for that specific
library while watching for changes.

## GraphQL

Run `npm run graphqlGenerate` to generate TypeScript classes for the various .graphql files throughout the project.
These can be used through dependency injection.

Do not forget to run `npm run graphqlSchema` first, and run it each time there are updates to your GraphQL endpoint.

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out
the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
