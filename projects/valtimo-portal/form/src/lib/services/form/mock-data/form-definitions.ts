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

export const mockFormDefinitionsResult =
  {
    data: {
      allFormDefinitions: [
        {
          formDefinition: {
            display: 'form',
            settings: {
              pdf: {
                id: '1ec0f8ee-6685-5d98-a847-26f67b67d6f0',
                src: 'https://files.form.io/pdf/5692b91fd1028f01000407e3/file/1ec0f8ee-6685-5d98-a847-26f67b67d6f0'
              }
            },
            components: [
              {
                label: 'Naam',
                key: 'person.firstName',
                type: 'textfield',
                input: true
              },
              {
                type: 'button',
                label: 'Submit',
                key: 'submit',
                disableOnInvalid: true,
                input: true
              }
            ]
          },
          name: 'form-example'
        },
        {
          formDefinition: {
            display: 'form',
            settings: {
              pdf: {
                id: '1ec0f8ee-6685-5d98-a847-26f67b67d6f0',
                src: 'https://files.form.io/pdf/5692b91fd1028f01000407e3/file/1ec0f8ee-6685-5d98-a847-26f67b67d6f0'
              }
            },
            components: [
              {
                label: 'Naam',
                key: 'firstName',
                type: 'textfield',
                input: true
              },
              {
                label: 'Leeftijd',
                key: 'age',
                type: 'number',
                input: true
              },
              {
                type: 'button',
                label: 'Submit',
                key: 'submit',
                disableOnInvalid: true,
                input: true
              }
            ]
          },
          name: 'person'
        },
        {
          formDefinition: {
            display: 'form',
            settings: {
              pdf: {
                id: '1ec0f8ee-6685-5d98-a847-26f67b67d6f0',
                src: 'https://files.form.io/pdf/5692b91fd1028f01000407e3/file/1ec0f8ee-6685-5d98-a847-26f67b67d6f0'
              }
            },
            components: [
              {
                label: 'Naam',
                key: 'person.firstName',
                type: 'textfield',
                input: true
              },
              {
                label: 'Leeftijd',
                key: 'person.age',
                type: 'number',
                input: true
              },
              {
                type: 'button',
                label: 'Submit',
                key: 'submit',
                disableOnInvalid: true,
                input: true
              }
            ]
          },
          name: 'test'
        }
      ]
    }
  };
