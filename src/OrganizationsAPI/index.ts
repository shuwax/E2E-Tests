import { AlarmsAPI } from "../AlarmsAPI/index.js";
import { ApiService } from "../ApiService/index.js";
import { GroupsAPI } from "../GroupsAPI/index.js";
import { DataModel } from "../types.js";
import { UsersAPI } from "../UsersAPI/index.js";
import { OrganizationCreateModel } from "./types.js";

export class OrganizationsAPI {
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

  createOrganization = async (
    body: OrganizationCreateModel,
  ): Promise<DataModel<"OrganizationViewModel">> => {
    try {
      const { data } = await this.apiService
        .getOpenApiClient()
        .POST("/api/Admin/Organizations/Create", { body });

      return data;
    } catch (error) {
      console.error("Error creating organization:", error);
      return error;
    }
  };

  getOrganizationById = async (
    id: number,
  ): Promise<DataModel<"OrganizationViewModel">> => {
    try {
      const { data } = await this.apiService
        .getOpenApiClient()
        .GET("/api/Admin/Organizations/{id}", { params: { path: { id } } });
      return data;
    } catch (error) {
      console.error("Error getting organization by id:", error);
      return error;
    }
  };

  addUsersToOrganization = async (id: number, usersIds: number[]) => {
    try {
      await this.apiService
        .getOpenApiClient()
        .POST("/api/Admin/Organizations/{id}/AddUsers", {
          params: { path: { id } },
          body: usersIds,
          parseAs: "text",
        });
    } catch (error) {
      console.error("Error adding users to organization:", error);
      return error;
    }
  };

  removeUserFromSubOrganization = async (id: number, userId: number) => {
    try {
      await this.apiService
        .getOpenApiClient()
        .POST("/api/Admin/Organizations/{id}/RemoveUser/{userId}", {
          params: { path: { id, userId } },
          parseAs: "text",
        });
    } catch (error) {
      console.error("Error removing user from organization:", error);
      return error;
    }
  };

  removeMultipleUsersFromSubOrganization = async (
    id: number,
    usersIds: number[],
  ) => {
    try {
      await this.apiService
        .getOpenApiClient()
        .POST("/api/Admin/Organizations/{id}/RemoveUsers", {
          params: { path: { id } },
          body: usersIds,
          parseAs: "text",
        });
    } catch (error) {
      console.error("Error removing users from organization:", error);
      return error;
    }
  };

  deleteOrganization = async (id: number) => {
    try {
      await this.apiService
        .getOpenApiClient()
        .DELETE("/api/Admin/Organizations/{id}/Delete", {
          params: { path: { id } },
        });
    } catch (error) {
      console.error("Error deleting organization:", error);
      return error;
    }
  };

  /**
   * forceDeleteOrganization
   *
   * Completely removes an organization, including its associated groups, users, and emergency types.
   *
   * @param {string} organizationId - The ID of the organization to delete
   */
  forceDeleteOrganization = async (id: number) => {
    try {
      const groupsAPI = new GroupsAPI(this.apiService);
      const usersAPI = new UsersAPI(this.apiService);
      const alarmsAPI = new AlarmsAPI(this.apiService);
      const organizationGroups = await groupsAPI.getAdminPanelGroups({
        OrgId: id,
        IncludeSuborgs: true,
      });
      const organizationUsers = await usersAPI.getAdminPanelUsers({
        organization: [id],
        includeSuborgs: true,
      });
      const organizationEmergencyTypes =
        await alarmsAPI.getEmergencyTypesByOrganizationId(id);

      await usersAPI.deleteMultipleUsers(
        organizationUsers.map((user) => ({ userId: user.id })),
      );
      await groupsAPI.deleteMultipleGroups(
        organizationGroups.map((group) => group.id),
      );
      await alarmsAPI.deleteMultipleEmergencyTypes(
        organizationEmergencyTypes.map((type) => type.ID),
      );
      await this.deleteOrganization(id);
    } catch (error) {
      console.error("Error force deleting organization:", error);
    }
  };
}
