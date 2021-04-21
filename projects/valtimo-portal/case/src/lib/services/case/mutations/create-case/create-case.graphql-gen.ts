import * as Types from '@valtimo-portal/graphql';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
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
  caseDefinitionId: Scalars['String'];
  id: Scalars['UUID'];
  status: Scalars['String'];
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
  /** find all available tasks for external case id */
  findTasks?: Maybe<Array<Task>>;
}


export interface QueryGetCaseInstanceArgs {
  id: Scalars['UUID'];
}


export interface QueryGetFormDefinitionArgs {
  name: Scalars['String'];
}


export interface QueryFindTasksArgs {
  externalCaseId: Scalars['String'];
}

export interface Task {
  __typename?: 'Task';
  completed: Scalars['Boolean'];
  createdOn: Scalars['String'];
  externalCaseId: Scalars['String'];
  formDefinition: Scalars['JSON'];
  taskId: Scalars['UUID'];
}


export type CreateCaseMutationVariables = Types.Exact<{
  submission: Types.Scalars['JSON'];
  caseDefinitionId: Types.Scalars['String'];
}>;


export type CreateCaseMutation = (
  { __typename?: 'Mutation' }
  & { processSubmission: (
    { __typename?: 'CaseCreated' }
    & Pick<Types.CaseCreated, 'caseId'>
  ) }
);

export const CreateCaseDocument = gql`
    mutation CreateCase($submission: JSON!, $caseDefinitionId: String!) {
  processSubmission(submission: $submission, caseDefinitionId: $caseDefinitionId) {
    caseId
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateCaseGQL extends Apollo.Mutation<CreateCaseMutation, CreateCaseMutationVariables> {
    document = CreateCaseDocument;
    client = 'portal-api';
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }