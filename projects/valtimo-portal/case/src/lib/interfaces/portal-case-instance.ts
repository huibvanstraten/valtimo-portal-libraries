interface PortalStatus {
  createdOn: Date | undefined;
  name: string;
}

interface PortalCaseInstance {
  caseDefinitionId: string;
  createdOn: Date;
  externalId?: string | null | undefined;
  id: string;
  status: PortalStatus | undefined;
  statusHistory: Array<PortalStatus> | undefined;
  submission: any;
  userId: string;
}

export {PortalStatus, PortalCaseInstance};
