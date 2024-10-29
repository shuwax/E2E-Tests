import { ApiService } from '../ApiService/index.js';
import { paths } from '../schemas.js';
import { DataModel, PathParameters, QueryParameters } from '../types.js';
import {
  AddGroupMemberModel,
  GetAdminPanelGroupsQuery,
  GetGroupMembersQuery,
  GetGroupsQuery,
  RegisterGroupModel,
} from './types.js';

export class GroupsAPI {
  private apiService: ApiService;

  constructor(apiService: ApiService) {
    this.apiService = apiService;
  }

  setApiService = (apiService: ApiService) => {
    this.apiService = apiService;
  };

  getApiService = () => {
    return this.apiService;
  };

  registerGroup = async (
    body: RegisterGroupModel,
  ): Promise<DataModel<'GroupViewModel'>> => {
    try {
      const { data } = await this.apiService
        .getOpenApiClient()
        .POST('/api/Admin/Groups/Register', { body });

      return data;
    } catch (error) {
      console.error('Error registering group:', error);
      return error;
    }
  };

  addGroupMember = async (
    id: number,
    body: AddGroupMemberModel,
  ): Promise<DataModel<'UserAndGroupViewModel'>> => {
    try {
      const { data } = await this.apiService
        .getOpenApiClient()
        .POST('/api/Admin/Groups/{id}/addMember', {
          params: { path: { id } },
          body,
        });

      return data;
    } catch (error) {
      console.error('Error registering group:', error);
      return error;
    }
  };

  addMultipleGroupMembers = async (
    body: AddGroupMemberModel[],
  ): Promise<DataModel<'UserAndGroupViewModel'>> => {
    try {
      const { data } = await this.apiService
        .getOpenApiClient()
        .POST('/api/Admin/Groups/addMembers', {
          body,
        });

      return data;
    } catch (error) {
      console.error('Error registering group:', error);
      return error;
    }
  };

  deleteGroup = async (id: number) => {
    try {
      await this.apiService
        .getOpenApiClient()
        .DELETE('/api/Admin/Groups/{id}/delete', {
          params: { path: { id } },
          parseAs: 'text',
        });
    } catch (error) {
      console.error('Error registering group:', error);
      return error;
    }
  };

  deleteMultipleGroups = async (groupsIds: number[]) => {
    try {
      if (!groupsIds.length) return;

      await this.apiService.getOpenApiClient().DELETE('/api/Admin/Groups', {
        body: groupsIds,
        parseAs: 'text',
      });
    } catch (error) {
      console.error('Error registering group:', error);
      return error;
    }
  };

  //We can use it also like this -> query?: QueryParameters<'/api/Groups', 'get'>
  getGroups = async (
    query?: GetGroupsQuery,
  ): Promise<DataModel<'GroupViewModelExtended'>[]> => {
    try {
      const { data } = await this.apiService
        .getOpenApiClient()
        .GET('/api/Groups', { params: { query } });

      return data;
    } catch (error) {
      console.error('Error fetching groups:', error);
      return error;
    }
  };

  getAdminPanelGroups = async (
    query?: GetAdminPanelGroupsQuery,
  ): Promise<DataModel<'GroupViewModelExtended'>[]> => {
    try {
      const { data } = await this.apiService
        .getOpenApiClient()
        .GET('/api/Admin/Groups/All', { params: { query } });

      return data?.groups ?? [];
    } catch (error) {
      console.error('Error fetching groups:', error);
      return error;
    }
  };

  getGroupById = async (
    id: number,
  ): Promise<DataModel<'GroupViewModelExtended'>> => {
    try {
      const { data } = await this.apiService
        .getOpenApiClient()
        .GET('/api/Groups/{id}', { params: { path: { id } } });

      return data;
    } catch (error) {
      console.error('Error fetching group by id:', error);
      return error;
    }
  };

  //We can use it also like this -> query?: QueryParameters<'/api/Groups/{id}/members', 'get'>
  getGroupMembers = async (
    id: number,
    query?: GetGroupMembersQuery,
  ): Promise<DataModel<'GroupMemberViewModel'>[]> => {
    try {
      const { data } = await this.apiService
        .getOpenApiClient()
        .GET('/api/Groups/{id}/members', { params: { path: { id }, query } });

      return data;
    } catch (error) {
      console.error('Error fetching group members:', error);
      return error;
    }
  };

  getGroupLocations = async (
    id: number,
  ): Promise<DataModel<'LocationViewModel'>[]> => {
    try {
      const { data } = await this.apiService
        .getOpenApiClient()
        .GET('/api/Groups/{id}/locations', { params: { path: { id } } });

      return data;
    } catch (error) {
      console.error('Error fetching group locations:', error);
      return error;
    }
  };
}
