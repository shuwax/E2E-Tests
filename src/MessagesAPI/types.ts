import {
  MessageAttachmentFileType,
  MessageType,
  ReplyPurpose,
  ReplyType,
} from "./enums";

export interface GetMessagesQuery {
  search: string;
  skip: number;
  take: number;
  recalled: boolean;
  threshold: string;
  types: number[];
  excludeTypes: number[];
  groups: number[];
}

export interface GetMessageQuery {
  /** @default 'false' */
  noCache?: boolean;
  /** @default 'true' */
  includeReplies?: boolean;
  replyPurpose?: ReplyPurpose[];
}

export interface PostMessageModel {
  type: MessageType;
  replyType?: ReplyType;
  subType?: number;
  groupID?: number;
  groupIDs?: number[];
  recipientIDs?: number[];
  locationID?: number;
  senderLatitude?: number;
  senderLongitude?: number;
  ChecklistID?: number;
  emergencyTypeId?: number;
  situationReportID?: number;
  musterId?: number;
  onCallAlertId?: number;
  ceaseNotification?: boolean;
  subOrganisationIDForEmergencyMessage?: number;
  text?: string;
  photoFileName?: string;
  documentFileName?: string;
  photoFileNames?: string[];
  documentFileNames?: string[];
  audioFileNames?: string[];
  groupDocumentIds?: number[];
  subject?: string;
  attachments?: MessageAttachment[];
}

export type MessageAttachment = {
  fileName?: string;
  type?: MessageAttachmentFileType;
  size?: number;
};

export interface PostReplyModel {
  text?: string;
  replyId?: number;
  ChecklistID?: number;
  photoFileNames?: string[];
  documentFileNames?: string[];
  audioFileNames?: string[];
  attachments?: MessageAttachment[];
  locationID?: number;
  groupDocumentIds?: number[];
  ceaseNotification?: boolean;
  replyToInitialMessage?: boolean;
  replyPurpose?: ReplyPurpose;
}
