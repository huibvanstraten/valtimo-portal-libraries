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
}




export interface CaseCreated {
  __typename?: 'CaseCreated';
  caseId: Scalars['String'];
}

export interface CaseDefinitionDto {
  __typename?: 'CaseDefinitionDto';
  id: Scalars['String'];
  schema: Scalars['JSON'];
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
  allCaseDefinitions: Array<CaseDefinitionDto>;
  /** retrieves all form definitions from repository */
  allFormDefinitions: Array<FormDefinition>;
  /** retrieves single form definition from repository */
  getFormDefinition?: Maybe<FormDefinition>;
}


export interface QueryGetFormDefinitionArgs {
  name: Scalars['String'];
}
