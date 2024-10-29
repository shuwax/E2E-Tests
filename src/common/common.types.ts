export enum DeviceType {
  /** Old IOS app */
  _old_IOS = 0,
  /** Old Android app */
  _old_Android = 1, //
  /** Old desktop app */
  CWS = 2,
  CoAlertiOS = 3,
  CoAlertAndroid = 4,
  /** IOS app >3.0 */
  iOS = 5,
  /** Android app >3.0 */
  Android = 6,
  /** Desktop app */
  DesktopApp = 7,
}

export type AudioFile = {
  fileName: string;
  duration: number;
};
