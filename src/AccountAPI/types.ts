import { DeviceType } from '../common/common.types';

export interface LoginByEmailAndPasswordModel {
  email: string;
  password: string;
}

export interface LoginAdminByEmailAndPasswordModel {
  email: string;
  password: string;
  language?: string;
  code?: string;
}

export interface LogoutQuery {
  deviceId?: string;
}

export interface TwoFactorViewModel {
  TwoFactorAuthCodeRequired: boolean;
  TwoFactorAuthPhone: string;
  token: string;
  email: string;
  code: string;
}

export interface CreateDeviceModel {
  userId: number;
  fcmToken: string;
  /** @default 'DeviceType.iOS' */
  deviceType?: DeviceType;
}
