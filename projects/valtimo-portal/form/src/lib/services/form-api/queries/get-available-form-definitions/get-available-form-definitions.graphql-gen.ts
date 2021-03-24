import * as Types from '@valtimo-portal/graphql';

import * as Apollo from 'apollo-angular';
import {gql} from 'apollo-angular';
import {Injectable} from '@angular/core';

export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
}


export interface FormDefinition {
  __typename?: 'FormDefinition';
  formDefinition: Scalars['String'];
  name: Scalars['String'];
}

export interface Query {
  __typename?: 'Query';
  /** retrieves all form definitions from repository */
  availableFormDefinitions: Array<FormDefinition>;
}

// @ts-ignore
export type GetAvailableFormDefinitionsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetAvailableFormDefinitionsQuery = (
  { __typename?: 'Query' }
  & {
  availableFormDefinitions: Array<(
    { __typename?: 'FormDefinition' }
    & Pick<Types.FormDefinition, 'formDefinition' | 'name'>
    )>
}
  );

export const GetAvailableFormDefinitionsDocument = gql`
  query GetAvailableFormDefinitions {
    availableFormDefinitions {
      formDefinition
      name
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class GetAvailableFormDefinitionsGQL
  extends Apollo.Query<GetAvailableFormDefinitionsQuery, GetAvailableFormDefinitionsQueryVariables> {
  document = GetAvailableFormDefinitionsDocument;
  client = 'portal-api';

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
