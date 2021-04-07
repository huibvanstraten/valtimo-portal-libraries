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
  /** A type representing a formatted JSON */
  JSON: any;
  /** A type representing a formatted java.util.UUID */
  UUID: any;
}


export interface CaseCreated {
  __typename?: 'CaseCreated';
  caseId: Scalars['String'];
}

export interface CaseDefinition {
  __typename?: 'CaseDefinition';
  id: Scalars['String'];
  schema: Scalars['JSON'];
}

export interface CaseInstance {
  __typename?: 'CaseInstance';
  id: Scalars['UUID'];
  submision: Scalars['JSON'];
}

export interface FormDefinition {
  __typename?: 'FormDefinition';
  formDefinition: Scalars['JSON'];
  name: Scalars['String'];
}


export interface Mutation {
  __typename?: 'Mutation';
  /** Convert submission to json return resulting data */
  processSubmission: CaseCreated;
}


export interface MutationProcessSubmissionArgs {
  submission: Scalars['JSON'];
  caseDefinitionId: Scalars['String'];
}

export interface Query {
  __typename?: 'Query';
  /** retrieves all available case definitions */
  allCaseDefinitions: Array<CaseDefinition>;
  /** retrieves all available case instances */
  allCaseInstances: Array<CaseInstance>;
  /** retrieves single case instance from repository */
  getCaseInstance?: Maybe<CaseInstance>;
  /** retrieves all form definitions from repository */
  allFormDefinitions: Array<FormDefinition>;
  /** retrieves single form definition from repository */
  getFormDefinition?: Maybe<FormDefinition>;
}


export interface QueryGetCaseInstanceArgs {
  id: Scalars['UUID'];
}


export interface QueryGetFormDefinitionArgs {
  name: Scalars['String'];
}


export type GetAllFormDefinitionsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetAllFormDefinitionsQuery = (
  { __typename?: 'Query' }
  & {
  allFormDefinitions: Array<(
    { __typename?: 'FormDefinition' }
    & Pick<Types.FormDefinition, 'formDefinition' | 'name'>
    )>
}
  );

export const GetAllFormDefinitionsDocument = gql`
  query GetAllFormDefinitions {
    allFormDefinitions {
      formDefinition
      name
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class GetAllFormDefinitionsGQL extends Apollo.Query<GetAllFormDefinitionsQuery, GetAllFormDefinitionsQueryVariables> {
  document = GetAllFormDefinitionsDocument;
  client = 'portal-api';

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
