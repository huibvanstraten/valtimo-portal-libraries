/*
 * Copyright 2015-2021 Ritense BV, the Netherlands.
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

export const mockCaseDefinitionsResult =
  {
    data: {
      allCaseDefinitions: [
        {
          id: 'person',
          schema: {
            $id: 'person.schema',
            $schema: 'http://json-schema.org/draft-07/schema#',
            title: 'Person',
            type: 'object',
            properties: {
              firstName: {
                type: 'string',
                description: 'The person\'s first name.',
                maxLength: 15
              },
              age: {
                description: 'Age in years which must be equal to or greater than zero.',
                type: 'integer',
                minimum: 0
              },
              birthday: {
                description: 'Birthday',
                type: 'string',
                format: 'date'
              },
              'is-cool': {
                description: 'is cool',
                type: 'boolean'
              }
            }
          },
          __typename: 'CaseDefinition'
        },
        {
          id: 'test',
          schema: {
            $id: 'test.schema',
            $schema: 'http://json-schema.org/draft-07/schema#',
            title: 'Test',
            type: 'object',
            properties: {
              person: {
                type: 'object',
                description: 'The person\'s age and first name.',
                properties: {
                  age: {
                    description: 'Age in years which must be equal to or greater than zero.',
                    type: 'integer',
                    minimum: 0
                  },
                  firstName: {
                    description: 'firstname',
                    type: 'string'
                  }
                }
              }
            }
          },
          __typename: 'CaseDefinition'
        }
      ]
    }
  };
