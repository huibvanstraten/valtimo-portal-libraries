export interface PortalCaseInstance {
  caseDefinitionId: string;
  createdOn: Date;
  externalId?: string | null | undefined;
  id: string;
  status: string;
  submission: any;
  userId: string;
};
