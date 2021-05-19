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
  caseId: Scalars['UUID'];
}

export interface CaseDefinition {
  __typename?: 'CaseDefinition';
  id: Scalars['String'];
  schema: Scalars['JSON'];
  statusDefinition: Array<Scalars['String']>;
}

export interface CaseInstance {
  __typename?: 'CaseInstance';
  caseDefinitionId: Scalars['String'];
  createdOn: Scalars['String'];
  externalId?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
  status?: Maybe<Status>;
  statusHistory?: Maybe<Array<HistoricStatus>>;
  submission: Scalars['JSON'];
  userId: Scalars['String'];
}

export interface FormDefinition {
  __typename?: 'FormDefinition';
  formDefinition: Scalars['JSON'];
  name: Scalars['String'];
}

export interface HistoricStatus {
  __typename?: 'HistoricStatus';
  createdOn: Scalars['String'];
  status: Status;
}


export interface Mutation {
  __typename?: 'Mutation';
  /** Convert submission to json return resulting data */
  processSubmission: CaseCreated;
  /** Complete task mutation */
  completeTask: TaskInstance;
}


export interface MutationProcessSubmissionArgs {
  submission: Scalars['JSON'];
  caseDefinitionId: Scalars['String'];
  initialStatus?: Maybe<Scalars['String']>;
}


export interface MutationCompleteTaskArgs {
  taskId: Scalars['UUID'];
  submission: Scalars['JSON'];
}

export interface Query {
  __typename?: 'Query';
  /** retrieves all available case definitions */
  allCaseDefinitions: Array<CaseDefinition>;
  /** retrieves all available case instances */
  allCaseInstances: Array<CaseInstance>;
  /** retrieves single case instance from repository */
  getCaseInstance?: Maybe<CaseInstance>;
  /** find all available tasks */
  findAllTasks?: Maybe<Array<TaskInstance>>;
  /** find all available tasks for external case id */
  findTasks?: Maybe<Array<TaskInstance>>;
  /** find all form definitions from repository */
  allFormDefinitions: Array<FormDefinition>;
  /** find single form definition from repository */
  getFormDefinition?: Maybe<FormDefinition>;
}


export interface QueryGetCaseInstanceArgs {
  id: Scalars['UUID'];
}


export interface QueryFindTasksArgs {
  caseId: Scalars['UUID'];
}


export interface QueryGetFormDefinitionArgs {
  name: Scalars['String'];
}

export interface Status {
  __typename?: 'Status';
  createdOn: Scalars['String'];
  name: Scalars['String'];
}

export interface TaskInstance {
  __typename?: 'TaskInstance';
  caseDefinitionId: Scalars['String'];
  createdOn: Scalars['String'];
  externalCaseId: Scalars['String'];
  externalTaskId: Scalars['String'];
  formDefinition: Scalars['JSON'];
  isCompleted: Scalars['Boolean'];
  taskDefinitionKey: Scalars['String'];
  taskId: Scalars['UUID'];
}


export type GetCaseInstanceQueryVariables = Types.Exact<{
  id: Types.Scalars['UUID'];
}>;


export type GetCaseInstanceQuery = (
  { __typename?: 'Query' }
  & { getCaseInstance?: Types.Maybe<(
    { __typename?: 'CaseInstance' }
    & Pick<Types.CaseInstance, 'caseDefinitionId' | 'createdOn' | 'externalId' | 'id' | 'submission' | 'userId'>
    & { status?: Types.Maybe<(
      { __typename?: 'Status' }
      & Pick<Types.Status, 'createdOn' | 'name'>
    )>, statusHistory?: Types.Maybe<Array<(
      { __typename?: 'HistoricStatus' }
      & Pick<Types.HistoricStatus, 'createdOn'>
      & { status: (
        { __typename?: 'Status' }
        & Pick<Types.Status, 'name'>
      ) }
    )>> }
  )> }
);

export const GetCaseInstanceDocument = gql`
    query GetCaseInstance($id: UUID!) {
  getCaseInstance(id: $id) {
    caseDefinitionId
    createdOn
    externalId
    id
    submission
    userId
    status {
      createdOn
      name
    }
    statusHistory {
      createdOn
      status {
        name
      }
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetCaseInstanceGQL extends Apollo.Query<GetCaseInstanceQuery, GetCaseInstanceQueryVariables> {
    document = GetCaseInstanceDocument;
    client = 'portal-api';
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }