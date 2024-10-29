import { ApiService } from '../ApiService/index.js';
import { DataModel } from '../types.js';
import { CreateEmergencyTypeModel } from './types.js';

export class AlarmsAPI {
  private apiService: ApiService;

  constructor(apiService: ApiService) {
    this.apiService = apiService;
  }

  setApiService(apiService: ApiService) {
    this.apiService = apiService;
  }

  createEmergencyType = async (
    body: CreateEmergencyTypeModel,
  ): Promise<DataModel<'EmergencyTypeViewModel'>> => {
    try {
      const { data } = await this.apiService
        .getOpenApiClient()
        .POST('/api/Admin/EmergencyTypes', {
          body,
        });

      return data;
    } catch (error) {
      console.error('Error creating emergency type:', error);
      return error;
    }
  };

  getEmergencyTypes = async (): Promise<
    DataModel<'EmergencyTypeViewModel'>[]
  > => {
    try {
      const { data } = await this.apiService
        .getOpenApiClient()
        .GET('/api/Account/EmergencyTypes');

      return data;
    } catch (error) {
      console.error('Error creating emergency type:', error);
      return error;
    }
  };

  getEmergencyTypesByOrganizationId = async (
    id: number,
  ): Promise<DataModel<'EmergencyTypeViewModel'>[]> => {
    try {
      const { data } = await this.apiService
        .getOpenApiClient()
        .GET('/api/Admin/Organizations/{id}/EmergencyTypes', {
          params: { path: { id } },
        });

      return data;
    } catch (error) {
      console.error('Error getting emergency types by organization:', error);
      return error;
    }
  };

  deleteMultipleEmergencyTypes = async (emergencyTypesIds: number[]) => {
    try {
      await this.apiService
        .getOpenApiClient()
        .DELETE('/api/Admin/EmergencyTypes', {
          body: emergencyTypesIds,
          parseAs: 'text',
        });
    } catch (error) {
      console.error('Error deleting emergency type:', error);
      return error;
    }
  };
}
