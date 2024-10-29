interface LocalizedNameModel {
  language?: string | null;
  name?: string | null;
  shortName?: string | null;
}
interface LocalizedTextModel {
  language?: string | null;
  text?: string | null;
}

export interface CreateEmergencyTypeModel {
  organizationID: number | null;
  color?: string | null;
  icon?: string | null;
  includeCrisisTeam?: boolean;
  noGroup?: boolean;
  skipMap?: boolean;
  names: LocalizedNameModel[] | null;
  texts?: LocalizedTextModel[] | null;
  groupIds?: number[] | null;
  order: number;
  eventCodeId?: number | null;
  hideFromMainAccountUsers?: boolean;
  blocking?: boolean;
  warningStep?: boolean | null;
  allowCustomizedText?: boolean | null;
  checkListTemplateId?: number | null;
  soundConfigurationId?: number | null;
}
