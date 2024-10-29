export enum MessageType {
  Message = 0,
  Report = 1,
  Emergency = 2,
  Broadcast = 3,
  GroupAdditionNormal = 4,
  GroupAdditionEmergency = 5,
  SituationReport = 6,
  _old_ChecklistStart = 7,
  _old_ChecklistShare = 8,
  HoldingStatement = 9,
  LogNote = 10,
  CrossOrganizationEmergency = 11,
  Forwarded = 12,
}

export enum ReplyType {
  All = 0,
  SenderOnly = 1,
  None = 2,
}

export enum ReplyPurpose {
  Regular,
  EndCrisis,
  BlockComments,
  UnblockComments,
  ChecklistEnded,
  ChecklistReactivated,
}

export enum MessageAttachmentFileType {
  Document,
  Photo,
  Audio,
}
