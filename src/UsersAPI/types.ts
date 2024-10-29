export interface RegisterUserModel {
  name?: string | null;
  email?: string | null;
  title?: string | null;
  phonenumber?: string | null;
  secondaryPhoneNumber?: string | null;
  groupID?: number | null;
  role?: string | null;
  organizationIDs?: number[] | null;
  twoFactorAuthEnabled?: boolean | null;
  twoFactorAuthPhoneNumber?: string | null;
  sendEmail?: boolean | null;
  photoFileName?: string | null;
  groupIDs?: number[] | null;
  password: string;
}

export interface GetAdminPanelUsersQuery {
  sort?: string;
  search?: string;
  skip?: number;
  limit?: number;
  organization?: number[];
  unsentOnly?: boolean;
  neverLoggedIn?: boolean;
  showDeleted?: boolean;
  inviteStatus?: (0 | 1 | 2 | 3)[];
  includeSuborgs?: boolean;
  menuItem?: string;
  isOrgManager?: boolean;
  creationMethod?: (0 | 1)[];
  lastActive?: (0 | 1 | 2 | 3)[];
  alarmTest?: (0 | 1 | 2 | 3)[];
}

export interface GetUsersQuery {
  sort?: string;
  search?: string;
  skip?: number;
  limit?: number;
  menuitem?: string;
}

export interface DeleteUserModel {
  userId: number;
  password?: string;
  token?: string;
}

export interface ChangeUsersPasswordModel {
  password: string;
}
