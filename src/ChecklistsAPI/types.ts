import { ChecklistStatus } from "./enums";

export interface GetChecklistsQuery {
  type?: ChecklistStatus;
  /** @description Search by name of checklist */
  search?: string;
  skip?: number;
  limit?: number;
  sort?:
    | "name"
    | "nameDesc"
    | "createdDate"
    | "createdDateDesc"
    | "startedDate"
    | "startedDateDesc";
  /**
   * @description If true, will return checklists created by user making request
   * @default 'true'
   * */
  my?: boolean;
  /**
   * @description If true, will return checklists created by other users
   * @default 'true'
   * */
  others?: boolean;
  /**
   * @description If true, will return checklists shared with user making request
   * @default 'true'
   * */
  shared?: boolean;
}
