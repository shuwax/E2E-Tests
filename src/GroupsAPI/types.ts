export interface RegisterGroupModel {
  name: string;
  locationID?: number | null;
  userid?: number | null;
  memberEmergency?: boolean;
  openCalendarWriteAccess?: boolean;
  searchable?: boolean;
  adminSetsInfo?: boolean;
  hidden?: boolean;
  groupType?: number | null;
  longitude?: number | null;
  latitude?: number | null;
  organizationID?: number | null;
  active?: boolean | null;
  userResolve?: { userId?: number; resolveType?: 0 | 1 }[] | null;
  usableForSuborganizationEmergencyTypes?: boolean;
  description?: string | null;
  imageFileName?: string | null;
  contactPersonName?: string | null;
  contactPersonEmailAddress?: string | null;
  contactPersonPhoneNumber?: string | null;
  codesQuantity?: number | null;
  reusableCode?: boolean | null;
  importId?: string | null;
  contactPersonTitle?: string | null;
}

export interface AddGroupMemberModel {
  groupId?: number | null;
  Id?: number | null;
  Email?: string | null;
  admin?: boolean;
}

export interface GetAdminPanelGroupsQuery {
  Id?: number;
  Skip?: number;
  Limit?: number;
  Asc?: 0 | 1;
  Sort?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  Search?: string;
  OrgId?: number;
  Deleted?: boolean;
  IncludeSuborgs?: boolean;
  IncludeAlarmGroups?: boolean;
  GroupType?: (0 | 1 | 2 | 3 | 4)[];
  MenuItem?: string;
  IncludeMembers?: boolean;
}

export interface GetGroupsQuery {
  search?: string;
  skip?: number;
  limit?: number;
  latitude?: number;
  longitude?: number;
  menuitem?: string;
  minGroupMembersCount?: number;
  member?: boolean;
}

export interface GetGroupMembersQuery {
  skip?: number;
  limit?: number;
}
