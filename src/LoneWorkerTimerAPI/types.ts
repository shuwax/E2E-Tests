export interface PostLoneWorkerTimerModel {
  /** @note Equals 'fcm' */
  deviceId: string;
  dispatchTime: string;
  locationId?: number;
  longitude?: number;
  latitude?: number;
  text: string;
  active?: boolean;
  groupID?: number;
  groupIDs?: number[];
  recipientIds?: number[];
  oneMinuteWarning?: boolean;
  allGroupIds?: number[];
}
